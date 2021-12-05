'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
      },
      date : {
        type: Sequelize.DATE,
        allowNull : false,
      },
      user_id : {
        type : Sequelize.INTEGER,
        references : { model : 'users', key : 'id' },
        onUpdate : 'CASCADE',
        onDelete : 'SET NULL',
        allowNull : false
      },
      provider_id : {
        type : Sequelize.INTEGER,
        references : { model : 'users', key : 'id' },
        onUpdate : 'CASCADE',
        onDelete : 'SET NULL',
        allowNull : false
      },
      created_at : {
        type : Sequelize.DATE,
        allowNull : true
      },
      updated_at : {
        type : Sequelize.DATE,
      },
      canceled_at : {
        type : Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('appointments');
  }
};
