import * as React from 'react';
import propTypes from 'prop-types';
import { SlideContext } from '../hooks/use-slide';

const Stepper = ({ children: render, values, defaultValue }) => {
  const {
    state: { currentSlideElement: step }
  } = React.useContext(SlideContext);

  const value = step === -1 ? defaultValue : values[step];

  return render(value, step);
};

Stepper.propTypes = {
  values: propTypes.array.isRequired,
  defaultValue: propTypes.array
};

export default Stepper;
