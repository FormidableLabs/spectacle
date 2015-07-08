/*global setInterval clearInterval*/

import React from "react/addons";
import cloneWithProps from "react/lib/cloneWithProps";
import Base from "./base";
import Radium from "radium";

const startTime = function startTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  const strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime;
};

@Radium
class Presenter extends Base {
  constructor(props) {
    super(props);
    this.state = {
      time: startTime(new Date())
    };
  }
  _renderMainSlide() {
    const child = this.props.slides[this.props.slide];
    const presenterStyle = {
      position: "relative"
    };
    return cloneWithProps(child, {
      key: this.props.slide,
      slideIndex: this.props.slide,
      lastSlide: this.props.lastSlide,
      transition: [],
      transitionDuration: 0,
      presenterStyle
    });
  }
  componentDidMount() {
    this.time = setInterval(()=> {
      this.setState({
        time: startTime(new Date())
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.time);
  }
  _renderNextSlide() {
    const presenterStyle = {
      position: "relative"
    };
    const endStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      margin: 0
    };
    const child = this.props.slides[parseInt(this.props.slide) + 1];
    return child ? cloneWithProps(child, {
      key: this.props.slide + 1,
      slideIndex: this.props.slide + 1,
      lastSlide: this.props.lastSlide,
      transition: [],
      transitionDuration: 0,
      presenterStyle,
      appearOff: true
    }) : <h1 style={[endStyle]}>END</h1>;
  }
  _renderNotes() {
    const child = this.props.slides[this.props.slide];
    if (!child.props.notes) { return false; }
    return <div dangerouslySetInnerHTML={{__html: child.props.notes}} />;
  }
  render() {
    const styles = {
      presenter: {
        height: "100%",
        width: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column"
      },
      header: {
        position: "absolute",
        display: "block",
        color: "white",
        width: "100%",
        height: "20%",
        textAlign: "center",
        padding: "20px 50px"
      },
      slideInfo: {
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        float: "left",
        margin: 0,
        lineHeight: 1,
        display: "inline-block",
        fontSize: 28
      },
      clock: {
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        float: "right",
        margin: 0,
        lineHeight: 1,
        display: "inline-block",
        fontSize: 28
      },
      preview: {
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
      },
      main: {
        display: "inline-block",
        width: "50%",
        height: "60%",
        border: "2px solid white",
        padding: 20,
        margin: 20,
        position: "relative"
      },
      next: {
        display: "inline-block",
        width: "40%",
        height: "50%",
        border: "2px solid white",
        padding: 20,
        margin: 20,
        position: "relative",
        color: "white"
      },
      notes: {
        position: "absolute",
        display: "block",
        color: "white",
        width: "100%",
        height: "20%",
        bottom: "0px",
        textAlign: "left",
        padding: "20px 50px",
        columnCount: "2",
        fontSize: "0.8em"
      }
    };
    return (
      <div className="spectacle-presenter" style={[styles.presenter]}>
        <div style={styles.header}>
          <h2 style={styles.slideInfo}>
            Slide {this.props.slide + 1} of {this.props.slides.length}
          </h2>
          <h2 style={styles.clock}>{this.state.time}</h2>
        </div>
        <div style={styles.preview}>
          <div className="spectacle-presenter-main" style={[styles.main]}>
            {this._renderMainSlide()}
          </div>
          <div className="spectacle-presenter-next" style={[styles.next]}>
            {this._renderNextSlide()}
          </div>
        </div>
        <div className="spectacle-presenter-notes" style={[styles.notes]}>
          {this._renderNotes()}
        </div>
      </div>
    );
  }
}

Presenter.propTypes = {
  lastSlide: React.PropTypes.number,
  slides: React.PropTypes.array,
  slide: React.PropTypes.number
};

Presenter.contextTypes = {
  styles: React.PropTypes.object
};

export default Presenter;
