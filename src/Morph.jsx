import React from "react/addons";
import _ from "lodash";
import ramjet from "ramjet";

const Morph = React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },
  contextTypes: {
    flux: React.PropTypes.object,
    export: React.PropTypes.bool,
    overview: React.PropTypes.bool,
    slide: React.PropTypes.number
  },
  getInitialState() {
    return {
      active: 0,
      animationDone: true
    };
  },
  componentDidMount() {
    this.context.flux.stores.SlideStore.listen(this._storeChange);
  },
  componentWillUnmount() {
    this.context.flux.stores.SlideStore.unlisten(this._storeChange);
  },
  _storeChange(state) {
    const slide = this.context.slide;
    const children = React.Children.count(this.props.children);
    const fragments = [];
    for (let i = 0; i < children; i++) {
      fragments.push(React.findDOMNode(this.refs["fragment-" + i]));
    }
    const keys = fragments.map((fragment) => {
      return _.findKey(state.fragments[slide], {
        "id": parseInt(fragment.dataset.fid)
      });
    });
    if (slide in state.fragments) {
      let active = 0;
      keys.some((key, i) => {
        if (state.fragments[slide].hasOwnProperty(key)) {
          active = i;
          return !state.fragments[slide][key].visible;
        }
        return true;
      });
      const previousActive = this.state.active;
      if (active !== previousActive) {
        this.setState({active, animationDone: false}, () => {
          if (previousActive < this.state.active) {
            const a = React.findDOMNode(this.refs["fragment-" + (this.state.active - 1)]);
            const b = React.findDOMNode(this.refs["fragment-" + (this.state.active)]);
            ramjet.transform(a, b, {
              done: () => {
                this.setState({animationDone: true});
              }
            });
          } else if (previousActive > this.state.active) {
            const a = React.findDOMNode(this.refs["fragment-" + (this.state.active)]);
            const b = React.findDOMNode(this.refs["fragment-" + (this.state.active + 1)]);
            ramjet.transform(b, a, {
              done: () => {
                this.setState({animationDone: true});
              }
            });
          }
        });
      }
    }
  },
  render() {
    let index = 0;
    const children = React.Children.map(this.props.children, (child) => {
      const style = {
        opacity: this.state.animationDone && index === this.state.active ? 1 : 0
      };
      return (
        <div className="fragment" ref={"fragment-" + index++} style={style}>{child}</div>
      );
    });
    return (
      <div>
        {children}
      </div>
    );
  }
});

export default Morph;
