const getCategories = {
    tags: ["Categories"],
    description: "You can get the complete list of categories with pagination.",
    parameters: [
        {
            in: 'query',
            name: 'page',
            type: 'integer',
            required: false
        }
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "ok": true,
                            "totalPages": 2.7,
                            "next": "http://localhost:3000/categories?page=2",
                            "previous": null,
                            "data": [
                                {
                                    "name": "Category 1"
                                },
                                {
                                    "name": "Category 2"
                                },
                                {
                                    "name": "Category 3"
                                }
                            ]
                        },
                    },
                },
            },
        }
    },
};

const getOneCategory = {
    tags: ["Categories"],
    description: "You can get a category by id.",
    parameters: [
        {
            in: 'params',
            name: 'id',
            type: 'integer',
            required: true
        }
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "ok": true,
                            "data": {
                                "id": 4,
                                "name": "Category Test 2",
                                "description": "Category content test for this model.",
                                "image": "Category.png"
                            }
                        },
                    },
                },
            },
        },
        404: {
            description: "Not Found",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "msg": "Category not found."
                        },
                    },
                },
            },
        },
    },
};

const postCategory = {
    tags: ["Categories"],
    description: "You can create a new category.",
    responses: {
        200: {
            description: "OK",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "ok": true,
                            "data": {
                                "id": 46,
                                "name": "New Category",
                                "description": "New Category",
                                "updatedAt": "2022-09-21T00:59:16.936Z",
                                "createdAt": "2022-09-21T00:59:16.936Z"
                            }
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
                            "errors": [
                                {
                                    "msg": "El nombre es obligatorio y debe ser un string.",
                                    "param": "name",
                                    "location": "body"
                                },
                                {
                                    "msg": "El nombre es obligatorio y debe ser un string.",
                                    "param": "name",
                                    "location": "body"
                                }
                            ]
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
                            "ok": false,
                            "msg": "You don't have permissions for this request."
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

const putCategory = {
    tags: ["Categories"],
    description: "You can edit categories.",
    parameters: [
        {
            in: 'body',
            name: 'name',
            type: 'integer',
            required: false
        },
        {
            in: 'body',
            name: 'description',
            type: 'integer',
            required: false
        },
        {
            in: 'files',
            name: 'image',
            type: 'file',
            required: false
        }
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "ok": true,
                            "data": {
                                "id": 4,
                                "name": "New Category",
                                "description": "New Category",
                                "image": "Category.png",
                                "updatedAt": "2022-09-21T02:29:45.193Z"
                            }
                        },
                    },
                },
            },
        },
        404: {
            description: "Not Found",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "msg": "Category not found."
                        },
                    },
                },
            },
        },
    },
};

const deleteCategory = {
    tags: ["Categories"],
    description: "You can delete categories.",
    parameters: [
        {
            in: 'params',
            name: 'id',
            type: 'integer',
            required: true
        }
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "ok": true,
                            "data": {
                                "id": 4,
                                "name": "New Category",
                                "description": "New Category",
                                "image": "Category.png"
                            }
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
        404: {
            description: "Not Found",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "msg": "Category not found."
                        },
                    },
                },
            },
        },
    },
};

const categoryRouteDoc = {
    "/categories?page=1": {
        get: getCategories
    },
    "/categories": {
        post: postCategory
    },
    "/categories/:id": {
        get: getOneCategory,
        put: putCategory,
        delete: deleteCategory
    }
};

module.exports = categoryRouteDoc