module.exports = function(sequelize, DataTypes) {
    var burgers = sequelize.define("burgers", {
      burger_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      devoured: {
        type: DataTypes.BOOLEAN,
            defaultValue: false
      }
    });

    burgers.associate = function(models) {
        // We're saying that a burger should be eaten by a customer
        //A burger cant be eaten without a customer eating it due to the foreign key constraint
        burgers.belongsTo(models.customer, {
          foreignKey: {
            allowNull: false
          }
        });
    };

    return burgers;
}