const bcrypt = require('bcrypt');

var salt= bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync('B4c0/\/', salt);

var res = bcrypt.compareSync('B4c0/\/', hash);
console.log('equal');
console.log(res);

res = bcrypt.compareSync('not_bacon', hash);
console.log('not equal');
console.log(res);

var hash = bcrypt.hashSync('bacon', 8);
console.log('auto-gen:'+hash);
