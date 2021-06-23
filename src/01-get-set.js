const Redis = require("ioredis");
const redis = new Redis({
    host: "127.0.0.1",
    port: 6379
})

;(async function() {
    await redis.set('hello', 'world')

    console.log(await redis.get('hello'))

    await redis.disconnect()
})()
