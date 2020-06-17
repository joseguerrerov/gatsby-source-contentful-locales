const { name } = require('./package.json');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, reporter }, options) => {
  if (!options.spaceId) return reporter.error(`🚨  ${name}:spaceId is a required option `);
  if (!options.accessToken) return reporter.error(`🚨  ${name}:accessToken is a required option `);

  const { createNode } = actions
  const { spaceId, accessToken } = options
  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/locales?access_token=${accessToken}`;
  try {
    // Download data from the Contentful Delivery API.
    const response = await fetch(url)
    // Get response data
    const data = await response.json();
    // Throw error for 404, spaceId not found
    if (response.status === 404) throw new Error(`${data.message} Check if the spaceId is correct.`);
    // Throw error for 401, invalid authentication
    if (response.status === 401) throw new Error(`${data.message} Check if the accessToken is correct.`);

    const {items} = data;
    // Create nodes
    items.map(item => {
      createNode({
        ...item,
        id: createNodeId(item.sys.id),
        parent: null,
        children: [],
        internal: {
          type: `ContentfulLocale`,
          mediaType: `text/html`,
          contentDigest: createContentDigest(item),
        }
      })
    })
  } catch (e) {
    reporter.error(`🚨  ${name}: ${e.message}`);
  }
}
