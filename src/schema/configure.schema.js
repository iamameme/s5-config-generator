module.exports = {
    schema: {
        "title": "Configure Schema",
        "type": "object",
        "properties": {
            "type": {
                "$ref": "#/definitions/type",
                "default": "configure"
            },
            "main": {
                "$ref": "#/definitions/main",
                "properties": {
                    "info": {
                        "type": "string",
                        "title": "Info",
                        "description": "",
                        "default": "Select View Option"
                    }
                },
                "require": [
                    "info"
                ]
            },
            "view": {
                "$ref": "#/definitions/view",
                "items": {
                    "type": "object",
                    "title": "View",
                    "properties": {
                        "dataIndex": {
                            "$ref": "#/definitions/dataIndex",
                            "enum": [
                                "first",
                                "second",
                                "third",
                                "fourth"
                            ]
                        },
                        "text": {
                            "$ref": "#/definitions/text"
                        },
                        "view": {
                            "type": "array",
                            "title": "Nested View",
                            "description": "A nested view array",
                            "items": {
                                "type": "object",
                                "title": "Nested View Option",
                                "description": "A nested view option object",
                                "properties": {
                                    "dataIndex": {
                                        "$ref": "#/definitions/dataIndex"
                                    },
                                    "text": {
                                        "$ref": "#/definitions/text"
                                    },
                                    "xtype": {
                                        "$ref": "#/definitions/xtype"
                                    }
                                },
                                "required": [
                                    "dataIndex",
                                    "text",
                                    "xtype"
                                ]
                            }
                        }
                    },
                    "required": [
                        "dataIndex",
                        "text",
                        "view"
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
    },
    uiSchema: undefined,
    formData: {
        "type": "configure",
        "defaults": {
            "first": ""
        },
        "main": {
            "info": "Select View Options"
        },
        "view": [
            {
                "dataIndex": "first",
                "text": "Level One",
                "view": []
            }
        ]
    }
}