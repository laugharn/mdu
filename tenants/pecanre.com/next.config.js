const path = require('path');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withPurgeCSS = require('next-purgecss');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

const config = {
  dev: process.env.NODE_ENV !== 'production',
  env: {
    BRANCH: process.env.NOW_GITHUB_COMMIT_REF,
    SITE_TITLE: 'Pecan Real Estate'
  },
  purgeCss: {
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: ['js', 'css']
      }
    ],
    whitelist: ['body', 'html']
  },
  target: 'serverless',
  webpack(config, options) {
    config.resolve.alias['~'] = path.join(__dirname, '');
    return config;
  }
};

module.exports = withFonts(withCSS(
  process.env.NODE_ENV == 'production' ? withPurgeCSS(config) : config
));
