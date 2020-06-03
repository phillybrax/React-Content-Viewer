import React from "react";
import { gsap } from "gsap";
import { Transition } from "react-transition-group";
import Carousel from "./Carousel";

const detailStyle = {
  paddingTop: "30px",
  textAlign: "center",
  position: "absolute",
  color: "black",
  width: "100%",
  height: "100%",
};

class DetailView extends React.Component {
  render() {
    if (!this.props.detail) {
      return null;
    }
    const show = this.props.visible;
    return (
      // Wrapping in a transition ensures that component is only mounted when visible
      <Transition
        timeout={1000}
        mountOnEnter
        unmountOnExit
        in={show}
        addEndListener={(node, done) => {
          gsap.to(node, 0.5, {
            y: show ? 0 : 100,
            autoAlpha: show ? 1 : 0,
            onComplete: done,
          });
        }}
      >
        <div style={detailStyle}>
          <Carousel images={this.props.detail.images} />
          <div>{`${this.props.detail.firstName} ${this.props.detail.lastName}`}</div>
        </div>
      </Transition>
    );
  }
}

export default DetailView;
