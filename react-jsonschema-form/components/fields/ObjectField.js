import React, { Component } from "react";
import PropTypes from "prop-types";
import { Collapse } from 'react-collapse';
import ReactTooltip from "react-tooltip";
import { style } from "typestyle";
const tooltipObject = style({
  marginTop: '-15px !important'
});

import {
  orderProperties,
  retrieveSchema,
  getDefaultRegistry,
  getDefaultFormState
} from "../../utils";

class DefaultObjectFieldTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // Handles if properties should be shown or not
    this.props.properties.forEach(prop => {
      var showProp;
      if (prop.required) {
        showProp = true;
      } else {
        if (prop.content.props.formData !== undefined) {
          showProp = true;
        } else {
          console.log('formdata')
          this.props.changeFormData(prop.name);
        }
        if (typeof prop.content.props.formData === 'boolean' && (prop.content.props.formData === true || prop.content.props.formData === false)) {
          showProp = false;
        }
      }
      this.state[prop.name] = showProp;
    });
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.changeFormData(name);
    this.setState({
      [name]: value
    });
  }

  render() {
    const props = this.props;
    const { TitleField, DescriptionField } = props;
    let icon = (props.extendThis.state.show) ? "chevron-up" : "chevron-down";

    // Checkbox property stuff
    let checkboxColumnData = [],
      iterator = 0;
    for (var i = 0; i < props.properties.length; i++) if (i % 10 === 0) checkboxColumnData.push([]);
    props.properties.forEach((prop, i) => {
      const tooltip = (prop.required) ? (
        <ReactTooltip id={`tooltip-${prop.name}`} place="bottom" type="warning" effect="solid" className={tooltipObject}>
          <span>Required values can't be removed</span>
        </ReactTooltip>
      ) : undefined;
      const checkboxContent = (
        <div htmlFor={prop.name}
          data-tip
          data-for={`tooltip-${prop.name}`}>
          {tooltip}
          <p>
            {prop.name + ":"}
            &nbsp;
            <input
              name={prop.name}
              type="checkbox"
              checked={this.state[prop.name]}
              onChange={this.handleInputChange}
              style={{ float: 'right' }}
              disabled={prop.required}
            />
          </p>
          <br />
        </div>
      );
      // Creates additional columns
      if (i % 10 === 0 && i !== 0) {
        iterator += 1;
      }
      checkboxColumnData[iterator].push(checkboxContent);
    });
    let checkboxGroup = (
      <div className="container" style={{ width: '100%' }}>
        <div className="row" style={{ display: 'flex' }}>
          {checkboxColumnData.map(column => {
            return (
              <div className="col" style={{ margin: 10 }}>
                {column}
              </div>
            )
          })}
        </div>
      </div>
    );

    let allProperties = props.properties.map(prop => (this.state[prop.name]) ? prop.content : undefined);
    let content = (
      <Collapse isOpened={props.extendThis.state.show} hasNestedCollapse={true} style={{ marginLeft: 10 }}>
        {allProperties}
      </Collapse>
    );
    if (props.extendThis.props.idSchema.$id === "root") {
      content = allProperties;
      icon = undefined;
    }
    if (props.idSchema.$id === 'root') {
      checkboxGroup = undefined;
    }
    return (
      <fieldset>
        <div style={{ cursor: 'pointer' }}>
          {(props.uiSchema["ui:title"] || props.title) && (
            <div>
              <TitleField
                id={`${props.idSchema.$id}__title`}
                title={props.title || props.uiSchema["ui:title"]}
                required={props.required}
                formContext={props.formContext}
                icon={icon}
                iconOnClick={props.extendThis.showOnClick}
                checkboxGroup={checkboxGroup}
                columnLength={checkboxColumnData.length}
              />
            </div>
          )}
          {props.description && (
            <DescriptionField
              id={`${props.idSchema.$id}__description`}
              description={props.description}
              formContext={props.formContext}
            />
          )}
        </div>
        {content}
      </fieldset>
    );
  }
}

class ObjectField extends Component {
  constructor(props) {
    super(props);
    const {
      collapsed,
      idSchema,
      properties
    } = this.props;
    this.state = {
      show: (idSchema.$id === "root" || !collapsed) ? true : true // false / set to false to make collapsed on open 
    };
    this.showOnClick = this.showOnClick.bind(this);
  }

  static defaultProps = {
    uiSchema: {},
    formData: {},
    errorSchema: {},
    idSchema: {},
    required: false,
    disabled: false,
    readonly: false,
  };

  showOnClick() {
    this.setState({
      show: !this.state.show
    });
  }

  isRequired(name) {
    const schema = this.props.schema;
    return (
      Array.isArray(schema.required) && schema.required.indexOf(name) !== -1
    );
  }

  onPropertyChange = name => {
    return (value, errorSchema) => {
      debugger;
      const newFormData = { ...this.props.formData, [name]: value };
      this.props.onChange(
        newFormData,
        errorSchema &&
        this.props.errorSchema && {
          ...this.props.errorSchema,
          [name]: errorSchema,
        }
      );
    };
  };

  addRemoveProperty = (name, value) => {
    const {
      registry = getDefaultRegistry()
    } = this.props;
    // console.log(this.props.onChange)
    const { definitions } = registry;
    var defaultValue = (getDefaultFormState(this.props.schema.properties[name], undefined, definitions));
    var newFormData = { ...this.props.formData };
    var keys = Object.keys(newFormData);
    //console.log(name);
    console.log(newFormData);

    if (keys.indexOf(name) !== -1) {
      //console.log(name);
      delete newFormData[name];
      //console.log(newFormData)
      this.props.onChange(
        newFormData,
      );
    } else {
      //if (defaultValue === undefined) defaultValue = ' ';
      newFormData = { ...this.props.formData, [name]: defaultValue };
      this.props.onChange(
        newFormData
      );
    }
  };

  render() {
    const {
      uiSchema,
      formData,
      errorSchema,
      idSchema,
      name,
      required,
      disabled,
      readonly,
      idPrefix,
      onBlur,
      onFocus,
      registry = getDefaultRegistry()
    } = this.props;
    const { definitions, fields, formContext } = registry;
    const { SchemaField, TitleField, DescriptionField } = fields;
    const schema = retrieveSchema(this.props.schema, definitions, formData);
    const title = schema.title === undefined ? name : schema.title;
    const description = uiSchema["ui:description"] || schema.description;
    let orderedProperties;

    try {
      const properties = Object.keys(schema.properties);
      orderedProperties = orderProperties(properties, uiSchema["ui:order"]);
    } catch (err) {
      return (
        <div>
          <p className="config-error" style={{ color: "red" }}>
            Invalid {name || "root"} object field configuration:
            <em>{err.message}</em>.
          </p>
          <pre>{JSON.stringify(schema)}</pre>
        </div>
      );
    }

    const Template = registry.ObjectFieldTemplate || DefaultObjectFieldTemplate;
    var isSubview = false;

    const templateProps = {
      extendThis: this,
      title: uiSchema["ui:title"] || title,
      description,
      TitleField,
      DescriptionField,
      properties: orderedProperties.map(name => {
        /*if (formData[name] && typeof formData[name] === 'string') {
          isSubview = true;
        }
        var formDataProp = (isSubview) ? formData[name] : undefined;*/
        var formDataProp = formData[name];
        // console.log(isSubview);
        return {
          content: (
            <SchemaField
              key={name}
              name={name}
              required={this.isRequired(name)}
              schema={schema.properties[name]}
              uiSchema={uiSchema[name]}
              errorSchema={errorSchema[name]}
              idSchema={idSchema[name]}
              idPrefix={idPrefix}
              formData={formDataProp}
              onChange={this.onPropertyChange(name)}
              onBlur={onBlur}
              onFocus={onFocus}
              registry={registry}
              disabled={disabled}
              readonly={readonly}
            />
          ),
          name,
          readonly,
          disabled,
          required: this.isRequired(name),
        };
      }),
      required,
      idSchema,
      uiSchema,
      schema,
      formData,
      formContext,
      changeFormData: this.addRemoveProperty,
      isSubview: isSubview
    };
    return <Template {...templateProps} />;
  }
}

if (process.env.NODE_ENV !== "production") {
  ObjectField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    errorSchema: PropTypes.object,
    idSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.object,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object])
      ).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired,
      formContext: PropTypes.object.isRequired,
    }),
  };
}

export default ObjectField;
