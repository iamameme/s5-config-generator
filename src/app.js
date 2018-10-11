import React, { Component } from "react";
import { render } from "react-dom";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";

import { shouldRender } from "../react-jsonschema-form/utils";
import schemas from "./schema";
import viewObjs from "../viewJSON";
import Form from "../react-jsonschema-form";
import _ from "lodash";

import Modal from './components/Modal';
import { style } from 'typestyle';

// Import a few CodeMirror themes; these are used to match alternative
// bootstrap ones.
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/mbo.css";
import "codemirror/theme/ttcn.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/eclipse.css";

const lowerSchemas = _.transform(schemas, function (result, val, key) {
    result[(key.toLowerCase()).replace(/ /g, "")] = val;
});
const defaultView = "Companion View";

const log = type => console.log.bind(console, type);
const fromJson = json => JSON.parse(json);
const toJson = val => JSON.stringify(val, null, 2);
const liveValidateSchema = { type: "boolean", title: "Live validation" };
const cmOptions = {
    theme: "paper",
    height: "auto",
    viewportMargin: Infinity,
    mode: {
        name: "javascript",
        json: true,
        statementIndent: 2,
    },
    lineNumbers: true,
    lineWrapping: true,
    indentWithTabs: false,
    tabSize: 2,
};
const themes = {
    default: {
        stylesheet:
            "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
    },
    cerulean: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/cerulean/bootstrap.min.css",
    },
    cosmo: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/cosmo/bootstrap.min.css",
    },
    cyborg: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/cyborg/bootstrap.min.css",
        editor: "blackboard",
    },
    darkly: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/darkly/bootstrap.min.css",
        editor: "mbo",
    },
    flatly: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/flatly/bootstrap.min.css",
        editor: "ttcn",
    },
    journal: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/journal/bootstrap.min.css",
    },
    lumen: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/lumen/bootstrap.min.css",
    },
    paper: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/paper/bootstrap.min.css",
    },
    readable: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/readable/bootstrap.min.css",
    },
    sandstone: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/sandstone/bootstrap.min.css",
        editor: "solarized",
    },
    simplex: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/simplex/bootstrap.min.css",
        editor: "ttcn",
    },
    slate: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/slate/bootstrap.min.css",
        editor: "monokai",
    },
    spacelab: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/spacelab/bootstrap.min.css",
    },
    "solarized-dark": {
        stylesheet:
            "//cdn.rawgit.com/aalpern/bootstrap-solarized/master/bootstrap-solarized-dark.css",
        editor: "dracula",
    },
    "solarized-light": {
        stylesheet:
            "//cdn.rawgit.com/aalpern/bootstrap-solarized/master/bootstrap-solarized-light.css",
        editor: "solarized",
    },
    superhero: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/superhero/bootstrap.min.css",
        editor: "dracula",
    },
    united: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/united/bootstrap.min.css",
    },
    yeti: {
        stylesheet:
            "//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/yeti/bootstrap.min.css",
        editor: "eclipse",
    },
};

class GeoPosition extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props.formData };
    }

    onChange(name) {
        return event => {
            this.setState({ [name]: parseFloat(event.target.value) });
            setImmediate(() => this.props.onChange(this.state));
        };
    }

    render() {
        const { lat, lon } = this.state;
        return (
            <div className="geo">
                <h3>Hey, I'm a custom component</h3>
                <p>
                    I'm registered as <code>geo</code> and referenced in
          <code>uiSchema</code> as the <code>ui:field</code> to use for this
                                                                                                                                                                                                                                                                                                                                                    schema.
        </p>
                <div className="row">
                    <div className="col-sm-6">
                        <label>Latitude</label>
                        <input
                            className="form-control"
                            type="number"
                            value={lat}
                            step="0.00001"
                            onChange={this.onChange("lat")}
                        />
                    </div>
                    <div className="col-sm-6">
                        <label>Longitude</label>
                        <input
                            className="form-control"
                            type="number"
                            value={lon}
                            step="0.00001"
                            onChange={this.onChange("lon")}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = { valid: true, code: props.code };
    }

    componentWillReceiveProps(props) {
        this.setState({ valid: true, code: props.code });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldRender(this, nextProps, nextState);
    }

    onCodeChange = (editor, metadata, code) => {
        this.setState({ valid: true, code });
        setImmediate(() => {
            try {
                this.props.onChange(fromJson(this.state.code));
            } catch (err) {
                this.setState({ valid: false, code });
            }
        });
    };

    render() {
        const { title, theme } = this.props;
        const icon = this.state.valid ? "ok" : "ok"; // Changed so always valid
        const cls = this.state.valid ? "valid" : "valid";
        return (
            <div className="panel panel-default" style={{ height: '100%' }}>
                <div className="panel-heading">
                    <span className={`${cls} glyphicon glyphicon-${icon}`} />
                    {" " + title}
                </div>
                <CodeMirror
                    value={this.state.code}
                    onChange={this.onCodeChange}
                    autoCursor={false}
                    options={Object.assign({}, cmOptions, { theme })}
                />
            </div>
        );
    }
}

class Selector extends Component {
    constructor(props) {
        super(props);
        this.state = { current: defaultView };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldRender(this, nextProps, nextState);
    }

    onLabelClick = label => {
        return event => {
            event.preventDefault();
            this.setState({ current: label });
            setImmediate(() => this.props.onSelected(schemas[label], label));
        };
    };

    render() {
        return (
            <ul className="nav nav-pills">
                {Object.keys(schemas).map((label, i) => {
                    return (
                        <li
                            key={i}
                            role="presentation"
                            className={this.state.current === label ? "active" : ""}>
                            <a href="#" onClick={this.onLabelClick(label)}>
                                {label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

function ThemeSelector({ theme, select }) {
    const themeSchema = {
        type: "string",
        enum: Object.keys(themes),
    };
    return (
        <Form
            schema={themeSchema}
            formData={theme}
            onChange={({ formData }) => select(formData, themes[formData])}>
            <div />
        </Form>
    );
}

function ViewSelector({ type, subview, select }) {
    if (type) {
        type = type.toLowerCase();
        const keys = Object.keys(viewObjs.typedViews[type]);
        const viewSchema = {
            type: "string",
            enum: keys,
        };
        return (
            <Form
                schema={viewSchema}
                formData={subview}
                onChange={({ formData }) => {
                    let subviewName = formData,
                        subviewForm = Object.assign({}, viewObjs.typedViews[type][subviewName]),
                        newFormData = Object.assign({}, lowerSchemas[type]);
                    if (subviewName !== 'New View' && subviewName !== '') newFormData["formData"] = subviewForm["formData"];
                    select(subviewName, newFormData, type);
                }}
            >
                <div />
            </Form>
        );
    } else {
        return null;
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        // initialize state with Simple data sample
        const { schema, uiSchema, formData, validate } = schemas[defaultView];
        this.state = {
            form: false,
            schema,
            uiSchema,
            formData,
            validate,
            editor: "default",
            theme: "paper",
            liveValidate: false,
            shareURL: null,
            hideEditor: true,
            view: defaultView,
            subview: "New View",
            editorFormData: undefined,
            showFormData: false,
            formDataToShow: undefined
        };

        this.toggleFormData = this.toggleFormData.bind(this);
    }

    componentDidMount() {
        const hash = document.location.hash.match(/#(.*)/);
        if (hash && typeof hash[1] === "string" && hash[1].length > 0) {
            try {
                this.load(JSON.parse(atob(hash[1])));
            } catch (err) {
                alert("Unable to load form setup data.");
            }
        } else {
            this.load(schemas[defaultView]);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        debugger;
        return shouldRender(this, nextProps, nextState);
    }

    load = (data, label, subview) => {
        if (!label) label = defaultView;
        // Reset the ArrayFieldTemplate whenever you load new data
        const { ArrayFieldTemplate, ObjectFieldTemplate } = data;
        // force resetting form component instance
        this.setState({ form: false }, _ => {
            this.setState({
                ...data,
                subview: (subview) ? subview : 'New View',
                form: true,
                ArrayFieldTemplate,
                ObjectFieldTemplate,
                currentType: label.toLowerCase().replace(/ /g, ""),
                editorFormData: undefined
            })
        }
        );
    };

    onSchemaEdited = schema => this.setState({ schema, shareURL: null });

    onUISchemaEdited = uiSchema => this.setState({ uiSchema, shareURL: null });

    onFormDataEdited = formData => {
        this.setState({ formData, shareURL: null })
    }

    onThemeSelected = (theme, { stylesheet, editor }) => {
        this.setState({ theme, editor: editor ? editor : "paper" });
        setImmediate(() => {
            // Side effect!
            document.getElementById("theme").setAttribute("href", stylesheet);
        });
    };

    onSubviewSelected = (subviewName, formData, type) => {
        console.log(subviewName);
        console.log(formData);
        this.load(formData, type, subviewName);
    }

    setLiveValidate = ({ formData }) => this.setState({ liveValidate: formData });

    onFormDataChange = ({ formData, editorFormData }) => {
        this.setState({ formData, editorFormData, shareURL: null });
    }

    onShare = () => {
        const { formData, schema, uiSchema } = this.state;
        const {
            location: { origin, pathname },
        } = document;
        try {
            const hash = btoa(JSON.stringify({ formData, schema, uiSchema }));
            this.setState({ shareURL: `${origin}${pathname}#${hash}` });
        } catch (err) {
            this.setState({ shareURL: null });
        }
    };

    hideEditors = () => {
        this.setState({
            hideEditor: !this.state.hideEditor
        });
    };

    cleanEditorFormData(formData) {
        var traverseNestedObject = function (obj) {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    if (typeof obj[i] === 'object' || Array.isArray(obj[i])) { traverseNestedObject(obj[i]); }
                    if (typeof obj[i] === 'boolean') delete obj[i];
                    if (typeof obj[i] === 'string') {
                        try {
                            var bool = JSON.parse(obj[i]);
                            obj[i] = bool;
                        } catch (error) { }
                    }
                }
            }
            return obj;
        };

        var newFormData = traverseNestedObject(formData);
        return newFormData;
    }

    removeEmptyArrayObjects(obj) {
        var traverseNestedObject = function (obj) {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    // if (Array.isArray(obj[i])) debugger;
                    if (Array.isArray(obj[i]) && obj[i].length === 1 && Object.keys(obj[i][0]).length === 0 && i !== "view")
                        delete obj[i];
                    if (Array.isArray(obj[i])) traverseNestedObject(obj[i]);
                    if (!Array.isArray(obj[i]) && typeof obj[i] === 'object') traverseNestedObject(obj[i]);
                }
            }
            return obj;
        };
        return traverseNestedObject(obj);
    }

    toggleFormData() {
        this.setState({
            showFormData: !this.state.showFormData
        });
    }

    render() {
        const {
            schema,
            uiSchema,
            formData,
            liveValidate,
            validate,
            theme,
            editor,
            ArrayFieldTemplate,
            ObjectFieldTemplate,
            transformErrors,
            view,
            currentType,
            subview,
            formDataToShow
        } = this.state;
        const buttonText = (this.state.hideEditor) ? "Show Editor" : "Hide Editor";
        var editorFormData = this.removeEmptyArrayObjects((this.state.editorFormData)
            ? this.cleanEditorFormData(this.state.editorFormData) : formData);

        let editors;
        const editorStyles = style({
            minHeight: '100%',
            height: '100%'
        });
        if (this.state.hideEditor) {
            editors = (
                <div className="col-sm-5">
                    <Editor
                        title="formData"
                        theme={editor}
                        code={toJson(editorFormData)}
                        onChange={this.onFormDataEdited}
                    />
                </div>
            );
        } else {
            editors = (
                <div className="col-sm-7">
                    <Editor
                        title="JSONSchema"
                        theme={editor}
                        code={toJson(schema)}
                        onChange={this.onSchemaEdited}
                    />
                    <div className="row">
                        <div className="col-sm-6">
                            <Editor
                                title="UISchema"
                                theme={editor}
                                code={toJson(uiSchema)}
                                onChange={this.onUISchemaEdited}
                            />
                        </div>
                        <div className="col-sm-6">
                            <Editor
                                title="formData"
                                theme={editor}
                                code={toJson(editorFormData)}
                                onChange={this.onFormDataEdited}
                            />
                        </div>
                    </div>
                </div>
            );
        }
        function doNothing() {
            console.log('nothing')
        }

        return (
            <div className="container-fluid">
                <Modal formData={formData} showModal={this.state.showFormData} handleClose={this.toggleFormData} />
                <div className="page-header">
                    <h3>S5 Configuration Generator</h3>
                    <div className="row">
                        <div className="col-sm-9">
                            <Selector onSelected={this.load} />
                        </div>
                        <div className="col-sm-1">
                            <Form
                                schema={liveValidateSchema}
                                formData={liveValidate}
                                onChange={this.setLiveValidate}>
                                <div />
                            </Form>
                        </div>
                        {/* <div className="col-sm-1" style={{ marginBottom: 20 }}>
                            <button className="btn btn-primary" onClick={this.hideEditors}>
                                {buttonText}
                            </button>
                         </div> 
                        <div className="col-sm-1" style={{ marginBottom: 20 }}>
                            <button className="btn btn-primary" onClick={this.toggleFormData}>
                                {"Submit / Get Data"}
                            </button>
                        </div>
                        */}
                        {/* <div className="col-sm-2">
              <ThemeSelector theme={theme} select={this.onThemeSelected} />
            </div> */}
                    </div>
                </div>
                <div className="col-sm-9" style={{ paddingLeft: 30, left: '50%', transform: 'translateX(-50%)' }}>
                    <p>Edit an existing view: </p>
                    <ViewSelector type={currentType} subview={subview} select={this.onSubviewSelected} />
                    {/*editors*/}
                    <div className={"col-sm-12"} style={{ float: 'right', backgroundColor: 'rgba(0,0,0,.1)' }}>
                        {this.state.form && (
                            <Form
                                ArrayFieldTemplate={ArrayFieldTemplate}
                                ObjectFieldTemplate={ObjectFieldTemplate}
                                liveValidate={liveValidate}
                                schema={schema}
                                uiSchema={uiSchema}
                                formData={editorFormData}
                                onChange={doNothing} // this.onFormDataChange}
                                onSubmit={({ formData }) => {
                                    if (formData) {
                                        this.setState({
                                            showFormData: true,
                                            formData: formData
                                        })
                                    }
                                }}
                                fields={{ geo: GeoPosition }}
                                validate={validate}
                                onBlur={(id, value) =>
                                    console.log(`Touched ${id} with value ${value}`)
                                }
                                onFocus={(id, value) =>
                                    console.log(`Focused ${id} with value ${value}`)
                                }
                                transformErrors={transformErrors}
                                onError={log("errors")}>
                                <div className="row">
                                    <div className="col-sm-3" style={{ marginBottom: 20 }}>
                                        <button className="btn btn-primary" type="submit">
                                            Submit / Get Data
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

render(<App />, document.getElementById("app"));
