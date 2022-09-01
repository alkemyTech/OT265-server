"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Activities",
      [
        {
          name: "Go to the beach",
          image: "https://image.shutterstock.com/image-photo/very-beautiful-sea-beach-near-600w-2184128867.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non massa mauris. Quisque vel dui fringilla quam congue blandit vitae at nibh. Ut quis scelerisque nisl. Phasellus condimentum elit ante, pellentesque suscipit dolor aliquam sed. Proin suscipit diam vehicula arcu venenatis luctus. Duis malesuada pretium urna, sit amet malesuada nibh ultrices et. Phasellus sit amet vestibulum nisi, id tincidunt urna.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Stay in a hotel",
          image: "https://image.shutterstock.com/image-photo/scenic-view-traditional-old-cottage-260nw-2129659055.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non massa mauris. Quisque vel dui fringilla quam congue blandit vitae at nibh. Ut quis scelerisque nisl. Phasellus condimentum elit ante, pellentesque suscipit dolor aliquam sed. Proin suscipit diam vehicula arcu venenatis luctus. Duis malesuada pretium urna, sit amet malesuada nibh ultrices et. Phasellus sit amet vestibulum nisi, id tincidunt urna.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Go camping",
          image: "https://image.shutterstock.com/image-photo/view-english-garden-dubuque-arboretum-600w-2159289217.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non massa mauris. Quisque vel dui fringilla quam congue blandit vitae at nibh. Ut quis scelerisque nisl. Phasellus condimentum elit ante, pellentesque suscipit dolor aliquam sed. Proin suscipit diam vehicula arcu venenatis luctus. Duis malesuada pretium urna, sit amet malesuada nibh ultrices et. Phasellus sit amet vestibulum nisi, id tincidunt urna.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Go sightseeing",
          image: "https://image.shutterstock.com/image-photo/smart-school-kid-boy-holding-600w-1928423474.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non massa mauris. Quisque vel dui fringilla quam congue blandit vitae at nibh. Ut quis scelerisque nisl. Phasellus condimentum elit ante, pellentesque suscipit dolor aliquam sed. Proin suscipit diam vehicula arcu venenatis luctus. Duis malesuada pretium urna, sit amet malesuada nibh ultrices et. Phasellus sit amet vestibulum nisi, id tincidunt urna.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Take photos/pictures",
          image: "https://image.shutterstock.com/image-photo/tourist-visiting-london-england-happy-260nw-2152515139.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non massa mauris. Quisque vel dui fringilla quam congue blandit vitae at nibh. Ut quis scelerisque nisl. Phasellus condimentum elit ante, pellentesque suscipit dolor aliquam sed. Proin suscipit diam vehicula arcu venenatis luctus. Duis malesuada pretium urna, sit amet malesuada nibh ultrices et. Phasellus sit amet vestibulum nisi, id tincidunt urna.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Have a picnic",
          image: "https://image.shutterstock.com/image-photo/happy-diverse-large-group-multicultural-600w-2064849221.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non massa mauris. Quisque vel dui fringilla quam congue blandit vitae at nibh. Ut quis scelerisque nisl. Phasellus condimentum elit ante, pellentesque suscipit dolor aliquam sed. Proin suscipit diam vehicula arcu venenatis luctus. Duis malesuada pretium urna, sit amet malesuada nibh ultrices et. Phasellus sit amet vestibulum nisi, id tincidunt urna.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Make a sandcastle",
          image: "https://image.shutterstock.com/image-photo/happy-family-two-kids-hands-600w-521163331.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non massa mauris. Quisque vel dui fringilla quam congue blandit vitae at nibh. Ut quis scelerisque nisl. Phasellus condimentum elit ante, pellentesque suscipit dolor aliquam sed. Proin suscipit diam vehicula arcu venenatis luctus. Duis malesuada pretium urna, sit amet malesuada nibh ultrices et. Phasellus sit amet vestibulum nisi, id tincidunt urna.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Go swimming",
          image: "https://image.shutterstock.com/image-photo/family-having-fun-on-summer-600w-1662188296.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non massa mauris. Quisque vel dui fringilla quam congue blandit vitae at nibh. Ut quis scelerisque nisl. Phasellus condimentum elit ante, pellentesque suscipit dolor aliquam sed. Proin suscipit diam vehicula arcu venenatis luctus. Duis malesuada pretium urna, sit amet malesuada nibh ultrices et. Phasellus sit amet vestibulum nisi, id tincidunt urna.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Go snorkelling",
          image: "https://image.shutterstock.com/image-photo/happy-family-mother-baby-girl-600w-576763912.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non massa mauris. Quisque vel dui fringilla quam congue blandit vitae at nibh. Ut quis scelerisque nisl. Phasellus condimentum elit ante, pellentesque suscipit dolor aliquam sed. Proin suscipit diam vehicula arcu venenatis luctus. Duis malesuada pretium urna, sit amet malesuada nibh ultrices et. Phasellus sit amet vestibulum nisi, id tincidunt urna.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Go rowing",
          image: "https://image.shutterstock.com/image-photo/canoeing-team-amsterdam-600w-627780872.jpg",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non massa mauris. Quisque vel dui fringilla quam congue blandit vitae at nibh. Ut quis scelerisque nisl. Phasellus condimentum elit ante, pellentesque suscipit dolor aliquam sed. Proin suscipit diam vehicula arcu venenatis luctus. Duis malesuada pretium urna, sit amet malesuada nibh ultrices et. Phasellus sit amet vestibulum nisi, id tincidunt urna.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Activities", null, {});
  },
};
