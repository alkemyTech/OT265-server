
const getTestimonials = {
    tags: ["Testimonials"],
    description: "Get all testimonials",
    responses: {
        200: {
            description: "OK",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "ok": true,
                            "totalPages": 0.3,
                            "next": "http://localhost:3000/testimonials?page=2",
                            "previous": null,
                            "data": [
                                {
                                    "id": 1,
                                    "name": "Carlos",
                                    "image": "URLimage1",
                                    "content": "Testimonio de Carlos"
                                },
                                {
                                    "id": 2,
                                    "name": "María",
                                    "image": "URLimage2",
                                    "content": "Testimonio de María"
                                },
                                {
                                    "id": 3,
                                    "name": "Laura",
                                    "image": "URLimage3",
                                    "content": "Testimonio de Laura"
                                }
                            ]
                        },
                    },
                },
            },
        }
    },
};

const postTestimonials = {
    tags: ["Testimonials"],
    description: "Create a testimonial",
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
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            success: true,
                            message: 'Testimonial created successfully'
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
                                    "msg": "The name must not be empty.",
                                    "param": "param",
                                    "location": "body"
                                },
                                {
                                    "msg": "The name must be type string.",
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

const putTestimonial = {
    tags: ["Testimonials"],
    description: "Update a testimonial",
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
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "success": true,
                            "data": {
                                "id": 1,
                                "name": "Andrés",
                                "image": "URLimage",
                                "content": "Contenido de Andrés",
                                "deletedAt": null,
                                "createdAt": "2022-09-20T17:49:54.000Z",
                                "updatedAt": "2022-09-20T17:50:32.491Z"
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
                            "success": false,
                            "message": "Testimonial ID: 5 doesn't exist"
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

const deleteTestimonial = {
    tags: ["Testimonials"],
    description: "Delete a testimonal",
    responses: {
        200: {
            description: "OK",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "success": true,
                            "message": "Testimonial deleted successfully",
                            "data": {
                                "id": 1,
                                "name": "Carlos",
                                "image": "URLimage",
                                "content": "Contenido de carlos",
                                "deletedAt": null,
                                "createdAt": "2022-09-20T14:59:43.000Z",
                                "updatedAt": "2022-09-20T14:59:43.000Z"
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
                            "success": false,
                            "message": "Testimonial ID: 15 doesn't exist"
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

const testimonialsRouteDoc = {
    "/testimonials": {
      get: getTestimonials,
      post: postTestimonials,
    },
    "/testimonials/:id": {
        put: putTestimonial,
        delete: deleteTestimonial
      },
  };
  
  
  module.exports = testimonialsRouteDoc