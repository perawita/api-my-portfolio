/**
 * file ini dibuat hanya sebagai pengganti fungsi alias 
 */

// Import controllers using alias
const productController = require('./controllers/ProductController.js');
const contactController = require('./controllers/ContactController.js');
const contentController = require('./controllers/ContentController.js');

// Import configurations and middlewares
const env = require('./config/env.js');
const originMiddleware = require('./middlewares/OriginMiddleware.js');

// Import routes
const routeApi = require('./routes/api.js');
const route = require('./routes/route.js');

// Export modules to be used elsewhere in the application
module.exports = {
    productController,
    contactController,
    contentController,
    env,
    originMiddleware,
    routeApi,
    route,
};