module.exports = function(sequelize, DataTypes) {
    var customer = sequelize.define("customer", {
      // Giving the customer model a name of type STRING
      name: DataTypes.STRING
    });
  
    customer.associate = function(models) {
      // Associating customer with Burgers
      // When an customer is deleted, also delete any associated eaten burgers
      customer.hasMany(models.burgers, {
        onDelete: "cascade"
      });
    };
  
    return customer;
  };