const { promisify } = require('util');
const redis = require('redis');

class Redis {
  constructor() {
    this.client = null;
    this.flushRedis = this.flushRedis.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.executeRedisAction = this.executeRedisAction.bind(this);
  }

  async _startRedisClient({ host, port }) {
    try {
      this.client = redis.createClient({ host, port });
      this.client.getAsync = promisify(this.client.get).bind(this.client);
      this.client.setAsync = promisify(this.client.set).bind(this.client);
      await this.client.setAsync('health', 'OK');
      const result = await this.client.getAsync('health');

      if (result !== 'OK') {
        throw new Error('Could not initialize redis!');
      }
    } catch (error) {
      throw error;
    }
  }

  async _stopRedisClient() {
    return new Promise((accept, reject) => {
      this.client.quit((error, success) => {
        if (error) {
          return reject(error.message)
        };

        return accept(success);
      });
    });
  }

  async flushRedis() {
    return new Promise((accept, reject) => {
      this.client.flushdb((error, succeeded) => {
        if (error) {
          return reject(error.message);
        }

        return accept(succeeded);
      });
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
  async executeRedisAction(key, methodName, value) {
    try {
      return {
        success: true,
        errors: [],
        payload: await this.client[methodName](...[value ? [key, value] : [key]])
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

module.exports = new Redis();