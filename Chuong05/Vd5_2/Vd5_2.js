var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Vd ve router express.js');
});

app.post('/', function (req, res) {
    res.send('got a post request');
});

app.put('/', function (req, res) {
    res.send('got a put request at ');
});

app.delete('/', function (req, res) {
    res.send('got a delete request at ');
});

var server = app.listen(8000, function () {
    console.log('Server is running at' + server.address().port);
});
