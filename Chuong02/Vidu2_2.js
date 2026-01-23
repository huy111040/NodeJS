const os = require('os');

// in thong tin kieu os
console.log('os type: '+os.type());
// os platform
console.log('os platform: '+os.platform());
// tong dung luong bo nho
console.log('bo nho: '+ os.totalmem()+' byte.');
// tong dung luong bo nho chua dung
console.log('bo nho trong: '+os.freemem()+' byte.');