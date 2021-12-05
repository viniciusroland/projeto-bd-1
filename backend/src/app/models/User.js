const { Model } = require('sequelize')
const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')

class User extends Model {
  static init(sequelize) {
    // sequelize == connection with the db

    super.init({
      name : Sequelize.STRING,
      email : Sequelize.STRING,
      password : Sequelize.VIRTUAL,
      password_hash : Sequelize.STRING,
      provider : Sequelize.BOOLEAN,
    }, {
      sequelize,
    })

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        const cryptoCicles = 8
        user.password_hash = await bcrypt.hash(user.password, cryptoCicles)
      }
    })

    return this
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash)
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey : 'avatar_id', as : 'avatar' })
  }

}
module.exports = User