module.exports = (sequelize, Sequelize) => {
    const Critique = sequelize.define("critique", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stagedeportment: {
        type: Sequelize.STRING,
        allowNull: false,
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
      diction: {
        type: Sequelize.STRING,
        allowNull: false
      },
      performance: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  
    return Critique;
  };
  