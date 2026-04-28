var users = require('../models/user.model');

module.exports.index = function(req, res) {
    res.render('index', { // File views/index.pug -> Đúng
        name : 'vd mo hinh mvc'
    });
}

module.exports.user = function(req, res) {
    // Sửa từ './user' thành 'users/index_user'
    // Vì file nằm trong views/users/index_user.pug
    res.render('users/index_user', {
        users : users
    });
}

module.exports.search = function(req, res) {
    var q = req.query.q;
    var matchedUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    // Sửa từ './user/index_user' thành 'users/index_user' (thêm chữ s)
    res.render('users/index_user', {
        users : matchedUsers
    });
}
