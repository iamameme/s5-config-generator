module.exports = {
    schema: {
        "title": "Sort Schema",
        "type": "object",
        "properties": {
            "type": {
                "$ref": "#/definitions/type",
                "default": "sort"
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
                        }
                    }
                }
            }
        },
        "definitions": {},
        "required": [
            "type",
            "view"
        ],
    }
}