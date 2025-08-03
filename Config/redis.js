
 const redis=require('ioredis');
const redisClient = new redis({
    host: '127.0.0.1',
    port: 6379,
    // password: 'your_password_if_any',
  });
  module.exports = redisClient;