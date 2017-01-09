import screen from "./screen";
import print from "./print";

const styles = (colors, fonts, rtl) => ({
  screen: screen(colors, fonts, rtl),
  print: print({}, {}, rtl)
});

export default styles;
