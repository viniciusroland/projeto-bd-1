const { Model } = require('sequelize')
const Sequelize = require('sequelize')

class File extends Model {
  static init(sequelize) {
    // sequelize == connection with the db

    super.init({
      name : Sequelize.STRING,
      path : Sequelize.STRING,
      url : {
        type : Sequelize.VIRTUAL,
        get() {
          return `http://localhost:3333/files/${this.path}`
        }

      }
    }, {
      sequelize,
    })
    return this
  }
}
module.exports = File