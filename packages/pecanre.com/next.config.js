const path = require('path');
const withCSS = require("@zeit/next-css");
const withPurgeCSS = require("next-purgecss");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

const config = {
  dev: process.env.NODE_ENV !== "production",
  purgeCss: {
    extractors: [
      {
        extractor: TailwindExtractor,
        extensions: ["html", "js", "css"]
      }
    ],
    whitelist: ["body", "html"]
  },
  target: "serverless",
  webpack(config, options) {
    config.resolve.alias["~"] = path.join(__dirname, "");
    return config;
  }
}

module.exports = 
  withCSS(process.env.NODE_ENV == "production" ? withPurgeCSS(config) : config);
