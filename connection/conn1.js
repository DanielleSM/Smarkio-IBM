const mysql = require('mysql');
const db= require('../config/database-config');

const connection1 = mysql.createConnection({
  host     : db.host,
  user     : db.username,
  password : db.password,
});

connection1.connect((err) => {
  if (!err) {
    console.log('Conexao Ok');
  } else {
    console.log('Falha pra conectar',err);
  }
});
module.exports = connection1;


