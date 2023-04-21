module.exports = (sequelize, Sequelize) => {
  const Critique = sequelize.define("critique", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stagedeportment: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    tone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    accuracy: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    technique: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    interpretation: {
      type: Sequelize.STRING,
      allowNull: true
    },
    balanceblend: {
      type: Sequelize.STRING,
      allowNull: true
    },
    diction: {
      type: Sequelize.STRING,
      allowNull: true
    },
    performance: {
      type: Sequelize.STRING,
      allowNull: true
    },
  });

  return Critique;
};