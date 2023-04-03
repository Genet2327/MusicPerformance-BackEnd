module.exports = (sequelize, Sequelize) => {
  const Avalability = sequelize.define( "avalability" , {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isSelected: {
      type: Sequelize.BOOLEAN 
    }       
  });

  return Avalability;
};