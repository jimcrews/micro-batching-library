import express, { Express, Request, Response } from 'express';
import { ConfigOptions } from './my-types';

const configOptions: ConfigOptions = require('./config');
const utils = require('./utils');
const constants = require('./constants')

// node configuration
const app: Express = express();
const port = 3000;
app.use(express.json())

// ROUTE: add new job to batch
app.put('/job', function (req: Request, res: Response) {
  try {
    const newJob = utils.addJob(req.body.name)
    res.status(200).send(newJob);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ROUTE: update config values
// starting and stopping batch process waits for batch check-in on frequency
app.put('/config', function (req: Request, res: Response) {
  try {
    utils.setConfig(req.body.size, req.body.frequencySeconds, req.body.running)
    // restart interval with new config values
    clearInterval(constants.intervalId);
    startInterval();
    res.status(200).send(configOptions);
  } catch (error) {
    res.status(500).send(error);
  }
});


//
// Run the 'checkJobs' function in frequency (convert to milliseconds)
//
const startInterval = () => {
  constants.intervalId = setInterval(utils.checkJobs, 1000 * configOptions.frequencySeconds);
}


// application entry point. Start interval.
app.listen(port, () => {
  console.log(`Batch Jobs app listening on port ${port}`)
  startInterval()
})