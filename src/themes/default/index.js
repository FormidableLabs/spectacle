import screen from './screen';
import print from './print';

const styles = (colors, fonts) => ({
  screen: screen(colors, fonts),
  print: print()
});

export default styles;
