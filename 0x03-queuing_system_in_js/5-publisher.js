import redis from 'redis';

// Create the Redis client
const publisher = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

// Handle connection and errors
publisher.on('connect', () => {
  console.log('Redis client connected to the server');
});

publisher.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

// Function to publish a message with a delay
function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send: ${message}`);
    publisher.publish('holberton school channel', message);
  }, time);
}

// Call the function to send messages with delays
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
