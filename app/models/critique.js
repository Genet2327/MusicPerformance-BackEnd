module.exports = (sequelize, Sequelize) => {
    const Critique = sequelize.define("critique", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accuracy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      technique: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      interpretation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      balanceblend: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
    });
  
    return Critique;
  };
  