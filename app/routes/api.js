const express = require('express');
const api = express.Router();
const product_controller = require('../controllers/ProductController');
const contact_controller = require('../controllers/ContactController');
const content_controller = require('../controllers/ContentController');
const asset_controller = require('../controllers/AssetController');

/**
 * Rute api projects
 */
api.get('/projects', product_controller.get_all_projects.bind(product_controller));
api.get('/projects/:id', product_controller.get_project_by_id.bind(product_controller));
api.post('/projects', product_controller.add_project.bind(product_controller));
api.put('/projects/:id', product_controller.update_project.bind(product_controller));
api.delete('/projects/:id', product_controller.delete_project.bind(product_controller));


/**
 * Rute api contact
 */
api.post('/contact/users/email', contact_controller.send_massage_email.bind(contact_controller));


/**
 * Rute api get content
 */
api.get('/content/services', content_controller.get_services.bind(content_controller));
api.get('/content/projects', content_controller.get_projects.bind(content_controller));
api.get('/content/sell/projects', content_controller.get_sell_projects.bind(content_controller));


/**
 * Rute api get assets
 */
api.get('/asset/project/thumbnail/:thumbnailID', asset_controller.getImages.bind(asset_controller));

module.exports = api;