import screen from "./screen";
import print from "./print";

const styles = (colors, fonts) => ({
  screen: screen.call(colors, fonts),
  print: print.call()
});

export default styles;
