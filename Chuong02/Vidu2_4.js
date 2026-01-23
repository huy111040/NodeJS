var events = require('events');
var eventEmitter = new events.EventEmitter();

var listner1 = function listner1(){
    console.log('listener1 thuc thi');
}

var listner2 = function listner2(){
    console.log('listener2 thuc thi');
}

eventEmitter.addListener('connection', listner1);
eventEmitter.on('connection', listner2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners+ " event listner lang nghe su kien connection");

eventEmitter.emit('connection')

eventEmitter.removeListener('connection', listner1);
console.log(" now, listner1 ko nghe");

eventEmitter.emit('connection')

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners+ " event listner lang nghe su kien connection");

console.log("ketthuc ctrinh");