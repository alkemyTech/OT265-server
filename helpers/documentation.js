const userRouteDoc = require("../DocumentationSchemas/user.doc");
const categoryRouteDoc = require("../DocumentationSchemas/category.doc");
const newsRouteDoc = require("../DocumentationSchemas/news.doc");
const testimonialsRouteDoc = require("../DocumentationSchemas/testimonial.doc");
const authRouteDoc = require("../DocumentationSchemas/auth.docs");
const membersRouteDoc = require("../DocumentationSchemas/members.docs");

const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "OT265 Server",
    version: "1.0.0",
    description: "This is the description of documentation",
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
        scheme: "bearer"
      }
    }
  },
  tags: [
    {
      name: "Users",
      description: "Users routes",
    },
  ],
  paths: {
    ...authRouteDoc,
    ...userRouteDoc,
    ...categoryRouteDoc,
    ...newsRouteDoc,
    ...testimonialsRouteDoc,
    ...membersRouteDoc
  },
};

module.exports = swaggerDocumentation;
