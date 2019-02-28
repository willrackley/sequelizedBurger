module.exports = function(sequelize, DataTypes) {
    var customer = sequelize.define("customer", {
        customer_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1]
          }
        }
    });

    customer.associate = function(models) {
        // Associating customer with burgers
        //deletes both customer and burger if the customer is deleted
        customer.hasMany(models.burgers, {
          onDelete: "cascade"
        });
      };

    return customer;
};