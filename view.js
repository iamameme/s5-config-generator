const schemas = require('./src/schema/index');
const fs = require('fs');
const path = require('path');
const merge = require('deepmerge');
const viewFolder = path.join(__dirname, './src/view/');
const schemaTypes = Object.keys(schemas).map(key => key.toLowerCase().replace(/ /g, ""));

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

function combineRef(OGobj, formData, originalDef) {
    const obj = Object.assign({}, OGobj),
        originalDefinitions = Object.assign({}, originalDef),
        refLoc = (obj["$ref"].lastIndexOf("/") + 1),
        refLength = (obj["$ref"].length - 1),
        refName = obj["$ref"].substr(refLoc, refLength),
        defObj = originalDefinitions[refName],
        combinedObj = merge(obj, defObj, { arrayMerge: combineMerge });

    delete combinedObj["$ref"];
    return combinedObj;
}

function mutateItem(prop, formData, originalDef, pass) {
    var properties = Object.assign({}, prop),
        originalDefinitions = Object.assign({}, originalDef);
    let keys = Object.keys(properties);

    if (keys.indexOf("$ref") !== -1) {
        let combinedObj = combineRef(properties, formData, originalDefinitions);
        properties = combineRef(properties, formData, originalDefinitions);
    }
    keys = Object.keys(properties);

    if (keys.indexOf("properties") !== -1) {
        for (var def in properties.properties) {
            properties.properties[def] = mutateItem(properties.properties[def], formData, originalDefinitions);
        }
    }
    if (keys.indexOf("items") !== -1) {
        if (typeof (properties.items) === 'object') {
            properties.items = mutateItem(properties.items, formData, originalDefinitions, true);
        }
        if (Array.isArray(properties.items)) {
            for (var obj in properties.items) {
                properties.items[obj] = mutateItem(properties.items[obj], formData, originalDefinitions);
            }
        }
    }
    return properties;
}

function makeUISchema(props, formData, originalSchema) {
    var originalDefinitions = Object.assign({}, originalSchema.definitions),
        properties = Object.assign({}, props);
    if (!formData && properties) {
        for (var def in properties) {
            properties[def] = mutateItem(properties[def], formData, originalDefinitions);
        }
        return properties;
    }
}

function getViewJSON() {
    var typedViews = {},
        untypedViews = [];
    schemaTypes.forEach(type => typedViews[type] = {});

    // Adds default to each as "New View"
    for (var type in typedViews) {
        typedViews[type]['New View'] = { formData: schemas[Object.keys(schemas)[schemaTypes.indexOf(type)]] };
    };

    fs.readdirSync(viewFolder).forEach(filename => {
        var jsonObj = JSON.parse(fs.readFileSync(viewFolder + filename, 'utf8')),
            type = jsonObj.type;
        if (type && schemaTypes.indexOf(type.toLowerCase()) !== -1) {
            let originalSchema = typedViews[type.toLowerCase()]['New View'].formData.schema;
            typedViews[type.toLowerCase()][filename] = { formData: jsonObj, uiSchema: undefined };
            // typedViews[type.toLowerCase()][filename].uiSchema = makeUISchema(originalSchema.properties, null, originalSchema);
            // fs.writeFileSync('temp' + type + '.json', JSON.stringify(makeUISchema(originalSchema.properties, null, originalSchema)), 'utf-8');
        } else {
            untypedViews.push(jsonObj);
        }
    });

    let exportedViews = JSON.stringify({
        typedViews: typedViews,
        untypedViews: untypedViews
    });
    exportedViews = 'const exportedViews = ' + exportedViews + ' \nmodule.exports = exportedViews; \n';

    fs.writeFileSync('viewJSON.js', exportedViews, 'utf-8');
}

module.exports = {
    getViewJSON: getViewJSON
};