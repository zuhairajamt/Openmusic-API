/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // memberikan constraint foreign key pada album_id terhadap kolom id dari tabel users
  pgm.addConstraint('songs', 'fk_songs.album_id_users.id', 'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // menghapus constraint fk_songs.album_id_users.id pada tabel songs
  pgm.dropConstraint('songs', 'fk_songs.album_id_users.id');
};
