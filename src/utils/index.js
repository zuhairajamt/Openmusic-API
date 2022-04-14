/* eslint-disable camelcase */
const mapDBToModel = ({
  id,
  name,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
  created_at,
  updated_at,
  song_id,
}) => ({
  id,
  name,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
  createdAt: created_at,
  updatedAt: updated_at,
  songId: song_id,
});

module.exports = { mapDBToModel };
