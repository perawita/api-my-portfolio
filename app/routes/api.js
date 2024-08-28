const express = require('express');
const api = express.Router();
import product_controller from '@/controllers/ProductController';
import contact_controller from '@/controllers/ContactController';
import content_controller from '@/controllers/ContentController';

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

module.exports = api;