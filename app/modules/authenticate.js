// Authentication Module
//
// Default Modules
var express = require('express');
var Promise = require('bluebird');
var request = require("request");

// Application Settings
var config = require('../settings');
var displayName = require('./name');
var rooms = require('./room');

// Authenticate Guest User
exports.guest = function(){
  return new Promise(function(resolve, reject) {
    var user = {};
    // Get Guest Access Token
    exports.getGuestToken()
    // Rename Guest
    .then(function(result){
      // Add Response to User Object
      user.token = result.access_token;
      user.home_server = result.home_server;
      user.userID = result.user_id;
      // Rename
      return displayName.setDefault(result.user_id, user.token);
    })
    // Get Geo Lobby
    .then(function(result){
      user.displayName = result;
      // Return Default Room for Now
      return {room: config.plugins.matrix.defaultRoom};
    })
    // Join User to Assigned Lobby
    .then(function(result){
      return rooms.join(result.room, user.token)
      return result;
    })
    // Return User Object
    .then(function(result){
      resolve(user);
    })
    .catch(function(err){
      reject(err);
    })
  });
}

// Get Guest Access Token
exports.getGuestToken = function(){
  return new Promise(function(resolve, reject) {
    request({
      uri: config.plugins.matrix.host+'/register?kind=guest',
      method: "POST",
      timeout: 2000
    },
    function(error, response, body) {
      resolve(JSON.parse(body));
    })
  });
}
