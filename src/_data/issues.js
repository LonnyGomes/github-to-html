const { Octokit } = require("@octokit/rest");
const flatcache = require('flat-cache');
const path = require("path");

const octokit = new Octokit();
const owner = 'lonnygomes';
const repo = 'vjs-video';

const getCacheKey = () => {
    const date = new Date();
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

module.exports = async () => {
    const cache = flatcache.load("github-issues", path.resolve("./_datacache"));
    const key = getCacheKey();
    let results = cache.getKey(key);

    if (!results) {

        const { data } = await octokit.issues.listForRepo({
            owner,
            repo
        });

        const newData = await data.map((item) => {
            item.tags = item.labels.map(label => label.name);
            item.github_url = item.url;
            Reflect.deleteProperty(item, 'url');

            return item;
        });

        cache.setKey(key, newData);
        cache.save();
        results = newData;
    }

    return results;
}