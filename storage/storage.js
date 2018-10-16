/**
 * A simple storage utility to save the user config as json file
 * 
 */
const electron = require('electron');
const path = require('path');
const fs = require('fs');
 class Store {
  constructor(opts = {}) {
    let defaultConfig = {
      configName: opts.configName || 'user-preference',
      defaults: {}
    }
     opts.defaults = Object.assign(defaultConfig.defaults, opts.defaultConfig);
     const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    // Use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, opts.configName + '.json');
    
    this.data = parseDataFile(this.path, opts.defaults);
  }
  
  get(key) {
    return this.data[key];
  }
  
  set(key, val) {
    this.data[key] = val;
    try{
      fs.writeFileSync(this.path, JSON.stringify(this.data));
    }catch(err) {
      console.error('Failed to save user config');
    }
  }
}
 function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    return defaults;
  }
}
 module.exports = Store;