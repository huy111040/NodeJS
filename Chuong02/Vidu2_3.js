const {readFileSync, writeFileSync}= require('fs');

const first = readFileSync('./content/file1.txt','utf-8');
console.log('Nd file1 :'+ first);
const second = readFileSync('./content/file2.txt','utf-8');
console.log('Nd file2 :'+ second);

writeFileSync('./content/write-file.txt','Nd ghi vao file: '+first+" "+second);
console.log('Nd file3: '+ readFileSync('./content/write-file.txt', 'utf-8'));