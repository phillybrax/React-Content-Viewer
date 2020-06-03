import React from "react";
import "../css/App.css";
import details from "../Data";
import DetailView from "./DetailView";
import ButtonPanel from "./ButtonPanel";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: details,
      selected: "bellows",
    };
  }

  handleSelection = (key) => {
    this.setState({
      selected: key,
    });
  };
  render() {
    return (
      <div className="App">
        <ButtonPanel
          details={this.state.details}
          selected={this.state.selected}
          handleSelection={this.handleSelection}
        />
        {/* Create one detail view for each element of the details arrow, 
        but only the currently selected one will be visible */}
        {Object.keys(this.state.details).map((key) => {
          return (
            <DetailView
              key={key}
              ref={this.detailRefPrev}
              detail={this.state.details[key]}
              onClose={this.handleCloseButton}
              visible={this.state.selected === key}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
