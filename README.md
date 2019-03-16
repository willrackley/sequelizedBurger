# sequelizedBurger

## How it works
* This app Utilizes the sequelize node package to manipulate mySQL table information. 

* The user is able to insert a name and a type of hamburger. Once that is submitted, that information is saved into two difference mySQL tables('burgers' & 'customer').

* The tables have an association with each other, whereas you can not add a burger to the burgers table with out first adding a customer to the customers table.

* The tables are joined by the customer and the burger that was created by that customers uniqued 'id'.

* Once a customer has created a burger, you have the option to 'devour' that burger, which updates that item in the 'burgers' table changing the devour column from false to true. 

## Sequelized Models

### Burgers.js

* The burgers sequelized model is comprised of two 'columns' (burger_name & devoured). Burger_name has the datatype of string, can not be null, and has a validation of atleast consisting of 1 character. The devoured column has a datatype of boolean that has a default setting of false.

* We associate the burger table with the customer table using a foreign key constraint that can not be null.

### Customer.js
* The customer sequelized model is comprised of one 'column' (customer_name). Customer_name has the datatype of string, can not be null, and has a validation of atleast consisting of 1 character.

* We associate the customer table with the burgers table with the 'hasMany' method. If the customer gets deleted then it would automatically get delete the corresponding burger.

## view the app at the link below
https://polar-cliffs-21869.herokuapp.com/