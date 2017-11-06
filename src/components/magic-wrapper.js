import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { detailedDiff } from 'deep-object-diff';
import { buildStyleMap, updateChildren } from '../utils/magic';

const Deck = styled.div(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}));

class Context extends React.Component {
  static contextTypes = {
    contentHeight: PropTypes.number,
    contentWidth: PropTypes.number,
    export: PropTypes.bool,
    overview: PropTypes.bool,
    print: PropTypes.bool,
    store: PropTypes.object,
    styles: PropTypes.object,
  };
  static childContextTypes = {
    contentHeight: PropTypes.number,
    contentWidth: PropTypes.number,
    export: PropTypes.bool,
    overview: PropTypes.bool,
    print: PropTypes.bool,
    store: PropTypes.object,
    styles: PropTypes.object,
  };
  static propTypes = {
    children: PropTypes.node,
    context: PropTypes.object,
  };
  getChildContext() {
    return {
      contentHeight: this.props.context.contentHeight,
      contentWidth: this.props.context.contentWidth,
      export: this.props.context.export,
      overview: this.props.context.overview,
      print: this.props.context.print,
      store: this.props.context.store,
      styles: this.props.context.styles,
    };
  }
  render() {
    return this.props.children;
  }
}

export default class MagicText extends React.Component {
  static contextTypes = {
    styles: PropTypes.object,
  };
  static propTypes = {
    children: PropTypes.node,
    magicIndex: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.container = null;
    this.styleMap = {};
    this.lastPortalMap = {};
    this.portalMap = {};
    this.diffs = {};
    this.lastDiffs = null;
    this.state = {
      renderedChildren: props.children,
    };
  }
  componentDidMount() {
    this.mounted = true;
    this.portal = document.getElementById('portal');
    if (!this.portal) {
      this.portal = this.makePortal();
    }
    ReactDOM.render(
      <Context context={this.context}>
        <Deck>{this.props.children}</Deck>
      </Context>,
      this.portal,
      () => {
        this.timeout = setTimeout(() => {
          updateChildren(this.container.childNodes[0]);
          updateChildren(this.portal.childNodes[0].childNodes[0]);
          buildStyleMap(
            this.portalMap,
            this.portal.childNodes[0].childNodes[0]
          );
        }, 300);
      }
    );
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.magicIndex === nextProps.magicIndex) {
      return;
    }
    ReactDOM.render(
      <Context context={this.context}>
        <Deck>{nextProps.children}</Deck>
      </Context>,
      this.portal,
      () => {
        const styles = {};
        updateChildren(this.portal.childNodes[0].childNodes[0]);
        buildStyleMap(styles, this.portal.childNodes[0].childNodes[0]);
        this.diffs = detailedDiff(this.portalMap, styles);
        this.lastPortalMap = this.portalMap;
        this.portalMap = styles;
        if (this.mounted) {
          this.setState(
            {
              renderedChildren: nextProps.children,
            },
            () => {
              this.forceUpdate();
            }
          );
        }
      }
    );
  }
  shouldComponentUpdate() {
    return false;
  }
  componentDidUpdate() {
    updateChildren(this.container.childNodes[0]);
    Object.keys(this.diffs.added).forEach(m => {
      const el = document.querySelector(`[data-key='${m}']`);
      if (el) {
        el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 500,
          easing: 'ease-in',
        });
      }
    });
    Object.keys(this.diffs.updated).forEach(m => {
      const props = {
        ...(this.diffs.added[m] || {}),
        ...(this.diffs.updated[m] || {}),
      };
      const last = {
        ...(this.lastPortalMap[m] || {}),
      };
      if (last) {
        const start = {};
        const end = {};
        const xdiff = props.x - last.x || 0;
        const ydiff = props.y - last.y || 0;
        start.transform = `translate(${xdiff * -1}px, ${ydiff * -1}px)`;
        end.transform = `translate(0, 0)`;
        const el = document.querySelector(`[data-key='${m}']`);
        if (el) {
          el.animate([start, end], {
            duration: 500,
            easing: 'ease-in',
          });
        }
      }
    });
    this.lastDiffs = this.diffs;
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.mounted = false;
  }
  makePortal = () => {
    const p = document.createElement('div');
    p.id = 'portal';
    p.style.position = 'absolute';
    p.style.width = '100%';
    p.style.height = '100%';
    p.style.top = 0;
    p.style.left = 0;
    p.style.visibility = 'hidden';
    document.body.append(p);
    return p;
  };
  render() {
    return (
      <div
        ref={c => {
          this.container = c;
        }}
      >
        {this.state.renderedChildren}
      </div>
    );
  }
}
