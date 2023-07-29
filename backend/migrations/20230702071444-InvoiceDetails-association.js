'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('InvoiceDetails',{
      fields: ['invoice_id'],
      type: 'foreign key',
      references:{
        table: 'Invoices',
        field: 'id'
      }
    })
    queryInterface.addConstraint('InvoiceDetails',{
      fields: ['product_id'],
      type: 'foreign key',
      references:{
        table: 'Products',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('InvoiceDetails',{
      fields: ['invoice_id'],
      type: 'foreign key',
      references:{
        table: 'Invoices',
        field: 'id'
      }
    })
    queryInterface.removeConstraint('InvoiceDetails',{
      fields: ['product_id'],
      type: 'foreign key',
      references:{
        table: 'Products',
        field: 'id'
      }
    })
  }
};
