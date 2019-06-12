import React from 'react';

const Controls = ({ dispatch }) => {
  return <><button onClick={() => dispatch({type: 'next slide'})}>Next</button><button onClick={() => dispatch({type: 'prev slide'})}>Prev</button></>;
};

export default Controls;
