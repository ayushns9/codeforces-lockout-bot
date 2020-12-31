/*
* Firebase initialization and database.
*/

// imports
var firebase = require("firebase/app");
require('firebase/database');

// load firebase config
var config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    storageBucket: process.env.storageBucket
};

// initialize firebase app and get database ref
firebase.initializeApp(config);
var db = firebase.database();

// exports
module.exports = {
    db
}