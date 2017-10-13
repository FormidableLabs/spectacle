import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
document.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};
