import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { detailedDiff } from 'deep-object-diff';
import { buildStyleMap, updateChildren } from '../utils/magic';
import get from 'lodash/get';

const Deck = styled.div(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}));

class Context extends Component {
  static propTypes = {
    children: PropTypes.node,
    context: PropTypes.object
  };
  static contextTypes = {
    contentHeight: PropTypes.number,
    contentWidth: PropTypes.number,
    export: PropTypes.bool,
    overview: PropTypes.bool,
    print: PropTypes.bool,
    store: PropTypes.object,
    styles: PropTypes.object
  };
  static childContextTypes = {
    contentHeight: PropTypes.number,
    contentWidth: PropTypes.number,
    export: PropTypes.bool,
    overview: PropTypes.bool,
    print: PropTypes.bool,
    store: PropTypes.object,
    styles: PropTypes.object
  };
  getChildContext() {
    return {
      contentHeight: this.props.context.contentHeight,
      contentWidth: this.props.context.contentWidth,
      export: this.props.context.export,
      overview: this.props.context.overview,
      print: this.props.context.print,
      store: this.props.context.store,
      styles: this.props.context.styles
    };
  }
  render() {
    return this.props.children;
  }
}

export default class MagicText extends Component {
  static propTypes = {
    children: PropTypes.node,
    exitSubscription: PropTypes.func,
    magicIndex: PropTypes.number,
    presenter: PropTypes.bool
  };
  static contextTypes = {
    contentHeight: PropTypes.number,
    contentWidth: PropTypes.number,
    export: PropTypes.bool,
    overview: PropTypes.bool,
    print: PropTypes.bool,
    store: PropTypes.object,
    styles: PropTypes.object
  };
  constructor(props) {
    super(...arguments);
    this.container = null;
    this.styleMap = {};
    this.lastPortalMap = {};
    this.portalMap = {};
    this.diffs = {};
    this.lastDiffs = null;
    this.makePortal = this.makePortal.bind(this);
    this.state = {
      renderedChildren: props.children
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.magicIndex !== prevState.magicIndex
      ? { magicIndex: nextProps.magicIndex }
      : null;
  }
  componentDidMount() {
    this.mounted = true;
    this.portal = document.getElementById('portal');
    if (!this.props.presenter) {
      this.container.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        easing: 'ease-in'
      });
      this.props.exitSubscription(() => {
        this.container.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 500,
          easing: 'ease-in'
        });
      });
    }
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
          const containerRoot = get(this.container, 'childNodes[0]');
          const portalRoot = get(this.portal, 'childNodes[0].childNodes[0]');
          if (containerRoot && portalRoot) {
            updateChildren(containerRoot);
            updateChildren(portalRoot);
            buildStyleMap(this.portalMap, portalRoot);
          }
        }, 300);
      }
    );
  }
  shouldComponentUpdate() {
    return false;
  }
  componentDidUpdate(prevProps) {
    const containerRoot = get(this.container, 'childNodes[0]');
    if (containerRoot) {
      updateChildren(containerRoot);
    }
    if (this.diffs.added) {
      Object.keys(this.diffs.added).forEach(m => {
        const el = document.querySelector(`[data-key='${m}']`);
        if (el) {
          el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 500,
            easing: 'ease-in'
          });
        }
      });
    }
    if (this.diffs.updated) {
      Object.keys(this.diffs.updated).forEach(m => {
        const properties = {
          ...(this.diffs.added[m] || {}),
          ...(this.diffs.updated[m] || {})
        };
        const last = {
          ...(this.lastPortalMap[m] || {})
        };
        if (last) {
          const start = {};
          const end = {};
          const xdiff = properties.x - last.x || 0;
          const ydiff = properties.y - last.y || 0;
          start.transform = `translate(${xdiff * -1}px, ${ydiff * -1}px)`;
          end.transform = 'translate(0, 0)';
          const el = document.querySelector(`[data-key='${m}']`);
          if (el && !el.classList.contains('spectacle-content')) {
            el.animate([start, end], {
              duration: 500,
              easing: 'ease-in'
            });
          }
        }
      });
    }
    if (this.props.magicIndex !== prevProps.magicIndex) {
      ReactDOM.render(
        <Context context={this.context}>
          <Deck>{this.props.children}</Deck>
        </Context>,
        this.portal,
        () => {
          const styles = {};
          const portalRoot = get(this.portal, 'childNodes[0].childNodes[0]');
          if (portalRoot) {
            updateChildren(portalRoot);
            buildStyleMap(styles, portalRoot);
            this.diffs = detailedDiff(this.portalMap, styles);
            this.lastPortalMap = this.portalMap;
            this.portalMap = styles;
            if (this.mounted) {
              this.setState(
                {
                  renderedChildren: this.props.children
                },
                () => {
                  this.forceUpdate();
                }
              );
            }
          }
        }
      );
    }
    this.lastDiffs = this.diffs;
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.mounted = false;
  }
  makePortal() {
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
  }
  render() {
    return (
      <div
        style={{
          height: '100%',
          width: '100%'
        }}
        ref={c => {
          this.container = c;
        }}
      >
        {this.state.renderedChildren}
      </div>
    );
  }
}
