/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumn('albums', {
    cover: {
      type: 'varchar(255)',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('albums', 'cover');
};
