import content from '@/services/ContentServices.js';

class ContentController {
    
    /**
     * Endpoint untuk meminta content services.
     * 
     * 
     * @param {Object} req - Request object dari Express.
     * @param {Object} res - Response object dari Express.
     */
    async get_services(req, res) {
        try {
            const response = await content.get_content_services();
            res.status(200).json({ response });
        } catch (error) {
            // Menangani kesalahan dan mengirimkan respons error
            res.status(500).json({ message: 'An error occurred: ' + error.message });
        }
    }
    
    /**
     * Endpoint untuk meminta content projects.
     * 
     * 
     * @param {Object} req - Request object dari Express.
     * @param {Object} res - Response object dari Express.
     */
    async get_projects(req, res) {
        try {
            const response = await content.get_content_projects();
            res.status(200).json({ response });
        } catch (error) {
            // Menangani kesalahan dan mengirimkan respons error
            res.status(500).json({ message: 'An error occurred: ' + error.message });
        }
    }   

    /**
     * Endpoint untuk meminta content projects yang dapat di jual.
     * 
     * 
     * @param {Object} req - Request object dari Express.
     * @param {Object} res - Response object dari Express.
     */
    async get_sell_projects(req, res) {
        try {
            const response = await content.get_sell_projects();
            res.status(200).json({ response });
        } catch (error) {
            // Menangani kesalahan dan mengirimkan respons error
            res.status(500).json({ message: 'An error occurred: ' + error.message });
        }
    }
}

module.exports = new ContentController();