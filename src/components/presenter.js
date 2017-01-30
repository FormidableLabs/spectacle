import React, { Children, cloneElement, Component, PropTypes } from "react";
import Radium from "radium";
import { getSlideByIndex } from "../utils/slides";

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
  static childContextTypes = {
    updateNotes: PropTypes.func
  };

  state = {
    notes: {},
    time: startTime(new Date())
  };

  getChildContext() {
    return {
      updateNotes: this.updateNotes.bind(this)
    };
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

  getCurrentSlide() {
    return this.context.store.getState().route.slide;
  }

  updateNotes(newNotes) {
    const notes = { ...this.state.notes };
    notes[this.getCurrentSlide()] = newNotes;

    this.setState({ notes });
  }

  _getSlideByIndex(index) {
    return getSlideByIndex(
      Children.toArray(this.props.slides),
      this.props.slideReference,
      index
    );
  }
  _renderMainSlide() {
    const { slideIndex, hash, lastSlide } = this.props;
    const child = this._getSlideByIndex(slideIndex);
    const presenterStyle = {
      position: "relative"
    };
    return cloneElement(child, {
      dispatch: this.props.dispatch,
      key: slideIndex,
      hash,
      export: this.props.route.params.indexOf("export") !== -1,
      print: this.props.route.params.indexOf("print") !== -1,
      slideIndex,
      lastSlide,
      transition: [],
      transitionDuration: 0,
      presenterStyle
    });
  }
  _renderNextSlide() {
    const { slideIndex, lastSlide } = this.props;
    const presenterStyle = {
      position: "relative"
    };
    const endStyle = {
      display: "flex",
      margin: 0,
      color: "white"
    };
    const child = this._getSlideByIndex(slideIndex + 1);
    return child ? cloneElement(child, {
      dispatch: this.props.dispatch,
      export: this.props.route.params.indexOf("export") !== -1,
      print: this.props.route.params.indexOf("print") !== -1,
      key: slideIndex + 1,
      hash: child.props.id || slideIndex + 1,
      slideIndex: slideIndex + 1,
      lastSlide,
      transition: [],
      transitionDuration: 0,
      presenterStyle,
      appearOff: true
    }) : <h1 style={[endStyle]}>END</h1>;
  }
  _renderNotes() {
    let notes;
    const currentSlide = this.getCurrentSlide();

    if (this.state.notes[currentSlide]) {
      notes = this.state.notes[currentSlide];
    } else {
      const child = this._getSlideByIndex(this.props.slideIndex);
      notes = child.props.notes;
    }

    if (!notes) { return false; }

    if (typeof notes === "string") {
      return <div dangerouslySetInnerHTML={{ __html: notes }} />;
    }
    return <div>{notes}</div>;
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
        height: "10%",
        textAlign: "center",
        padding: "10px 50px"
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
      container: {
        display: "flex",
        flex: 1,
        padding: "10px 50px 0 50px"
      },
      preview: {
        position: "absolute",
        top: "10%",
        display: "flex",
        width: "60%",
        height: "90%",
        flex: "1",
        flexWrap: "wrap",
        justifyContent: "center"
      },
      main: {
        display: "flex",
        flex: "0 0 100%",
        height: "55%",
        border: "2px solid white",
        padding: 20
      },
      next: {
        display: "flex",
        flex: "0 0 68.75%",
        alignItems: "center",
        justifyContent: "center",
        height: "40%",
        opacity: 0.4
      },
      notes: {
        position: "absolute",
        top: "10%",
        left: "calc(60% + 50px)",
        height: "90%",
        width: "calc(40% - 100px)",
        display: "block",
        padding: "10px 30px",
        color: "white"
      }
    };
    return (
      <div className="spectacle-presenter" style={[styles.presenter]}>
        <div style={styles.header}>
          <h2 style={styles.slideInfo}>
            Slide {this.props.slideIndex + 1} of {this.props.slideReference.length}
          </h2>
          <h2 style={styles.clock}>{this.state.time}</h2>
        </div>
        <div style={styles.container}>
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
      </div>
    );
  }
}

Presenter.propTypes = {
  dispatch: PropTypes.func,
  hash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lastSlide: PropTypes.number,
  route: PropTypes.object,
  slideIndex: PropTypes.number,
  slideReference: PropTypes.array,
  slides: PropTypes.array
};

Presenter.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object.isRequired
};
