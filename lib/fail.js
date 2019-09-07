module.exports = async (pluginConfig, context) => {
  const { logger } = context;

  logger.log("Ignoring failed release.");
};
