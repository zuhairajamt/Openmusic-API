const ClientError = require('../../exceptions/ClientError');

class UploadsHandler {
  constructor(albumsService, storageService, validator) {
    this._albumsService = albumsService;
    this._storageService = storageService;
    this._validator = validator;

    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }

  async postUploadImageHandler(request, h) {
    try {
      const { id: albumId } = request.params;
      const { cover } = request.payload;
      console.log(albumId);
      this._validator.validateImageHeaders(cover.hapi.headers);

      const filename = await this._storageService.writeFile(cover, cover.hapi);
      const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/albums/${albumId}/covers/${filename}`;
      console.log(fileLocation); // UPDATE albums SET cover = 'http://localhost:5000/albums/album-c9i2bBpeMqQ0lUpb/covers/1650091738857678024.png' WHERE id = 'album-c9i2bBpeMqQ0lUpb'

      await this._albumsService.addAlbumCover({ id: albumId, cover: fileLocation });

      const response = h.response({
        status: 'success',
        message: 'Sampul berhasil diunggah',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = UploadsHandler;
