const pg = require('pg');
var postgresUrl = 'postgres://localhost/twitterdb';
var client = new pg.Client(postgresUrl);

// connecting to the `postgres` server
client.connect();

// make the client available as a Node module
module.exports = client;

//list get all of the tweets
//add function!
//find/filter function
//need to have a way to create unqiue ids(maybe)