var db = require("../models");

module.exports = function(app) {

    // GET route for getting all of the added burgers
    app.get("/api/customers", function(req, res) {
        //join to include all of each customer's order
        db.customer.findAll({
            include: [db.burgers]
          }).then(function(result) {
            res.json(result);
          });
    });

   
    // route for saving a new customer
    app.post("/api/customers", function(req, res) {
      db.customer.create(req.body).then(function(results) {
        res.json(results);
      });
    });
 
  };
  