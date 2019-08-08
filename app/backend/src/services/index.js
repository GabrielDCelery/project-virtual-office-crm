const services = {
  database: require('./database'),
  redis: require('./redis'),
  jwt: require('./jwt')
};

const get = name => {
  return services[name];
};

module.exports = {
  get
};