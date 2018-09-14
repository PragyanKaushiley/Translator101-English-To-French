const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var languageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');

var languageTranslator = new languageTranslatorV2({
  //Your API Username and Password comes here
});

//
router.get('/', (req,res) => {
  res.render('index/welcome');
});

router.post('/',(req,res) => {
  console.log(req.body.body);
  var parameters ={
    text: req.body.body,
    model_id: 'en-fr'
  }
  languageTranslator.translate(
    parameters,
    function(err,response){
      if (err) {
        console.log(err);
      }else{
        var re = JSON.stringify(response, null, 2);
        var jsonParsed = JSON.parse(re);
        console.log(jsonParsed.translations[0].translation);
        var tran = {
        text: jsonParsed.translations[0].translation
        }
        console.log(tran);
        if (tran) {
          res.render('index/welcome', {tran: tran})
        }
      }
    }
  );
});

module.exports = router;
