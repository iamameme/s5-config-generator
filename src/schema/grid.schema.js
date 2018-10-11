module.exports = {
    schema: {
        "title": "Grid Schema",
        "type": "object",
        "properties": {
            "type": {
                "$ref": "#/definitions/type",
                "default": "grid"
            },
            "main": {
                "$ref": "#/definitions/main",
                "properties": {
                    "rowHeight": {
                        "type": "number",
                        "title": "Row Height",
                        "description": "Height of the row"
                    }
                },
                "required": [
                    "rowHeight"
                ]
            },
            "view": {
                "$ref": "#/definitions/view",
                "items": {
                    "description": "One property of the grid",
                    "$ref": "#/definitions/gridProperty"
                }
            }
        },
        "definitions": {
            "sharedProperties": {
                "title": "Shared Props",
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
                    "sortable": {
                        "$ref": "#/definitions/sortable"
                    },
                    "draggable": {
                        "$ref": "#/definitions/draggable"
                    },
                    "lockable": {
                        "$ref": "#/definitions/lockable"
                    },
                    "locked": {
                        "$ref": "#/definitions/locked"
                    },
                    "hidden": {
                        "$ref": "#/definitions/hidden"
                    },
                    "align": {
                        "$ref": "#/definitions/align"
                    },
                    "width": {
                        "$ref": "#/definitions/width"
                    },
                    "resizable": {
                        "title": "Resizable?",
                        "description": "Turns resizability on or off",
                        "type": "boolean",
                        "default": true
                    },
                    "highlightText": {
                        "title": "Highlight Text",
                        "description": "Highlights the value if turned on",
                        "type": "boolean",
                        "default": true
                    },
                    "stylePaneOpenOnClick": {
                        "title": "Style Pane Open On Click",
                        "description": "Will cause the style pane window to open when the value is clicked",
                        "type": "boolean",
                        "default": true
                    }
                },
                "required": [
                    "text"
                ]
            },
            "gridProperty": {
                "title": "Grid Property",
                "type": "object",
                "$inheritProps": "sharedProperties",
                "properties": {
                    "columns": {
                        "type": "array",
                        "title": "Column Array",
                        "description": "Array of objects that make up a column",
                        "items": {
                            "title": "Column Property",
                            "type": "object",
                            "$ref": "#/definitions/sharedProperties",
                            "required": [
                                "dataIndex",
                                "text",
                                "lockable",
                                "draggable",
                                "align",
                                "sortable",
                                "renderer",
                                "width"
                            ]
                        },
                        "minItems": 1
                    },
                    "pinned": {
                        "type": "string",
                        "title": "Pinned",
                        "description": "What direction to be pinned (TODO)",
                        "enum": [
                            "left",
                            "center",
                            "right"
                        ]
                    },
                    "menuDisabled": {
                        "type": "boolean",
                        "title": "Menu Disabled?",
                        "description": "Controls if the menu is disabled or not (TODO)"
                    },
                    "xtype": {
                        "$ref": "#/definitions/xtype"
                    }
                }
            }
        },
        "required": [
            "type",
            "main",
            "view"
        ],
    }
}