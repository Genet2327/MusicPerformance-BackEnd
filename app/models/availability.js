module.exports = (sequelize, Sequelize) => {
    const Availability = sequelize.define( "availability" , {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
    });
  
    return Availability;
  };