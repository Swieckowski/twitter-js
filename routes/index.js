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
	var name = req.body.name;
	var text = req.body.text;
	// tweetBank.add(name, text);
  client.query('select id from users WHERE users.name ='+"'"+name+"'"+"GROUP BY id", function (err, result) {
    if (err) return next(err); // pass errors to Express
    console.log(result)
    if(result.rows.length){
      console.log(result.rows[0].id)
      var userId = result.rows[0].id;
      client.query('INSERT INTO tweets(user_id, content) VALUES ($1, $2)', [userId, text], function (err, data) {
        console.log('err', err)
        console.log('data', data)
      });
      res.redirect('/');
    }
    else {
      var picture_url = "http://soul-fi.ipn.pt/wp-content/uploads/2014/09/user-icon-silhouette-ae9ddcaf4a156a47931d5719ecee17b9.png";
      client.query('INSERT INTO users(name, picture_url) VALUES ($1, $2)', [name, picture_url], function (err, data) {
        console.log('err', err)
        console.log('data', data)
      });
      client.query('select id from users WHERE users.name ='+"'"+name+"'"+"GROUP BY id", function (err, result){
        var userId = result.rows[0].id;
        client.query('INSERT INTO tweets(user_id, content) VALUES ($1, $2)', [userId, text], function (err, data) {
        console.log('err', err)
        console.log('data', data)
      });
      });
      res.redirect('/');
    }
  });

 	
});

router.get('/', function (req, res) {
  // let tweets = tweetBank.list();
  client.query('select * from users inner join tweets on tweets.user_id = users.id', function (err, result) {
    if (err) return next(err); // pass errors to Express
    var tweetsArr = result.rows;
    res.render('index', { title: 'Twitter.js', tweets: tweetsArr, showForm: true });
  });
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  client.query('select * from users inner join tweets on tweets.user_id = users.id WHERE users.name ='+"'"+name+"'", function (err, result) {
    if (err) return next(err); // pass errors to Express
    var tweetsArr = result.rows;
    res.render('index', { title: 'Twitter.js', tweets: tweetsArr, showForm: true });
  });
});

router.get('/tweets/:id', function(req, res) {
	console.log(req.params.id)
  var id = req.params.id;
  client.query('select * from users inner join tweets on tweets.user_id = users.id WHERE tweets.id ='+id, function (err, result) {
    if (err) return next(err); // pass errors to Express
    var tweetsArr = result.rows;
    res.render('index', { title: 'Twitter.js', tweets: tweetsArr, showForm: true });
  });
});

router.use(express.static('public'));


module.exports = router;