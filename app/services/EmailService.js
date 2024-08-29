const { google } = require('googleapis');
const env = require('../config/env.js');

/**
 * Kelas EmailService
 * 
 * Mengelola pengiriman email menggunakan Gmail API.
 * 
 * @example
 * const emailService = await email_send_services.send_email(auth, 'boos', 'sender@example.com', 'Subject', 'Message body');
 */
class EmailService {
  /**
   * Membuat pesan email dalam format base64 URL-safe.
   * 
   * @param {string} from Fullname email pengirim.
   * @param {string} from Alamat email pengirim.
   * @param {string} subject Subjek email.
   * @param {string} message Isi pesan email.
   * @returns {string} Pesan email yang telah dienkode dalam format base64.
   */
  create_email(fullname, from, subject, message) {
    const messages = `
    Nama: ${fullname}
    Email: ${from}
    Massage: \n ${message}
    `;
    
    const email_lines = [
      `To: ${env.app_email}`,
      `From: ${from}`,
      `Subject: ${subject}`,
      '',
      messages,
    ];

    const email_content = email_lines.join('\n');

    return Buffer.from(email_content)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  /**
   * Mengirim email menggunakan Gmail API.
   * 
   * @param {OAuth2Client} auth Klien autentikasi untuk Gmail API.
   * @param {string} from Fullname email pengirim.
   * @param {string} from Alamat email pengirim.
   * @param {string} subject Subjek email.
   * @param {string} message Isi pesan email.
   * @returns {Promise<{code: number, message: string}>} Objek yang berisi status pengiriman email dan ID email yang dikirim.
   */
  async send_email(auth, fullname, from, subject, message) {
    const gmail = google.gmail({ version: 'v1', auth });
    const raw = this.create_email(fullname, from, subject, message);

    try {
      const res = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: raw,
        },
      });

      return {
        code: 201,
        message: 'Success send email. email id: ' + res.data.id
      };
    } catch (error) {
      return {
        code: 500,
        message: 'An error occurred: ' + error.message
      };
    }
  }
}

module.exports = new EmailService();
