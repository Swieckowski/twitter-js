const express = require('express');
const router = express.Router();
const fs = require('fs')
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

// router.use(function(req, res, next){
// 	if(req.path === ''||req.path === '/'){
// 		next();
// 	}
// 	if(fs.existsSync('/Users/arthurswieckowski/desktop/twitter-js/public'+req.path)){
// 		res.sendFile('/Users/arthurswieckowski/desktop/twitter-js/public'+req.path);
// 	} else{
// 		next();
// 	}
// })

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', {  tweets: tweets } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweets = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: tweets } );
});

router.use(express.static('public'));


module.exports = router;