const express = require('express');
const app = express();

app.listen(3000, function(){
	console.log("listening")
});

app.use(function(request,response, next){
	console.log("request!!!!!")
	next();
});

app.get('/', function(request,response){
	response.send("Howdy");
});

app.get('/news', function(request,response){
	response.send("Same ol', same ol'");
});
