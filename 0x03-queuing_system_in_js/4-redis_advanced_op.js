import redis from 'redis';

// Create a Redis client
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

// Handle connection errors
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

// Create a hash and store key-value pairs
function createHash() {
  client.hset('HolbertonSchools', 'Portland', 50, redis.print);
  client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
  client.hset('HolbertonSchools', 'New York', 20, redis.print);
  client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
  client.hset('HolbertonSchools', 'Cali', 40, redis.print);
  client.hset('HolbertonSchools', 'Paris', 2, redis.print);
}

// Display the hash stored in Redis
function displayHash() {
  client.hgetall('HolbertonSchools', (err, object) => {
    if (err) {
      console.log(`Error retrieving hash: ${err}`);
    } else {
      console.log(object); // Log the object
    }
  });
}

// Call the functions to create and display the hash
createHash();
displayHash();
