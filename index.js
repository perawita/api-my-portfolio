require('module-alias/register');   //medaftarkan module-alias


const express = require('express');
const app = express();

/**
 * import file dari folder app
 */
import env from '@/config/env.js';
import route from '@/routes/route.js';
import route_api from '@/routes/api.js';
import origin_middleware from '@/middlewares/OriginMiddleware.js';

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

app.listen(env.port, () => console.log
(`
    Server running on port ${env.port}
    - Server: http://localhost:${env.port}
`));