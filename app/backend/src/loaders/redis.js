const config = globalRequire('config');
const redis = globalRequire('redis');

module.exports = {
  start: async () => {
    await redis.start(config.redis);
  },
  stop: async () => {
    await redis.stop();
  }
};