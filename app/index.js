// Register module-alias first
require('module-alias/register');

const express = require('express');
const fs = require('fs');  // Import fs module
const path = require('path');  // Import path module for resolving paths
const app = express();

/**
 * Function to check if a file exists
 */
function checkFileExists(filePath) {
    return fs.existsSync(filePath);
}

// Define paths for configuration files
const envFilePath = path.resolve('app/config/env.js');
const routeFilePath = path.resolve('app/routes/route.js');
const routeApiFilePath = path.resolve('app/routes/api.js');
const originMiddlewarePath = path.resolve('app/middlewares/OriginMiddleware.js');

// Check if files exist
if (!checkFileExists(envFilePath)) {
    console.error(`File not found: ${envFilePath}`);
    process.exit(1);  // Exit the application if the file doesn't exist
}

if (!checkFileExists(routeFilePath)) {
    console.error(`File not found: ${routeFilePath}`);
    process.exit(1);
}

if (!checkFileExists(routeApiFilePath)) {
    console.error(`File not found: ${routeApiFilePath}`);
    process.exit(1);
}

if (!checkFileExists(originMiddlewarePath)) {
    console.error(`File not found: ${originMiddlewarePath}`);
    process.exit(1);
}

/**
 * Import file dari folder app
 */
const env = require(envFilePath);
const route = require(routeFilePath);
const route_api = require(routeApiFilePath);
const origin_middleware = require(originMiddlewarePath);

/**
 * Middleware
 */
app.use(express.json());
app.use('/api', origin_middleware);

/**
 * Routes
 */
app.use('/', route);
app.use('/api', route_api);

/**
 * Start server
 */
app.listen(env.port, () => {
    console.log(`
    Server running on port ${env.port}
    - Server: http://localhost:${env.port}
  `);
});

module.exports = app;
