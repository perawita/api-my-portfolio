import email_send_services from '@/services/EmailService.js';
import email_send_config from '@/config/sendmail.js';

class ContactController {
    
    /**
     * Endpoint untuk mengirimkan email.
     * 
     * Mengautentikasi dengan Gmail API dan mengirimkan email menggunakan EmailService.
     * 
     * @param {Object} req - Request object dari Express.
     * @param {Object} res - Response object dari Express.
     */
    async send_massage_email(req, res) {
        const {fullname, from, subject, message} = req.body;
        try {
            // Mendapatkan kredensial autentikasi
            const auth = await email_send_config.authorize();
            
            // Mengirim email menggunakan EmailService
            const response = await email_send_services.send_email(
                auth, fullname, from, subject, message
            );

            // Mengirimkan respons ke klien
            res.status(response.code).json({ message: response.message });
        } catch (error) {
            // Menangani kesalahan dan mengirimkan respons error
            res.status(500).json({ message: 'An error occurred: ' + error.message });
        }
    }
}

module.exports = new ContactController();