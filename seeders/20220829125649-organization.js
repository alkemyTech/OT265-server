'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations', [
      {
        name: 'ONG-265',
        image: 'https://images.pexels.com/photos/7156170/pexels-photo-7156170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        address: 'Av 9 de julio 1234, Jujuy, Argentina',
        phone: "000000000000",
        email: "ong225@gmail.com",
        welcomeText: 'Bienvenido a ONG-265!',
        aboutUsText: 'Somos una organización sin fines de lucro',
        facebook: "https://www.facebook.com",
        linkedin: "https://www.linkedin.com",
        instagram: "https://www.instagram.com",
        createdAt: new Date,
        updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
