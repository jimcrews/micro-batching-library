import { ConfigOptions } from './my-types';

let configOptions: ConfigOptions = {

    size: 2, // batch array will be ready when items >= 'size'
    frequencySeconds: 150, // seconds to check batch array 
    running: true

}
    
module.exports = configOptions