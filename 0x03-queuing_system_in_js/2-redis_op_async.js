import redis from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

// Handle connection errors
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

// Promisify the client.get method
const getAsync = promisify(client.get).bind(client);

// Function to set a new school in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print); // set the school name and value in Redis
}

// Function to display the value of a school from Redis using async/await
async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName); // Use the promisified version of client.get
    console.log(`${schoolName}: ${value}`);
  } catch (err) {
    console.log(`Error retrieving school: ${err}`);
  }
}

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
