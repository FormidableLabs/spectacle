/**
 * prop-types is totally CJS and not easily extractable to ESM with all deps
 * that have the same problem. This is a codegen'ed file that shims everything.
 *
 * See: https://github.com/facebook/prop-types/issues/111
 */
function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

function emptyFunctionWithRequired() {}

emptyFunctionWithRequired.isRequired = emptyFunction;
const PropTypes = {};
PropTypes.array = emptyFunctionWithRequired;
PropTypes.bool = emptyFunctionWithRequired;
PropTypes.func = emptyFunctionWithRequired;
PropTypes.number = emptyFunctionWithRequired;
PropTypes.object = emptyFunctionWithRequired;
PropTypes.string = emptyFunctionWithRequired;
PropTypes.symbol = emptyFunctionWithRequired;
PropTypes.any = emptyFunctionWithRequired;
PropTypes.arrayOf = emptyFunction;
PropTypes.element = emptyFunctionWithRequired;
PropTypes.elementType = emptyFunctionWithRequired;
PropTypes.instanceOf = emptyFunction;
PropTypes.node = emptyFunctionWithRequired;
PropTypes.objectOf = emptyFunction;
PropTypes.oneOf = emptyFunction;
PropTypes.oneOfType = emptyFunction;
PropTypes.shape = emptyFunction;
PropTypes.exact = emptyFunction;
PropTypes.checkPropTypes = emptyFunctionWithReset;
PropTypes.resetWarningCache = emptyFunction;
PropTypes.PropTypes = PropTypes;
export default PropTypes;
