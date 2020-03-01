const { Octokit } = require('@octokit/rest');
const path = require('path');
const flatcache = require('flat-cache');
const getCacheKey = () => {
    const date = new Date();
    return `${date.getUTCFullYear()}-${date.getUTCMonth() +
        1}-${date.getUTCDate()}`;
};
class GitHubHelper {
    constructor() {
        this.octokit = new Octokit();
    }

    async getIssues(owner, repo) {
        const cache = flatcache.load(
            'github-issues',
            path.resolve('./_datacache')
        );
        const key = getCacheKey();
        let results = cache.getKey(key);

        // if we can pull from the cache, return that value
        if (results) {
            return results;
        }

        try {
            const { data } = await this.octokit.issues.listForRepo({
                owner,
                repo
            });

            results = data.map(item => {
                item.tags = item.labels.map(label => label.name);
                item.github_url = item.url;
                item.date = item.created_at;
                item.permalink = `/issue/${item.number}/index.html`;
                Reflect.deleteProperty(item, 'url');

                return item;
            });

            cache.setKey(key, results);
            cache.save();
        } catch (error) {
            console.error(`Error when calling getIssues: ${error.message}`);
        }

        return results;
    }

    async getIssuesByLabel(owner, repo) {
        let labelResults = {};
        try {
            const issues = await this.getIssues(owner, repo);

            // loop through each issue to build out labels object
            for (const issue of issues) {
                if (issue.labels && Array.isArray(issue.labels)) {
                    issue.labels.forEach(label => {
                        if (!labelResults[label.name]) {
                            labelResults[label.name] = [];
                        }
                        labelResults[label.name].push(issue);
                    });
                }
            }
        } catch (error) {
            console.error(
                `Error when calling getIssuesByLabel: ${error.message}`
            );
        }

        return labelResults;
    }
}

module.exports = GitHubHelper;
