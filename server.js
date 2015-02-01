'use strict';

var express = require('express'),
	app 	= express(),
	api 	= require('./api/routes'),
	port 	= 8000;

app.use(express.static(__dirname + '/public'));

app	.route('/users')
	.get('/', api.getUsers) // get user list 
		.post('/', api.createUser) // create a new user
	.get('/:user', api.getUser) // get a specific user by ID or 'me'
		.put('/:user', restrictedTo('owner'), api.editUser) // edit the user info (restricted to the owner)
		.delete('/:user', restrictedTo('owner'), api.deleteUser) // delete the user (restricted to the owner)
	.get('/:user/lists', api.getUserLists); // get the user's lists

app	.route('/lists')
	.get('/', api.getLists)
		.post('/', api.createList)
	.get('/:list', api.getList)
		.put('/:list', restrictedTo('owner'), api.editList)
		.delete('/:list', restrictedTo('owner'), api.deleteList)
	.get('/:list/links', api.getListLinks);

app	.route('/links')
	.get('/', api.getLinks)
		.post('/', restrictedTo('admin'), api.createLink)
	.get('/:link', api.getLink)
		.put('/:link', restrictedTo('admin'), api.editLink)
		.delete('/:link', restrictedTo('admin'), api.deleteLink);

app.listen(port, function(){
	console.log('Server listening on port ' + port);
});