module.exports = {
    schema: {
        "title": "Macro Schema",
        "type": "object",
        "properties": {
            "type": {
                "$ref": "#/definitions/type",
                "default": "macro"
            },
            "view": {
                "$ref": "#/definitions/view",
                "items": {
                    "$ref": "#/definitions/macroOption",
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
                        "view": {
                            "type": "array",
                            "title": "Nested View",
                            "description": "Macro view nested options",
                            "items": {
                                "$ref": "#/definitions/macroOption"
                            }
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
        "definitions": {
            "macroOption": {
                "type": "object",
                "title": "Macro Option",
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
                    },
                    "xtype": {
                        "$ref": "#/definitions/xtype"
                    }
                },
                "required": [
                    "dataIndex",
                    "text",
                    "renderer"
                ]
            }
        },
        "required": [
            "type",
            "view"
        ],
    }
}