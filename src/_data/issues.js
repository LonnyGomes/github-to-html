const { Octokit } = require("@octokit/rest");
const flatcache = require('flat-cache');
const path = require("path");
const moment = require('moment');

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
        const dateFormat = 'ddd, DD MMM YYYY, HH:mm';
        const newData = await data.map((item) => {
            item.tags = item.labels.map(label => label.name);
            item.github_url = item.url;
            item.created_at = moment(item.created_at).format(dateFormat);
            item.updated_at = moment(item.updated_at).format(dateFormat);
            Reflect.deleteProperty(item, 'url');

            return item;
        });

        cache.setKey(key, newData);
        cache.save();
        results = newData;
    }

    return results;
}