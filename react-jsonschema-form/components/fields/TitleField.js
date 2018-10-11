import React from "react";
import PropTypes from "prop-types";
import { domainToASCII } from "url";

const REQUIRED_FIELD_SYMBOL = "*";

class TitleField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProperties: false
    };
    this.openProperties = this.openProperties.bind(this);
  }

  openProperties() {
    this.setState({
      showProperties: !this.state.showProperties
    });
  }

  render() {
    const { id, title, required, icon, iconOnClick, checkboxGroup, columnLength } = this.props;
    const legend = required ? title + REQUIRED_FIELD_SYMBOL : title;
    const iconStyle = {
      float: 'right',
      marginTop: 8,
      fontSize: 16
    };
    const showProperties = (this.state.showProperties) ? 'inherit' : 'none';
    const iconComponent = (icon) ? <i onClick={iconOnClick} className={`glyphicon glyphicon-${icon}`} style={iconStyle} /> : undefined;
    const buttonComponent = (
      <div style={{ float: 'right', marginRight: 10 }}>
        <button type={"button"} onClick={this.openProperties} className="btn btn-info" style={{ width: 135 }}>
          {"Set Properties"}
        </button>
        <div style={{
          display: showProperties,
          position: 'absolute',
          marginTop: 15,
          padding: 10,
          borderRadius: 10,
          backgroundColor: 'grey',
          fontWeight: 'normal',
          fontSize: 12,
          width: (columnLength * 150),
          zIndex: 999
        }}>
          {checkboxGroup}
        </div>
      </div>
    );
    const finalButton = (checkboxGroup) ? buttonComponent : undefined;
    return (
      <legend style={{ marginBottom: 5 }} id={id}>
        {legend}
        {iconComponent}
        {finalButton}
      </legend>
    );
  }
}
/*
if (process.env.NODE_ENV !== "production") {
  TitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
  };
}
*/

export default TitleField;
