/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// dummy content
var utils = require('./utils');


var objectId = 1;
var messages = [
  {
    text: 'Hello World',
    username: 'Marlon',
    objectId: objectId    
  }
];


var actions = {
  'GET': function(request, response) {
    utils.sendResponse(response, {results: messages});
  },
  'POST': function(request, response) {
    utils.collectData(request, function(message) {
      messages.push(message);
      message.objectId = ++objectId;
      utils.sendResponse(response, {objectId: 1});
    });
  },
  'OPTIONS': function(request, response) {
    utils.sendResponse(response, null);
  } 
};

module.exports = function(request, response) {
 
  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    utils.sendResponse(response, 'Not Found', 404);
  }
};


// const fs = require('fs');
// const url = require('url');


// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10 // Seconds.
// };

// var dataObj = {
//   results: [ {
//     createdAt: '2018-10-06T00:27:05.890Z',
//     objectId: 'GIbHOQmFKM',
//     roomname: 'Meetings',
//     text: 'Holaaa',
//     updatedAt: '2018-10-06T00:27:05.890Z',
//     username: 'hih%27' 
//   } ]
// };

// var requestHandler = function(request, response) {

//   console.log('Serving request type ' + request.method + ' for url ' + request.url);
//   var statusCode;
//   var headers = defaultCorsHeaders;
//   headers['Content-Type'] = 'text/plain';
 
//   if (request.method === 'GET' && request.url === '/classes/messages') {
//     headers['Content-Type'] = 'application/json';
//     statusCode = 200;
  
//   } else if (request.method === 'POST' && request.url === '/classes/messages') {
//     statusCode = 201;
//     let data;
//     headers['Content-Type'] = 'application/json';
//     request.on('data', (chunk) => {
//       data = Buffer(chunk).toString();
//       dataObj.results.push(JSON.parse(data));
//     });
//   } else {
//     statusCode = 404;
//   }
//   response.writeHead(statusCode, headers);

//   if (request.method === 'OPTIONS') {
//     statusCode = 200;
//     response.writeHead(statusCode, headers);
//     response.end();
//   } else {
//     response.end(JSON.stringify(dataObj)); 
//   }
// };

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


// module.exports = requestHandler; // pass requestHandler to module.exports