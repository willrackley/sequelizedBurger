$(document).ready(function() {
  var postedBurger; 
  var customerId;
  var url = window.location.search;
 
  // if (url.indexOf("?customer_id=") !== -1) {
  //   customerId = url.split("=")[1];
  //   getBurgerList(customerId);
  // }
  // // If there's no customerId we just get all posts as usual
  // else {
  //   getBurgerList();
  // }

  function getBurgerList(customer) {
    // customerId = customer || "";
    // if (customerId) {
    //   customerId = "/?customer_id=" + customerId;
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
  
  function displayEmpty(){
    $('#listedBurgers').empty();
    $('#eatenContainer').empty();
    var ordersDiv = $("<div>");
    ordersDiv.addClass("border bg-white p-1 text-muted w-75");
    ordersDiv.text("No burgers have been ordered");
    $('#listedBurgers').append(ordersDiv);

    var ordersFilledDiv = $("<div>");
    ordersFilledDiv.addClass("border text-right bg-white p-1 text-muted ");
    ordersFilledDiv.text("No orders have been filled");
    $('#eatenContainer').append(ordersFilledDiv);
  }

  // InitializeRows appends all of the burger informaiton that is entered to the screen
  function initializeRows() {
    $('#listedBurgers').empty();
    $('#devourBtnCont').empty();
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
    var devourBtn = $("<button>");
    devourBtn.text("Devour it!");
    devourBtn.addClass("p-1")
    $('#listedBurgers').append(newBurgerEntry);
    $('#devourBtnCont').append(devourBtn);
  }

  //adds a new customer to database
  function insertCustomer() {
   
    var addedCustomer = {
      customer_name: $("#customerInput").val().trim(),
    };

    $.post("/api/customers", addedCustomer);

    $.get("api/customers", function(data){
      var id = data[data.length - 1].id
      insertBurger(id);
    });
    $("#customerInput").val("");
  }

  //adds a new burger to database
  function insertBurger(data) {
    
      var addedBurger = {
        burger_name: $("#burgerInput").val().trim(),
        devoured: false,
        customerId: data
      };

      $.post("/api/burgers", addedBurger, getBurgerList);
      console.log(customerId);
   
 


   
    $("#burgerInput").val("");
  }


  $("#submitBtnCust").on("click", function(){
    event.preventDefault();
    insertCustomer();
  });

  $("#submitBtn").on("click", function(){
    event.preventDefault();
    insertCustomer();
  });

  $(".devour-form").on("submit", function(event) {
    event.preventDefault();
    

  });

  getBurgerList();
});
