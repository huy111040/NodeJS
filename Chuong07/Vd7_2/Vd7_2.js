var md5 = require('md5');
var fs = require('fs');

console.log('gia tri ma hoa md5: chuoi 123456');
console.log(md5('vd ma hoa md5'));

console.log('gia tri ma hoa md5: tap tin');
fs.readFile('example.txt', function(err, data) {
    console.log(md5(data));
});
