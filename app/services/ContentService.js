const fs = require('fs').promises;
const path = require('path');

/**
 * Kelas yang mewakili layanan konten untuk menangani data konten.
 */
class ContentService {
    /**
     * Mengambil data layanan konten dari file JSON.
     * 
     * Metode ini membaca file `services.json` dari direktori `data/json/Contents`,
     * memparsing isinya, dan mengembalikan objek JSON yang telah diparsing.
     * 
     * @returns {Promise<Object>} Sebuah promise yang menyelesaikan objek JSON dari file `services.json`.
     * 
     * @throws {Error} Melemparkan error jika terjadi kesalahan saat membaca atau memparsing file.
     */
    async get_content_services() {
        const get_services_data = path.join(process.cwd(), 'data/json/Contents/services.json');
        const get_services_information = await fs.readFile(get_services_data);
        return JSON.parse(get_services_information);
    }

    /**
     * Mengambil dan memfilter data proyek konten dari file JSON.
     * 
     * Metode ini membaca file `projects.json` dari direktori `data/json/Contents`,
     * memfilter proyek dengan status `'non_sell'`, dan mengembalikan objek dengan
     * daftar proyek yang telah difilter di bawah kunci `List_projects`.
     * 
     * @returns {Promise<Object>} Sebuah promise yang menyelesaikan objek berisi daftar proyek yang telah difilter.
     * 
     * @throws {Error} Melemparkan error jika terjadi kesalahan saat membaca atau memparsing file.
     */
    async get_content_projects() {
        const get_projects_data = path.join(process.cwd(), 'data/json/Contents/projects.json');
        const get_projects_information = await fs.readFile(get_projects_data);
        const get_data_array = JSON.parse(get_projects_information);

        const filtered_projects = get_data_array.List_projects.filter((project) => project.status === 'non_sell')
            .map((project) => ({
                title: project.title,
                link: project.link,
                thumbnail: project.thumbnail,
            }));

        return { 'List_projects': filtered_projects };
    }

    /**
     * Mengambil dan memfilter data proyek konten dari file JSON.
     * 
     * Metode ini membaca file `projects.json` dari direktori `data/json/Contents`,
     * memfilter proyek dengan status `'sell'`, dan mengembalikan objek dengan
     * daftar proyek yang telah difilter di bawah kunci `List_projects`.
     * 
     * @returns {Promise<Object>} Sebuah promise yang menyelesaikan objek berisi daftar proyek yang telah difilter.
     * 
     * @throws {Error} Melemparkan error jika terjadi kesalahan saat membaca atau memparsing file.
     */
    async get_sell_projects() {
        const get_projects_data = path.join(process.cwd(), 'data/json/Contents/projects.json');
        const get_projects_information = await fs.readFile(get_projects_data);
        const get_data_array = JSON.parse(get_projects_information);

        const filtered_projects = get_data_array.List_projects.filter((project) => project.status === 'sell')
            .map((project) => ({
                title: project.title,
                href: project.link,
                src: project.thumbnail,
                description: project.description
            }));

        return { 'List_projects': filtered_projects };
    }
}

module.exports = new ContentService();
