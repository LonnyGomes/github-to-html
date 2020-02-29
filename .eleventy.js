

module.exports = function (eleventyConfig) {
    eleventyConfig.addShortcode("ghLabels", (labels) => {
        return labels.map(label => `<span style="background-color:#${label.color}" class="label">${label.name}</span>`);
    });

    return {
        dir: {
            input: 'src'
        }
    }
}