import React from "react";
import gsap from "gsap";

const numberDisplayerStyle = {
  height: "20px",
  width: "20px",
  position: "relative",
};

class MultiViewNumberContainer extends React.Component {
  render() {
    return (
      <div style={numberDisplayerStyle}>
        {this.props.indices.map((index) => {
          return (
            <AnimatingInt
              key={index}
              index={index}
              visible={index === this.props.index}
            />
          );
        })}
      </div>
    );
  }
}
const numberStyle = {
  position: "absolute",
  opacity: "0",
  width: "100%",
  height: "100%",
};

class AnimatingInt extends React.Component {
  digitRef = React.createRef();
  componentDidMount() {
    gsap.set(this.digitRef.current, { autoAlpha: this.props.visible ? 1 : 0 });
  }

  componentDidUpdate() {
    const show = this.props.visible;
    gsap.fromTo(
      this.digitRef.current,
      0.5,
      {
        y: show ? -30 : 0,
      },
      {
        autoAlpha: show ? 1 : 0,
        y: show ? 0 : 30,
      }
    );
  }
  render() {
    return (
      <p ref={this.digitRef} style={numberStyle}>
        {this.props.index}
      </p>
    );
  }
}


export default MultiViewNumberContainer;
