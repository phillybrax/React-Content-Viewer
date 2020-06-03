import React from "react";

const panelStyle = {
  display: "flex",
  paddingTop: "50px",
  justifyContent: "center",
};

class ButtonPanel extends React.Component {
  renderButton = (key) => {
    return (
      <DetailButton
        key={key}
        name={this.props.details[key].lastName}
        isSelected={key === this.props.selected}
        onClick={() => this.props.handleSelection(key)}
      />
    );
  };

  render() {
    return (
      <div style={panelStyle}>
        {Object.keys(this.props.details).map(this.renderButton)}
      </div>
    );
  }
}

class DetailButton extends React.Component {
  render() {
    var className = "DetailButton";
    if (this.props.isSelected) {
      className += " Selected";
    }
    return (
      <button className={className} onClick={this.props.onClick}>
        {this.props.name}
      </button>
    );
  }
}

export default ButtonPanel;
