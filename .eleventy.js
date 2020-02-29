

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");

    eleventyConfig.addShortcode("ghLabels", (labels) => {
        return labels.map(label => `<span style="background-color:#${label.color}" class="label">${label.name}</span>`);
    });

    return {
        dir: {
            input: 'src',
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    }
}