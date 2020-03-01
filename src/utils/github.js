const { Octokit } = require('@octokit/rest');

class GitHubHelper {
    constructor() {
        this.octokit = new Octokit();
    }

    async getIssues(owner, repo) {
        let results = [];

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
        } catch (error) {
            console.error(`Error when calling getIssues: ${error.message}`);
        }

        return results;
    }
}

module.exports = GitHubHelper;
