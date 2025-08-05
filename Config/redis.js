
 const redis=require('ioredis');
const redisClient = new redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port:  process.env.REDIS_PORT || 6379,
    // password: 'your_password_if_any',
  });
  module.exports = redisClient;