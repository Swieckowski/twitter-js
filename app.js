const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

var locals = {
	title: "This is my title.",
	people : [
	{name: "Arthur"},
	{name: "Philip"},
	{name: "Dinkins"}
	]
};
app.set('view engine', 'html');
// have res.render work with html files
app.engine('html', nunjucks.render); 
// when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true});


app.listen(3000, function(){
	console.log("listening")
});

app.use(function(request,response, next){
	console.log("request!!!!!")
	next();
});

app.get('/', function(request,response){
	response.render('index', locals);
});

app.get('/news', function(request,response){
	response.send("Same ol', same ol'");
});
