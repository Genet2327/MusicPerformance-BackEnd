const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.event = require("./event.js")(sequelize, Sequelize);
db.eventSessions = require("./eventSessions.js")(sequelize, Sequelize);
db.instrument = require("./instrument.js")(sequelize, Sequelize);
db.composer = require("./composer.js")(sequelize, Sequelize);
db.song = require("./song.js")(sequelize, Sequelize);
db.critique = require("./critique.js")(sequelize, Sequelize);
db.repertoire = require("./repertoire.js")(sequelize, Sequelize);
db.student = require("./student.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);
db.userEvent = require("./userEvent")(sequelize, Sequelize);
db.avalability = require("./avalability")(sequelize, Sequelize);
db.signUp = require("./signUp.js")(sequelize, Sequelize);
db.songCritiques = require("./songCritiques.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});


// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.event.belongsToMany(db.user, {
  through: "avalability",
  as: "users",
  foreignKey: "eventId", onDelete: 'CASCADE' ,
  otherKey: "userId",
});
db.user.belongsToMany(db.event, {
  through: "avalability",
  as: "Events",
  foreignKey: "userId", onDelete: 'CASCADE' ,
  otherKey: "eventId",
});


db.user.hasMany(
  db.avalability,
  { as: "avalability" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.avalability.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.event.hasMany(
  db.avalability,
  { as: "avalability" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.avalability.belongsTo(
  db.event,
  { as: "event" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


// foreign key for eventSessions for event
db.eventSessions.hasMany(
  db.event,
  { as: "event" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.event.belongsTo(
  db.eventSessions,
  { as: "eventSessions" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
;
// foreign key for user  Critique
db.user.hasMany(
  db.critique,
  { as: "critique" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.critique.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
// foreign key for repertoire  Student
db.user.hasMany(
  db.repertoire,
  { as: "repertoire" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.repertoire.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
// foreign key for repertoire  song
db.song.hasMany(
  db.repertoire,
  { as: "repertoire" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.repertoire.belongsTo(
  db.song,
  { as: "song" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


// foreign key for repertoire critique
db.critique.hasMany(
  db.repertoire,
  { as: "repertoire" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.repertoire.belongsTo(
  db.critique,
  { as: "critique" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
// foreign key for instrument student
db.user.hasMany(
  db.instrument,
  { as: "instrument" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.instrument.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
// signup and  user
db.user.hasMany(
  db.signUp,
  { as: "signUp" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.signUp.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
//Signup and  event
db.event.belongsTo(
  db.signUp,
  { as: "signUp" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.signUp.hasMany(
  db.event,
  { as: "event" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
//foreign key for Instrument signup
db.instrument.hasMany(
  db.signUp,
  { as: "signUp" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.signUp.belongsTo(
  db.instrument,
  { as: "instrument" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
//foreign key for Song composer
db.song.belongsTo(
  db.signUp,
  { as: "signUp" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.signUp.hasMany(
  db.song,
  { as: "song" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


//foreign key for Song composer
db.composer.hasMany(
  db.song,
  { as: "song" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.song.belongsTo(
  db.composer,
  { as: "composer" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.song.hasMany(
  db.songCritiques,
  { as: "songCritiques" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.songCritiques.belongsTo(
  db.song,
  { as: "song" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.user.hasMany(
  db.songCritiques,
  { as: "songCritiques" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.songCritiques.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.critique.hasMany(
  db.songCritiques,
  { as: "songCritiques" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.songCritiques.belongsTo(
  db.critique,
  { as: "critique" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
module.exports = db;
