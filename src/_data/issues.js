const config = require('./config')();
const GitHubHelper = require('../utils/github');
const flatcache = require('flat-cache');
const path = require('path');

const github = new GitHubHelper();
const owner = config.githubUser;
const repo = config.githubRepo;

const getCacheKey = () => {
    const date = new Date();
    return `${date.getUTCFullYear()}-${date.getUTCMonth() +
        1}-${date.getUTCDate()}`;
};

module.exports = async () => {
    const cache = flatcache.load('github-issues', path.resolve('./_datacache'));
    const key = getCacheKey();
    let results = cache.getKey(key);

    if (!results) {
        const newData = await github.getIssues(owner, repo);

        cache.setKey(key, newData);
        cache.save();
        results = newData;
    }

    return results;
};
