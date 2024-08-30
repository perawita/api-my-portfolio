const path = require('path');

class AssetService {
    constructor() {
        // Menentukan path relatif dari direktori aplikasi
        this.rootPath = path.join(__dirname, '../../');
        this.thumbnailPath = path.join(this.rootPath, 'public/assets/images/projects/thumbnails/');
    }

    getThumbnail(nameThumbnail) {
        // Menggabungkan path direktori thumbnail dengan nama file
        const photoPath = path.join(this.thumbnailPath, nameThumbnail);
        return photoPath;
    }
}

module.exports = new AssetService();
