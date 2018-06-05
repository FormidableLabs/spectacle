import React, { Component } from 'react';
import createHistory from 'history/createHashHistory';
import PropTypes from 'prop-types';
import { updateRoute } from '../actions';
import { countSlides } from './slides';

import theme from '../themes/default';
import Context from './context';

const history = createHistory();

export default class Controller extends Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object,
    store: PropTypes.object,
    theme: PropTypes.object
  };

  constructor(props) {
    super(...arguments);

    this.history = props.history || history;
  }

  state = {
    print: false
  };

  componentDidMount() {
    this.unlisten = this.history.listen(this._updateRoute.bind(this));
    const location = this.history.location;
    const slideCount = countSlides(this.props.children.props.children);
    this.props.store.dispatch(
      updateRoute({
        location,
        slideCount
      })
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  componentWillUnmount() {
    this.unlisten();
  }

  _updateRoute(location) {
    this.setState(
      {
        print: location.search.indexOf('print') !== -1
      },
      () => {
        const slideCount = countSlides(this.props.children.props.children);
        this.props.store.dispatch(
          updateRoute({
            location,
            slideCount
          })
        );
      }
    );
  }

  render() {
    const styles = this.props.theme ? this.props.theme : theme();

    return (
      <Context
        store={this.props.store}
        history={this.history}
        styles={this.state.print ? styles.print : styles.screen}
      >
        {this.props.children}
      </Context>
    );
  }
}
