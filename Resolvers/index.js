const path = require("path");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const resolversArray = loadFilesSync(path.join(__dirname, "./"), {
  extensions: ["js"],
  ignoreIndex: true,
});

module.exports = mergeResolvers(resolversArray);
