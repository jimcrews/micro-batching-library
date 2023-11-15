const utils = require('./utils');

describe("Program Tests", () => {

    test("fifo size value jobs removed if queue is more or equal to size config setting", () => {
        //Arrange
        utils.addJob('first')
        utils.addJob('second')
        utils.addJob('third')
        utils.setConfig(size = 2, frequencySeconds = 1, running = true)

        //Act
        utils.checkJobs()

        // Assert
        expect(utils.jobsWaiting[0].name).toBe('third');
    });

    test("purge size value jobs when running is turned off", () => {
        //Arrange
        utils.addJob('first')
        utils.addJob('second')
        utils.addJob('third')
        utils.addJob('fourth')
        utils.addJob('fifth')
        utils.setConfig(size = 3, frequencySeconds = 1, running = false)

        //Act
        utils.checkJobs()

        // Assert
        expect(utils.jobsWaiting[0].name).toBe('third');
    });

    test("adding jobs with bad input should throw an Error", () => {
        expect(() => utils.addJob(null)).toThrowError();
        expect(() => utils.addJob('')).toThrowError();
    });

    test("adding config with bad input should throw an Error", () => {
        // bad size data
        expect(() => utils.setConfig(size = 'dsadsad', frequencySeconds = 1, running = true)).toThrowError();
        expect(() => utils.setConfig(frequencySeconds = 1, running = true)).toThrowError();
        expect(() => utils.setConfig(size = -2, frequencySeconds = 1, running = true)).toThrowError();

        // bad frequency data
        expect(() => utils.setConfig(size = 3, frequencySeconds = 'asdsadas', running = true)).toThrowError();
        expect(() => utils.setConfig(size = 3, running = true)).toThrowError();
        expect(() => utils.setConfig(size = 3, frequencySeconds = -1, running = true)).toThrowError();

        // bad running data
        expect(() => utils.setConfig(size = 3, frequencySeconds = 1, running = 'asdsad')).toThrowError();
        expect(() => utils.setConfig(size = 3, frequencySeconds = 1)).toThrowError();
        expect(() => utils.setConfig(size = 3, frequencySeconds = 1, running = 3)).toThrowError();
    });
})