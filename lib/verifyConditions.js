const SemanticReleaseError = require("@semantic-release/error");

module.exports = (pluginConfig, context) => {
  const { logger } = context;

  const accessToken = process.env.GH_TOKEN;

  if (!accessToken) {
    logger.log("GH_TOKEN has not been defined.");
    throw new SemanticReleaseError(
      "No Github token defined.",
      "ENOGHTOKEN",
      `A Github token must be created and set in the \`GH_TOKEN\` environment variable on your CI environment.`
    );
  }

  if (!context.env.npm_package_name && !context.env.SEMANTIC_RELEASE_PACKAGE) {
    logger.log(
      "npm package name and SEMANTIC_RELEASE_PACKAGE name are undefined"
    );
    throw new SemanticReleaseError(
      "No name for the package defined.",
      "ENOPACKAGENAME",
      `A name for the package must be created. Run through npm (npm run <semantic-release-script> to use npm package name or define \`SEMANTIC_RELEASE_PACKAGE\` in the environment`
    );
  }
};
