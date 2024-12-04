import kue from 'kue';

// Create the queue
const queue = kue.createQueue();

// Function to send notification
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Queue process that listens to the 'push_notification_code' queue
queue.process('push_notification_code', (job, done) => {
  // Extract job data
  const { phoneNumber, message } = job.data;

  // Call the sendNotification function with job data
  sendNotification(phoneNumber, message);

  // Mark the job as done
  done();
});

console.log('Job processor is ready to process jobs...');
