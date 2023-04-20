module.exports = (sequelize, Sequelize) => {
    const Song = sequelize.define("song", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
      translationSong: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lyrics: {
        type: Sequelize.STRING,
        allowNull: true,
      },
       
    });
  
    return Song;
  };
  