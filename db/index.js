const db = require('mongoose');

db.connect('mongodb://zpei100:Gmlegend2@ds131973.mlab.com:31973/graphql-db');

module.exports = db;
