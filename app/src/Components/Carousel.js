import React from "react";
import { gsap } from "gsap";
import { Transition } from "react-transition-group";

const carouselStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "50%",
  opacity: "1",
  marginTop: "30px",
};

const imgContainerStyle = {
  height: "100%",
  width: "50%",
  marginBottom: "20px",
  position: "relative",
  display: "flex",
};

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  

  // Single method for going forwards or backwards in carousel
  showAdjacent = (forwards) => {
    const index = this.state.index;
    const incremement = forwards ? 1 : -1;
    // Note we add this.props.images.length before taking the modulus
    // to ensure we are taking modulus of non-negative integer
    let newIndex =
      (index + incremement + this.props.images.length) %
      this.props.images.length;
    this.setState({ index: newIndex });
  };

  render() {
    // Create the array [0,...,.this.props.images.length] so can apply map below
    // There's probably a better way to do this?
    var i;
    let indices = [];
    for (i = 0; i < this.props.images.length; i++) {
      indices[i] = i;
    }
    return (
      <div style={carouselStyle}>
        <button
          className="SlideshowButton"
          onClick={() => this.showAdjacent(false)}
        >
          PREV
        </button>
        <div style={imgContainerStyle}>
          {indices.map((index) => {
            return (
              <CarouselImage
                key={this.props.images[index].src}
                image={this.props.images[index]}
                visible={index === this.state.index}
              />
            );
          })}
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

const detailImageStyle = {
  width: "100%",
  position: "absolute",
  opacity: "1",
};

class CarouselImage extends React.Component {
  componentDidUpdate(prevProps) {
    gsap.to(this.imageRef.current, 0.5, {
      opacity: this.props.visible ? 1 : 0,
    });
  }
  componentDidMount() {
    this.imageRef.current.style.opacity = this.props.visible ? 1 : 0;
  }
  imageRef = React.createRef();
  render() {
    const image = this.props.image;
    return (
      <img
        ref={this.imageRef}
        style={detailImageStyle}
        key={image.src}
        src={image.src}
        alt={image.alt}
      />
    );
  }
}

export default Carousel;
