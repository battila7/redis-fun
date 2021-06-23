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
    await subscriber.subscribe('hello-channel')

    subscriber.on('message', (channel, message) => {
        console.log(`Received ${message} from ${channel}`);
    })

    setInterval(async () => {
        await publisher.publish('hello-channel', `Hello ${++messageCounter}`)
    }, 1000);
})()
