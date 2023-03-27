const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./users");
db.role = require("./role-model");

db.ROLES = ["student", "tutor", "admin"];

module.exports = db;