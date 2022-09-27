const register = {
  tags: ["Auth"],
  description: "Register a user",
  security: [],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              example: "Pepe",
            },
            lastName: {
              type: "string",
              example: "Benítez",
            },
            email: {
              type: "string",
              example: "pepe.b@gmail.com",
            },
            password: {
              type: "string",
              example: "Pepe12345",
            },
            roleId: {
              type: "integer",
              example: 2,
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "OK",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              msg: "Usuario creado con exito.",
              user: {
                firstName: 1,
                lastName: "News name",
                email: "News content",
              },
              accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYzMDE3NDMxLCJleHAiOjE2NjMwMjEwMzF9.kYMm-wEMeT8vfXBoq3k-CoxpXfhN5Tmm-lsCQxdcp-4",
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
  },
};

const login = {
  tags: ["Auth"],
  description: "User login",
  security: [],
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              example: "miguel@gmail.com",
            },
            password: {
              type: "string",
              example: "Miguel1234",
            },
          },
        },
      },
    },
  },
  responses: {
    202: {
      description: "OK",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              msg: "Login Ok",
              user: {
                id: 3,
                firstName: "Juan Carlos",
                lastName: "Castillo",
                email: "juan@gmail.com",
                image:
                  "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png",
                password:
                  "$2a$10$Ocx/BWvH0pxHHnLx.WS/weG/cvgAdATRtQXvtzRLTYIKo3NPEj6SO",
                roleId: 1,
                deletedAt: null,
                createdAt: "2022-09-19T20:48:12.000Z",
                updatedAt: "2022-09-19T20:48:12.000Z",
              },
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjYzNjgzNzAwLCJleHAiOjE2NjM2ODczMDB9.GdRdSQJotr1CTS_66OpusuQsy2SfAeD7_sxh9vC_61U",
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
              msg: "User not found",
            },
          },
        },
      },
    },
    409: {
      description: "Bad Request",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              msg: "Invalid Password",
            },
          },
        },
      },
    },
  },
};

const dataUser = {
  tags: ["Auth"],
  description: "Get user data",
  responses: {
    200: {
      description: "OK",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              ok: true,
              data: {
                id: 3,
                firstName: "Juan Carlos",
                lastName: "Castillo",
                email: "juan@gmail.com",
                image:
                  "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png",
                roleId: 1,
              },
            },
          },
        },
      },
    },
    401: {
      description: "Bad Request",
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

const authRouteDoc = {
  "/auth/register": {
    post: register,
  },
  "/auth/login": {
    post: login,
  },
  "/auth/me": {
    get: dataUser,
  },
};

module.exports = authRouteDoc;
