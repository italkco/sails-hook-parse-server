const express = require('express');

module.exports = (sails) => {
  return {
    configure: function () {

      if (!sails.config.parseServer) {
        const help = `
        {
          mountPath: '/parse',
          databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
          cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
          appId: 'myAppId',
          masterKey: 'myMasterKey', // Keep this key secret!
          fileKey: 'optionalFileKey',
          serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
        }
        `;

        sails.log.warn('sails-hook-parse-server configure is skipped because config \'sails.config.parseServer\' is missing!\n\nSample of \'sails.config.parseServer\' is:\n' + help + '\nSetup intructions are available here:\nhttps://github.com/parse-community/parse-server\n');

        return;
      }
    }
  }
}