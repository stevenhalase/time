'use strict'
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const port = process.env.PORT || 3000;
const fs = require('fs');
const open = require('open');
const textract = require('textract');

const startScreener = require('./screen.js');

const todaysDate = new Date();
const ssDir = `./www/screenshots-${todaysDate.getMonth()}-${todaysDate.getDay()}-${todaysDate.getFullYear()}/`;

///// Parsing json
app.use(bodyParser.json());
///// Parsing urlencoded
app.use(bodyParser.urlencoded({extended: true}));
///// Serving static files from ./www
app.use(express.static(path.join(__dirname, './www')))

startScreener()

app.get('/refresh', function(req, res) {
  console.log('in here')

  let itemsHolder = [];
  fs.readdir(ssDir, function(err, items) {
    // console.log('more', items)


    for (let i = 0; i < items.length; i++) {
      // console.log(items[i]);
      textract.fromFileWithPath(ssDir + items[i], function( error, text ) {
        if(err) return console.error(err)
        // console.log(text);
        itemsHolder.push({item: items[i], text: text})
        console.log(i, items.length - 1)
        if (i == items.length - 1) {
          sendResults();
        }
      })
    }

    function sendResults() {
      console.log({ path: ssDir, items: itemsHolder })
      res.send({ path: ssDir, items: itemsHolder });
    }


    // setTimeout(function() {
    //
    // },6000)

  });
})



///// Route handler for homepage
app.get('/', function (req, res) {
  ///// Send homepage
  res.sendFile('index.html', {root : './www'})
});
///// Set up server listening port
app.listen(port, function () {
  open('http://localhost:' + port);
  console.log('Server started at http://localhost:' + port)
})
