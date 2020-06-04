import React from "react";
import MultiViewNumberContainer from "./MultiviewNumberContainer";
import SingleViewNumberContainer from "./SingleViewNumberContainer";
const AppStyle = {
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  marginTop: "100px",
  width: "100%",
};

const containerStyle = {
  display: "flex",
  width: "200px",
  justifyContent: "space-between",
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
    this.numIndices = 100;
    var i;
    this.indices = [];
    for (i = 0; i < this.numIndices; i++) {
      this.indices[i] = i;
    }
  }

  increment = () => {
    const newIndex = this.state.index + 1;
    if (newIndex >= this.numIndices) {
      return;
    }
    this.setState({ index: newIndex });
  };
  decrement = () => {
    const newIndex = this.state.index - 1;
    if (newIndex < 0) {
      return;
    }
    this.setState({ index: newIndex });
  };
  render() {
    // Three possible approaches to displayed 3 different ways to show
    // a few possibilities for updating its appearance
    return (
      <div style={AppStyle}>
        <div style={containerStyle}>
          <button onClick={this.decrement}>-</button>
          <p>{this.state.index}</p>
          <SingleViewNumberContainer index={this.state.index} />
          <MultiViewNumberContainer index={this.state.index} indices={this.indices} />
         
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}

export default App;
