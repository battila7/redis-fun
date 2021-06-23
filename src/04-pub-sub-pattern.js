const Redis = require("ioredis");
const publisher = new Redis({
    host: "127.0.0.1",
    port: 6379
})

const subscriber = new Redis({
    host: "127.0.0.1",
    port: 6379
})

let messageCounter = 0

;(async function() {
    await subscriber.psubscribe('hello-*')

    subscriber.on('pmessage', (pattern, channel, message) => {
        console.log(`Received ${message} from ${channel} because of pattern ${pattern}`);
    })

    setInterval(async () => {
        await publisher.publish('hello-world', `Hello ${++messageCounter}`)
        await publisher.publish('hello-mundo', `Hello ${++messageCounter}`)
    }, 1000);
})()
