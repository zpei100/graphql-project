const db = require('./index.js');

var Schema = db.Schema;


var students = new Schema({
  id: Number,
  name: String,
  age: Number
});

var classes = new Schema({
  id: Number,
  name: String,
  roster: [Number]
})

const Students = db.model('students', students);
const Classes = db.model('classes', classes);

module.exports = {Students, Classes};
