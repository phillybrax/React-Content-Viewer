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
  componentDidMount() {
    console.log("did mount");
  }

  componentWillUnmount() {
    console.log("will unmount");
  }

  render() {
    if (!this.props.detail) {
      return null;
    }
    const show = this.props.visible;
    return (
      // Wrapping in a transition ensures that component is only mounted when visible
      <Transition
        timeout={2000}
        mountOnEnter
        unmountOnExit
        in={show}
        addEndListener={(node, done) => {
          console.log("end listener");
          gsap.fromTo(
            node,
            {
              y: show ? 0 : 0,
              autoAlpha: show ? 0 : 1,
            },
            {
              y: show ? 0 : 100,
              autoAlpha: show ? 1 : 0,
              onComplete: done,
              duration: 2,
            }
          );
        }}
      >
        <div style={detailStyle}>
          <div>{`${this.props.detail.firstName} ${this.props.detail.lastName}`}</div>
          <Carousel images={this.props.detail.images} />
        </div>
      </Transition>
    );
  }
}

export default DetailView;
