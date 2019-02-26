$(document).ready(function() {
   var postedBurger; 

  function getBurgerList() {
    // authorId = author || "";
    // if (authorId) {
    //   authorId = "/?author_id=" + authorId;
    // }
    $.get("/api/burgers", function(data) {
      console.log("burgers", data);
      postedBurger = data;
      if (!postedBurger|| !postedBurger.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }
  //submits new burger to database
  
  function displayEmpty(){
    $('#listedBurgers').empty();
    var emptyDiv = $("<div>");
    emptyDiv.addClass("border bg-white p-1");
    emptyDiv.text("Add a burger");
    $('#listedBurgers').append(emptyDiv);
  }

  // InitializeRows appends all of the burger informaiton that is entered to the screen
  function initializeRows() {
    $('#listedBurgers').empty();
    var burgersToAdd = [];
    for (var i = 0; i < postedBurger.length; i++) {
      burgersToAdd.push(createNewRow(postedBurger[i]));
    }

    $('#listedBurgers').append(burgersToAdd);
  }

  function createNewRow(postedBurger) {

    var newBurgerEntry = $("<div>");
    newBurgerEntry.addClass("border bg-white p-1 mb-2");
    newBurgerEntry.text(postedBurger.id + ". " + postedBurger.burger_name);
    $('#listedBurgers').append(newBurgerEntry);
  }

  //adds a new burger to database
  function insertBurger() {
    
    var addedBurger = {
      burger_name: $("#burgerInput").val().trim(),
      devoured: false,
    };

    $.post("/api/burgers", addedBurger, getBurgerList);
    $("#burgerInput").val("");
  }

  $("#submitBtn").on("click", function(){
    event.preventDefault();
    insertBurger();
    // initializeRows();
    
  });

  $(".devour-form").on("submit", function(event) {
    event.preventDefault();
    

  });

  getBurgerList();
});
