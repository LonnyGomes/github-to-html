const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();
const owner = 'lonnygomes';
const repo = 'vjs-video';
module.exports = async () => {
    const { data } = await octokit.issues.listForRepo({
        owner,
        repo
    });

    return data.map((item) => {
        item.tags = item.labels.map(label => label.name);
        item.github_url = item.url;
        Reflect.deleteProperty(item, 'url');

        return item;
    });
}