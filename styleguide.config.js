const fs = require("fs");
const path = require("path");
const rules = require("./styleguide.webpack.rules");

const DIRECTORY = path.join(__dirname, "www");

const helperFiles = fs
  .readdirSync(path.resolve(DIRECTORY, "helpers"))
  .filter(file => file.match(/^helper-/gi))
  .map(file => ({
    name: file,
    content: path.resolve(DIRECTORY, `helpers/${file}/README.md`)
  }));

module.exports = {
  title: "{{STYLEGUIDE_TITLE}}",
  webpackConfig: {
    module: {
      rules
    }
  },
  ignore: ["**/__tests__/**"],
  sections: [
    {
      name: "Components",
      components: path.join(DIRECTORY, "components/component-*/index.js")
    },
    {
      name: "Context",
      components: path.join(DIRECTORY, "contexts/context-*/index.js")
    },
    {
      name: "Helpers",
      sections: helperFiles
    }
  ]
};
