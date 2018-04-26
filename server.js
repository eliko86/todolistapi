var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');

/// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://otexdemocosmosdb.documents.azure.com:10255/?ssl=true&replicaSet=globaldb/Tododb',
{
  auth: {
   user: 'otexdemocosmosdb',
   password: 'ogXTBFZQQwakUGKiwmTPViYnSG07HT1uh3oiziNu7zdQ0xjlBHDoOK46Hdy9TwSruxqknG0r7r5qepyja1oWvw==',
  }}, function (err, db) {
  db.close();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
