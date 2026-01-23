const {error}= require("console");

var log = {
    info: function(info){
        console.log('in4: '+ info);
    },
    warninig: function(warninig){
        console.log('warming: '+warninig);
    },
    error: function(error){
        console.log('error: '+ error);
    }
}
module.exports =log;