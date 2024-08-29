const express = require('express');
const app = express();

/**
 * import file dari folder app
 */
const main = require('./app/main');
/**
 *  Middleware
 */
app.use(express.json());
app.use('/api', main.originMiddleware);


/**
 *  Routes
 */
app.use('/', main.route);
app.use('/api', main.routeApi);

app.listen(main.env.port, () => console.log
(`
    Server running on port ${main.env.port}
    - Server: http://localhost:${main.env.port}
`));

module.exports = app;