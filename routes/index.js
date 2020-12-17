const express = require('express');
const router = express.Router();
const connection2 = require('../connection/conn2');
const cors = require("cors");
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const wav = require('wav');
const Speaker = require('speaker');
const fs = require('fs');
const config  = require('../config/api-config');


router.use(cors());

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey: config.apikey,
    }),
      url: config.ibmUrl,
  });
  
connection2.connect(function(err) {
       // if (err) throw err;
        let sql = "CREATE TABLE IF NOT EXISTS comentarios (id INT AUTO_INCREMENT PRIMARY KEY"+
        ", comentario VARCHAR(255))";//
        connection2.query(sql, function (err, result) {
          if (err) throw err;
        });
      }); 

      /* GET homepage */
router.get('/', function(req, res, next) {
    connection2.query('SELECT * from comentarios',  (error, rows, fields) => {
      if (!error) {
          res.render('index', {data: rows});
      } else {
        console.log('error:', error);
      }
    })
  });


  /* POST comments */
router.post('/save', (req, res) => {
    let data = {comentario: req.body.comentario};
    let sql = 'INSERT INTO comentarios SET ?';
    let query = connection2.query(sql, data, (error, response) =>{
      if (error) {
        console.log('error post: ', error);
        throw error;
      } else {
        res.redirect('/');
      }
    })
  })


  /*POST audio*/
router.post('/play',(req,res) =>{
    let reader = new wav.Reader();
    reader.on('format', function(format) {
      reader.pipe(new Speaker(format));
    });
    let synthesizeParams = {
      text: req.body.texto,
      accept: 'audio/wav',
      voice: config.voice,
    };
  
    textToSpeech.synthesize(synthesizeParams)
    .then(res => {
        res.result.pipe(reader);
      })
      .catch(err => {
        console.log(err);
      });
  
  })
  module.exports = router;