const config = globalRequire('config');
const database = globalRequire('database');

module.exports = {
  start: async () => {
    await database.start({
      config: {
        connection: config.database.connection[config.nodeEnv]
      }
    });
  },
  stop: async () => {
    await database.stop();
  }
};