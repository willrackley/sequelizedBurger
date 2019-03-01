$(document).ready(function() {
  var postedBurger; 

  //function that grabs all api information
  function getBurgerList(customer) {
    $.get('/api/burgers', function(data) {
      postedBurger = data;
      if (!postedBurger|| !postedBurger.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }
  
  //function is called if there are no items in the api
  function displayEmpty(){
    $('#listedBurgers').empty();
    $('#eatenContainer').empty();
    var ordersDiv = $('<div>');
    ordersDiv.addClass('border bg-white p-1 text-muted w-75');
    ordersDiv.text('No burgers have been ordered');
    $('#listedBurgers').append(ordersDiv);
  }

  // InitializeRows appends all of the burger informaiton that is entered to the screen
  function initializeRows() {
    $('#listedBurgers').empty();
    $('#devourBtnCont').empty();
    $('#eatenContainer').empty();
    var burgersToAdd = [];
    var devouredBurgs = [];
    for (var i = 0; i < postedBurger.length; i++) {
      burgersToAdd.push(createNewRow(postedBurger[i]));
      if(postedBurger[i].devoured){
        devouredBurgs.push(createEatenRow(postedBurger[i]));
      }
    }
    $('#listedBurgers').append(burgersToAdd);
    $('#eatenContainer').append(devouredBurgs);
  }
  

  function createEatenRow(postedBurger) {
    var Entry = $('<div>');
    Entry.addClass('border bg-white p-1 mb-2');
    Entry.text(postedBurger.id + '. ' + postedBurger.burger_name + ' (eaten by ' + postedBurger.customer.customer_name + ')');
    $('#eatenContainer').append(Entry);
  }

  //creates rows for the api items to be display
  function createNewRow(postedBurger) {

    //this disables the devour button once its been clicked
    if(postedBurger.devoured){
      var newBurgerEntry = $('<div>');
      newBurgerEntry.addClass('border bg-white p-1 mb-2');
      newBurgerEntry.text(postedBurger.id + '. ' + postedBurger.burger_name);
      var devourBtn = $('<button>');
      devourBtn.addClass('p-1 btn btn-secondary mb-2 devoured');
      devourBtn.text('Devour it!');
      devourBtn.attr('tableId', postedBurger.id);
      devourBtn.addClass('no-click');
      devourBtn.attr('burgerName', postedBurger.burger_name);
      devourBtn.attr('customer', postedBurger.customer.customer_name);
      $('#listedBurgers').append(newBurgerEntry);
      $('#devourBtnCont').append(devourBtn);
    } else {
      var newBurgerEntry = $('<div>');
      newBurgerEntry.addClass('border bg-white p-1 mb-2');
      newBurgerEntry.text(postedBurger.id + '. ' + postedBurger.burger_name);
      var devourBtn = $('<button>');
      devourBtn.addClass('p-1 btn btn-secondary mb-2 devoured');
      devourBtn.text('Devour it!');
      devourBtn.attr('tableId', postedBurger.id);
      devourBtn.attr('burgerName', postedBurger.burger_name);
      devourBtn.attr('customer', postedBurger.customer.customer_name);
      $('#listedBurgers').append(newBurgerEntry);
      $('#devourBtnCont').append(devourBtn);
    }
  }


  //function used when the user clicks devour button to update the devour column to true
  function updateBurger(burgerEntry) {
    $.ajax({
      method: 'PUT',
      url: '/api/burgers',
      data: burgerEntry
    });
  }

  //adds a new customer to database
  function insertCustomer() {
    var addedCustomer = {
      customer_name: $('#customerInput').val().trim(),
    };
    $.post('/api/customers', addedCustomer);
    insertBurger();
  }

  //adds a new burger to database
  function insertBurger(id) {
    $.get('api/customers', function(data){
      var addedBurger = {
        burger_name: $('#burgerInput').val().trim(),
        devoured: false,
        customerId: data[data.length - 1].id
      };
      $.post('/api/burgers', addedBurger, getBurgerList);
      $('#customerInput').val('');
      $('#burgerInput').val('');
    });
  }

  //event listener for submit button
  $("#form").submit(function(event){
    event.preventDefault();
    insertCustomer();
  });

  //event listener for devour button
  $(document).on('click', '.devoured', function(){

    var burger = $(this).attr('burgerName');
    var eatenCustomer = $(this).attr('customer');
    var id = $(this).attr('tableId');
    
    //changes devour column to true for specific burger
    var updatedOrder = {
      id: id,
      burger_name: burger,
      devoured: true,
      customerId: id 
    };
    
    var eatenDiv = $('<div>');
    eatenDiv.text(id + '. ' + burger + ' (eaten by ' + eatenCustomer + ')');
    eatenDiv.addClass('border bg-white p-1 mb-2');
    $('#eatenContainer').append(eatenDiv);
    updateBurger(updatedOrder);
    $(this).addClass('no-click');
    
  });
  getBurgerList();
});
