module.exports = {
    schema: {
        "title": "Companion View Schema",
        "type": "object",
        "properties": {
            "type": {
                "$ref": "#/definitions/type",
                "default": "companionView"
            },
            "view": {
                "$ref": "#/definitions/view",
                "items": {
                    "$ref": "#/definitions/companionViewObject"
                }
            },
            "main": {
                "title": "Main",
                "description": "",
                "$ref": "#/definitions/companionViewObject"
            }
        },
        "required": [
            "type",
            "main",
            "view"
        ],
        "definitions": {
            "companionViewObject": {
                "type": "object",
                "title": "Companion View Option",
                "description": "A companion view option object",
                "properties": {
                    "stars": {
                        "type": "string",
                        "title": "Stars",
                        "description": "The attribute for the stars"
                    },
                    "image": {
                        "type": "string",
                        "title": "Image",
                        "description": "The attribute to display an image"
                    },
                    "title": {
                        "type": "string",
                        "title": "Title",
                        "description": "The attribute that will get the title"
                    },
                    "body": {
                        "type": "string",
                        "title": "Body",
                        "description": "The attribute which will get the body"
                    }
                },
                "required": [
                    "stars",
                    "image",
                    "title",
                    "body"
                ]
            }
        }
    },
    formData: {
        "type": "companionView",
        "view": [],
        "main": {
            "stars": "",
            "image": "",
            "title": "",
            "body": ""
        }
    }
}