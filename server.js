var express = require('express');
var sass = require('node-sass-middleware');
var path = require('path');
var app = express();

app.use(sass({
        src: __dirname + '/sass', 
        dest: __dirname + '/styles',
        debug: false,       
    })
 ); 

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, '')));

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});