const userRouteDoc = require("../DocumentationSchemas/user.doc");
const categoryRouteDoc = require("../DocumentationSchemas/category.doc");
const newsRouteDoc = require("../DocumentationSchemas/news.doc");
const testimonialsRouteDoc = require("../DocumentationSchemas/testimonial.doc");
const authRouteDoc = require("../DocumentationSchemas/auth.docs");
const membersRouteDoc = require("../DocumentationSchemas/members.docs");
const slidesRouteDoc = require("../DocumentationSchemas/slides.doc");

const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "OT265 Server",
    version: "1.0.0",
    description: "Documentacion para la API del proyecto OT 265 Node.js",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || "3000"}`,
      description: "Local Dev",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  paths: {
    ...authRouteDoc,
    ...slidesRouteDoc,
    ...userRouteDoc,
    ...categoryRouteDoc,
    ...newsRouteDoc,
    ...testimonialsRouteDoc,
    ...membersRouteDoc,
  },
};

module.exports = swaggerDocumentation;
