const config = require('./config')();
const GitHubHelper = require('../utils/github');

const github = new GitHubHelper();
const owner = config.githubUser;
const repo = config.githubRepo;

module.exports = async () => {
    const results = await github.getIssues(owner, repo);
    return results;
};
