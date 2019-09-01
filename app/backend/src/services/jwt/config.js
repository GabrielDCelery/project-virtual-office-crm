module.exports = ({ SERVICE_JWT_SECRET, SERVICE_JWT_EXPIRY }) => ({
  secret: SERVICE_JWT_SECRET || 'super_secret',
  expiry:
    parseInt(SERVICE_JWT_EXPIRY, 10) ||
    Math.floor(new Date() / 1000) + 60 * 60 * 24
});
