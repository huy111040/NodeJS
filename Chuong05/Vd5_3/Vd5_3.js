var express = require('express');
var app = express();

app.get('/test', function (req, res) {
    res.send('Vd ve ejs');
});

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/index', function (req, res) {
    res.render('index');
});

app.get('/about', function (req, res) {
    res.render('about');
});

var server = app.listen(8000, function () {
    console.log('Server is running at' + server.address().port);
});
