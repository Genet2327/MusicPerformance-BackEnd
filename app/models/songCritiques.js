module.exports = (sequelize, Sequelize) => {
  const SongCritiques = sequelize.define("songCritiques", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
   
  });

  return SongCritiques;
};
