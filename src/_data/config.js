const fs = require('fs');
const path = require('path');

module.exports = () => {
    let configDefaults = {
        homepageTitle: 'GitHub to HTML',
        githubUser: 'lonnygomes',
        githubRepo: 'github-to-html',
        octokitOptions: {},
        pathPrefix: undefined
    };
    let config = configDefaults;

    try {
        const configPath = path.resolve(__dirname, '../../config.json');
        const configData = fs.readFileSync(configPath);
        config = Object.assign(configDefaults, JSON.parse(configData));
    } catch (error) {
        console.error('** config.json not found! Using Defaults!');
    }

    return config;
};
