import React, { Component, PropTypes } from "react";
import Radium from "radium";

@Radium
export default class Fullscreen extends Component {
  toggleFullScreen() {
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
  render() {
    const styles = {
      position: "absolute",
      bottom: 20,
      right: 20,
      opacity: 0,
      cursor: "pointer",
      transition: "300ms opacity ease",
      ":hover": {
        opacity: 1
      }
    };
    return (
      <svg
        onClick={this.toggleFullScreen.bind(this)}
        style={[styles, this.context.styles.fullscreen]}
        width="30px"
        height="30px"
        viewBox="0 0 512 512"
      >
        <path d="M73.143,329.143H0V512h182.857v-73.143H73.143V329.143z M0,182.857h73.143V73.143h109.715V0H0V182.857z M438.857,438.857
          H329.143V512H512V329.143h-73.143V438.857z M329.143,0v73.143h109.715v109.715H512V0H329.143z"
        />
      </svg>
    );
  }
}

Fullscreen.contextTypes = {
  styles: PropTypes.object
};
