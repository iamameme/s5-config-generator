module.exports = {
    schema: {
        "title": "Rollup Schema",
        "type": "object",
        "properties": {
            "type": {
                "$ref": "#/definitions/type",
                "default": "rollup"
            },
            "view": {
                "$ref": "#/definitions/view",
                "items": {
                    "$ref": "#/definitions/rollupProperty",
                    "additionalProperties": true
                }
            }
        },
        "definitions": {
            "rollupProperty": {
                "title": "Rollup Property",
                "type": "object",
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
                    "formula": {
                        "$ref": "#/definitions/formula"
                    },
                    "xtype": {
                        "type": "string",
                        "title": "xtype",
                        "description": "Forces uniqueness from ID prop",
                        "default": "unique"
                    },
                    "includePercentage": {
                        "type": "boolean",
                        "title": "Include Percentage",
                        "description": "Includes the percentage of total when defined",
                        "default": "true"
                    }
                },
                "required": [
                    "dataIndex",
                    "text",
                    "renderer",
                    "formula"
                ]
            }
        },
        "required": [
            "type",
            "view"
        ],
    }
}