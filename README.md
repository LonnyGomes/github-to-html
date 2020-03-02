# github-to-html

[![Netlify Status](https://api.netlify.com/api/v1/badges/d37a9e54-24e9-48d8-89b8-792bca949db1/deploy-status)](https://app.netlify.com/sites/github-to-html/deploys)

A proof of concept that pulls GitHub repo info and generates a static site using eleventy

## Configuration

The core functionality of the site is managed by defining options in a `config.json` file placed at the root of your repository instance. You can define the following configuration parameters:

| Parameter      | Description                                      | Default       |
| -------------- | ------------------------------------------------ | ------------- |
| homepageTitle  | name of the site that will appear in the nav bar | GitHub Issues |
| githubUser     | name of GitHub user or organization              | lonnygomes    |
| githubRepo     | name of repository                               | vjs-video     |
| octokitOptions | options to configure the @octokit/rest instance  | {}            |

### Sample config.json

```json
{
    "homepageTitle": "My Site",
    "githubUser": "myorg",
    "githubRepo": "myrepo",
    "octokitOptions": {
        "auth": "ABCTOKEN123"
    }
}
```
