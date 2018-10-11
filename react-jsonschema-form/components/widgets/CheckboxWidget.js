import React from "react";
import PropTypes from "prop-types";
import DescriptionField from "../fields/DescriptionField.js";
import ReactTooltip from "react-tooltip";

function CheckboxWidget(props) {
  const {
    schema,
    id,
    value,
    required,
    disabled,
    readonly,
    label,
    autofocus,
    onChange,
  } = props;
  const tooltip = (schema.description && schema.description.length > 0) ? (
    <ReactTooltip delayHide={200} id={`tooltip-checkbox-${id}`} place="bottom" type="success" effect="solid">
      <span>{schema.description}</span>
    </ReactTooltip>
  ) : undefined;
  return (
    <div className={`checkbox ${disabled || readonly ? "disabled" : ""}`}>
      <label data-tip data-for={`tooltip-checkbox-${id}`}>
        <input
          type="checkbox"
          id={id}
          checked={typeof value === "undefined" ? false : value}
          required={required}
          disabled={disabled || readonly}
          autoFocus={autofocus}
          onChange={event => {
            debugger;
            onChange(event.target.checked.toString())
          }}
        />
        <span>{label}</span>
      </label>
      {tooltip}
    </div>
  );
}

CheckboxWidget.faultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  CheckboxWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default CheckboxWidget;
