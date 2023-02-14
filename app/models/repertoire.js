module.exports = (sequelize, Sequelize) => {
    const  Repertoire = sequelize.define( "repertoire" , {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
  
    return Repertoire;
  };