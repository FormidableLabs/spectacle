import React from 'react/addons';
import assign from 'object-assign';
const cloneElement = React.cloneElement;
import Base from './base';
import Radium from 'radium';

function startTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;
  var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  return strTime;
}

@Radium
class Presenter extends Base {
  constructor(props) {
    super(props);
    this.state = {
      time: startTime(new Date())
    }
  }
  _renderMainSlide() {
    let child = this.props.slides[this.props.slide];
    let presenterStyle = {
      position: 'relative'
    }
    return cloneElement(child, {
      key: this.props.slide,
      slideIndex: this.props.slide,
      lastSlide: this.props.lastSlide,
      transition: [],
      transitionDuration: 0,
      presenterStyle: presenterStyle
    });
  }
  componentDidMount() {
    setInterval(()=> {
      this.setState({
        time: startTime(new Date())
      });
    }, 1000);
  }
  _renderNextSlide() {
    let presenterStyle = {
      position: 'relative'
    }
    let endStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      margin: 0
    }
    let child = this.props.slides[parseInt(this.props.slide) + 1];
    return child ? cloneElement(child, {
      key: this.props.slide + 1,
      slideIndex: this.props.slide + 1,
      lastSlide: this.props.lastSlide,
      transition: [],
      transitionDuration: 0,
      presenterStyle: presenterStyle,
      appearOff: true
    }) : <h1 style={[endStyle]}>END</h1>
  }
  render() {
    let styles = {
      presenter: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
      },
      header: {
        position: 'absolute',
        display: 'block',
        color: 'white',
        width: '100%',
        height: '20%',
        textAlign: 'center',
        padding: '20px 50px',
      },
      slideInfo: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        float: 'left',
        margin: 0,
        lineHeight: 1,
        display: 'inline-block',
        fontSize: 28
      },
      clock: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        float: 'right',
        margin: 0,
        lineHeight: 1,
        display: 'inline-block',
        fontSize: 28
      },
      preview: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      },
      main: {
        display: 'inline-block',
        width: '50%',
        height: '60%',
        border: '2px solid white',
        padding: 20,
        margin: 20,
        position: 'relative'
      },
      next: {
        display: 'inline-block',
        width: '40%',
        height: '50%',
        border: '2px solid white',
        padding: 20,
        margin: 20,
        position: 'relative',
        color: 'white'
      }
    };
    return (
      <div className='spectacle-presenter' style={[styles.presenter]}>
        <div style={styles.header}>
          <h2 style={styles.slideInfo}>Slide {this.props.slide + 1} of {this.props.slides.length}</h2>
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
      </div>
    )
  }
}

Presenter.propTypes = {
  lastSlide: React.PropTypes.number,
  slides: React.PropTypes.array,
  slide: React.PropTypes.number
}

Presenter.contextTypes = {
  styles: React.PropTypes.object,
  flux: React.PropTypes.object,
  router: React.PropTypes.object
}

export default Presenter;
