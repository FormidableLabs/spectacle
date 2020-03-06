import isComponentType from '../utils/is-component-type';
import Appear from '../components/appear';

export default function searchChildrenForAppear(children) {
  if (!Array.isArray(children)) {
    return 0;
  }
  return children.reduce((memo, current) => {
    if (isComponentType(current, Appear.name)) {
      memo += 1;
    } else if (current?.props?.children?.length > 0) {
      memo += searchChildrenForAppear(current.props.children);
    }
    return memo;
  }, 0);
}
