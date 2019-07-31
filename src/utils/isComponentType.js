/** isComponentType(Component, String)
 * Takes Component and name (String) of component type you want to test for
 * Returns a boolean
 * Turned into a util to avoid having to repeatedly check:
 * mdx or regular component types.
 * May be unnecessary in future, if we treat MDX differently
 */

export default (component, name) =>
  component.props.mdxType === name ||
  (component.type && component.type.name === name);
