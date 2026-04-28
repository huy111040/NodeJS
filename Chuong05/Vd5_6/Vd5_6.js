var express = require('express');
var app = express();
var userRoute = require('./routers/user.router');
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/', userRoute);
app.use('/users', userRoute);
app.set('/users/search', userRoute);

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
