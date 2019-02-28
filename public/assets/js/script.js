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
    var burgersToAdd = [];
    for (var i = 0; i < postedBurger.length; i++) {
      burgersToAdd.push(createNewRow(postedBurger[i]));
    }
    $('#listedBurgers').append(burgersToAdd);
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
      devourBtn.attr('disabled','disabled');
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

    $.get('api/customers', function(data){
      var id = data[data.length - 1].id
      insertBurger(id);
      $('#customerInput').val('');
      $('#burgerInput').val('');
    });
    
  }

  //adds a new burger to database
  function insertBurger(data) {
      var addedBurger = {
        burger_name: $('#burgerInput').val().trim(),
        devoured: false,
        customerId: data
      };
      $.post('/api/burgers', addedBurger, getBurgerList);
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
    
    var updatedOrder = {
      id: id,
      devoured: true
    };
    
    var eatenDiv = $('<div>');
    eatenDiv.text(id + '. ' + burger + ' (eaten by ' + eatenCustomer + ')');
    eatenDiv.addClass('border text-right bg-white p-1 mb-2 text-muted');
    $('#eatenContainer').append(eatenDiv);
    updateBurger(updatedOrder);
    $(this).attr('disabled','disabled');
    
  });
  getBurgerList();
});
