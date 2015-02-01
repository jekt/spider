'use strict';

var app = require('express')();

exports.noRoute = function(req, res){
	res.status(404).json({ error: 404,  message: 'Nothing here'})
};