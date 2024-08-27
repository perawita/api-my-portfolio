require('dotenv').config();

const port = process.env.PORT;
const frontend_api = process.env.FRONTEND_API;
const app_email = process.env.EMAIL_APP;

const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

// Google API configuration
const google_email_api = process.env.GOOGLE_EMAIL_API;

module.exports = {
    port,
    frontend_api,
    app_email,
    db_host,
    db_port,
    db_user,
    db_password,
    db_name,
    google_email_api,
};
