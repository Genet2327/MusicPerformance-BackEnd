module.exports = (sequelize, Sequelize) => {
    const Song = sequelize.define("song", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      language: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      
      translation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
       
    });
  
    return Song;
  };
  