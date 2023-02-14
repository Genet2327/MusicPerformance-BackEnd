module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
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
  
    return Student;
  };
  