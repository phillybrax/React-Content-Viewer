import React from "react";
import { gsap } from "gsap";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "50%",
  opacity: "1",
};

const imgContainerStyle = {
  height: "100%",
  width: "100%",
  marginBottom: "20px",
  position: "relative",
  display: "flex",
  justifyContent: "center",
};

const detailImageStyle = {
  height: "100%",
  position: "absolute",
  opacity: "1",
};

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, prevIndex: 0 };
    this.tweenOut = null;
    this.tweeIn = null;
  }

  showAdjacent = (forwards) => {
    const index = this.state.index;
    const incremement = forwards ? 1 : -1;
    let newIndex = index + incremement;

    // Make sure new index is not negative before take modulus
    if (!forwards) {
      newIndex = newIndex + this.props.images.length;
    }
    newIndex = newIndex % this.props.images.length;

    const currentOpacity = Math.max(
      this.img1Ref.current.style.opacity,
      this.img2Ref.current.style.opacity
    );
    this.img1Ref.current.style.opacity = currentOpacity;
    this.img2Ref.current.style.opacity = 0;

    if (this.tweenIn) {
      this.tweenIn.kill();
    }
    if (this.tweenOut) {
      this.tweenOut.kill();
    }
    const induration = 1;
    const outDuration = currentOpacity * induration;
    this.tweenOut = gsap.to(this.img1Ref.current, outDuration, { opacity: 0 });
    this.tweenIn = gsap.to(this.img2Ref.current, induration, {
      delay: 0,
      opacity: 1,
    });

    this.setState({ index: newIndex, prevIndex: index });
  };

  img1Ref = React.createRef();
  img2Ref = React.createRef();

  render() {
    return (
      <div style={containerStyle}>
        <button
          className="SlideshowButton"
          onClick={() => this.showAdjacent(false)}
        >
          PREV
        </button>
        <div style={imgContainerStyle}>
          <img
            ref={this.img1Ref}
            style={detailImageStyle}
            src={this.props.images[this.state.prevIndex].src}
            alt={this.props.images[this.state.prevIndex].alt}
          />
          <img
            ref={this.img2Ref}
            style={{ ...detailImageStyle, zIndex: "1" }}
            src={this.props.images[this.state.index].src}
            alt={this.props.images[this.state.index].alt}
          />
        </div>

        <button
          className="SlideshowButton"
          onClick={() => this.showAdjacent(true)}
        >
          NEXT
        </button>
      </div>
    );
  }
}

export default Slideshow;
