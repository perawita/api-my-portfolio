const fs = require('fs').promises;
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

/**
 * Kelas SendMail
 * 
 * Kelas ini mengelola autentikasi dan kredensial untuk menggunakan Gmail API.
 * Menggunakan OAuth 2.0 untuk autentikasi dan menyimpan kredensial di file.
 */
class SendMail {
  /**
   * Membuat instansi SendMail baru.
   * Inisialisasi jalur file untuk token dan kredensial.
   */
  constructor() {
    this.SCOPES = ['https://www.googleapis.com/auth/gmail.send']; // Scope untuk mengirim email
    this.TOKEN_PATH = path.join(process.cwd(), 'data/json/OAuth2.0/token.json'); // Jalur file untuk menyimpan token akses
    this.CREDENTIALS_PATH = path.join(process.cwd(), 'data/json/OAuth2.0/credentials.json'); // Jalur file untuk menyimpan kredensial klien
  }

  /**
   * Melakukan autentikasi dan mendapatkan klien yang telah diotorisasi.
   * 
   * Jika kredensial sudah ada dan valid, mengembalikan klien yang telah diotorisasi.
   * Jika tidak, meminta autentikasi baru dan menyimpan kredensial yang baru.
   * 
   * @returns {Promise<OAuth2Client>} Klien yang telah diotorisasi.
   */
  async authorize() {
    let client = await this.load_saved_credentials_if_exist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: this.SCOPES,
      keyfilePath: this.CREDENTIALS_PATH,
      port: 5000,
    });
    if (client.credentials) {
      await this.save_credentials(client);
    }
    return client;
  }

  /**
   * Menyimpan kredensial yang diotorisasi ke file token.
   * 
   * @param {OAuth2Client} client Klien yang telah diotorisasi yang kredensialnya akan disimpan.
   * @returns {Promise<void>}
   */
  async save_credentials(client) {
    const content = await fs.readFile(this.CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(this.TOKEN_PATH, payload);
  }

  /**
   * Memeriksa apakah ada kredensial yang tersimpan dan valid.
   * 
   * Jika ada, membaca dan mengembalikan kredensial.
   * Jika tidak ada atau kredensial tidak valid, mengembalikan null.
   * 
   * @returns {Promise<OAuth2Client | null>} Klien yang telah diotorisasi jika kredensial ada, atau null jika tidak ada kredensial yang valid.
   */
  async load_saved_credentials_if_exist() {
    try {
      const content = await fs.readFile(this.TOKEN_PATH);
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }
}

module.exports = new SendMail();