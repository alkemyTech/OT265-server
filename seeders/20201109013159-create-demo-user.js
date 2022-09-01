'use strict';

const bcryptjs = require('bcryptjs');
const salt = bcryptjs.genSaltSync();


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Miguel Ángel',
        lastName: 'Andrade',
        email: 'miguel@gmail.com',
        password: bcryptjs.hashSync('Miguel1234', salt),
        roleId: 1,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_boy_black_tone_people_person_avatar_icon_159356.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Martina',
        lastName: 'Benítez',
        email: 'martina@gmail.com',
        password: bcryptjs.hashSync('Martina1234', salt),
        roleId: 1,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_people_person_avatar_black_tone_icon_159371.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Juan Carlos',
        lastName: 'Castillo',
        email: 'juan@gmail.com',
        password: bcryptjs.hashSync('Juan1234', salt),
        roleId: 1,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Jazmín',
        lastName: 'Castro',
        email: 'jazmin@gmail.com',
        password: bcryptjs.hashSync('Jazmin1234', salt),
        roleId: 1,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_avatar_white_tone_icon_159354.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Carlos Alberto',
        lastName: 'Contreras',
        email: 'carlos@gmail.com',
        password: bcryptjs.hashSync('Carlos1234', salt),
        roleId: 1,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_boy_black_tone_avatar_people_person_icon_159369.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Delfina',
        lastName: 'De León',
        email: 'delfina@gmail.com',
        password: bcryptjs.hashSync('Delfina1234', salt),
        roleId: 1,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_user_white_tone_icon_159359.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'José Luis',
        lastName: 'Díaz',
        email: 'jose@gmail.com',
        password: bcryptjs.hashSync('Jose1234', salt),
        roleId: 1,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_boy_person_avatar_people_white_tone_icon_159357.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Lucía',
        lastName: 'Duarte',
        email: 'lucia@gmail.com',
        password: bcryptjs.hashSync('Lucia1234', salt),
        roleId: 1,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Lucas',
        lastName: 'Espinoza',
        email: 'lucas@gmail.com',
        password: bcryptjs.hashSync('Lucas1234', salt),
        roleId: 1,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/man_boy_people_avatar_user_person_black_skin_tone_icon_159355.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Emilia',
        lastName: 'Fernández',
        email: 'emilia@gmail.com',
        password: bcryptjs.hashSync('Emilia1234', salt),
        roleId: 1,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/avatar_female_woman_person_people_white_tone_icon_159360.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Benjamín',
        lastName: 'Flores',
        email: 'benjamin@gmail.com',
        password: bcryptjs.hashSync('Benjamin1234', salt),
        roleId: 2,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_white_tone_icon_159368.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Catalina',
        lastName: 'García',
        email: 'catalina@gmail.com',
        password: bcryptjs.hashSync('Catalina1234', salt),
        roleId: 2,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159367.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Martín',
        lastName: 'Giménez',
        email: 'martin@gmail.com',
        password: bcryptjs.hashSync('Martin1234', salt),
        roleId: 2,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_people_avatar_man_boy_curly_hair_icon_159362.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Victoria',
        lastName: 'Gómez',
        email: 'victoria@gmail.com',
        password: bcryptjs.hashSync('Victoria1234', salt),
        roleId: 2,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_avatar_people_person_white_tone_icon_159370.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Gabriel',
        lastName: 'Gonzales',
        email: 'gabriel@gmail.com',
        password: bcryptjs.hashSync('Gabriel1234', salt),
        roleId: 2,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Mía',
        lastName: 'Gutiérrez',
        email: 'mia@gmail.com',
        password: bcryptjs.hashSync('Mia1234', salt),
        roleId: 2,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_person_people_avatar_icon_159366.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Santiago',
        lastName: 'Hernández',
        email: 'santiago@gmail.com',
        password: bcryptjs.hashSync('Santiago1234', salt),
        roleId: 2,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Inés',
        lastName: 'Morales',
        email: 'ines@gmail.com',
        password: bcryptjs.hashSync('Ines1234', salt),
        roleId: 2,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Charlie',
        lastName: 'Pérez',
        email: 'charlie@gmail.com',
        password: bcryptjs.hashSync('Charlie1234', salt),
        roleId: 2,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        firstName: 'Camila',
        lastName: 'Portillo',
        email: 'camila@gmail.com',
        password: bcryptjs.hashSync('Camila1234', salt),
        roleId: 2,
        image: 'https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_user_people_person_avatar_black_tone_icon_159361.png',
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
