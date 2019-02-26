var express = require("express");

var PORT = process.env.PORT || 8000;
var app = express();

var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/burgers-api-routes.js")(app);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("Burger App listening on port: ", PORT);
  });
});
