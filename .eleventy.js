const util = require('util');
const moment = require('moment');
const config = require('./src/_data/config')();
const GitHubHelper = require('./src/utils/github');

const owner = config.githubUser;
const repo = config.githubRepo;

module.exports = function(eleventyConfig) {
    const github = new GitHubHelper(config.octokitOptions);
    // retrieve nunjucks slug filter
    const slug = eleventyConfig.nunjucksFilters.slug;

    const processLabel = label =>
        `<span style="background-color:#${
            label.color
        }" class="label"><a class="label-link" href="/label/${slug(
            label.name
        )}/"/>${label.name}</a></span>`;

    eleventyConfig.addPassthroughCopy('src/css');

    eleventyConfig.addShortcode('ghLabels', labels =>
        labels.map(processLabel).join('\n')
    );

    eleventyConfig.addShortcode('ghLabel', processLabel);
    eleventyConfig.addFilter('debug', data => util.inspect(data));

    eleventyConfig.addFilter('simpleDate', dateStr => {
        const dateFormat = 'DD MMM YYYY';
        return moment(dateStr).format(dateFormat);
    });

    eleventyConfig.addFilter('detailedDate', dateStr => {
        const dateFormat = 'ddd, DD MMM YYYY, HH:mm';
        return moment(dateStr).format(dateFormat);
    });

    eleventyConfig.addCollection('issuesByLabel', async collection => {
        const issues = await github.getFlattenedIssuesByLabel(owner, repo);

        return issues;
    });

    return {
        dir: {
            input: 'src',
            output: 'docs'
        },
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk'
    };
};
