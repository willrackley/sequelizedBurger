var db = require("../models");

module.exports = function(app) {

    // GET route for getting all of the added burgers
    app.get("/api/burgers", function(req, res) {
        db.burgers.findAll({}).then(function(results) {
            res.json(results);
          });
    //   var query = {};
    //   if (req.query.customer_id) {
    //     query.AuthorId = req.query.author_id;
    //   }
//       // 1. Add a join here to include all of the Authors to these posts
//       db.Post.findAll({
//         where: query,
//         include:[db.Author]
//       }).then(function(dbPost) {
//         res.json(dbPost);
//       });
//     });
  
//     // Get route for retrieving a single post
//     app.get("/api/posts/:id", function(req, res) {
//       // 2. Add a join here to include the Author who wrote the Post
//       db.Post.findOne({
//         where: {
//           id: req.params.id
//         },
//         include: [db.Author]
//       }).then(function(dbPost) {
//         console.log(dbPost);
//         res.json(dbPost);
//       });
//     });
  
    // route for saving a new burger
    app.post("/api/burgers", function(req, res) {
      db.burgers.create(req.body).then(function(results) {
        res.json(results);
      });
    });
  
//     // DELETE route for deleting posts
//     app.delete("/api/posts/:id", function(req, res) {
//       db.Post.destroy({
//         where: {
//           id: req.params.id
//         }
//       }).then(function(dbPost) {
//         res.json(dbPost);
//       });
//     });
  
//     // PUT route for updating posts
//     app.put("/api/posts", function(req, res) {
//       db.Post.update(
//         req.body,
//         {
//           where: {
//             id: req.body.id
//           }
//         }).then(function(dbPost) {
//         res.json(dbPost);
//       });
    });
  };
  