const moment = require('moment');

const processLabel = label =>
    `<span style="background-color:#${label.color}" class="label">${label.name}</span>`;

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/css');

    eleventyConfig.addShortcode('ghLabels', labels =>
        labels.map(processLabel).join('\n')
    );

    eleventyConfig.addShortcode('ghLabel', processLabel);

    eleventyConfig.addFilter('simpleDate', dateStr => {
        const dateFormat = 'DD MMM YYYY';
        return moment(dateStr).format(dateFormat);
    });

    eleventyConfig.addFilter('detailedDate', dateStr => {
        const dateFormat = 'ddd, DD MMM YYYY, HH:mm';
        return moment(dateStr).format(dateFormat);
    });

    eleventyConfig.addCollection('allMyContent', function(collection) {
        console.log(collection);
        return collection.getAll();
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
