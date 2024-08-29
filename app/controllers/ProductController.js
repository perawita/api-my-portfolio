const project_model = require('../models/ProductModel');

class ProductController {
    // Mendapatkan semua proyek
    get_all_projects(req, res) {
        project_model.get_all_projects((err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching projects', error: err.message });
            }
            res.status(200).json({ data: results });
        });
    }

    // Mendapatkan proyek berdasarkan ID
    get_project_by_id(req, res) {
        const { id } = req.params;
        project_model.get_project_by_id(id, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching project', error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.status(200).json({ data: results[0] });
        });
    }

    // Menambahkan proyek baru
    add_project(req, res) {
        const { title, link, thumbnail } = req.body;
        project_model.add_project(title, link, thumbnail, (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error adding project', error: err.message });
            }
            res.status(201).json({ message: 'Project added successfully', data: { id: results.insertId, title, link, thumbnail } });
        });
    }

    // Memperbarui proyek berdasarkan ID
    update_project(req, res) {
        const { id } = req.params;
        const { title, link, thumbnail } = req.body;
        project_model.update_project(id, title, link, thumbnail, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating project', error: err.message });
            }
            res.status(200).json({ message: 'Project updated successfully' });
        });
    }

    // Menghapus proyek berdasarkan ID
    delete_project(req, res) {
        const { id } = req.params;
        project_model.delete_project(id, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting project', error: err.message });
            }
            res.status(200).json({ message: 'Project deleted successfully' });
        });
    }
}

module.exports = new ProductController();