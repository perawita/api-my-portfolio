const asset_services = require('../services/AssetService');

class AssetController {

    /**
     * Endpoint untuk menampilkan gambar.
     * 
     * Mengautentikasi dengan Gmail API dan menampilkan gambar menggunakan EmailService.
     * 
     * @param {Object} req - Request object dari Express.
     * @param {Object} res - Response object dari Express.
     */
    async getImages(req, res) {
        const { thumbnailID } = req.params;
        try {
            const respons = await asset_services.getThumbnail(thumbnailID);
            res.status(200).sendFile(respons);
        } catch (error) {
            // Menangani kesalahan dan mengirimkan respons error
            res.status(500).json({ message: 'An error occurred: ' + error.message });
        }
    }
}

module.exports = new AssetController();