import screen from './screen';
import print from './print';

var styles = function styles(colors, fonts) {
  return {
    screen: screen(colors, fonts),
    print: print()
  };
};

export default styles;