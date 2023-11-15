# Micro-batching library

Submit jobs to be processed on interval timer (which can be updated at runtime). Set the size of items to be processed which can also be updated during application runtime. Stopping and Starting the batch process interval will cause a purge of jobs from the queue while obeying the size and interval limits, until empty.

---

## Requirements

Node and NPM

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).


## Install

    $ git clone
    $ cd micro-batching-library
    $ npm install

## Running the project

    $ npm run dev

## Testing

    $ npm run test


## User Guide

Use Postman or another client in order to interact with the running API.

First, set desired config in order to change values during runtime, and start / stop the batch job Interval:

endpoint = http://localhost:3000/config \
body (raw json) = 
```
{
    "size": 1,
    "frequencySeconds": 2,
    "running": true
}
```


Second, add jobs to be processed

endpoint = http://localhost:3000/job \
body (raw json) = 
```
{
    "name": "first job entry"
}
```
