module.exports = {
    schema: {
        "title": "Details Schema",
        "type": "object",
        "properties": {
            "type": {
                "$ref": "#/definitions/type",
                "default": "details"
            },
            "main": {
                "$ref": "#/definitions/main",
                "properties": {
                    "view": {
                        "type": "array",
                        "title": "Nested Main View",
                        "description": "Detail view main options",
                        "items": {
                            "type": "object",
                            "title": "View Option",
                            "description": "A view main option object",
                            "properties": {
                                "dataIndex": {
                                    "$ref": "#/definitions/dataIndex"
                                },
                                "text": {
                                    "$ref": "#/definitions/text"
                                },
                                "renderer": {
                                    "$ref": "#/definitions/renderer"
                                },
                                "xtype": {
                                    "$ref": "#/definitions/xtype"
                                },
                                "mask": {
                                    "$ref": "#/definitions/mask"
                                }
                            }
                        }
                    }
                }
            },
            "view": {
                "$ref": "#/definitions/view",
                "items": {
                    "type": "object",
                    "title": "View Option",
                    "description": "A view option object",
                    "properties": {
                        "dataIndex": {
                            "$ref": "#/definitions/dataIndex"
                        },
                        "text": {
                            "$ref": "#/definitions/text"
                        },
                        "renderer": {
                            "$ref": "#/definitions/renderer"
                        }
                    },
                    "required": [
                        "dataIndex",
                        "text",
                        "renderer"
                    ]
                }
            }
        },
        "definitions": {},
        "required": [
            "type",
            "main",
            "view"
        ],
    }
}