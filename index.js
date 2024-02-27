// server.js
const Hapi = require('@hapi/hapi');
const routes = require('./src/routes/RegisterAndLogin');
const test = require('./src/routes/UserRoute');
const job = require('./src/routes/jobRoute');
const { logReqResponseOnConsole } = require('./src/middlewares/logger');
const mongoose = require('mongoose');
require('dotenv').config();

//await server.register(require('@hapi/jwt'));
const init = async () => { 
    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost'
    });

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log('Connected to MongoDB');

    // Register routes

    server.route(routes);
    //server.route(routese);
    server.route(test);
    server.route(job);

    await server.ext('onRequest', logReqResponseOnConsole);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
});

init();

