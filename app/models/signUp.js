module.exports = (sequelize, Sequelize) => {
    const SignUp = sequelize.define( "signUp" , {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      accompanistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      durationSession: {
        type: Sequelize.INTEGER,
        allowNull: false,
      } 
    });  
    return SignUp;
  };