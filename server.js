const restify = require('restify');
const CONFIG = require("./config");

// Server initialisation
const server = restify.createServer(CONFIG.SERVER_OPTIONS);

server.listen(CONFIG.SERVER_PORT, function() {
  console.log('%s listening at %s', server.name, server.url);
});