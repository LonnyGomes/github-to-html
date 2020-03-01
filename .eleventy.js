const moment = require('moment');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/css');

    eleventyConfig.addShortcode('ghLabels', labels =>
        labels
            .map(
                label =>
                    `<span style="background-color:#${label.color}" class="label">${label.name}</span>`
            )
            .join('\n')
    );

    eleventyConfig.addFilter('simpleDate', dateStr => {
        const dateFormat = 'DD MMM YYYY';
        return moment(dateStr).format(dateFormat);
    });

    eleventyConfig.addFilter('detailedDate', dateStr => {
        const dateFormat = 'ddd, DD MMM YYYY, HH:mm';
        return moment(dateStr).format(dateFormat);
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
