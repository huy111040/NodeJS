var path = require("path");

//duong dan tuyet doi
console.log('RESOLVE: '+ path.resolve('Vidu2_1.js'));
//lay thong tin cua duoi duong dan
console.log('EXTNAME: '+ path.extname('Vidu2_1.js'));
//lay ten file
console.log('Tra ve ten file: '+ path.basename(__filename));