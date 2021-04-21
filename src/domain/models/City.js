module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City',
    {
      name: DataTypes.STRING,
      state: DataTypes.STRING
    })

  return City
}
