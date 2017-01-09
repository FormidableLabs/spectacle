import screen from "../default/screen";
import print from "../default/print";
import flip from "./flip";

const styles = (colors, fonts) => ({
  screen: flip(screen, colors, fonts),
  print: flip(print)
});

export default styles;
