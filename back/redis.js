var redis = require('redis');
var host = process.env.RedisHost;
var port = process.env.RedisPort;
var password = process.env.RedisPassword;
var redisClient = redis.createClient(port,host);

redisClient.auth(password, function (err) {
    console.log('redis password : ', password);
    if (err) throw err;
});

redisClient.on('error', function(err) {
    console.log('Redis error: ' + err);
});

module.exports = redisClient;