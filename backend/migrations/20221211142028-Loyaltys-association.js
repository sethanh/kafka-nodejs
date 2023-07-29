'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Loyaltys',{
      fields: ['user_id'],
      type: 'foreign key',
      references:{
        table: 'Users',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Loyaltys',{
      fields: ['user_id'],
      type: 'foreign key',
      references:{
        table: 'Users',
        field: 'id'
      }
    })
  }
};
