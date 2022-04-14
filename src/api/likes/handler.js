class LikesHandler {
  constructor(albumsService, likesService) {
    this._albumsService = albumsService;
    this._likesService = likesService;

    this.postLikeHandler = this.postLikeHandler.bind(this);
    this.getLikesHandler = this.getLikesHandler.bind(this);
  }

  async postLikeHandler(request, h) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;

    await this._albumsService.getAlbumById(albumId);
    const isExist = await this._likesService.verifyAlbumLike({ userId, albumId });
    if (!isExist) {
      await this._likesService.addLikeAlbum({ userId, albumId });
      const response = h.response({
        status: 'success',
        message: 'Berhasil menyukai album',
      });
      response.code(201);
      return response;
    }

    await this._likesService.deleteLikeAlbum({ userId, albumId });
    const response = h.response({
      status: 'success',
      message: 'Berhasil batal menyukai album',
    });
    response.code(201);
    return response;
  }

  async getLikesHandler(request, h) {
    const { id: albumId } = request.params;
    const { count, fromCache } = await this._likesService.getAlbumLikes(albumId);
    const response = h.response({
      status: 'success',
      data: {
        likes: parseInt(count, 10),
      },
    });
    if (fromCache === true) response.header('X-Data-Source', 'cache');
    response.code(200);
    return response;
  }
}

module.exports = LikesHandler;
