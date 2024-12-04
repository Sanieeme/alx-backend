import kue from 'kue';

// Create the queue
const queue = kue.createQueue();

// Job data
const jobData = {
  phoneNumber: '+1234567890',
  message: 'Hello, this is a test notification'
};

// Create the job in the queue
const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (err) {
      console.log('Notification job failed');
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });

// When the job is completed
job.on('complete', () => {
  console.log('Notification job completed');
});

// When the job fails
job.on('failed', (err) => {
  console.log('Notification job failed');
});
