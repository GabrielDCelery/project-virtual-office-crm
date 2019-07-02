const { promisify } = require('util');
const redis = require('redis');
const { Container } = require('typedi');
const { ResultWrapper } = require('../helpers');
const { TYPEDI_NAMESPACE_REDIS } = globalRequire('constants');

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
      Container.set(`${TYPEDI_NAMESPACE_REDIS}.ResultWrapper`, new ResultWrapper(Container));
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

  async _getAsync(key) {
    const value = await this.client.getAsync(key);

    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  async _setAsync(key, value) {
    return this.client.setAsync(key, JSON.stringify(value));
  }

  _safeStringifyJSON(value) {
    if (typeof value === 'string') {
      return value;
    }

    return JSON.stringify(value);
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

  async executeRedisAction(key, methodName, value) {
    const resultWrapper = Container.get(`${TYPEDI_NAMESPACE_REDIS}.ResultWrapper`);
    try {
      return resultWrapper.return('success')(await this[`_${methodName}`](key, value));
    } catch (error) {
      return resultWrapper.return('fail')(error.message);
    }
  }
}

module.exports = new Redis();