const Redis = require("ioredis");
const redis = new Redis({
    host: "127.0.0.1",
    port: 6379
})

;(async function() {
    await redis.set('hello', 'world', 'EX', 1)

    console.log(await redis.get('hello'))

    console.log('Waiting a little bit...')

    setTimeout(async () => {
        console.log(await redis.get('hello'))

        await redis.disconnect()
    }, 2000)
})()
