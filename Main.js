 
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

//app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
   
   console.log("Getting list of users");
});

app.get('/greeting', function (req, res) {
   console.log("Welcome to my world");
   res.end("Welcome to my world");
});



var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
	   newUsers = req.body;
       //data["user4"] = user["user4"];
	   data["user4"] = newUsers.users[1];
       //console.log( data );
	   console.log("Printing body now");
	   console.log(newUsers.users[1]);
	   
       res.end( JSON.stringify(data));
   });
});


app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})

app.delete('/deleteUser', function (req, res) {
	res.end("Please provide user id to delete as /deleteUser/{id}");
	
})

app.delete('/deleteUser/:id', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + req.params.id];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})



//app.listen(process.env.PORT || 8081);
var server = app.listen(process.env.PORT || 80, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

});