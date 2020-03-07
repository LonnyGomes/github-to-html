# github-to-html

[![Netlify Status](https://api.netlify.com/api/v1/badges/d37a9e54-24e9-48d8-89b8-792bca949db1/deploy-status)](https://app.netlify.com/sites/github-to-html/deploys)

An [eleventy-based](https://www.11ty.dev) template statically generates a website based on GitHub repository information.

## Why would I want to do this?

There are a few use cases where building a site from the content may make sense:

-   the need to provide a cleaner presentation for those who may find GitHub intimidating
-   build snapshot reports for sprints or releases
-   provide a centralized interface in the case of GitHub being used as a knowledge management platform

## Getting started

To get started, you must have [NodeJS](https://nodejs.com) installed. Next you can install the dependencies and launch a local version of the site with the following commands:

```bash
npm install
npm start
```

## Configuration

By default, the configuration points to this repository. You can change this by creating a `config.json` placed at the root of your repository with the following optional parameters:

| Parameter      | Description                                      | Default           |
| -------------- | ------------------------------------------------ | ----------------- |
| homepageTitle  | name of the site that will appear in the nav bar | GitHub Issues     |
| githubUser     | name of GitHub user or organization              | lonnygomes        |
| githubRepo     | name of repository                               | vjs-video         |
| pathPrefix     | base path where site should live                 | '/github-to-html' |
| octokitOptions | options to configure the @octokit/rest instance  | {}                |

### Sample config.json

```json
{
    "homepageTitle": "My Site",
    "githubUser": "myorg",
    "githubRepo": "myrepo",
    "pathPrefix": "/github-to-html",
    "octokitOptions": {
        "auth": "ABCTOKEN123"
    }
}
```

## Building the site

To build the site, used the npm dist script

```bash
npm run dist
```

This builds builds the site into the `docs` folder. You can change the output location by updating the `dir.output` parameter in the `.eleventy.js` configuration file.
