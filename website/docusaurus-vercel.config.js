// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('./docusaurus.config');

async function createConfig() {
  /** @type {import("@docusaurus/types").Config} */
  const config = {
    ...(await baseConfig()),
    baseUrl: '/'
  };
  return config;
}
module.exports = createConfig;
