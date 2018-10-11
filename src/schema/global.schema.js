module.exports = {
    schema: {
        "definitions": {
            "defaultViewSchema": {
                "type": "object",
                "properties": {
                    "view": {
                        "type": "array"
                    },
                    "defaults": {
                        "$ref": "#/definitions/defaults"
                    },
                    "default": {
                        "$ref": "#/definitions/default"
                    },
                    "hideEmptyRow": {
                        "$ref": "#/definitions/hideEmptyRow"
                    },
                    "id": {
                        "$ref": "#/definitions/id"
                    },
                    "model": {
                        "title": "Model Reference",
                        "type": "string",
                        "description": "A string reference to a model filename (excludes .modeldefn)"
                    },
                    "main": {
                        "$ref": "#/definitions/main"
                    }
                },
                "minItems": 1,
                "required": [
                    "view"
                ]
            },
            "view": {
                "type": "array",
                "title": "Array of Views",
                "description": "Add a view"
            },
            "dataIndex": {
                "type": "string",
                "title": "Data Index",
                "description": "Key to look for in pivot"
            },
            "main": {
                "type": "object",
                "title": "Main",
                "description": ""
            },
            "text": {
                "type": "string",
                "title": "Display Text",
                "description": "Text that will be displayed in view next to render value",
                "minLength": 1
            },
            "renderer": {
                "type": "string",
                "title": "Renderer",
                "description": "Renderer to use on value (enum)",
                "enum": [
                    "dollars",
                    "percent",
                    "usMoney",
                    "usMoneyRounded",
                    "thousand",
                    "twoDecimal",
                    "simplePercent",
                    "usMoneyNoCents",
                    "star",
                    "starRank",
                    "exclamation",
                    "arrowPercent",
                    "arrowPercentTwoDecimal",
                    "colorBand",
                    "integer",
                    "gridImage",
                    "backgroundFill",
                    "template",
                    ""
                ]
            },
            "formula": {
                "type": "string",
                "title": "Formula",
                "description": "How to render value (TODO: Make more descripive)",
                "minLength": 1
            },
            "id": {
                "type": "string",
                "title": "ID (Identifier)",
                "description": "Identifier of the file to reference (TODO: Make better)",
                "minLength": 1
            },
            "name": {
                "type": "string",
                "title": "Name",
                "description": "Name of the property",
                "minLength": 1
            },
            "type": {
                "type": "string",
                "title": "Type",
                "description": "Name of type of value",
                "minLength": 1
            },
            "sortable": {
                "type": "boolean",
                "title": "Is Sortable?",
                "description": "Turns sorting on or off",
                "default": false
            },
            "lockable": {
                "type": "boolean",
                "title": "Is Lockable",
                "description": "Allows locking or unlocking of item",
                "default": false
            },
            "draggable": {
                "type": "boolean",
                "title": "Is Draggable?",
                "description": "Turns dragging on or off",
                "default": false
            },
            "width": {
                "type": "number",
                "title": "Width",
                "description": "Width of element as an integer"
            },
            "align": {
                "type": "string",
                "title": "Alignment",
                "description": "CSS alignment property",
                "enum": [
                    "left",
                    "center",
                    "right"
                ]
            },
            "locked": {
                "type": "boolean",
                "title": "Locked?",
                "description": "Locks or unlocks item"
            },
            "hidden": {
                "type": "boolean",
                "title": "Hidden?",
                "description": "Controls if element is displayed or not",
                "default": true
            },
            "defaults": {
                "type": "object",
                "title": "Defaults",
                "description": "An object containing default properties. Use when more than one default is used",
                "properties": {
                    "first": {
                        "type": "string",
                        "title": "First Level",
                        "description": "First level to sort by"
                    },
                    "second": {
                        "type": "string",
                        "title": "Second Level",
                        "description": "Second level to sort by"
                    },
                    "third": {
                        "type": "string",
                        "title": "Third Level",
                        "description": "Third level to sort by"
                    },
                    "fourth": {
                        "type": "string",
                        "title": "Fourth Level",
                        "description": "Fourth level to sort by"
                    }
                }
            },
            "default": {
                "type": "string",
                "title": "Default",
                "description": "A string containing a default property"
            },
            "xtype": {
                "type": "string",
                "title": "XType",
                "description": "The xtype property"
            },
            "dimension": {
                "type": "string",
                "title": "Dimension",
                "description": "Dimension key for pivot (TODO)"
            },
            "hideEmptyRow": {
                "type": "boolean",
                "title": "Hide Empty Row",
                "description": "If turned on, will hide empty row",
                "default": true
            },
            "mask": {
                "type": "string",
                "title": "Mask",
                "description": ""
            },
            "type": {
                "type": "string",
                "title": "Config Type"
            }
        }
    },
    uiSchema: {
        "type": {
            "ui:disabled": true
        },
        "view": {
            "ui:options": {
                "orderable": true
            }
        },
        "main": {
            "ui:options": {
                "addable": true
            }
        }
    }
}