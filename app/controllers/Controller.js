import email_send_services from '@/services/EmailService.js';
import email_send_config from '@/config/sendmail.js';

class Controller {
    /**
     * Endpoint untuk mengembalikan pesan 'Hello world'.
     * 
     * @param {Object} req - Request object dari Express.
     * @param {Object} res - Response object dari Express.
     */
    index(req, res) {
        console.log('Hello world');
        res.status(200).json({ message: 'Hello world' });
    }

    /**
     * Endpoint untuk mengirimkan email.
     * 
     * Mengautentikasi dengan Gmail API dan mengirimkan email menggunakan EmailService.
     * 
     * @param {Object} req - Request object dari Express.
     * @param {Object} res - Response object dari Express.
     */
    async send_massage(req, res) {
        try {
            // Mendapatkan kredensial autentikasi
            const auth = await email_send_config.authorize();
            
            // Mengirim email menggunakan EmailService
            const response = await email_send_services.send_email(
                auth,
                'perawitayasa@gmail.com',
                'prawitayasa@gmail.com',
                'Automated draft',
                'This is automated draft mail'
            );

            // Mengirimkan respons ke klien
            res.status(response.code).json({ message: response.message });
        } catch (error) {
            // Menangani kesalahan dan mengirimkan respons error
            res.status(500).json({ message: 'An error occurred: ' + error.message });
        }
    }

    /**
     * Endpoint callback untuk konfirmasi pengiriman pesan.
     * 
     * @param {Object} req - Request object dari Express.
     * @param {Object} res - Response object dari Express.
     */
    callback(req, res) {
        res.status(200).json({ message: 'Pesan anda berhasil dikirim' });
    }
}

module.exports = new Controller();
