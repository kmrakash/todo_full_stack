"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

console.log("Config File-->", config);
console.log("ENV: -->", env);
console.log("USE ENV VARIABLE:-->", process.env[config.use_env_variable]);
console.log("DATABASE URL:-->", process.env.DATABASE_URL);
let sequelize;
if (config.use_env_variable) {
    console.log("PRODUCTION DATABASE -->")
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    console.log("DEVELOPMENT DATABASE -->")
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}
// To Test if a connection has been established
async function test() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test();


// read all file from current directory and add to model
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// Sync Table
async function main() {
    await sequelize.sync({forced : true})
}

// main()


module.exports = db;
