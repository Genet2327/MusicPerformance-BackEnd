module.exports = (sequelize, Sequelize) => {
    const SignUp = sequelize.define( "signUp" , {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
    });  
    return SignUp;
  };