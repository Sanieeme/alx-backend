import { expect } from 'chai';
import kue from 'kue';
import { createPushNotificationsJobs } from '../8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;

  before(() => {
    // Enter test mode
    kue.Job.queue = kue.createQueue();
    kue.Job.queue.testMode.enter();
    queue = kue.Job.queue;
  });

  afterEach(() => {
    // Clear the queue after each test
    queue.testMode.clear();
  });

  after(() => {
    // Exit test mode
    queue.testMode.exit();
  });

  it('should throw an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('not an array', queue)).to.throw(
      'Jobs is not an array'
    );
  });

  it('should create jobs in the queue when given an array of job objects', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account',
      },
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).to.equal(jobs.length);

    jobs.forEach((job, index) => {
      const queuedJob = queue.testMode.jobs[index];
      expect(queuedJob.type).to.equal('push_notification_code_3');
      expect(queuedJob.data).to.deep.equal(job);
    });
  });

  it('should log job creation, completion, and failure messages', () => {
    const jobs = [
      {
        phoneNumber: '4153518782',
        message: 'This is the code 4321 to verify your account',
      },
    ];

    createPushNotificationsJobs(jobs, queue);

    const job = queue.testMode.jobs[0];

    // Simulate completion
    job._events.complete[0]();
    expect(job._events.complete).to.exist;

    // Simulate failure
    job._events.failed[0]('Error message');
    expect(job._events.failed).to.exist;
  });
});
