import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';
import isFunction from 'lodash/isFunction';

const GoToActionButton = styled.button(({ styles }) => [
  styles.context,
  styles.base,
  styles.user
]);

class GoToAction extends Component {
  render() {
    const {
      props: { render, children, style, slide },
      context: { goToSlide }
    } = this;
    if (render && isFunction(render)) {
      return render(goToSlide);
    } else if (slide) {
      return (
        <GoToActionButton
          onClick={() => goToSlide(slide)}
          styles={{
            context: this.context.styles.components.goToAction,
            base: getStyles.call(this),
            user: style
          }}
        >
          {children}
        </GoToActionButton>
      );
    }
    // eslint-disable-next-line no-console
    console.warn('<GoToAction /> must have a render or slide prop.');
    return <div />;
  }
}

GoToAction.propTypes = {
  children: PropTypes.node,
  render: PropTypes.func,
  slide: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  style: PropTypes.object,
};

GoToAction.contextTypes = {
  styles: PropTypes.object,
  goToSlide: PropTypes.func,
};

export default GoToAction;
