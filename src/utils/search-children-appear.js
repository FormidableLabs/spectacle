import isComponentType from '../utils/is-component-type';

export default function searchChildrenForAppear(children) {
  if (!Array.isArray(children)) {
    return 0;
  }
  return children.reduce((memo, current) => {
    if (isComponentType(current, 'Appear')) {
      memo += 1;
    } else if (current.props.children && current.props.children.length > 0) {
      memo += searchChildrenForAppear(current.props.children);
    }
    return memo;
  }, 0);
}
