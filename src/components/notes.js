import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Notes extends Component {
  static contextTypes = {
    store: PropTypes.object,
    slideHash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    updateNotes: PropTypes.func
  };

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  componentWillMount() {
    const { store, slideHash: parentSlide, updateNotes } = this.context;
    const currentSlide = store.getState().route.slide;

    // updateNotes is only defined when this component is wrapped in
    // a Presenter.
    // Also, the type of parentSlide is either string or number based
    // on the parent slide having an id or not.
    if (updateNotes && currentSlide === `${parentSlide}`) {
      updateNotes(this.props.children);
    }
  }

  render() {
    return false;
  }
}
