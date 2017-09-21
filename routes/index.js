const express = require('express');
const router = express.Router();
const fs = require('fs');
const parser = require('body-parser');
// could use one line instead: const router = require('express').Router();
// const tweetBank = require('../tweetBank');
const client = require('../db');

// function list(){
//   client.query('SELECT * FROM tweets inner join users on users.id = tweets.user_id', function (err, result) {
//     if (err) return next(err); // pass errors to Express
//     var tweetsArr = result.rows;
//     console.log('list is being called')
//     return tweetsArr
//   });
// }



router.use(parser.urlencoded({ extended: true }))

router.post('/tweets', function(req,res){
	var name = req.body.username;
	var text = req.body.text;
	// tweetBank.add(name, text);
 	res.redirect('/');
});

router.get('/', function (req, res) {
  // let tweets = tweetBank.list();
  client.query('select * from users inner join tweets on tweets.user_id = users.id', function (err, result) {
    if (err) return next(err); // pass errors to Express
    var tweetsArr = result.rows;
    console.log(tweetsArr);
    res.render('index', { title: 'Twitter.js', tweets: tweetsArr, showForm: false });
  });
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  client.query('select * from users inner join tweets on tweets.user_id = users.id WHERE users.name ='+"'"+name+"'", function (err, result) {
    if (err) return next(err); // pass errors to Express
    var tweetsArr = result.rows;
    res.render('index', { title: 'Twitter.js', tweets: tweetsArr, showForm: false });
  });
});

router.get('/tweets/:id', function(req, res) {
	console.log(req.params.id)
  var id = req.params.id;
  client.query('select * from users inner join tweets on tweets.user_id = users.id WHERE tweets.id ='+id, function (err, result) {
    if (err) return next(err); // pass errors to Express
    var tweetsArr = result.rows;
    console.log(tweetsArr);
    res.render('index', { title: 'Twitter.js', tweets: tweetsArr, showForm: false });
  });
});

router.use(express.static('public'));


module.exports = router;