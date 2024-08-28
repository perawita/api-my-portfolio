require('module-alias/register');   //medaftarkan module-alias
require('dotenv').config();

const express = require('express');
const app = express();

/**
 * import file dari folder app
 */
// const env = require('@/config/env.js');

const route = require('@/routes/route.js');
const route_api = require('@/routes/api.js');

const origin_middleware = require('@/middlewares/OriginMiddleware.js');

/**
 *  Middleware
 */
app.use(express.json());
app.use('/api', origin_middleware);


/**
 *  Routes
 */
app.use('/', route);
app.use('/api', route_api);

app.listen(process.env.port, () => console.log
(`
    Server running on port ${process.env.port}
    - Server: http://localhost:${process.env.port}
`));