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
db.availability = require("./availability.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["Student", "Admin", "Accompanist","juges","faculity"];
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


// foreign key for Availability Faculity id
db.user.hasMany(
  db.availability,
  { as: "availability" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.availability.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
// foreign key for Availability
db.event.hasMany(
  db.availability,
  { as: "availability" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.availability.belongsTo(
  db.event,
  { as: "event" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
// foreign key for eventSessions for event
db.event.hasMany(
  db.eventSessions,
  { as: "eventSessions" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.eventSessions.belongsTo(
  db.event,
  { as: "event" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
// foreign key for eventSessions  Student 
db.user.hasMany(
  db.eventSessions,
  { as: "eventSessions" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.eventSessions.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
// foreign key for eventSessions  Critique
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
// foreign key for repertoire  EventSession
db.eventSessions.hasMany(
  db.repertoire,
  { as: "repertoire" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.repertoire.belongsTo(
  db.eventSessions,
  { as: "eventSessions" },
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
// foreign key for Song composer 
// db.composer.hasMany(
//   db.song,
//   { as: "song" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );
// db.composer.belongsTo(
//   db.song,
//   { as: "song" },
//   { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
// );

module.exports = db;
