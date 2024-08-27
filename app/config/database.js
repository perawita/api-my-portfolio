const mysql = require('mysql');

class Connection {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }

    connect(callback) {
        this.connection.connect(callback);
    }

    query(sql, args, callback) {
        this.connection.query(sql, args, callback);
    }

    close(callback) {
        this.connection.end(callback);
    }
}

module.exports = new Connection();
