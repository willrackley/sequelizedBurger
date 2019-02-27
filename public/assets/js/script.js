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
    $('#eatenContainer').empty();
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
    devourBtn.addClass("p-1 btn btn-secondary mb-2 devoured");
    devourBtn.text("Devour it!");
    devourBtn.attr("tableId", postedBurger.id);
    devourBtn.attr("burgerName", postedBurger.burger_name);
    devourBtn.attr("customer", postedBurger.customer.customer_name);
    $('#listedBurgers').append(newBurgerEntry);
    $('#devourBtnCont').append(devourBtn);
  }

  function updateBurger(burgerEntry) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burgerEntry
    });
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
     
   
    $("#burgerInput").val("");
  }

  $("#submitBtn").on("click", function(){
    event.preventDefault();
    insertCustomer();
  });

  $(document).on("click", ".devoured", function(){
    
    
    var burger = $(this).attr("burgerName");
    var eatenCustomer = $(this).attr("customer");
    console.log($(this).attr("customer"));
    var id = $(this).attr("tableId");

    var updatedOrder = {
      id: id,
      devoured: true
    };
   
    var eatenDiv = $('<div>');
    eatenDiv.text(burger + " eaten by " + eatenCustomer);
    eatenDiv.addClass("border text-right bg-white p-1 mb-2 text-muted");
    $('#eatenContainer').append(eatenDiv);
    updateBurger(updatedOrder);

  });

  getBurgerList();
});
