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
    await publisher.config('SET', 'notify-keyspace-events', 'KEA')

    await subscriber.subscribe('__keyspace@0__:hello')

    subscriber.on('message', (channel, message) => {
        console.log(`Received ${message} from ${channel}`);
    })

    setInterval(async () => {
        await publisher.set('hello', `Hello ${++messageCounter}`, 'EX', 1)
    }, 1000);
})()
