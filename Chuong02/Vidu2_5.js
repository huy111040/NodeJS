const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type','text/plain');
    res.write('Tim hieu hhtp module');
    res.end();
});

server.listen(port,hostname, ()=>{
    console.log('Sv running at hostname: '+ hostname+' ,port: '+port)
});