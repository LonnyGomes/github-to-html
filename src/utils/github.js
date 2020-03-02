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
            const options = this.octokit.issues.listForRepo.endpoint.merge({
                owner,
                repo
            });

            const data = await this.octokit.paginate(options);

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

    async getFlattenedIssuesByLabel(owner, repo) {
        let issues = [];
        try {
            const issuesObj = await this.getIssuesByLabel(owner, repo);

            // merge arrays across the various data while adding a label tag
            Object.keys(issuesObj).forEach(
                label =>
                    (issues = [
                        ...issues,
                        ...issuesObj[label].map(issue => ({ ...issue, label }))
                    ])
            );
        } catch (error) {
            console.error(
                `Error when calling getFlattenedIssuesByLabel: ${error.message}`
            );
        }

        return issues;
    }
}

module.exports = GitHubHelper;
