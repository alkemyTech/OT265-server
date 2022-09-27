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
  description: "Get one Slides",
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
  description: "Create a Slides",
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
