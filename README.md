# gatsby-source-contentful-locales
![Release](https://github.com/joseguerrerov/gatsby-source-contentful-locales/workflows/Release/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


Source plugin for pulling locales from contentful spaces.
It creates a list with all the locales available and exposes information like default locale and fallback locale.

### Install
```bash
# npm
npm install --save gatsby-source-contentful-locales
# yarn
yarn add gatsby-source-contentful-locales
```

### Usage

```js 
// In your gatsby-config.js
// Learn about environment variables on Gatsby: https://gatsby.dev/env-vars
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful-locales`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}
```

### Configuration options

**spaceId** [string][required]

Contentful spaceId

**accessToken** [string][required]

Contentful delivery api key

### How to query
```graphql
{
  allContentfulLocale {
    totalCount
      edges {
        node {
          id
          code
          name
          default
          fallbackCode
        }
      }
    }
  }
```
### Response Example
```json
{
  "data": {
    "allContentfulLocale": {
      "totalCount": 2,
      "edges": [
        {
          "node": {
            "id": "a649bd83-324f-55de-9a70-1d94d96880f3",
            "code": "en-US",
            "name": "English (United States)",
            "default": true,
            "fallbackCode": null
          }
        },
        {
          "node": {
            "id": "74a15964-622b-5992-af9b-fea2e2d8fd69",
            "code": "es",
            "name": "Spanish",
            "default": false,
            "fallbackCode": "en-US"
          }
        }
      ]
    }
  }
}
```
