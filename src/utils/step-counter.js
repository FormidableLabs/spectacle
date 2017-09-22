const stepCounter = () => {
  let frags = {};
  let slideIndex = 0;
  const setFragments = (fragments, index) => {
    frags = fragments;
    slideIndex = Number(index);
  };
  const getSteps = () => {
    const steps = Object.keys(frags).reduce((previous, key) => {
      return previous + (frags[key].visible === true);
    }, 0);
    return { steps, slideIndex };
  };

  return {
    setFragments,
    getSteps
  };
};

export default stepCounter;
