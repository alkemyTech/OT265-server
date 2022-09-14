const getNews = {
    tags: ["News"],
    description: "Get all news",
    responses: {
        200: {
            description: "OK",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            news: {
                                "ok": true,
                                "totalPages": 0.3,
                                "next": "http://localhost:3000/news?page=2",
                                "previous": null,
                                "data": [
                                    {
                                        "id": 1,
                                        "name": "News name",
                                        "content": "News content",
                                        "image": "",
                                        "categoryId": 1
                                    },
                                    {
                                        "id": 2,
                                        "name": "News name",
                                        "content": "News content",
                                        "image": "",
                                        "categoryId": 1
                                    },
                                    {
                                        "id": 3,
                                        "name": "News name",
                                        "content": "News content",
                                        "image": "",
                                        "categoryId": 1
                                    }
                                ]
                            },
                        },
                    },
                },
            },
        }
    },
};

const getOneNews = {
    tags: ["News"],
    description: "Get one news",
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
                                "id": 267,
                                "name": "Edit",
                                "content": "Edit",
                                "image": "https://ot265-bucket-images.s3.sa-east-1.amazonaws.com/1663190321526descarga.jpg",
                                "createdAt": "2022-09-14T21:18:41.000Z",
                                "updatedAt": "2022-09-14T21:18:47.000Z",
                                "deletedAt": null,
                                "CategoryId": 6,
                                "categoryId": 6,
                                "category": {
                                    "name": "asd"
                                }
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
                            "ok": false,
                            "msg": "There is no news with id: 2123."
                        },
                    },
                },
            },
        }
    },
};

const postNews = {
    tags: ["News"],
    description: "Create a news",
    parameters: [
        {
            in: 'body',
            name: 'name',
            type: 'string',
            required: true
        },
        {
            in: 'body',
            name: 'content',
            type: 'string',
            required: true
        },
        {
            in: 'files',
            name: 'image',
            type: 'file',
            required: true
        },
        {
            in: 'body',
            name: 'categoryId',
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
                            "msg": "Created.",
                            "data": {
                                "id": 1,
                                "name": "News name",
                                "content": "News content",
                                "categoryId": "1",
                                "image": "",
                                "updatedAt": "2022-09-14T21:09:09.992Z",
                                "createdAt": "2022-09-14T21:09:09.992Z"
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
                            error: [
                                {
                                    "msg": "The param must not be empty.",
                                    "param": "param",
                                    "location": "body"
                                },
                                {
                                    "msg": "The param must be type string.",
                                    "param": "param",
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

const putNews = {
    tags: ["News"],
    description: "Update a news",
    parameters: [
        {
            in: 'body',
            name: 'name',
            type: 'string',
            required: false
        },
        {
            in: 'body',
            name: 'content',
            type: 'string',
            required: false
        },
        {
            in: 'files',
            name: 'image',
            type: 'file',
            required: false
        },
        {
            in: 'body',
            name: 'categoryId',
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
                            "msg": "Updated.",
                            "data": {
                                "id": 1,
                                "name": "News content edit",
                                "content": "News content edit",
                                "image": "",
                                "createdAt": "2022-09-14T21:18:41.000Z",
                                "updatedAt": "2022-09-14T21:18:47.220Z",
                                "deletedAt": null,
                                "categoryId": 1
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
                            "ok": false,
                            "msg": "There is no news with id: 1."
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

const deleteNews = {
    tags: ["News"],
    description: "Delete a news",
    responses: {
        200: {
            description: "OK",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "ok": true,
                            "msg": "Deleted.",
                            "data": {
                                "id": 1,
                                "name": "News name",
                                "content": "News content",
                                "image": "",
                                "createdAt": "2022-09-14T21:20:02.000Z",
                                "updatedAt": "2022-09-14T21:20:02.000Z",
                                "deletedAt": null,
                                "categoryId": 1
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
                            "ok": false,
                            "msg": "There is no news with id: 1."
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

const newsRouteDoc = {
    "/news": {
        get: getNews,
        post: postNews
    },
    "/news/:id": {
        get: getOneNews,
        put: putNews,
        delete: deleteNews
    }
};

module.exports = newsRouteDoc