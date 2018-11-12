# sails-hook-parse-server

Sails hook for integrating [Parse Server](https://github.com/parse-community/parse-server)

## Getting Started

Install it via npm:

```shell
npm install sails-hook-parse-server
```

Configure `config/parse-server.js` in your project:

```javascript
module.exports.parseServer = {

  mountPath: '/parse',

  parseServerConfig: {
    databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
    cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
    appId: 'myAppId',
    masterKey: 'myMasterKey', // Keep this key secret!
    fileKey: 'optionalFileKey',
    serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
  }
};
```

`mountPath` is routes prefix for Express middleware  
`parseDashboardServer` is configuration object for Parse Server  

Setup instructions for `parseServerConfig` are available here https://github.com/parse-community/parse-server

## License

[MIT](./LICENSE)