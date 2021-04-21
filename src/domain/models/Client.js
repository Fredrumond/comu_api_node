module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client',
    {
      name: DataTypes.STRING,
      sex: DataTypes.INTEGER,
      birth_date: DataTypes.DATEONLY,
      age: DataTypes.INTEGER,
      id_city: DataTypes.INTEGER
    })

    Client.associate = function(models) {
      Client.belongsTo(models.City, {foreignKey: 'id_city', as: 'cities'})
    };

  return Client
}
