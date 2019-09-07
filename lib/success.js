const postUpdate = require("./postUpdate");

module.exports = async (pluginConfig, context) => {
  const { logger, nextRelease } = context;
  const { version } = nextRelease;

  let package_name = context.env.SEMANTIC_RELEASE_PACKAGE;
  if (!package_name) package_name = context.env.npm_package_name;

  logger.log(`Sending update for version ${version} of ${package_name}`);

  let updateMessage = {
    name: package_name,
    version,
    "package-manager": "javascript"
  };

  logger.log(updateMessage);

  await postUpdate(updateMessage, logger);
};
