module.exports = (sequelize, Sequelize) => {
    const studentSignup = sequelize.define("studentSignup", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      major: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      
       
    });
  
    return studentSignup;
  };
  