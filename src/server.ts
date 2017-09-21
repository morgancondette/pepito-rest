import * as restify from "restify";
import * as mongoose from "mongoose";
import * as restifyPlugins from "restify-plugins";

import { CONFIG } from "./config";

// Server initialisation
const server = restify.createServer(CONFIG.SERVER_OPTIONS);

// Middleware
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

// Server startup
server.listen(CONFIG.SERVER_PORT, () => {
  // establish connection to mongodb
  (<any>mongoose).Promise = global.Promise;
  mongoose.connect(CONFIG.MONGODB_URI, CONFIG.MONGODB_OPTIONS);

  const database = mongoose.connection;

  database.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  database.once('open', () => {
    console.log("Database connection successful on %s", CONFIG.MONGODB_URI)
    //require('./routes')(server);
    console.log(`Server is listening on port %s`, CONFIG.SERVER_PORT);
  });
});
