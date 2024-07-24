'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'category', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Books', 'publisher', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'category');
    await queryInterface.removeColumn('Books', 'publisher');
  }
};