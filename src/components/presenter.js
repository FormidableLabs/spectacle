import React, { cloneElement, Component, PropTypes } from "react";
import Radium from "radium";

const startTime = function startTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0 ${minutes}` : minutes;
  seconds = seconds < 10 ? `0 ${seconds}` : seconds;
  const strTime = `${hours} : ${minutes} : ${seconds} ${ampm}`;
  return strTime;
};

@Radium
export default class Presenter extends Component {
  constructor() {
    super();
    this.state = {
      time: startTime(new Date())
    };
  }
  _renderMainSlide() {
    const { slides, slide, hash, lastSlide } = this.props;
    const child = slides[slide];
    const presenterStyle = {
      position: "relative"
    };
    return cloneElement(child, {
      dispatch: this.props.dispatch,
      key: slide,
      hash,
      export: this.props.route.params.indexOf("export") !== -1,
      print: this.props.route.params.indexOf("print") !== -1,
      slideIndex: slide,
      lastSlide,
      transition: [],
      transitionDuration: 0,
      presenterStyle
    });
  }
  componentWillMount() {
    this.time = setInterval(() => {
      this.setState({
        time: startTime(new Date())
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.time);
  }
  _renderNextSlide() {
    const { slides, slide, lastSlide } = this.props;
    const presenterStyle = {
      position: "relative"
    };
    const endStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      margin: 0,
      color: "white"
    };
    const child = slides[parseInt(slide) + 1];
    return child ? cloneElement(child, {
      dispatch: this.props.dispatch,
      export: this.props.route.params.indexOf("export") !== -1,
      print: this.props.route.params.indexOf("print") !== -1,
      key: slide + 1,
      hash: child.props.id || slide + 1,
      slideIndex: slide + 1,
      lastSlide,
      transition: [],
      transitionDuration: 0,
      presenterStyle,
      appearOff: true
    }) : <h1 style={[endStyle]}>END</h1>;
  }
  _renderNotes() {
    const child = this.props.slides[this.props.slide];
    if (!child.props.notes) { return false; }
    if (typeof child.props.notes === "string") {
      return <div dangerouslySetInnerHTML={{__html: child.props.notes}} />;
    }
    return <div>{child.props.notes}</div>;
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
        position: "relative"
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
  dispatch: PropTypes.func,
  route: PropTypes.object,
  lastSlide: PropTypes.number,
  hash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  slides: PropTypes.array,
  slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Presenter.contextTypes = {
  styles: PropTypes.object
};
