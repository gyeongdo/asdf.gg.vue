module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', { // 테이블명 board
    name: {
      type: DataTypes.TEXT, 
      allowNull: false,
    }, // createdAt, updatedAt 자동생성 ..
    calories: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
    fat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    carbs: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    iron: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
  }, {
    charset: 'utf8mb4',
  });
  Board.associate = (db) => {
    db.Board.belongsTo(db.User); // UserId
    // db.Post.hasMany(db.Comment); // 
    db.Board.hasMany(db.Image);
    // db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    // db.Post.belongsTo(db.Post, { as: 'Retweet' }); // RetweetId
    // db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
  };
  return Board;
};
