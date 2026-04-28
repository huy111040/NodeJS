var express = require('express');
var app = express();

var userRouter = require('./Controllers/Routers/userRouter');
userRouter(app);

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server is running at http://%s:%s', host, port);

});
