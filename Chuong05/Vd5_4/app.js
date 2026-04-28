const express = require('express');
const app = express();
const port = 8080;

app.set('views', './views');
app.set('view engine', 'pug');

var user = [
    {name: 'A', email: 'a@gmail.com'},
    {name: 'B', email: 'b@gmail.com'},
];

app.get('/', function (req, res) {
    res.send("<h2>vd ve query</h2>");
});

app.get('/users', function (req, res) {
    res.render('users/index', {users: user});
});

app.get('/users/search', function (req, res) {
    var name_search = req.query.name;

    var result = user.filter((u) => {
        return u.name.toLowerCase().indexOf(name_search.toLowerCase()) !== -1;
    })
    res.render('users/index', {users: result});
});

app.listen(port, function () {
    console.log('Server is running at http://localhost:' + port);
});

