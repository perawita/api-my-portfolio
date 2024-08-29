const connection = require('../config/database.js');

class ProductModel {
    // Mendapatkan semua proyek
    get_all_projects(callback) {
        const sql = 'SELECT * FROM products';
        connection.query(sql, [], callback);
    }

    // Mendapatkan proyek berdasarkan ID
    get_project_by_id(id, callback) {
        const sql = 'SELECT * FROM products WHERE id = ?';
        connection.query(sql, [id], callback);
    }

    // Menambahkan proyek baru
    add_project(title, link, thumbnail, callback) {
        const sql = 'INSERT INTO products (title, link, thumbnail) VALUES (?, ?, ?)';
        connection.query(sql, [title, link, thumbnail], callback);
    }

    // Memperbarui proyek berdasarkan ID
    update_project(id, title, link, thumbnail, callback) {
        const sql = 'UPDATE products SET title = ?, link = ?, thumbnail = ? WHERE id = ?';
        connection.query(sql, [title, link, thumbnail, id], callback);
    }

    // Menghapus proyek berdasarkan ID
    delete_project(id, callback) {
        const sql = 'DELETE FROM products WHERE id = ?';
        connection.query(sql, [id], callback);
    }
}

module.exports = new ProductModel();