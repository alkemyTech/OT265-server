const listUser = {
  tags: ["Users"],
  description: "List of the users",
  responses: {
    200: {
      description: "OK",
      content: {
        "aplication/json": {
          schema: {
            type: "object",
            example: {
              user: [],
            },
          },
        },
      },
    },
  },
};

const userRouteDoc = {
  "/users": {
    get: listUser,
  },
};


module.exports = userRouteDoc