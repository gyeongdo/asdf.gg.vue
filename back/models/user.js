module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.STRING(20), // 40자 이내
      allowNull: false, // 필수
      unique: true, // 중복금지
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장돼요
  });

  User.associate = (db) => {
    db.User.hasMany(db.Post); // 양쪽에 다 써어야 함 유저에서는 1대다, 포스트에서는 
    db.User.hasMany(db.Board); // 양쪽에 다 써어야 함 유저에서는 1대다, Board 에서는 한 게시글을은 한 유저가 쓴거라서 belongs
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'followerId' });
  };

  return User;
};
