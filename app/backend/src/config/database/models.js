module.exports = ({ DB_USERS_HASH_ROUNDS }) => ({
  users: {
    hashRounds: parseInt(DB_USERS_HASH_ROUNDS, 10) || 12
  }
});