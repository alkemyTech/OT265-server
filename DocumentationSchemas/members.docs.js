
const getMembers = {
    tags: ["Members"],
    description: "Get all members",
    parameters: [
        {
            in: 'query',
            name: 'page',
            type: 'string',
            required: false
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
                            "ok": true,
                            "totalPages": 1,
                            "next": null,
                            "previous": null,
                            "data": [
                                {
                                    "id": 1,
                                    "name": "Carlos",
                                    "facebookUrl": "facebook.com/carlos",
                                    "instagramUrl": "instagram/carlos",
                                    "linkedinUrl": "linkedin/in/carlos",
                                    "image": "URLimage",
                                    "description": "Descripcion de Carlos"
                                },
                                {
                                    "id": 2,
                                    "name": "María",
                                    "facebookUrl": "facebook.com/maria",
                                    "instagramUrl": "instagram.com/maria",
                                    "linkedinUrl": "linkedin/in/maria",
                                    "image": "URLimage",
                                    "description": "Descripcion de Maria"
                                },
                                {
                                    "id": 3,
                                    "name": "Laura",
                                    "facebookUrl": "facebook.com/laura",
                                    "instagramUrl": "instagram.com/laura",
                                    "linkedinUrl": "linkedin/in/laura",
                                    "image": "URLimage",
                                    "description": "Descripcion de Laura"
                                },
                            ]
                        },
                    },
                },
            },
        }
    },
};

const postMember = {
    tags: ["Members"],
    description: "Create new member",
    parameters: [
        {
            in: 'body',
            name: 'name',
            type: 'string',
            required: true
        },
        {
            in: 'body',
            name: 'facebookUrl',
            type: 'string',
            required: false
        },
        {
            in: 'body',
            name: 'instagramUrl',
            type: 'string',
            required: false
        },
        {
            in: 'body',
            name: 'linkedinUrl',
            type: 'string',
            required: false
        },
        {
            in: 'body',
            name: 'description',
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
                            message: 'Member created successfully'
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
            description: "Invalid",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            success: false,
                            message: 'invalid image format',
                            image: `"url of the image sent"`
                        },
                    },
                },
            },
        },
    },
};

const putMember = {
    tags: ["Members"],
    description: "Update member",
    parameters: [
        {
            in: 'params',
            name: 'id',
            type: 'string',
            required: true
        },
        {
            in: 'body',
            name: 'name',
            type: 'string',
            required: true
        },
        {
            in: 'body',
            name: 'facebookUrl',
            type: 'string',
            required: false
        },
        {
            in: 'body',
            name: 'instagramUrl',
            type: 'string',
            required: false
        },
        {
            in: 'body',
            name: 'linkedinUrl',
            type: 'string',
            required: false
        },
        {
            in: 'body',
            name: 'description',
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
                            "ok": true,
                            "data": {
                                "id": 1,
                                "name": "Carlos",
                                "facebookUrl": "facebook.com/carlos",
                                "instagramUrl": "instagram/carlos",
                                "linkedinUrl": "linkedin/in/carlos",
                                "description": "Descripcion de Carlos",
                                "image": "URLimage",
                                "deletedAt": null,
                                "createdAt": "2022-09-20T17:49:54.000Z",
                                "updatedAt": "2022-09-20T17:50:32.491Z"
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: "Not found",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "success": true,
                            "message": "The member id: /id/ doesn't exist",
                        },
                    },
                },
            },
        },
        403: {
            description: "Invalid",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            success: false,
                            message: 'invalid image format',
                            image: `"url of the image sent"`
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

const deleteMember = {
    tags: ["Members"],
    description: "Delete member",
    parameters: [
        {
            in: 'params',
            name: 'id',
            type: 'string',
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
                            "ok": true,
                            "data": {
                                "id": 1,
                                "name": "Carlos",
                                "facebookUrl": "facebook.com/carlos",
                                "instagramUrl": "instagram/carlos",
                                "linkedinUrl": "linkedin/in/carlos",
                                "description": "Descripcion de Carlos",
                                "image": "URLimage",
                                "deletedAt": null,
                                "createdAt": "2022-09-20T17:49:54.000Z",
                                "updatedAt": "2022-09-20T17:50:32.491Z"
                            },
                        },
                    },
                },
            },
        },
        404: {
            description: "Not found",
            content: {
                "aplication/json": {
                    schema: {
                        type: "object",
                        example: {
                            "msg": "Member not found"
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

const membersRouteDoc = {
    "/member": {
      get: getMembers,
      post: postMember,
    },
    "/member/:id": {
        put: putMember,
        delete: deleteMember,
      },
  };
  
  
  module.exports = membersRouteDoc