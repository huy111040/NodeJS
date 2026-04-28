var express = require('express');
var app= express();
var route = express.Router();

module.exports = function (app) {
    app.route('/users')
        .get(function (req,res) {
            res.send('vd tach routers ra file rieng');
        })
        .post(function (req,res) {
            res.send('vd post rq');
        })
        .put(function (req,res) {
            res.send('vd put rq');
        })
        .delete(function (req,res) {
            res.send('vd delete rq');
        });
}
