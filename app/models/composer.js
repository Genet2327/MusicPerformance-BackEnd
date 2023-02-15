module.exports = (sequelize, Sequelize) => {
    const Composer = sequelize.define( "composer" , {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dateOfDeath: {
        type: Sequelize.DATE,
        allowNull: false
      },
      
    });
  
    return Composer;
  };
  