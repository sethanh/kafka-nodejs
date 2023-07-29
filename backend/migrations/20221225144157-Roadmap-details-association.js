'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Roadmap_details',{
      fields: ['road_id'],
      type: 'foreign key',
      references:{
        table: 'Roadmaps',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Roadmap_details',{
      fields: ['road_id'],
      type: 'foreign key',
      references:{
        table: 'Roadmaps',
        field: 'id'
      }
    })
  }
};
