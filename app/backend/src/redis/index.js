const { promisify } = require('util');
const redis = require('redis');

class Redis {
  constructor() {
    this.client = null;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  getClient() {
    return this.client;
  }

  async _startRedisClient({ host, port }) {
    return new Promise((accept, reject) => {
      this.client = redis.createClient({ host, port: port });
      this.client.getAsync = promisify(this.client.get).bind(this.client);
      this.client.setAsync = promisify(this.client.set).bind(this.client);
      this.client.on('ready', accept);
    });
  }

  async _stopRedisClient() {
    return new Promise((accept, reject) => {
      this.client.on('end', accept);
      this.client.quit();
    });
  }

  async start({ host, port }) {
    if (this.initialized) {
      throw new Error('Tried to initialize the redis connection twice!');
    }

    await this._startRedisClient({ host, port });

    this.initialized = true;
  }

  async stop() {
    await this._stopRedisClient();
    this.initialized = false;
  }
  //TODO add ResultWrapper
  executeRedisAction(methodName) {
    return key => {
      return async value => {
        try {
          return {
            success: true,
            errors: [],
            payload: await this.client[`${methodName}Async`](...[value ? [key, value] : [key]])
          }
        } catch (error) {
          return {
            success: false,
            errors: [error.message],
            payload: null
          }
        }
      }
    }
  }
}

module.exports = new Redis();