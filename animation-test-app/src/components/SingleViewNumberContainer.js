import React from "react";
import gsap from "gsap";

const numberDisplayerStyle = {
  height: "20px",
  width: "20px",
  position: "relative",
};

class SingleViewNumberContainer extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.numberTween = null;
  }

  numberRef = React.createRef();
  componentDidMount() {
    this.index = this.props.index;
  }

  updateIndex = () => {
    this.index = this.props.index;
    this.forceUpdate();
  };

  componentDidUpdate(prevProps) {

    if (this.index === this.props.index) {
      return;
    }
   if(this.numberTween) {
     this.numberTween.kill();
   }
    this.numberTween = new gsap.timeline({paused: true});
    this.numberTween
    .to(this.numberRef.current, 0.5, {
      autoAlpha: 0,
      onComplete: this.updateIndex,
    })
    .to(this.numberRef.current, 0.5, { autoAlpha: 1 });
    this.numberTween.restart();
  }

  render() {
    return (
      <div style={numberDisplayerStyle}>
        <p ref={this.numberRef}>{this.index}</p>
      </div>
    );
  }
}

export default SingleViewNumberContainer;
