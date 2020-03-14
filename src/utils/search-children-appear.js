import isComponentType from '../utils/is-component-type';
import Appear from '../components/appear';

export default function searchChildrenForAppear(children) {
  const isSingleChild = children?.props?.children ?? false;

  if (!Array.isArray(children) && !isSingleChild) {
    return 0;
  }

  return (isSingleChild ? [children] : children).reduce((memo, current) => {
    if (isComponentType(current, Appear.name)) {
      memo += 1;
    } else {
      memo += searchChildrenForAppear(current?.props?.children);
    }
    return memo;
  }, 0);
}
