module.exports = (sequelize, Sequelize) => {
    const EventSessions = sequelize.define("eventSessions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
     
    });
  
    return EventSessions;
  };
  