const services = {
  authentication: require('./authentication'),
  database: require('./database'),
  redis: require('./redis')
};

const get = name => {
  return services[name];
};

module.exports = {
  get
};
