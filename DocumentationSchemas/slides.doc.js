const getSlides = {
  tags: ["Slides"],
  description: "Get all slides",
  responses: {
    200: {
      description: "OK",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              slides: {
                ok: true,
                totalPages: 1,
                next: "http://localhost:3000/slides?page=2",
                previous: null,
                data: [
                  {
                    id: 1,
                    name: "Slides name",
                    content: "Slides content",
                    image: "http://www.example.com/image.jpg",
                    organizationId: 1,
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
};

const getOneSlides = {
  tags: ["Slides"],
  description: "Get one slide",
  responses: {
    200: {
      description: "OK",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              data: {},
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              ok: false,
              msg: "There is no Slides with id: 2123.",
            },
          },
        },
      },
    },
  },
};

// text, organizationId, image, order

const postSlides = {
  tags: ["Slides"],
  description: "Create a slide",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              example: "Test Slide 1",
            },
            organizationId: {
              type: "integer",
              example: 1,
            },
            image: {
              type: "string",
              example:
                "data:image/jpeg;base64,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",
            },
            order: {
              type: "integer",
              example: 1,
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              msg: "Created.",
              data: {
                id: 1,
                name: "Slides name",
                content: "Slides content",
                image: "http://www.example.com/image.jpg",
                organizationId: 1,
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              error: [
                {
                  msg: "The param must not be empty.",
                  param: "param",
                  location: "body",
                },
                {
                  msg: "The param must be type string.",
                  param: "param",
                  location: "body",
                },
              ],
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              ok: false,
              msg: "You don't have permissions for this request.",
            },
          },
        },
      },
    },
    403: {
      description: "Forbidden",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              error: "No envio un token valido.",
            },
          },
        },
      },
    },
  },
};

const putSlides = {
  tags: ["Slides"],
  description: "Update a Slides",
  parameters: [
    {
      in: "body",
      name: "text",
      type: "string",
      required: true,
    },
    {
      in: "body",
      name: "organizationId",
      type: "integer",
      required: true,
    },
    {
      in: "body",
      name: "image",
      type: "string",
      required: true,
    },
    {
      in: "body",
      name: "order",
      type: "integer",
      required: false,
    },
  ],
  responses: {
    200: {
      description: "OK",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              msg: "Updated.",
              data: {
                id: 1,
                name: "Slides name",
                content: "Slides content",
                image: "http://www.example.com/image.jpg",
                organizationId: 1,
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              ok: false,
              msg: "There is no Slides with id: 1.",
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              ok: false,
              msg: "You don't have permissions for this request.",
            },
          },
        },
      },
    },
    403: {
      description: "Forbidden",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              error: "No envio un token valido.",
            },
          },
        },
      },
    },
  },
};

const deleteSlides = {
  tags: ["Slides"],
  description: "Delete a Slides",
  responses: {
    200: {
      description: "OK",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              msg: "Deleted.",
              data: {
                id: 1,
                name: "Slides name",
                content: "Slides content",
                image: "http://www.example.com/image.jpg",
                organizationId: 1,
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              ok: false,
              msg: "There is no Slides with id: 1.",
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              ok: false,
              msg: "You don't have permissions for this request.",
            },
          },
        },
      },
    },
    403: {
      description: "Forbidden",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              error: "No envio un token valido.",
            },
          },
        },
      },
    },
  },
};

const SlidesRouteDoc = {
  "/slides": {
    get: getSlides,
    post: postSlides,
  },
  "/slides/:id": {
    get: getOneSlides,
    put: putSlides,
    delete: deleteSlides,
  },
};

module.exports = SlidesRouteDoc;
