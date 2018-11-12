const express = require('express');
var ParseServer = require('parse-server').ParseServer;

module.exports = (sails) => {
  return {
    configure: function () {

      if (!sails.config.parseServer) {
        const help = `
        {
          mountPath: '/parse',
          parseServerConfig: {
            databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
            cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
            appId: 'myAppId',
            masterKey: 'myMasterKey', // Keep this key secret!
            fileKey: 'optionalFileKey',
            serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
          }
        }
        `;

        sails.log.warn('sails-hook-parse-server configure is skipped because config \'sails.config.parseServer\' is missing!\n\nSample of \'sails.config.parseServer\' is:\n' + help + '\nSetup intructions for \'parseServerConfig\' are available here:\nhttps://github.com/parse-community/parse-server\n');

        return;
      }

      // Custom middleware should be added before `session` middleware to avoid error:
      // 'TypeError: req.session.touch is not a function'
      sails.config.http.middleware.order.unshift('parseServer');

      // Get parseServer instance (Express application)
      const parseServer = new ParseServer(sails.config.parseServer.parseServerConfig);

      // Wrap the Parse Server routes with prefix (Express application)
      const parseServerAppWrapper = express();
      parseServerAppWrapper.use(sails.config.parseServer.mountPath, parseServer);

      // Set the Parse Server wrapper (Express application) as global Sails.js middleware
      sails.config.http.middleware['parseServer'] = cparseServerAppWrapper;
    }
  }
}