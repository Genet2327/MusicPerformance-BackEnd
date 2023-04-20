module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    level: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    major: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    semesters: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    classification: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  return User;
};
