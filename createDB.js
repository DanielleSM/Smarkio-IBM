const connection1 = require('./connection/conn1');

connection1.connect((err) => {
    // if (err) throw err;
     connection1.query("CREATE DATABASE IF NOT EXISTS smarkio", (err, result) => {
       if (err) throw err;
    });
}); 