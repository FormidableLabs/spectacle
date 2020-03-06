import isComponentType from './is-component-type';
import Stepper from '../components/stepper';

export default function searchChildrenForStepper(children) {
  if (!Array.isArray(children)) {
    return 0;
  }
  return children.reduce((memo, current) => {
    if (isComponentType(current, Stepper.name)) {
      const { values } = current.props;

      memo += Array.isArray(values) ? values.length : 0;
    } else if (current?.props?.children?.length > 0) {
      memo += searchChildrenForStepper(current.props.children);
    }
    return memo;
  }, 0);
}
