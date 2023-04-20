module.exports = (sequelize, Sequelize) => {
    const SongComposer = sequelize.define( "songComposer" , {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
    });  
    return SongComposer;
  };