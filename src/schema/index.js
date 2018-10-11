var companionView = require("./companionView.schema");
var configure = require("./configure.schema");
var details = require("./details.schema");
var grid = require("./grid.schema");
var groupBy = require("./groupBy.schema");
var macro = require("./macro.schema");
var rollup = require("./rollup.schema");
var sort = require("./sort.schema");
var global = require("./global.schema");
var merge = require('deepmerge');

const emptyTarget = value => Array.isArray(value) ? [] : {}
const clone = (value, options) => merge(emptyTarget(value), value, options)
function combineMerge(target, source, options) {
    const destination = target.slice()

    source.forEach(function (e, i) {
        if (typeof destination[i] === 'undefined') {
            const cloneRequested = options.clone !== false
            const shouldClone = cloneRequested && options.isMergeableObject(e)
            destination[i] = shouldClone ? clone(e, options) : e
        } else if (options.isMergeableObject(e)) {
            destination[i] = merge(target[i], e, options)
        } else if (target.indexOf(e) === -1) {
            destination.push(e)
        }
    })
    return destination
}

function mutateObjectProperty(prop, value, obj) {
    obj.constructor === Object && Object.keys(obj).some(key => {
        if (key === prop) {
            obj[key] = value;
            return true;
        };
        mutateObjectProperty(prop, value, obj[key]);
    })
}

function addInheritedProps(object, key, originalObject, rootKey) {
    let keys = Object.keys(object);
    if (object["SEARCHCOMPLETE"]) { // Jank recursion
        return object;
    }
    if (keys.indexOf(key) !== -1) {
        return [object, rootKey];
    }
    var result, p;
    for (p in object) {
        if (object.hasOwnProperty(p) && typeof object[p] === 'object') {
            var found = addInheritedProps(object[p], key, originalObject, p);
            if (found && Array.isArray(found)) {
                result = found[0];
                let inheritedObj = originalObject["definitions"][result[key]],
                    mergedObject = merge(inheritedObj, result, { arrayMerge: combineMerge });
                delete mergedObject[key];
                mutateObjectProperty(found[1], mergedObject, originalObject);
                originalObject["SEARCHCOMPLETE"] = true;
                return originalObject;
            }
            if (found && Array.isArray(found)) {
                return found[0]
            } else if (found) {
                delete found["SEARCHCOMPLETE"];
                return found;
            }
        }
    }
    return result;
}

function buildProps(originalSchema, keyToSearch) {
    var inheritance = addInheritedProps(originalSchema, keyToSearch, originalSchema),
        finalSchema = inheritance;
    while (inheritance) {
        inheritance = addInheritedProps(inheritance, keyToSearch, inheritance);
        if (inheritance) finalSchema = inheritance;
    }
    if (inheritance) return finalSchema;
    if (!inheritance) return originalSchema;
}

const schemaList = [companionView, configure, details, grid, groupBy, macro, rollup, sort];

schemaList.forEach(function (schema) {
    const globalCopy = Object.assign({}, global);
    // Schema Merge
    schema.schema = merge(schema.schema, globalCopy.schema, { arrayMerge: combineMerge });
    // Build inherited properties 
    schema.schema = buildProps(schema.schema, "$inheritProps");
    // UISchema Merge
    if (schema.uiSchema) {
        schema.uiSchema = merge(schema.uiSchema, globalCopy.uiSchema, { arrayMerge: combineMerge });
    } else {
        schema.uiSchema = globalCopy.uiSchema;
    }
    // FormData Check
    if (!schema.formData) {
        schema.formData = {};
    }
});

module.exports = {
    "Companion View": companionView,
    Configure: configure,
    Details: details,
    Grid: grid,
    "Group By": groupBy,
    Macro: macro,
    Rollup: rollup,
    Sort: sort
}