// Chat Room Module
// Handles Room Related Functions

// Default Modules
var express = require('express');
var Promise = require('bluebird');
var request = require("request");
var config = require('../settings');

// Create Room
exports.create = function(){
  return new Promise(function(resolve, reject) {

  });
}


// Get Rooms
exports.list = function(){
  return new Promise(function(resolve, reject) {
    var url = config.plugins.matrix.host+'/publicRooms';
    request({uri: url},
    function(error, response, body) {
      resolve(JSON.parse(body));
    })
  });
}

// Join Room
//
exports.join = function(roomID, token){
  return new Promise(function(resolve, reject) {
    var url = config.plugins.matrix.host+'/join/'+roomID+'?access_token='+token;
    console.log('joining room', roomID);
    request({
      uri: url,
      method: "POST",
      timeout: 2000
    },
    function(error, response, body) {
      console.log(body);
      resolve(body);
    })
  });
}

module.exports = exports;
