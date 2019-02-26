$(document).ready(function() {

  var postedBurger;
  // InitializeRows appends all of the burger informaiton that is entered to the screen
  function initializeRows() {
    $('#listedBurgers').empty();
    var burgersToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      burgersToAdd.push(createNewRow(postedBurger[i]));
    }
    $('#listedBurgers').append(burgersToAdd);
  }

  function createNewRow(postedBurger) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newBurgerEntry = $("<div>");
    newBurgerEntry.addClass = "border";

  }
    
  $(".devour-form").on("submit", function(event) {
    event.preventDefault();

    

  });
});
