const mysql = require('mysql');
const db= require('../config/database-config');

const connection2 = mysql.createConnection({
    host     : db.host,
    user     : db.username,
    password : db.password,
    database : db.database,
  });
  
  connection2.connect((err) => {
    if (!err) {
      console.log('Conexão Ok');
    } else {
      console.log('Falha pra conectar',err);
    }
  });
  module.exports = connection2;
  