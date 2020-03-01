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
