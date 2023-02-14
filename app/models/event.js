module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      room: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      durationSession: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
    });
  
    return Event;
  };
  