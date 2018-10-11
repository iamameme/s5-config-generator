module.exports = {
    schema: {
        "title": "Group By Schema",
        "type": "object",
        "properties": {
            "type": {
                "$ref": "#/definitions/type",
                "default": "groupBy"
            },
            "view": {
                "$ref": "#/definitions/view",
                "items": {
                    "$ref": "#/definitions/groupByOption"
                }
            }
        },
        "definitions": {
            "groupByOption": {
                "type": "object",
                "title": "Group By Option",
                "description": "An object option in the group by selector",
                "properties": {
                    "groupingKey": {
                        "type": "string",
                        "title": "Grouping Key",
                        "description": "Pivot key to group by (Ex. level:department)"
                    },
                    "dataIndex": {
                        "$ref": "#/definitions/dataIndex"
                    },
                    "text": {
                        "$ref": "#/definitions/text"
                    },
                    "xtype": {
                        "$ref": "#/definitions/xtype"
                    },
                    "dimension": {
                        "$ref": "#/definitions/dimension"
                    }
                }
            }
        },
        "required": [
            "type",
            "view"
        ],
    }
}