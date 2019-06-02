module.exports = ({ APP_PORT }) => ({
  port: parseInt(APP_PORT, 10) || 8080
});