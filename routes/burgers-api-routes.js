var db = require("../models");

module.exports = function(app) {

    // GET route for getting all of the added burgers and join with customers
    app.get("/api/burgers", function(req, res) {
        var query = {};
    if (req.query.customer_id) {
      query.customerId = req.query.customer_id;
    }
    db.burgers.findAll({
      where: query,
      include:[db.customer]
    }).then(function(results) {
      res.json(results);
    });
});
  
  
    // route for saving a new burger
    app.post("/api/burgers", function(req, res) {
      db.burgers.create(req.body).then(function(results) {
        res.json(results);
      });
    });
  
    // PUT route for updating posts
    app.put("/api/burgers", function(req, res) {
      db.burgers.update(
        req.body,
        {
          where: {
            id: req.body.id
          }
        }).then(function(results) {
        res.json(results);
      });
    });
   
  };
  