import styled from 'react-emotion';


export const SlideContainer = styled.div(({ printMode, exportMode, styles, background }) => {
  const printStyles = printMode ? {
      backgroundColor: 'white',
      backgroundImage: 'none',
    } : {};
  const outerStyles = {
    transformOrigin: 'center center',
    position: exportMode ? 'relative' : 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: background ? background : ''
  };
  return [
    outerStyles,
    styles.base,
    printStyles,
    styles.presenter
  ];
});

export const SlideContentWrapper = styled.div(({ align, overviewMode }) => {
  const innerStyles = {
    display: 'flex',
    position: 'relative',
    flex: 1,
    alignItems: align ? align.split(' ')[1] : 'center',
    justifyContent: align ? align.split(' ')[0] : 'center'
  };
  const overviewStyles = {
    flexDirection: 'column'
  };
  return [ innerStyles, overviewMode && overviewStyles ];
});

export const SlideContent = styled.div(props => {
  const {
    overviewMode, scale, zoom, margin, width, height, styles
  } = props;
  const contentStyles = {
    flex: 1,
    maxHeight: height || 700,
    maxWidth: width || 1000,
    transform: `scale(${scale})`,
    padding: zoom > 0.6 ? margin || 40 : 10,
  };
  const overviewStyles = {
    width: '100%'
  };
  return [ styles.context, overviewMode && overviewStyles, contentStyles ];
});
