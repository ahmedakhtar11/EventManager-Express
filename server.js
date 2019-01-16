// Require Express
var express = require('express');
// Create App Instance Express
var app = express();
// Require MySQL
var mysql = require('mysql');
// Require MySQL2
var mysql2 = require('mysql2');
// Require Path
var path = require("path");
// Require Morgan
var morgan  = require('morgan')
// Require Timber
var timber  = require('timber')
// Require body-parser
var bodyParser = require('body-parser');
// Require method-override
var methodOverride = require("method-override");
// Require body-parser (Allows us to parse data in an object)
var bodyParser = require('body-parser');
// Require Handlebars
var exphbs = require("express-handlebars");
// Require Handlebars
var Handlebars = require("Handlebars");
// Require pug
var pug  = require('pug')
// Require sequelize
var sequelize = require('sequelize')
// Require sequelize
var express_myconnection = require('express-myconnection')
// Require sequelize
var ejs = require('ejs')
// Require http
var http = require("http");

var app = new express();

//app.use(morgan('combined'))

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

//Alternative:
//app.use(express.static(process.cwd() + "/public"));


/*Setting up HandleBars in the view directory*/
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/*Setting a route for for the the Handle Bar page*/
app.get('/', function(req, res){
	res.render('index');
});


/*Setting a route for an HTML page*/

 app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "/views/tables.html"));
  });



// create the connection information for the sql database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: "",
	database: 'users'
})


// Set Port
const PORT = process.env.PORT||3000;

// Test Page 1 (Sending Response) (HTTP Request .get)
app.get("/test1", (req, res) => {
res.send("Test Page Successful");
console.log("Activating Test Page");
console.log("You did a", req.method, "with the data:");
})

// Test Page 2 (Sending json)
app.get("/test2", (req, res) => {
var user1 = {firstName: "Ahmed", lastName: "Akhtar"}
var user2 = {firstName: "Javier", lastName: "Radillo"}
res.json([user1, user2])
console.log("User Page Successful");
console.log("You did a", req.method, "with the data:");
})

// Test Page 3 (Sending Dynamic Response)
app.get("/test3/:place", (req, res) => {
res.send("My Favorite place is: " + req.params.place);
})

// Test Page 4 (Writing HTML to a Page Response)
app.get("/test4", (req, res) => {
res.writeHead(200, {"Content-Type": "text/html"});
res.write('<!DOCTYPE html>'+
'<html>'+
' <head>'+
' <meta charset="utf-8" />'+
' <title>My Node.js page!</title>'+
' </head>'+ 
' <body>'+
' <p>Here is a paragraph of <strong>HTML</strong>!</p>'+
' </body>'+
'</html>');
res.end();
console.log("You did a", req.method, "with the data:");
});



// Test Page 3 (Testing Post Method)
app.post("/test3", (req, res) => {
res.send("My Favorite place is: " + req.body.place);
console.log("You did a", req.method, "with the data:");
});



//Functions----------------------------------------------------

function readUsers() {
  connection.query("SELECT * FROM users", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.log("Table");
    console.log(res);
    console.log("-----");
  });
}

function readfirstname() {
  connection.query("SELECT first_name FROM users", function(err, res) {
    if (err) throw err;

    // Log Fist Name of Users
    console.log("Fist Name of Users");
    console.log(res);
    console.log("-----");
  });
}


function readlastname() {
  connection.query("SELECT last_name FROM users", function(err, res) {
    if (err) throw err;

    // Log Last Name of Users
    console.log("Last Name of Users");
    console.log(res);
    console.log("-----");
  });
}



function readage() {
  connection.query("SELECT age FROM users", function(err, res) {
    if (err) throw err;

    // Log Age of Users
    console.log("Age of Users");
    console.log(res);
    console.log("-----");
  });
}


function readid() {
  connection.query("SELECT first_name FROM users WHERE id = 1", function(err, res) {
    if (err) throw err;

    // Log First Name Where Id = 1
    console.log("First Name Where Id = 1");
    console.log(res);
    console.log("-----");
  });
}




//Call All SQL Users
app.get('/userall', (req, res) => {

connection.query("SELECT * FROM users", (err, rows) => {
 console.log("Fetching All Users:")
 console.log("Response:")
 console.log(rows)
	res.json(rows)
})

})



//Calling Specific SQL User
app.get('/user/:id', (req, res) => {
const userId = req.params.id
const queryString = "SELECT * FROM users WHERE id = ?"
connection.query(queryString, [userId], (err, rows) => {
	

	const user = rows.map((row) => {
	return {firstName: row.first_name, lastName: row.last_name}
	console.log("I think we fetched users successfully.")
	 console.log("Fetching user with id: " + req.params.id)
})
	console.log("Fetching user with id: " + req.params.id)
	console.log("Response:")
	console.log(user)
	res.json(user)

})
})

/*

var people = [
    {firstName: "Yehuda", lastName: "Katz"},
    {firstName: "Carl", lastName: "Lerche"},
    {firstName: "Alan", lastName: "Johnson"}
  ]


Handlebars.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
});


const datapull = "SELECT * FROM users"
//End Users Page
//res.end()

*/


var context = {
  title: "My First Blog Post!",
  author: {
    id: 47,
    name: "Yehuda Katz"
  },
  body: "My first post. Wheeeee!"
};

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readUsers();
  readfirstname();
  readlastname()
  readage();
  readid();
 //connection.end();
});



//Setting the Server to start Listening
app.listen(PORT, () => {
console.log("App now listening at localhost:" + PORT);

//ALternative Syntax JS:
/*
app.listen(PORT, function() {
console.log("App now listening at localhost:" + PORT);
*/
});



/*
var logger = function(req, res, next){
	console.log('Logging...');
	next();
}

app.use(logger);



app.listen('3000', () => {
	console.log('Server started on port 3,000');
});


const bodyParser = require('body-parser');
// Require method-override
const methodOverride = require("method-override");
// Creating Instance Express App


// Require Express
var express = require('express');

// Require Handlebars
var exphbs = require("express-handlebars");

var app = new express();
// Set Port
var PORT = process.env.PORT||3000;

// Require Models
var db = require("./models");

// Serve static content from the "public" folder.
app.use(express.static(process.cwd() + "/public"));

// bodyparser urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Override POST 
app.use(methodOverride("_method"));

// Setting HandleBars Requirement with main as the default layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// Setting up the View Engine for HandleBars
app.set("view engine", "handlebars");

// Setting the Routes
require("./routes/routes.js")(app);

// Setting up Sequelize
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

*/