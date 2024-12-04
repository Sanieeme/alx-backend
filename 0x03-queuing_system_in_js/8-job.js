import kue from 'kue';

/**
 * Function to create push notification jobs
 * @param {Array} jobs - List of jobs to be processed
 * @param {Object} queue - Kue queue instance
 */
export function createPushNotificationsJobs(jobs, queue) {
  // Check if jobs is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Loop through the jobs array and create jobs in the queue
  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData);

    // Log when the job is created
    job.on('enqueue', () => {
      console.log(`Notification job created: ${job.id}`);
    });

    // Log when the job is completed
    job.on('complete', () => {
      console.log(`Notification job ${job.id} completed`);
    });

    // Log when the job fails
    job.on('failed', (errorMessage) => {
      console.log(`Notification job ${job.id} failed: ${errorMessage}`);
    });

    // Log progress updates
    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });

    // Save the job to the queue
    job.save();
  });
}
