import { Job, ConfigOptions, JobRequest } from './my-types';
const configOptions: ConfigOptions = require('./config');

const constants = require('./constants')
const jobsWaiting: Array<Job> = []; // jobs waiting database

// PRIVATE function to help determine numbers
const isNumber = (n: any) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// simulate fifo queue. always successfully sends
// removes 'size' count in fifo manner
const processBatch = () => {
    console.log('sending batch for processing');
    console.log(jobsWaiting);

    // remove first n elements from array to simulate processing
    jobsWaiting.splice(0, configOptions.size);
}

//
// function called to set the config
//
const setConfig = (size: string, frequencySeconds: string, running: string) => {

    // set size and frequency
    const parseSize = parseInt(size)
    if (isNumber(parseSize) && parseSize > 0) {
        configOptions.size = parseSize
    } else {
        throw new Error("invalid request");
    }

    const parseFrequencySeconds = parseInt(frequencySeconds)
    if (isNumber(parseFrequencySeconds) && parseFrequencySeconds > 0) {
        configOptions.frequencySeconds = parseFrequencySeconds
    } else {
        throw new Error("invalid request");
    }

    // set 'running' boolean
    const parsedRunning = (running).toString().trim().toLowerCase();
    if (parsedRunning === 'false') {
        configOptions.running = false
    } else if (parsedRunning == 'true') {
        configOptions.running = true
    } else {
        throw new Error("invalid request");
    }
};

//
// function called to add new job to database
//
const addJob = (jobName: string): Job => {
    if (jobName) {
        const newJob: Job = { name: jobName }
        jobsWaiting.push(newJob)
        return newJob;
    } else {
        throw new Error("invalid request");
    }
}

//
// main function called on interval
// if batch size limit has been reached, send the batch for processing, and clear waiting jobs
//
const checkJobs = () => {
    // logging
    console.log('checking jobs..')
  
    if (!configOptions.running && jobsWaiting.length > 0) {
      console.log('shutting down. purging queue');
      processBatch();
    } else if (!configOptions.running && jobsWaiting.length === 0) {
      clearInterval(constants.intervalId);
      console.log('shutdown complete.')
    } else if (jobsWaiting.length >= configOptions.size) {
      processBatch();
    }
  }

module.exports = { setConfig, addJob, processBatch, checkJobs, jobsWaiting }