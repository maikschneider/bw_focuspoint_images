// node_modules/svelte/src/version.js
var PUBLIC_VERSION = "5";

// node_modules/svelte/src/internal/disclose-version.js
if (typeof window !== "undefined") {
  ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(PUBLIC_VERSION);
}

// node_modules/svelte/src/constants.js
var EACH_ITEM_REACTIVE = 1;
var EACH_INDEX_REACTIVE = 1 << 1;
var EACH_IS_CONTROLLED = 1 << 2;
var EACH_IS_ANIMATED = 1 << 3;
var EACH_ITEM_IMMUTABLE = 1 << 4;
var PROPS_IS_IMMUTABLE = 1;
var PROPS_IS_RUNES = 1 << 1;
var PROPS_IS_UPDATED = 1 << 2;
var PROPS_IS_BINDABLE = 1 << 3;
var PROPS_IS_LAZY_INITIAL = 1 << 4;
var TRANSITION_IN = 1;
var TRANSITION_OUT = 1 << 1;
var TRANSITION_GLOBAL = 1 << 2;
var TEMPLATE_FRAGMENT = 1;
var TEMPLATE_USE_IMPORT_NODE = 1 << 1;
var TEMPLATE_USE_SVG = 1 << 2;
var TEMPLATE_USE_MATHML = 1 << 3;
var HYDRATION_START = "[";
var HYDRATION_START_ELSE = "[!";
var HYDRATION_START_FAILED = "[?";
var HYDRATION_END = "]";
var HYDRATION_ERROR = {};
var ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
var ELEMENT_IS_INPUT = 1 << 2;
var UNINITIALIZED = /* @__PURE__ */ Symbol();
var FILENAME = /* @__PURE__ */ Symbol("filename");
var NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
var NAMESPACE_SVG = "http://www.w3.org/2000/svg";
var NAMESPACE_MATHML = "http://www.w3.org/1998/Math/MathML";

// node_modules/esm-env/true.js
var true_default = true;

// node_modules/esm-env/dev-fallback.js
var node_env = globalThis.process?.env?.NODE_ENV;
var dev_fallback_default = node_env && !node_env.toLowerCase().startsWith("prod");

// node_modules/svelte/src/internal/shared/utils.js
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var includes = Array.prototype.includes;
var array_from = Array.from;
var object_keys = Object.keys;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
function is_function(thing) {
  return typeof thing === "function";
}
var noop = () => {
};
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
function deferred() {
  var resolve;
  var reject;
  var promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
function to_array(value, n) {
  if (Array.isArray(value)) {
    return value;
  }
  if (n === void 0 || !(Symbol.iterator in value)) {
    return Array.from(value);
  }
  const array = [];
  for (const element2 of value) {
    array.push(element2);
    if (array.length === n) break;
  }
  return array;
}

// node_modules/svelte/src/internal/client/constants.js
var DERIVED = 1 << 1;
var EFFECT = 1 << 2;
var RENDER_EFFECT = 1 << 3;
var MANAGED_EFFECT = 1 << 24;
var BLOCK_EFFECT = 1 << 4;
var BRANCH_EFFECT = 1 << 5;
var ROOT_EFFECT = 1 << 6;
var BOUNDARY_EFFECT = 1 << 7;
var CONNECTED = 1 << 9;
var CLEAN = 1 << 10;
var DIRTY = 1 << 11;
var MAYBE_DIRTY = 1 << 12;
var INERT = 1 << 13;
var DESTROYED = 1 << 14;
var REACTION_RAN = 1 << 15;
var DESTROYING = 1 << 25;
var EFFECT_TRANSPARENT = 1 << 16;
var EAGER_EFFECT = 1 << 17;
var HEAD_EFFECT = 1 << 18;
var EFFECT_PRESERVED = 1 << 19;
var USER_EFFECT = 1 << 20;
var EFFECT_OFFSCREEN = 1 << 25;
var WAS_MARKED = 1 << 16;
var REACTION_IS_UPDATING = 1 << 21;
var ASYNC = 1 << 22;
var ERROR_VALUE = 1 << 23;
var STATE_SYMBOL = /* @__PURE__ */ Symbol("$state");
var LEGACY_PROPS = /* @__PURE__ */ Symbol("legacy props");
var LOADING_ATTR_SYMBOL = /* @__PURE__ */ Symbol("");
var PROXY_PATH_SYMBOL = /* @__PURE__ */ Symbol("proxy path");
var STALE_REACTION = new class StaleReactionError extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
var IS_XHTML = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_FRAGMENT_NODE = 11;

// node_modules/svelte/src/internal/shared/errors.js
function invariant_violation(message) {
  if (dev_fallback_default) {
    const error = new Error(`invariant_violation
An invariant violation occurred, meaning Svelte's internal assumptions were flawed. This is a bug in Svelte, not your app \u2014 please open an issue at https://github.com/sveltejs/svelte, citing the following message: "${message}"
https://svelte.dev/e/invariant_violation`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/invariant_violation`);
  }
}
function lifecycle_outside_component(name) {
  if (dev_fallback_default) {
    const error = new Error(`lifecycle_outside_component
\`${name}(...)\` can only be used during component initialisation
https://svelte.dev/e/lifecycle_outside_component`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
  }
}
function store_invalid_shape(name) {
  if (dev_fallback_default) {
    const error = new Error(`store_invalid_shape
\`${name}\` is not a store with a \`subscribe\` method
https://svelte.dev/e/store_invalid_shape`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/store_invalid_shape`);
  }
}

// node_modules/svelte/src/internal/client/errors.js
function async_derived_orphan() {
  if (dev_fallback_default) {
    const error = new Error(`async_derived_orphan
Cannot create a \`$derived(...)\` with an \`await\` expression outside of an effect tree
https://svelte.dev/e/async_derived_orphan`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/async_derived_orphan`);
  }
}
function bind_invalid_checkbox_value() {
  if (dev_fallback_default) {
    const error = new Error(`bind_invalid_checkbox_value
Using \`bind:value\` together with a checkbox input is not allowed. Use \`bind:checked\` instead
https://svelte.dev/e/bind_invalid_checkbox_value`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/bind_invalid_checkbox_value`);
  }
}
function component_api_changed(method, component2) {
  if (dev_fallback_default) {
    const error = new Error(`component_api_changed
Calling \`${method}\` on a component instance (of ${component2}) is no longer valid in Svelte 5
https://svelte.dev/e/component_api_changed`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/component_api_changed`);
  }
}
function component_api_invalid_new(component2, name) {
  if (dev_fallback_default) {
    const error = new Error(`component_api_invalid_new
Attempted to instantiate ${component2} with \`new ${name}\`, which is no longer valid in Svelte 5. If this component is not under your control, set the \`compatibility.componentApi\` compiler option to \`4\` to keep it working.
https://svelte.dev/e/component_api_invalid_new`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/component_api_invalid_new`);
  }
}
function derived_references_self() {
  if (dev_fallback_default) {
    const error = new Error(`derived_references_self
A derived value cannot reference itself recursively
https://svelte.dev/e/derived_references_self`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/derived_references_self`);
  }
}
function each_key_duplicate(a, b, value) {
  if (dev_fallback_default) {
    const error = new Error(`each_key_duplicate
${value ? `Keyed each block has duplicate key \`${value}\` at indexes ${a} and ${b}` : `Keyed each block has duplicate key at indexes ${a} and ${b}`}
https://svelte.dev/e/each_key_duplicate`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/each_key_duplicate`);
  }
}
function each_key_volatile(index2, a, b) {
  if (dev_fallback_default) {
    const error = new Error(`each_key_volatile
Keyed each block has key that is not idempotent \u2014 the key for item at index ${index2} was \`${a}\` but is now \`${b}\`. Keys must be the same each time for a given item
https://svelte.dev/e/each_key_volatile`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/each_key_volatile`);
  }
}
function effect_in_teardown(rune) {
  if (dev_fallback_default) {
    const error = new Error(`effect_in_teardown
\`${rune}\` cannot be used inside an effect cleanup function
https://svelte.dev/e/effect_in_teardown`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/effect_in_teardown`);
  }
}
function effect_in_unowned_derived() {
  if (dev_fallback_default) {
    const error = new Error(`effect_in_unowned_derived
Effect cannot be created inside a \`$derived\` value that was not itself created inside an effect
https://svelte.dev/e/effect_in_unowned_derived`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
  }
}
function effect_orphan(rune) {
  if (dev_fallback_default) {
    const error = new Error(`effect_orphan
\`${rune}\` can only be used inside an effect (e.g. during component initialisation)
https://svelte.dev/e/effect_orphan`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/effect_orphan`);
  }
}
function effect_update_depth_exceeded() {
  if (dev_fallback_default) {
    const error = new Error(`effect_update_depth_exceeded
Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
https://svelte.dev/e/effect_update_depth_exceeded`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
  }
}
function hydration_failed() {
  if (dev_fallback_default) {
    const error = new Error(`hydration_failed
Failed to hydrate the application
https://svelte.dev/e/hydration_failed`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/hydration_failed`);
  }
}
function props_invalid_value(key2) {
  if (dev_fallback_default) {
    const error = new Error(`props_invalid_value
Cannot do \`bind:${key2}={undefined}\` when \`${key2}\` has a fallback value
https://svelte.dev/e/props_invalid_value`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/props_invalid_value`);
  }
}
function rune_outside_svelte(rune) {
  if (dev_fallback_default) {
    const error = new Error(`rune_outside_svelte
The \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files
https://svelte.dev/e/rune_outside_svelte`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/rune_outside_svelte`);
  }
}
function state_descriptors_fixed() {
  if (dev_fallback_default) {
    const error = new Error(`state_descriptors_fixed
Property descriptors defined on \`$state\` objects must contain \`value\` and always be \`enumerable\`, \`configurable\` and \`writable\`.
https://svelte.dev/e/state_descriptors_fixed`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
  }
}
function state_prototype_fixed() {
  if (dev_fallback_default) {
    const error = new Error(`state_prototype_fixed
Cannot set prototype of \`$state\` object
https://svelte.dev/e/state_prototype_fixed`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
  }
}
function state_unsafe_mutation() {
  if (dev_fallback_default) {
    const error = new Error(`state_unsafe_mutation
Updating state inside \`$derived(...)\`, \`$inspect(...)\` or a template expression is forbidden. If the value should not be reactive, declare it without \`$state\`
https://svelte.dev/e/state_unsafe_mutation`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
  }
}
function svelte_boundary_reset_onerror() {
  if (dev_fallback_default) {
    const error = new Error(`svelte_boundary_reset_onerror
A \`<svelte:boundary>\` \`reset\` function cannot be called while an error is still being handled
https://svelte.dev/e/svelte_boundary_reset_onerror`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
  }
}

// node_modules/svelte/src/internal/client/warnings.js
var bold = "font-weight: bold";
var normal = "font-weight: normal";
function await_reactivity_loss(name) {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] await_reactivity_loss
%cDetected reactivity loss when reading \`${name}\`. This happens when state is read in an async function after an earlier \`await\`
https://svelte.dev/e/await_reactivity_loss`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/await_reactivity_loss`);
  }
}
function await_waterfall(name, location) {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] await_waterfall
%cAn async derived, \`${name}\` (${location}) was not read immediately after it resolved. This often indicates an unnecessary waterfall, which can slow down your app
https://svelte.dev/e/await_waterfall`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/await_waterfall`);
  }
}
function binding_property_non_reactive(binding, location) {
  if (dev_fallback_default) {
    console.warn(
      `%c[svelte] binding_property_non_reactive
%c${location ? `\`${binding}\` (${location}) is binding to a non-reactive property` : `\`${binding}\` is binding to a non-reactive property`}
https://svelte.dev/e/binding_property_non_reactive`,
      bold,
      normal
    );
  } else {
    console.warn(`https://svelte.dev/e/binding_property_non_reactive`);
  }
}
function event_handler_invalid(handler, suggestion) {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] event_handler_invalid
%c${handler} should be a function. Did you mean to ${suggestion}?
https://svelte.dev/e/event_handler_invalid`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/event_handler_invalid`);
  }
}
function hydration_attribute_changed(attribute, html2, value) {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] hydration_attribute_changed
%cThe \`${attribute}\` attribute on \`${html2}\` changed its value between server and client renders. The client value, \`${value}\`, will be ignored in favour of the server value
https://svelte.dev/e/hydration_attribute_changed`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/hydration_attribute_changed`);
  }
}
function hydration_html_changed(location) {
  if (dev_fallback_default) {
    console.warn(
      `%c[svelte] hydration_html_changed
%c${location ? `The value of an \`{@html ...}\` block ${location} changed between server and client renders. The client value will be ignored in favour of the server value` : "The value of an `{@html ...}` block changed between server and client renders. The client value will be ignored in favour of the server value"}
https://svelte.dev/e/hydration_html_changed`,
      bold,
      normal
    );
  } else {
    console.warn(`https://svelte.dev/e/hydration_html_changed`);
  }
}
function hydration_mismatch(location) {
  if (dev_fallback_default) {
    console.warn(
      `%c[svelte] hydration_mismatch
%c${location ? `Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near ${location}` : "Hydration failed because the initial UI does not match what was rendered on the server"}
https://svelte.dev/e/hydration_mismatch`,
      bold,
      normal
    );
  } else {
    console.warn(`https://svelte.dev/e/hydration_mismatch`);
  }
}
function lifecycle_double_unmount() {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] lifecycle_double_unmount
%cTried to unmount a component that was not mounted
https://svelte.dev/e/lifecycle_double_unmount`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/lifecycle_double_unmount`);
  }
}
function select_multiple_invalid_value() {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] select_multiple_invalid_value
%cThe \`value\` property of a \`<select multiple>\` element should be an array, but it received a non-array value. The selection will be kept as is.
https://svelte.dev/e/select_multiple_invalid_value`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
  }
}
function state_proxy_equality_mismatch(operator) {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] state_proxy_equality_mismatch
%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${operator}\` will produce unexpected results
https://svelte.dev/e/state_proxy_equality_mismatch`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/state_proxy_equality_mismatch`);
  }
}
function state_proxy_unmount() {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] state_proxy_unmount
%cTried to unmount a state proxy, rather than a component
https://svelte.dev/e/state_proxy_unmount`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/state_proxy_unmount`);
  }
}
function svelte_boundary_reset_noop() {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] svelte_boundary_reset_noop
%cA \`<svelte:boundary>\` \`reset\` function only resets the boundary the first time it is called
https://svelte.dev/e/svelte_boundary_reset_noop`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
  }
}

// node_modules/svelte/src/internal/client/dom/hydration.js
var hydrating = false;
function set_hydrating(value) {
  hydrating = value;
}
var hydrate_node;
function set_hydrate_node(node) {
  if (node === null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return hydrate_node = node;
}
function hydrate_next() {
  return set_hydrate_node(get_next_sibling(hydrate_node));
}
function reset(node) {
  if (!hydrating) return;
  if (get_next_sibling(hydrate_node) !== null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  hydrate_node = node;
}
function next(count = 1) {
  if (hydrating) {
    var i = count;
    var node = hydrate_node;
    while (i--) {
      node = /** @type {TemplateNode} */
      get_next_sibling(node);
    }
    hydrate_node = node;
  }
}
function skip_nodes(remove = true) {
  var depth = 0;
  var node = hydrate_node;
  while (true) {
    if (node.nodeType === COMMENT_NODE) {
      var data = (
        /** @type {Comment} */
        node.data
      );
      if (data === HYDRATION_END) {
        if (depth === 0) return node;
        depth -= 1;
      } else if (data === HYDRATION_START || data === HYDRATION_START_ELSE || // "[1", "[2", etc. for if blocks
      data[0] === "[" && !isNaN(Number(data.slice(1)))) {
        depth += 1;
      }
    }
    var next2 = (
      /** @type {TemplateNode} */
      get_next_sibling(node)
    );
    if (remove) node.remove();
    node = next2;
  }
}
function read_hydration_instruction(node) {
  if (!node || node.nodeType !== COMMENT_NODE) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return (
    /** @type {Comment} */
    node.data
  );
}

// node_modules/svelte/src/internal/client/reactivity/equality.js
function equals(value) {
  return value === this.v;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equals(value) {
  return !safe_not_equal(value, this.v);
}

// node_modules/svelte/src/internal/flags/index.js
var async_mode_flag = false;
var legacy_mode_flag = false;
var tracing_mode_flag = false;

// node_modules/svelte/src/internal/client/dev/tracing.js
var tracing_expressions = null;
function tag(source2, label) {
  source2.label = label;
  tag_proxy(source2.v, label);
  return source2;
}
function tag_proxy(value, label) {
  value?.[PROXY_PATH_SYMBOL]?.(label);
  return value;
}

// node_modules/svelte/src/internal/shared/dev.js
function get_error(label) {
  const error = new Error();
  const stack2 = get_stack();
  if (stack2.length === 0) {
    return null;
  }
  stack2.unshift("\n");
  define_property(error, "stack", {
    value: stack2.join("\n")
  });
  define_property(error, "name", {
    value: label
  });
  return (
    /** @type {Error & { stack: string }} */
    error
  );
}
function get_stack() {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = Infinity;
  const stack2 = new Error().stack;
  Error.stackTraceLimit = limit;
  if (!stack2) return [];
  const lines = stack2.split("\n");
  const new_lines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const posixified = line.replaceAll("\\", "/");
    if (line.trim() === "Error") {
      continue;
    }
    if (line.includes("validate_each_keys")) {
      return [];
    }
    if (posixified.includes("svelte/src/internal") || posixified.includes("node_modules/.vite")) {
      continue;
    }
    new_lines.push(line);
  }
  return new_lines;
}
function invariant(condition, message) {
  if (!dev_fallback_default) {
    throw new Error("invariant(...) was not guarded by if (DEV)");
  }
  if (!condition) invariant_violation(message);
}

// node_modules/svelte/src/internal/client/context.js
var component_context = null;
function set_component_context(context) {
  component_context = context;
}
var dev_stack = null;
function set_dev_stack(stack2) {
  dev_stack = stack2;
}
function add_svelte_meta(callback, type, component2, line, column, additional) {
  const parent = dev_stack;
  dev_stack = {
    type,
    file: component2[FILENAME],
    line,
    column,
    parent,
    ...additional
  };
  try {
    return callback();
  } finally {
    dev_stack = parent;
  }
}
var dev_current_component_function = null;
function set_dev_current_component_function(fn) {
  dev_current_component_function = fn;
}
function push(props, runes = false, fn) {
  component_context = {
    p: component_context,
    i: false,
    c: null,
    e: null,
    s: props,
    x: null,
    r: (
      /** @type {Effect} */
      active_effect
    ),
    l: legacy_mode_flag && !runes ? { s: null, u: null, $: [] } : null
  };
  if (dev_fallback_default) {
    component_context.function = fn;
    dev_current_component_function = fn;
  }
}
function pop(component2) {
  var context = (
    /** @type {ComponentContext} */
    component_context
  );
  var effects = context.e;
  if (effects !== null) {
    context.e = null;
    for (var fn of effects) {
      create_user_effect(fn);
    }
  }
  if (component2 !== void 0) {
    context.x = component2;
  }
  context.i = true;
  component_context = context.p;
  if (dev_fallback_default) {
    dev_current_component_function = component_context?.function ?? null;
  }
  return component2 ?? /** @type {T} */
  {};
}
function is_runes() {
  return !legacy_mode_flag || component_context !== null && component_context.l === null;
}

// node_modules/svelte/src/internal/client/dom/task.js
var micro_tasks = [];
function run_micro_tasks() {
  var tasks = micro_tasks;
  micro_tasks = [];
  run_all(tasks);
}
function queue_micro_task(fn) {
  if (micro_tasks.length === 0 && !is_flushing_sync) {
    var tasks = micro_tasks;
    queueMicrotask(() => {
      if (tasks === micro_tasks) run_micro_tasks();
    });
  }
  micro_tasks.push(fn);
}
function flush_tasks() {
  while (micro_tasks.length > 0) {
    run_micro_tasks();
  }
}

// node_modules/svelte/src/internal/client/error-handling.js
var adjustments = /* @__PURE__ */ new WeakMap();
function handle_error(error) {
  var effect2 = active_effect;
  if (effect2 === null) {
    active_reaction.f |= ERROR_VALUE;
    return error;
  }
  if (dev_fallback_default && error instanceof Error && !adjustments.has(error)) {
    adjustments.set(error, get_adjustments(error, effect2));
  }
  if ((effect2.f & REACTION_RAN) === 0 && (effect2.f & EFFECT) === 0) {
    if (dev_fallback_default && !effect2.parent && error instanceof Error) {
      apply_adjustments(error);
    }
    throw error;
  }
  invoke_error_boundary(error, effect2);
}
function invoke_error_boundary(error, effect2) {
  while (effect2 !== null) {
    if ((effect2.f & BOUNDARY_EFFECT) !== 0) {
      if ((effect2.f & REACTION_RAN) === 0) {
        throw error;
      }
      try {
        effect2.b.error(error);
        return;
      } catch (e) {
        error = e;
      }
    }
    effect2 = effect2.parent;
  }
  if (dev_fallback_default && error instanceof Error) {
    apply_adjustments(error);
  }
  throw error;
}
function get_adjustments(error, effect2) {
  const message_descriptor = get_descriptor(error, "message");
  if (message_descriptor && !message_descriptor.configurable) return;
  var indent = is_firefox ? "  " : "	";
  var component_stack = `
${indent}in ${effect2.fn?.name || "<unknown>"}`;
  var context = effect2.ctx;
  while (context !== null) {
    component_stack += `
${indent}in ${context.function?.[FILENAME].split("/").pop()}`;
    context = context.p;
  }
  return {
    message: error.message + `
${component_stack}
`,
    stack: error.stack?.split("\n").filter((line) => !line.includes("svelte/src/internal")).join("\n")
  };
}
function apply_adjustments(error) {
  const adjusted = adjustments.get(error);
  if (adjusted) {
    define_property(error, "message", {
      value: adjusted.message
    });
    define_property(error, "stack", {
      value: adjusted.stack
    });
  }
}

// node_modules/svelte/src/internal/client/reactivity/status.js
var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
function update_derived_status(derived3) {
  if ((derived3.f & CONNECTED) !== 0 || derived3.deps === null) {
    set_signal_status(derived3, CLEAN);
  } else {
    set_signal_status(derived3, MAYBE_DIRTY);
  }
}

// node_modules/svelte/src/internal/client/reactivity/utils.js
function clear_marked(deps) {
  if (deps === null) return;
  for (const dep of deps) {
    if ((dep.f & DERIVED) === 0 || (dep.f & WAS_MARKED) === 0) {
      continue;
    }
    dep.f ^= WAS_MARKED;
    clear_marked(
      /** @type {Derived} */
      dep.deps
    );
  }
}
function defer_effect(effect2, dirty_effects, maybe_dirty_effects) {
  if ((effect2.f & DIRTY) !== 0) {
    dirty_effects.add(effect2);
  } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
    maybe_dirty_effects.add(effect2);
  }
  clear_marked(effect2.deps);
  set_signal_status(effect2, CLEAN);
}

// node_modules/svelte/src/store/utils.js
function subscribe_to_store(store, run3, invalidate) {
  if (store == null) {
    run3(void 0);
    if (invalidate) invalidate(void 0);
    return noop;
  }
  const unsub = untrack(
    () => store.subscribe(
      run3,
      // @ts-expect-error
      invalidate
    )
  );
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}

// node_modules/svelte/src/store/shared/index.js
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop = null;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set2(fn(
      /** @type {T} */
      value
    ));
  }
  function subscribe(run3, invalidate = noop) {
    const subscriber = [run3, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update2) || noop;
    }
    run3(
      /** @type {T} */
      value
    );
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update: update2, subscribe };
}
function get(store) {
  let value;
  subscribe_to_store(store, (_) => value = _)();
  return value;
}

// node_modules/svelte/src/internal/client/reactivity/store.js
var legacy_is_updating_store = false;
var is_store_binding = false;
var IS_UNMOUNTED = /* @__PURE__ */ Symbol();
function store_get(store, store_name, stores) {
  const entry = stores[store_name] ??= {
    store: null,
    source: mutable_source(void 0),
    unsubscribe: noop
  };
  if (dev_fallback_default) {
    entry.source.label = store_name;
  }
  if (entry.store !== store && !(IS_UNMOUNTED in stores)) {
    entry.unsubscribe();
    entry.store = store ?? null;
    if (store == null) {
      entry.source.v = void 0;
      entry.unsubscribe = noop;
    } else {
      var is_synchronous_callback = true;
      entry.unsubscribe = subscribe_to_store(store, (v) => {
        if (is_synchronous_callback) {
          entry.source.v = v;
        } else {
          set(entry.source, v);
        }
      });
      is_synchronous_callback = false;
    }
  }
  if (store && IS_UNMOUNTED in stores) {
    return get(store);
  }
  return get2(entry.source);
}
function store_set(store, value) {
  update_with_flag(store, value);
  return value;
}
function setup_stores() {
  const stores = {};
  function cleanup() {
    teardown(() => {
      for (var store_name in stores) {
        const ref = stores[store_name];
        ref.unsubscribe();
      }
      define_property(stores, IS_UNMOUNTED, {
        enumerable: false,
        value: true
      });
    });
  }
  return [stores, cleanup];
}
function update_with_flag(store, value) {
  legacy_is_updating_store = true;
  try {
    store.set(value);
  } finally {
    legacy_is_updating_store = false;
  }
}
function store_mutate(store, expression, new_value) {
  update_with_flag(store, new_value);
  return expression;
}
function mark_store_binding() {
  is_store_binding = true;
}
function capture_store_binding(fn) {
  var previous_is_store_binding = is_store_binding;
  try {
    is_store_binding = false;
    return [fn(), is_store_binding];
  } finally {
    is_store_binding = previous_is_store_binding;
  }
}

// node_modules/svelte/src/internal/client/reactivity/batch.js
var batches = /* @__PURE__ */ new Set();
var current_batch = null;
var previous_batch = null;
var batch_values = null;
var last_scheduled_effect = null;
var is_flushing_sync = false;
var is_processing = false;
var collected_effects = null;
var legacy_updates = null;
var flush_count = 0;
var source_stacks = dev_fallback_default ? /* @__PURE__ */ new Set() : null;
var uid = 1;
var Batch = class _Batch {
  id = uid++;
  /**
   * The current values of any signals that are updated in this batch.
   * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Value, [any, boolean]>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Value, any>}
   */
  previous = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<(batch: Batch) => void>}
   */
  #commit_callbacks = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #discard_callbacks = /* @__PURE__ */ new Set();
  /**
   * Async effects that are currently in flight
   * @type {Map<Effect, number>}
   */
  #pending = /* @__PURE__ */ new Map();
  /**
   * Async effects that are currently in flight, _not_ inside a pending boundary
   * @type {Map<Effect, number>}
   */
  #blocking_pending = /* @__PURE__ */ new Map();
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #deferred = null;
  /**
   * The root effects that need to be flushed
   * @type {Effect[]}
   */
  #roots = [];
  /**
   * Effects created while this batch was active.
   * @type {Effect[]}
   */
  #new_effects = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #dirty_effects = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #maybe_dirty_effects = /* @__PURE__ */ new Set();
  /**
   * A map of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`.
   * The value contains child effects that were dirty/maybe_dirty before being reset,
   * so they can be rescheduled if the branch survives.
   * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
   */
  #skipped_branches = /* @__PURE__ */ new Map();
  /**
   * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
   * @type {Set<Effect>}
   */
  #unskipped_branches = /* @__PURE__ */ new Set();
  is_fork = false;
  #decrement_queued = false;
  /** @type {Set<Batch>} */
  #blockers = /* @__PURE__ */ new Set();
  #is_deferred() {
    return this.is_fork || this.#blocking_pending.size > 0;
  }
  #is_blocked() {
    for (const batch of this.#blockers) {
      for (const effect2 of batch.#blocking_pending.keys()) {
        var skipped = false;
        var e = effect2;
        while (e.parent !== null) {
          if (this.#skipped_branches.has(e)) {
            skipped = true;
            break;
          }
          e = e.parent;
        }
        if (!skipped) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(effect2) {
    if (!this.#skipped_branches.has(effect2)) {
      this.#skipped_branches.set(effect2, { d: [], m: [] });
    }
    this.#unskipped_branches.delete(effect2);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(effect2, callback = (e) => this.schedule(e)) {
    var tracked = this.#skipped_branches.get(effect2);
    if (tracked) {
      this.#skipped_branches.delete(effect2);
      for (var e of tracked.d) {
        set_signal_status(e, DIRTY);
        callback(e);
      }
      for (e of tracked.m) {
        set_signal_status(e, MAYBE_DIRTY);
        callback(e);
      }
    }
    this.#unskipped_branches.add(effect2);
  }
  #process() {
    if (flush_count++ > 1e3) {
      batches.delete(this);
      infinite_loop_guard();
    }
    if (!this.#is_deferred()) {
      for (const e of this.#dirty_effects) {
        this.#maybe_dirty_effects.delete(e);
        set_signal_status(e, DIRTY);
        this.schedule(e);
      }
      for (const e of this.#maybe_dirty_effects) {
        set_signal_status(e, MAYBE_DIRTY);
        this.schedule(e);
      }
    }
    const roots = this.#roots;
    this.#roots = [];
    this.apply();
    var effects = collected_effects = [];
    var render_effects = [];
    var updates = legacy_updates = [];
    for (const root13 of roots) {
      try {
        this.#traverse(root13, effects, render_effects);
      } catch (e) {
        reset_all(root13);
        throw e;
      }
    }
    current_batch = null;
    if (updates.length > 0) {
      var batch = _Batch.ensure();
      for (const e of updates) {
        batch.schedule(e);
      }
    }
    collected_effects = null;
    legacy_updates = null;
    if (this.#is_deferred() || this.#is_blocked()) {
      this.#defer_effects(render_effects);
      this.#defer_effects(effects);
      for (const [e, t] of this.#skipped_branches) {
        reset_branch(e, t);
      }
    } else {
      if (this.#pending.size === 0) {
        batches.delete(this);
      }
      this.#dirty_effects.clear();
      this.#maybe_dirty_effects.clear();
      for (const fn of this.#commit_callbacks) fn(this);
      this.#commit_callbacks.clear();
      previous_batch = this;
      flush_queued_effects(render_effects);
      flush_queued_effects(effects);
      previous_batch = null;
      this.#deferred?.resolve();
    }
    var next_batch = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      current_batch
    );
    if (this.#roots.length > 0) {
      const batch2 = next_batch ??= this;
      batch2.#roots.push(...this.#roots.filter((r2) => !batch2.#roots.includes(r2)));
    }
    if (next_batch !== null) {
      batches.add(next_batch);
      if (dev_fallback_default) {
        for (const source2 of this.current.keys()) {
          source_stacks.add(source2);
        }
      }
      next_batch.#process();
    }
    if (async_mode_flag && !batches.has(this)) {
      this.#commit();
    }
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #traverse(root13, effects, render_effects) {
    root13.f ^= CLEAN;
    var effect2 = root13.first;
    while (effect2 !== null) {
      var flags2 = effect2.f;
      var is_branch = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
      var is_skippable_branch = is_branch && (flags2 & CLEAN) !== 0;
      var skip = is_skippable_branch || (flags2 & INERT) !== 0 || this.#skipped_branches.has(effect2);
      if (!skip && effect2.fn !== null) {
        if (is_branch) {
          effect2.f ^= CLEAN;
        } else if ((flags2 & EFFECT) !== 0) {
          effects.push(effect2);
        } else if (async_mode_flag && (flags2 & (RENDER_EFFECT | MANAGED_EFFECT)) !== 0) {
          render_effects.push(effect2);
        } else if (is_dirty(effect2)) {
          if ((flags2 & BLOCK_EFFECT) !== 0) this.#maybe_dirty_effects.add(effect2);
          update_effect(effect2);
        }
        var child2 = effect2.first;
        if (child2 !== null) {
          effect2 = child2;
          continue;
        }
      }
      while (effect2 !== null) {
        var next2 = effect2.next;
        if (next2 !== null) {
          effect2 = next2;
          break;
        }
        effect2 = effect2.parent;
      }
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #defer_effects(effects) {
    for (var i = 0; i < effects.length; i += 1) {
      defer_effect(effects[i], this.#dirty_effects, this.#maybe_dirty_effects);
    }
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(source2, value, is_derived = false) {
    if (source2.v !== UNINITIALIZED && !this.previous.has(source2)) {
      this.previous.set(source2, source2.v);
    }
    if ((source2.f & ERROR_VALUE) === 0) {
      this.current.set(source2, [value, is_derived]);
      batch_values?.set(source2, value);
    }
    if (!this.is_fork) {
      source2.v = value;
    }
  }
  activate() {
    current_batch = this;
  }
  deactivate() {
    current_batch = null;
    batch_values = null;
  }
  flush() {
    var source_stacks2 = dev_fallback_default ? /* @__PURE__ */ new Set() : null;
    try {
      is_processing = true;
      current_batch = this;
      this.#process();
    } finally {
      flush_count = 0;
      last_scheduled_effect = null;
      collected_effects = null;
      legacy_updates = null;
      is_processing = false;
      current_batch = null;
      batch_values = null;
      old_values.clear();
      if (dev_fallback_default) {
        for (
          const source2 of
          /** @type {Set<Source>} */
          source_stacks2
        ) {
          source2.updated = null;
        }
      }
    }
  }
  discard() {
    for (const fn of this.#discard_callbacks) fn(this);
    this.#discard_callbacks.clear();
    batches.delete(this);
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(effect2) {
    this.#new_effects.push(effect2);
  }
  #commit() {
    for (const batch of batches) {
      var is_earlier = batch.id < this.id;
      var sources = [];
      for (const [source3, [value, is_derived]] of this.current) {
        if (batch.current.has(source3)) {
          var batch_value = (
            /** @type {[any, boolean]} */
            batch.current.get(source3)[0]
          );
          if (is_earlier && value !== batch_value) {
            batch.current.set(source3, [value, is_derived]);
          } else {
            continue;
          }
        }
        sources.push(source3);
      }
      var others = [...batch.current.keys()].filter((s) => !this.current.has(s));
      if (others.length === 0) {
        if (is_earlier) {
          batch.discard();
        }
      } else if (sources.length > 0) {
        if (dev_fallback_default) {
          invariant(batch.#roots.length === 0, "Batch has scheduled roots");
        }
        if (is_earlier) {
          for (const unskipped of this.#unskipped_branches) {
            batch.unskip_effect(unskipped, (e) => {
              if ((e.f & (BLOCK_EFFECT | ASYNC)) !== 0) {
                batch.schedule(e);
              } else {
                batch.#defer_effects([e]);
              }
            });
          }
        }
        batch.activate();
        var marked = /* @__PURE__ */ new Set();
        var checked = /* @__PURE__ */ new Map();
        for (var source2 of sources) {
          mark_effects(source2, others, marked, checked);
        }
        checked = /* @__PURE__ */ new Map();
        var current_unequal = [...batch.current.keys()].filter(
          (c) => this.current.has(c) ? (
            /** @type {[any, boolean]} */
            this.current.get(c)[0] !== c
          ) : true
        );
        for (const effect2 of this.#new_effects) {
          if ((effect2.f & (DESTROYED | INERT | EAGER_EFFECT)) === 0 && depends_on(effect2, current_unequal, checked)) {
            if ((effect2.f & (ASYNC | BLOCK_EFFECT)) !== 0) {
              set_signal_status(effect2, DIRTY);
              batch.schedule(effect2);
            } else {
              batch.#dirty_effects.add(effect2);
            }
          }
        }
        if (batch.#roots.length > 0) {
          batch.apply();
          for (var root13 of batch.#roots) {
            batch.#traverse(root13, [], []);
          }
          batch.#roots = [];
        }
        batch.deactivate();
      }
    }
    for (const batch of batches) {
      if (batch.#blockers.has(this)) {
        batch.#blockers.delete(this);
        if (batch.#blockers.size === 0 && !batch.#is_deferred()) {
          batch.activate();
          batch.#process();
        }
      }
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(blocking, effect2) {
    let pending_count = this.#pending.get(effect2) ?? 0;
    this.#pending.set(effect2, pending_count + 1);
    if (blocking) {
      let blocking_pending_count = this.#blocking_pending.get(effect2) ?? 0;
      this.#blocking_pending.set(effect2, blocking_pending_count + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(blocking, effect2, skip) {
    let pending_count = this.#pending.get(effect2) ?? 0;
    if (pending_count === 1) {
      this.#pending.delete(effect2);
    } else {
      this.#pending.set(effect2, pending_count - 1);
    }
    if (blocking) {
      let blocking_pending_count = this.#blocking_pending.get(effect2) ?? 0;
      if (blocking_pending_count === 1) {
        this.#blocking_pending.delete(effect2);
      } else {
        this.#blocking_pending.set(effect2, blocking_pending_count - 1);
      }
    }
    if (this.#decrement_queued || skip) return;
    this.#decrement_queued = true;
    queue_micro_task(() => {
      this.#decrement_queued = false;
      this.flush();
    });
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(dirty_effects, maybe_dirty_effects) {
    for (const e of dirty_effects) {
      this.#dirty_effects.add(e);
    }
    for (const e of maybe_dirty_effects) {
      this.#maybe_dirty_effects.add(e);
    }
    dirty_effects.clear();
    maybe_dirty_effects.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(fn) {
    this.#commit_callbacks.add(fn);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(fn) {
    this.#discard_callbacks.add(fn);
  }
  settled() {
    return (this.#deferred ??= deferred()).promise;
  }
  static ensure() {
    if (current_batch === null) {
      const batch = current_batch = new _Batch();
      if (!is_processing) {
        batches.add(current_batch);
        if (!is_flushing_sync) {
          queue_micro_task(() => {
            if (current_batch !== batch) {
              return;
            }
            batch.flush();
          });
        }
      }
    }
    return current_batch;
  }
  apply() {
    if (!async_mode_flag || !this.is_fork && batches.size === 1) {
      batch_values = null;
      return;
    }
    batch_values = /* @__PURE__ */ new Map();
    for (const [source2, [value]] of this.current) {
      batch_values.set(source2, value);
    }
    for (const batch of batches) {
      if (batch === this || batch.is_fork) continue;
      var intersects = false;
      var differs = false;
      if (batch.id < this.id) {
        for (const [source2, [, is_derived]] of batch.current) {
          if (is_derived) continue;
          intersects ||= this.current.has(source2);
          differs ||= !this.current.has(source2);
        }
      }
      if (intersects && differs) {
        this.#blockers.add(batch);
      } else {
        for (const [source2, previous] of batch.previous) {
          if (!batch_values.has(source2)) {
            batch_values.set(source2, previous);
          }
        }
      }
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(effect2) {
    last_scheduled_effect = effect2;
    if (effect2.b?.is_pending && (effect2.f & (EFFECT | RENDER_EFFECT | MANAGED_EFFECT)) !== 0 && (effect2.f & REACTION_RAN) === 0) {
      effect2.b.defer_effect(effect2);
      return;
    }
    var e = effect2;
    while (e.parent !== null) {
      e = e.parent;
      var flags2 = e.f;
      if (collected_effects !== null && e === active_effect) {
        if (async_mode_flag) return;
        if ((active_reaction === null || (active_reaction.f & DERIVED) === 0) && !legacy_is_updating_store) {
          return;
        }
      }
      if ((flags2 & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags2 & CLEAN) === 0) {
          return;
        }
        e.f ^= CLEAN;
      }
    }
    this.#roots.push(e);
  }
};
function flushSync(fn) {
  var was_flushing_sync = is_flushing_sync;
  is_flushing_sync = true;
  try {
    var result;
    if (fn) {
      if (current_batch !== null && !current_batch.is_fork) {
        current_batch.flush();
      }
      result = fn();
    }
    while (true) {
      flush_tasks();
      if (current_batch === null) {
        return (
          /** @type {T} */
          result
        );
      }
      current_batch.flush();
    }
  } finally {
    is_flushing_sync = was_flushing_sync;
  }
}
function infinite_loop_guard() {
  if (dev_fallback_default) {
    var updates = /* @__PURE__ */ new Map();
    for (
      const source2 of
      /** @type {Batch} */
      current_batch.current.keys()
    ) {
      for (const [stack2, update2] of source2.updated ?? []) {
        var entry = updates.get(stack2);
        if (!entry) {
          entry = { error: update2.error, count: 0 };
          updates.set(stack2, entry);
        }
        entry.count += update2.count;
      }
    }
    for (const update2 of updates.values()) {
      if (update2.error) {
        console.error(update2.error);
      }
    }
  }
  try {
    effect_update_depth_exceeded();
  } catch (error) {
    if (dev_fallback_default) {
      define_property(error, "stack", { value: "" });
    }
    invoke_error_boundary(error, last_scheduled_effect);
  }
}
var eager_block_effects = null;
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0) return;
  var i = 0;
  while (i < length) {
    var effect2 = effects[i++];
    if ((effect2.f & (DESTROYED | INERT)) === 0 && is_dirty(effect2)) {
      eager_block_effects = /* @__PURE__ */ new Set();
      update_effect(effect2);
      if (effect2.deps === null && effect2.first === null && effect2.nodes === null && effect2.teardown === null && effect2.ac === null) {
        unlink_effect(effect2);
      }
      if (eager_block_effects?.size > 0) {
        old_values.clear();
        for (const e of eager_block_effects) {
          if ((e.f & (DESTROYED | INERT)) !== 0) continue;
          const ordered_effects = [e];
          let ancestor = e.parent;
          while (ancestor !== null) {
            if (eager_block_effects.has(ancestor)) {
              eager_block_effects.delete(ancestor);
              ordered_effects.push(ancestor);
            }
            ancestor = ancestor.parent;
          }
          for (let j = ordered_effects.length - 1; j >= 0; j--) {
            const e2 = ordered_effects[j];
            if ((e2.f & (DESTROYED | INERT)) !== 0) continue;
            update_effect(e2);
          }
        }
        eager_block_effects.clear();
      }
    }
  }
  eager_block_effects = null;
}
function mark_effects(value, sources, marked, checked) {
  if (marked.has(value)) return;
  marked.add(value);
  if (value.reactions !== null) {
    for (const reaction of value.reactions) {
      const flags2 = reaction.f;
      if ((flags2 & DERIVED) !== 0) {
        mark_effects(
          /** @type {Derived} */
          reaction,
          sources,
          marked,
          checked
        );
      } else if ((flags2 & (ASYNC | BLOCK_EFFECT)) !== 0 && (flags2 & DIRTY) === 0 && depends_on(reaction, sources, checked)) {
        set_signal_status(reaction, DIRTY);
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
}
function depends_on(reaction, sources, checked) {
  const depends = checked.get(reaction);
  if (depends !== void 0) return depends;
  if (reaction.deps !== null) {
    for (const dep of reaction.deps) {
      if (includes.call(sources, dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on(
        /** @type {Derived} */
        dep,
        sources,
        checked
      )) {
        checked.set(
          /** @type {Derived} */
          dep,
          true
        );
        return true;
      }
    }
  }
  checked.set(reaction, false);
  return false;
}
function schedule_effect(effect2) {
  current_batch.schedule(effect2);
}
function reset_branch(effect2, tracked) {
  if ((effect2.f & BRANCH_EFFECT) !== 0 && (effect2.f & CLEAN) !== 0) {
    return;
  }
  if ((effect2.f & DIRTY) !== 0) {
    tracked.d.push(effect2);
  } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
    tracked.m.push(effect2);
  }
  set_signal_status(effect2, CLEAN);
  var e = effect2.first;
  while (e !== null) {
    reset_branch(e, tracked);
    e = e.next;
  }
}
function reset_all(effect2) {
  set_signal_status(effect2, CLEAN);
  var e = effect2.first;
  while (e !== null) {
    reset_all(e);
    e = e.next;
  }
}

// node_modules/svelte/src/reactivity/create-subscriber.js
function createSubscriber(start) {
  let subscribers = 0;
  let version = source(0);
  let stop;
  if (dev_fallback_default) {
    tag(version, "createSubscriber version");
  }
  return () => {
    if (effect_tracking()) {
      get2(version);
      render_effect(() => {
        if (subscribers === 0) {
          stop = untrack(() => start(() => increment(version)));
        }
        subscribers += 1;
        return () => {
          queue_micro_task(() => {
            subscribers -= 1;
            if (subscribers === 0) {
              stop?.();
              stop = void 0;
              increment(version);
            }
          });
        };
      });
    }
  };
}

// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
function boundary(node, props, children, transform_error) {
  new Boundary(node, props, children, transform_error);
}
var Boundary = class {
  /** @type {Boundary | null} */
  parent;
  is_pending = false;
  /**
   * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
   * Inherited from parent boundary, or defaults to identity.
   * @type {(error: unknown) => unknown}
   */
  transform_error;
  /** @type {TemplateNode} */
  #anchor;
  /** @type {TemplateNode | null} */
  #hydrate_open = hydrating ? hydrate_node : null;
  /** @type {BoundaryProps} */
  #props;
  /** @type {((anchor: Node) => void)} */
  #children;
  /** @type {Effect} */
  #effect;
  /** @type {Effect | null} */
  #main_effect = null;
  /** @type {Effect | null} */
  #pending_effect = null;
  /** @type {Effect | null} */
  #failed_effect = null;
  /** @type {DocumentFragment | null} */
  #offscreen_fragment = null;
  #local_pending_count = 0;
  #pending_count = 0;
  #pending_count_update_queued = false;
  /** @type {Set<Effect>} */
  #dirty_effects = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #maybe_dirty_effects = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #effect_pending = null;
  #effect_pending_subscriber = createSubscriber(() => {
    this.#effect_pending = source(this.#local_pending_count);
    if (dev_fallback_default) {
      tag(this.#effect_pending, "$effect.pending()");
    }
    return () => {
      this.#effect_pending = null;
    };
  });
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(node, props, children, transform_error) {
    this.#anchor = node;
    this.#props = props;
    this.#children = (anchor) => {
      var effect2 = (
        /** @type {Effect} */
        active_effect
      );
      effect2.b = this;
      effect2.f |= BOUNDARY_EFFECT;
      children(anchor);
    };
    this.parent = /** @type {Effect} */
    active_effect.b;
    this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);
    this.#effect = block(() => {
      if (hydrating) {
        const comment2 = (
          /** @type {Comment} */
          this.#hydrate_open
        );
        hydrate_next();
        const server_rendered_pending = comment2.data === HYDRATION_START_ELSE;
        const server_rendered_failed = comment2.data.startsWith(HYDRATION_START_FAILED);
        if (server_rendered_failed) {
          const serialized_error = JSON.parse(comment2.data.slice(HYDRATION_START_FAILED.length));
          this.#hydrate_failed_content(serialized_error);
        } else if (server_rendered_pending) {
          this.#hydrate_pending_content();
        } else {
          this.#hydrate_resolved_content();
        }
      } else {
        this.#render();
      }
    }, flags);
    if (hydrating) {
      this.#anchor = hydrate_node;
    }
  }
  #hydrate_resolved_content() {
    try {
      this.#main_effect = branch(() => this.#children(this.#anchor));
    } catch (error) {
      this.error(error);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #hydrate_failed_content(error) {
    const failed = this.#props.failed;
    if (!failed) return;
    this.#failed_effect = branch(() => {
      failed(
        this.#anchor,
        () => error,
        () => () => {
        }
      );
    });
  }
  #hydrate_pending_content() {
    const pending2 = this.#props.pending;
    if (!pending2) return;
    this.is_pending = true;
    this.#pending_effect = branch(() => pending2(this.#anchor));
    queue_micro_task(() => {
      var fragment = this.#offscreen_fragment = document.createDocumentFragment();
      var anchor = create_text();
      fragment.append(anchor);
      this.#main_effect = this.#run(() => {
        return branch(() => this.#children(anchor));
      });
      if (this.#pending_count === 0) {
        this.#anchor.before(fragment);
        this.#offscreen_fragment = null;
        pause_effect(
          /** @type {Effect} */
          this.#pending_effect,
          () => {
            this.#pending_effect = null;
          }
        );
        this.#resolve(
          /** @type {Batch} */
          current_batch
        );
      }
    });
  }
  #render() {
    try {
      this.is_pending = this.has_pending_snippet();
      this.#pending_count = 0;
      this.#local_pending_count = 0;
      this.#main_effect = branch(() => {
        this.#children(this.#anchor);
      });
      if (this.#pending_count > 0) {
        var fragment = this.#offscreen_fragment = document.createDocumentFragment();
        move_effect(this.#main_effect, fragment);
        const pending2 = (
          /** @type {(anchor: Node) => void} */
          this.#props.pending
        );
        this.#pending_effect = branch(() => pending2(this.#anchor));
      } else {
        this.#resolve(
          /** @type {Batch} */
          current_batch
        );
      }
    } catch (error) {
      this.error(error);
    }
  }
  /**
   * @param {Batch} batch
   */
  #resolve(batch) {
    this.is_pending = false;
    batch.transfer_effects(this.#dirty_effects, this.#maybe_dirty_effects);
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(effect2) {
    defer_effect(effect2, this.#dirty_effects, this.#maybe_dirty_effects);
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#props.pending;
  }
  /**
   * @template T
   * @param {() => T} fn
   */
  #run(fn) {
    var previous_effect = active_effect;
    var previous_reaction = active_reaction;
    var previous_ctx = component_context;
    set_active_effect(this.#effect);
    set_active_reaction(this.#effect);
    set_component_context(this.#effect.ctx);
    try {
      Batch.ensure();
      return fn();
    } catch (e) {
      handle_error(e);
      return null;
    } finally {
      set_active_effect(previous_effect);
      set_active_reaction(previous_reaction);
      set_component_context(previous_ctx);
    }
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  #update_pending_count(d, batch) {
    if (!this.has_pending_snippet()) {
      if (this.parent) {
        this.parent.#update_pending_count(d, batch);
      }
      return;
    }
    this.#pending_count += d;
    if (this.#pending_count === 0) {
      this.#resolve(batch);
      if (this.#pending_effect) {
        pause_effect(this.#pending_effect, () => {
          this.#pending_effect = null;
        });
      }
      if (this.#offscreen_fragment) {
        this.#anchor.before(this.#offscreen_fragment);
        this.#offscreen_fragment = null;
      }
    }
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(d, batch) {
    this.#update_pending_count(d, batch);
    this.#local_pending_count += d;
    if (!this.#effect_pending || this.#pending_count_update_queued) return;
    this.#pending_count_update_queued = true;
    queue_micro_task(() => {
      this.#pending_count_update_queued = false;
      if (this.#effect_pending) {
        internal_set(this.#effect_pending, this.#local_pending_count);
      }
    });
  }
  get_effect_pending() {
    this.#effect_pending_subscriber();
    return get2(
      /** @type {Source<number>} */
      this.#effect_pending
    );
  }
  /** @param {unknown} error */
  error(error) {
    var onerror = this.#props.onerror;
    let failed = this.#props.failed;
    if (!onerror && !failed) {
      throw error;
    }
    if (this.#main_effect) {
      destroy_effect(this.#main_effect);
      this.#main_effect = null;
    }
    if (this.#pending_effect) {
      destroy_effect(this.#pending_effect);
      this.#pending_effect = null;
    }
    if (this.#failed_effect) {
      destroy_effect(this.#failed_effect);
      this.#failed_effect = null;
    }
    if (hydrating) {
      set_hydrate_node(
        /** @type {TemplateNode} */
        this.#hydrate_open
      );
      next();
      set_hydrate_node(skip_nodes());
    }
    var did_reset = false;
    var calling_on_error = false;
    const reset2 = () => {
      if (did_reset) {
        svelte_boundary_reset_noop();
        return;
      }
      did_reset = true;
      if (calling_on_error) {
        svelte_boundary_reset_onerror();
      }
      if (this.#failed_effect !== null) {
        pause_effect(this.#failed_effect, () => {
          this.#failed_effect = null;
        });
      }
      this.#run(() => {
        this.#render();
      });
    };
    const handle_error_result = (transformed_error) => {
      try {
        calling_on_error = true;
        onerror?.(transformed_error, reset2);
        calling_on_error = false;
      } catch (error2) {
        invoke_error_boundary(error2, this.#effect && this.#effect.parent);
      }
      if (failed) {
        this.#failed_effect = this.#run(() => {
          try {
            return branch(() => {
              var effect2 = (
                /** @type {Effect} */
                active_effect
              );
              effect2.b = this;
              effect2.f |= BOUNDARY_EFFECT;
              failed(
                this.#anchor,
                () => transformed_error,
                () => reset2
              );
            });
          } catch (error2) {
            invoke_error_boundary(
              error2,
              /** @type {Effect} */
              this.#effect.parent
            );
            return null;
          }
        });
      }
    };
    queue_micro_task(() => {
      var result;
      try {
        result = this.transform_error(error);
      } catch (e) {
        invoke_error_boundary(e, this.#effect && this.#effect.parent);
        return;
      }
      if (result !== null && typeof result === "object" && typeof /** @type {any} */
      result.then === "function") {
        result.then(
          handle_error_result,
          /** @param {unknown} e */
          (e) => invoke_error_boundary(e, this.#effect && this.#effect.parent)
        );
      } else {
        handle_error_result(result);
      }
    });
  }
};

// node_modules/svelte/src/internal/client/reactivity/async.js
function flatten(blockers, sync, async2, fn) {
  const d = is_runes() ? derived : derived_safe_equal;
  var pending2 = blockers.filter((b) => !b.settled);
  if (async2.length === 0 && pending2.length === 0) {
    fn(sync.map(d));
    return;
  }
  var parent = (
    /** @type {Effect} */
    active_effect
  );
  var restore = capture();
  var blocker_promise = pending2.length === 1 ? pending2[0].promise : pending2.length > 1 ? Promise.all(pending2.map((b) => b.promise)) : null;
  function finish(values) {
    restore();
    try {
      fn(values);
    } catch (error) {
      if ((parent.f & DESTROYED) === 0) {
        invoke_error_boundary(error, parent);
      }
    }
    unset_context();
  }
  if (async2.length === 0) {
    blocker_promise.then(() => finish(sync.map(d)));
    return;
  }
  var decrement_pending = increment_pending();
  function run3() {
    Promise.all(async2.map((expression) => async_derived(expression))).then((result) => finish([...sync.map(d), ...result])).catch((error) => invoke_error_boundary(error, parent)).finally(() => decrement_pending());
  }
  if (blocker_promise) {
    blocker_promise.then(() => {
      restore();
      run3();
      unset_context();
    });
  } else {
    run3();
  }
}
function run_after_blockers(blockers, fn) {
  flatten(blockers, [], [], fn);
}
function capture() {
  var previous_effect = (
    /** @type {Effect} */
    active_effect
  );
  var previous_reaction = active_reaction;
  var previous_component_context = component_context;
  var previous_batch2 = (
    /** @type {Batch} */
    current_batch
  );
  if (dev_fallback_default) {
    var previous_dev_stack = dev_stack;
  }
  return function restore(activate_batch = true) {
    set_active_effect(previous_effect);
    set_active_reaction(previous_reaction);
    set_component_context(previous_component_context);
    if (activate_batch && (previous_effect.f & DESTROYED) === 0) {
      previous_batch2?.activate();
      previous_batch2?.apply();
    }
    if (dev_fallback_default) {
      set_reactivity_loss_tracker(null);
      set_dev_stack(previous_dev_stack);
    }
  };
}
async function track_reactivity_loss(promise) {
  var previous_async_effect = reactivity_loss_tracker;
  var value = await promise;
  return () => {
    set_reactivity_loss_tracker(previous_async_effect);
    return value;
  };
}
function unset_context(deactivate_batch = true) {
  set_active_effect(null);
  set_active_reaction(null);
  set_component_context(null);
  if (deactivate_batch) current_batch?.deactivate();
  if (dev_fallback_default) {
    set_reactivity_loss_tracker(null);
    set_dev_stack(null);
  }
}
function increment_pending() {
  var effect2 = (
    /** @type {Effect} */
    active_effect
  );
  var boundary2 = (
    /** @type {Boundary} */
    effect2.b
  );
  var batch = (
    /** @type {Batch} */
    current_batch
  );
  var blocking = boundary2.is_rendered();
  boundary2.update_pending_count(1, batch);
  batch.increment(blocking, effect2);
  return (skip = false) => {
    boundary2.update_pending_count(-1, batch);
    batch.decrement(blocking, effect2, skip);
  };
}

// node_modules/svelte/src/internal/client/reactivity/deriveds.js
var reactivity_loss_tracker = null;
function set_reactivity_loss_tracker(v) {
  reactivity_loss_tracker = v;
}
var recent_async_deriveds = /* @__PURE__ */ new Set();
// @__NO_SIDE_EFFECTS__
function derived(fn) {
  var flags2 = DERIVED | DIRTY;
  var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
    /** @type {Derived} */
    active_reaction
  ) : null;
  if (active_effect !== null) {
    active_effect.f |= EFFECT_PRESERVED;
  }
  const signal = {
    ctx: component_context,
    deps: null,
    effects: null,
    equals,
    f: flags2,
    fn,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      UNINITIALIZED
    ),
    wv: 0,
    parent: parent_derived ?? active_effect,
    ac: null
  };
  if (dev_fallback_default && tracing_mode_flag) {
    signal.created = get_error("created at");
  }
  return signal;
}
// @__NO_SIDE_EFFECTS__
function async_derived(fn, label, location) {
  let parent = (
    /** @type {Effect | null} */
    active_effect
  );
  if (parent === null) {
    async_derived_orphan();
  }
  var promise = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  );
  var signal = source(
    /** @type {V} */
    UNINITIALIZED
  );
  if (dev_fallback_default) signal.label = label;
  var should_suspend = !active_reaction;
  var deferreds = /* @__PURE__ */ new Map();
  async_effect(() => {
    if (dev_fallback_default) {
      reactivity_loss_tracker = {
        effect: (
          /** @type {Effect} */
          active_effect
        ),
        warned: false
      };
    }
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    var d = deferred();
    promise = d.promise;
    try {
      Promise.resolve(fn()).then(d.resolve, d.reject).finally(unset_context);
    } catch (error) {
      d.reject(error);
      unset_context();
    }
    if (dev_fallback_default) {
      reactivity_loss_tracker = null;
    }
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    if (should_suspend) {
      if ((effect2.f & REACTION_RAN) !== 0) {
        var decrement_pending = increment_pending();
      }
      if (
        /** @type {Boundary} */
        parent.b.is_rendered()
      ) {
        deferreds.get(batch)?.reject(STALE_REACTION);
        deferreds.delete(batch);
      } else {
        for (const d2 of deferreds.values()) {
          d2.reject(STALE_REACTION);
        }
        deferreds.clear();
      }
      deferreds.set(batch, d);
    }
    const handler = (value, error = void 0) => {
      if (dev_fallback_default) {
        reactivity_loss_tracker = null;
      }
      if (decrement_pending) {
        var skip = error === STALE_REACTION;
        decrement_pending(skip);
      }
      if (error === STALE_REACTION || (effect2.f & DESTROYED) !== 0) {
        return;
      }
      batch.activate();
      if (error) {
        signal.f |= ERROR_VALUE;
        internal_set(signal, error);
      } else {
        if ((signal.f & ERROR_VALUE) !== 0) {
          signal.f ^= ERROR_VALUE;
        }
        internal_set(signal, value);
        for (const [b, d2] of deferreds) {
          deferreds.delete(b);
          if (b === batch) break;
          d2.reject(STALE_REACTION);
        }
        if (dev_fallback_default && location !== void 0) {
          recent_async_deriveds.add(signal);
          setTimeout(() => {
            if (recent_async_deriveds.has(signal)) {
              await_waterfall(
                /** @type {string} */
                signal.label,
                location
              );
              recent_async_deriveds.delete(signal);
            }
          });
        }
      }
      batch.deactivate();
    };
    d.promise.then(handler, (e) => handler(null, e || "unknown"));
  });
  teardown(() => {
    for (const d of deferreds.values()) {
      d.reject(STALE_REACTION);
    }
  });
  if (dev_fallback_default) {
    signal.f |= ASYNC;
  }
  return new Promise((fulfil) => {
    function next2(p) {
      function go() {
        if (p === promise) {
          fulfil(signal);
        } else {
          next2(promise);
        }
      }
      p.then(go, go);
    }
    next2(promise);
  });
}
// @__NO_SIDE_EFFECTS__
function user_derived(fn) {
  const d = /* @__PURE__ */ derived(fn);
  if (!async_mode_flag) push_reaction_value(d);
  return d;
}
// @__NO_SIDE_EFFECTS__
function derived_safe_equal(fn) {
  const signal = /* @__PURE__ */ derived(fn);
  signal.equals = safe_equals;
  return signal;
}
function destroy_derived_effects(derived3) {
  var effects = derived3.effects;
  if (effects !== null) {
    derived3.effects = null;
    for (var i = 0; i < effects.length; i += 1) {
      destroy_effect(
        /** @type {Effect} */
        effects[i]
      );
    }
  }
}
var stack = [];
function get_derived_parent_effect(derived3) {
  var parent = derived3.parent;
  while (parent !== null) {
    if ((parent.f & DERIVED) === 0) {
      return (parent.f & DESTROYED) === 0 ? (
        /** @type {Effect} */
        parent
      ) : null;
    }
    parent = parent.parent;
  }
  return null;
}
function execute_derived(derived3) {
  var value;
  var prev_active_effect = active_effect;
  set_active_effect(get_derived_parent_effect(derived3));
  if (dev_fallback_default) {
    let prev_eager_effects = eager_effects;
    set_eager_effects(/* @__PURE__ */ new Set());
    try {
      if (includes.call(stack, derived3)) {
        derived_references_self();
      }
      stack.push(derived3);
      derived3.f &= ~WAS_MARKED;
      destroy_derived_effects(derived3);
      value = update_reaction(derived3);
    } finally {
      set_active_effect(prev_active_effect);
      set_eager_effects(prev_eager_effects);
      stack.pop();
    }
  } else {
    try {
      derived3.f &= ~WAS_MARKED;
      destroy_derived_effects(derived3);
      value = update_reaction(derived3);
    } finally {
      set_active_effect(prev_active_effect);
    }
  }
  return value;
}
function update_derived(derived3) {
  var value = execute_derived(derived3);
  if (!derived3.equals(value)) {
    derived3.wv = increment_write_version();
    if (!current_batch?.is_fork || derived3.deps === null) {
      if (current_batch !== null) {
        current_batch.capture(derived3, value, true);
      } else {
        derived3.v = value;
      }
      if (derived3.deps === null) {
        set_signal_status(derived3, CLEAN);
        return;
      }
    }
  }
  if (is_destroying_effect) {
    return;
  }
  if (batch_values !== null) {
    if (effect_tracking() || current_batch?.is_fork) {
      batch_values.set(derived3, value);
    }
  } else {
    update_derived_status(derived3);
  }
}
function freeze_derived_effects(derived3) {
  if (derived3.effects === null) return;
  for (const e of derived3.effects) {
    if (e.teardown || e.ac) {
      e.teardown?.();
      e.ac?.abort(STALE_REACTION);
      e.teardown = noop;
      e.ac = null;
      remove_reactions(e, 0);
      destroy_effect_children(e);
    }
  }
}
function unfreeze_derived_effects(derived3) {
  if (derived3.effects === null) return;
  for (const e of derived3.effects) {
    if (e.teardown) {
      update_effect(e);
    }
  }
}

// node_modules/svelte/src/internal/client/reactivity/sources.js
var eager_effects = /* @__PURE__ */ new Set();
var old_values = /* @__PURE__ */ new Map();
function set_eager_effects(v) {
  eager_effects = v;
}
var eager_effects_deferred = false;
function set_eager_effects_deferred() {
  eager_effects_deferred = true;
}
function source(v, stack2) {
  var signal = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v,
    reactions: null,
    equals,
    rv: 0,
    wv: 0
  };
  if (dev_fallback_default && tracing_mode_flag) {
    signal.created = stack2 ?? get_error("created at");
    signal.updated = null;
    signal.set_during_effect = false;
    signal.trace = null;
  }
  return signal;
}
// @__NO_SIDE_EFFECTS__
function state(v, stack2) {
  const s = source(v, stack2);
  push_reaction_value(s);
  return s;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value, immutable = false, trackable = true) {
  const s = source(initial_value);
  if (!immutable) {
    s.equals = safe_equals;
  }
  if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
    (component_context.l.s ??= []).push(s);
  }
  return s;
}
function set(source2, value, should_proxy = false) {
  if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 && (current_sources === null || !includes.call(current_sources, source2))) {
    state_unsafe_mutation();
  }
  let new_value = should_proxy ? proxy(value) : value;
  if (dev_fallback_default) {
    tag_proxy(
      new_value,
      /** @type {string} */
      source2.label
    );
  }
  return internal_set(source2, new_value, legacy_updates);
}
function internal_set(source2, value, updated_during_traversal = null) {
  if (!source2.equals(value)) {
    old_values.set(source2, is_destroying_effect ? value : source2.v);
    var batch = Batch.ensure();
    batch.capture(source2, value);
    if (dev_fallback_default) {
      if (tracing_mode_flag || active_effect !== null) {
        source2.updated ??= /* @__PURE__ */ new Map();
        const count = (source2.updated.get("")?.count ?? 0) + 1;
        source2.updated.set("", { error: (
          /** @type {any} */
          null
        ), count });
        if (tracing_mode_flag || count > 5) {
          const error = get_error("updated at");
          if (error !== null) {
            let entry = source2.updated.get(error.stack);
            if (!entry) {
              entry = { error, count: 0 };
              source2.updated.set(error.stack, entry);
            }
            entry.count++;
          }
        }
      }
      if (active_effect !== null) {
        source2.set_during_effect = true;
      }
    }
    if ((source2.f & DERIVED) !== 0) {
      const derived3 = (
        /** @type {Derived} */
        source2
      );
      if ((source2.f & DIRTY) !== 0) {
        execute_derived(derived3);
      }
      if (batch_values === null) {
        update_derived_status(derived3);
      }
    }
    source2.wv = increment_write_version();
    mark_reactions(source2, DIRTY, updated_during_traversal);
    if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
      if (untracked_writes === null) {
        set_untracked_writes([source2]);
      } else {
        untracked_writes.push(source2);
      }
    }
    if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
      flush_eager_effects();
    }
  }
  return value;
}
function flush_eager_effects() {
  eager_effects_deferred = false;
  for (const effect2 of eager_effects) {
    if ((effect2.f & CLEAN) !== 0) {
      set_signal_status(effect2, MAYBE_DIRTY);
    }
    if (is_dirty(effect2)) {
      update_effect(effect2);
    }
  }
  eager_effects.clear();
}
function increment(source2) {
  set(source2, source2.v + 1);
}
function mark_reactions(signal, status, updated_during_traversal) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  var runes = is_runes();
  var length = reactions.length;
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    var flags2 = reaction.f;
    if (!runes && reaction === active_effect) continue;
    if (dev_fallback_default && (flags2 & EAGER_EFFECT) !== 0) {
      eager_effects.add(reaction);
      continue;
    }
    var not_dirty = (flags2 & DIRTY) === 0;
    if (not_dirty) {
      set_signal_status(reaction, status);
    }
    if ((flags2 & DERIVED) !== 0) {
      var derived3 = (
        /** @type {Derived} */
        reaction
      );
      batch_values?.delete(derived3);
      if ((flags2 & WAS_MARKED) === 0) {
        if (flags2 & CONNECTED) {
          reaction.f |= WAS_MARKED;
        }
        mark_reactions(derived3, MAYBE_DIRTY, updated_during_traversal);
      }
    } else if (not_dirty) {
      var effect2 = (
        /** @type {Effect} */
        reaction
      );
      if ((flags2 & BLOCK_EFFECT) !== 0 && eager_block_effects !== null) {
        eager_block_effects.add(effect2);
      }
      if (updated_during_traversal !== null) {
        updated_during_traversal.push(effect2);
      } else {
        schedule_effect(effect2);
      }
    }
  }
}

// node_modules/svelte/src/internal/client/proxy.js
var regex_is_valid_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function proxy(value) {
  if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
    return value;
  }
  const prototype = get_prototype_of(value);
  if (prototype !== object_prototype && prototype !== array_prototype) {
    return value;
  }
  var sources = /* @__PURE__ */ new Map();
  var is_proxied_array = is_array(value);
  var version = state(0);
  var stack2 = dev_fallback_default && tracing_mode_flag ? get_error("created at") : null;
  var parent_version = update_version;
  var with_parent = (fn) => {
    if (update_version === parent_version) {
      return fn();
    }
    var reaction = active_reaction;
    var version2 = update_version;
    set_active_reaction(null);
    set_update_version(parent_version);
    var result = fn();
    set_active_reaction(reaction);
    set_update_version(version2);
    return result;
  };
  if (is_proxied_array) {
    sources.set("length", state(
      /** @type {any[]} */
      value.length,
      stack2
    ));
    if (dev_fallback_default) {
      value = /** @type {any} */
      inspectable_array(
        /** @type {any[]} */
        value
      );
    }
  }
  var path = "";
  let updating = false;
  function update_path(new_path) {
    if (updating) return;
    updating = true;
    path = new_path;
    tag(version, `${path} version`);
    for (const [prop2, source2] of sources) {
      tag(source2, get_label(path, prop2));
    }
    updating = false;
  }
  return new Proxy(
    /** @type {any} */
    value,
    {
      defineProperty(_, prop2, descriptor) {
        if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
          state_descriptors_fixed();
        }
        var s = sources.get(prop2);
        if (s === void 0) {
          with_parent(() => {
            var s2 = state(descriptor.value, stack2);
            sources.set(prop2, s2);
            if (dev_fallback_default && typeof prop2 === "string") {
              tag(s2, get_label(path, prop2));
            }
            return s2;
          });
        } else {
          set(s, descriptor.value, true);
        }
        return true;
      },
      deleteProperty(target, prop2) {
        var s = sources.get(prop2);
        if (s === void 0) {
          if (prop2 in target) {
            const s2 = with_parent(() => state(UNINITIALIZED, stack2));
            sources.set(prop2, s2);
            increment(version);
            if (dev_fallback_default) {
              tag(s2, get_label(path, prop2));
            }
          }
        } else {
          set(s, UNINITIALIZED);
          increment(version);
        }
        return true;
      },
      get(target, prop2, receiver) {
        if (prop2 === STATE_SYMBOL) {
          return value;
        }
        if (dev_fallback_default && prop2 === PROXY_PATH_SYMBOL) {
          return update_path;
        }
        var s = sources.get(prop2);
        var exists = prop2 in target;
        if (s === void 0 && (!exists || get_descriptor(target, prop2)?.writable)) {
          s = with_parent(() => {
            var p = proxy(exists ? target[prop2] : UNINITIALIZED);
            var s2 = state(p, stack2);
            if (dev_fallback_default) {
              tag(s2, get_label(path, prop2));
            }
            return s2;
          });
          sources.set(prop2, s);
        }
        if (s !== void 0) {
          var v = get2(s);
          return v === UNINITIALIZED ? void 0 : v;
        }
        return Reflect.get(target, prop2, receiver);
      },
      getOwnPropertyDescriptor(target, prop2) {
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
        if (descriptor && "value" in descriptor) {
          var s = sources.get(prop2);
          if (s) descriptor.value = get2(s);
        } else if (descriptor === void 0) {
          var source2 = sources.get(prop2);
          var value2 = source2?.v;
          if (source2 !== void 0 && value2 !== UNINITIALIZED) {
            return {
              enumerable: true,
              configurable: true,
              value: value2,
              writable: true
            };
          }
        }
        return descriptor;
      },
      has(target, prop2) {
        if (prop2 === STATE_SYMBOL) {
          return true;
        }
        var s = sources.get(prop2);
        var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
        if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop2)?.writable)) {
          if (s === void 0) {
            s = with_parent(() => {
              var p = has ? proxy(target[prop2]) : UNINITIALIZED;
              var s2 = state(p, stack2);
              if (dev_fallback_default) {
                tag(s2, get_label(path, prop2));
              }
              return s2;
            });
            sources.set(prop2, s);
          }
          var value2 = get2(s);
          if (value2 === UNINITIALIZED) {
            return false;
          }
        }
        return has;
      },
      set(target, prop2, value2, receiver) {
        var s = sources.get(prop2);
        var has = prop2 in target;
        if (is_proxied_array && prop2 === "length") {
          for (var i = value2; i < /** @type {Source<number>} */
          s.v; i += 1) {
            var other_s = sources.get(i + "");
            if (other_s !== void 0) {
              set(other_s, UNINITIALIZED);
            } else if (i in target) {
              other_s = with_parent(() => state(UNINITIALIZED, stack2));
              sources.set(i + "", other_s);
              if (dev_fallback_default) {
                tag(other_s, get_label(path, i));
              }
            }
          }
        }
        if (s === void 0) {
          if (!has || get_descriptor(target, prop2)?.writable) {
            s = with_parent(() => state(void 0, stack2));
            if (dev_fallback_default) {
              tag(s, get_label(path, prop2));
            }
            set(s, proxy(value2));
            sources.set(prop2, s);
          }
        } else {
          has = s.v !== UNINITIALIZED;
          var p = with_parent(() => proxy(value2));
          set(s, p);
        }
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
        if (descriptor?.set) {
          descriptor.set.call(receiver, value2);
        }
        if (!has) {
          if (is_proxied_array && typeof prop2 === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n = Number(prop2);
            if (Number.isInteger(n) && n >= ls.v) {
              set(ls, n + 1);
            }
          }
          increment(version);
        }
        return true;
      },
      ownKeys(target) {
        get2(version);
        var own_keys = Reflect.ownKeys(target).filter((key3) => {
          var source3 = sources.get(key3);
          return source3 === void 0 || source3.v !== UNINITIALIZED;
        });
        for (var [key2, source2] of sources) {
          if (source2.v !== UNINITIALIZED && !(key2 in target)) {
            own_keys.push(key2);
          }
        }
        return own_keys;
      },
      setPrototypeOf() {
        state_prototype_fixed();
      }
    }
  );
}
function get_label(path, prop2) {
  if (typeof prop2 === "symbol") return `${path}[Symbol(${prop2.description ?? ""})]`;
  if (regex_is_valid_identifier.test(prop2)) return `${path}.${prop2}`;
  return /^\d+$/.test(prop2) ? `${path}[${prop2}]` : `${path}['${prop2}']`;
}
function get_proxied_value(value) {
  try {
    if (value !== null && typeof value === "object" && STATE_SYMBOL in value) {
      return value[STATE_SYMBOL];
    }
  } catch {
  }
  return value;
}
function is(a, b) {
  return Object.is(get_proxied_value(a), get_proxied_value(b));
}
var ARRAY_MUTATING_METHODS = /* @__PURE__ */ new Set([
  "copyWithin",
  "fill",
  "pop",
  "push",
  "reverse",
  "shift",
  "sort",
  "splice",
  "unshift"
]);
function inspectable_array(array) {
  return new Proxy(array, {
    get(target, prop2, receiver) {
      var value = Reflect.get(target, prop2, receiver);
      if (!ARRAY_MUTATING_METHODS.has(
        /** @type {string} */
        prop2
      )) {
        return value;
      }
      return function(...args) {
        set_eager_effects_deferred();
        var result = value.apply(this, args);
        flush_eager_effects();
        return result;
      };
    }
  });
}

// node_modules/svelte/src/internal/client/dev/equality.js
function init_array_prototype_warnings() {
  const array_prototype2 = Array.prototype;
  const cleanup = Array.__svelte_cleanup;
  if (cleanup) {
    cleanup();
  }
  const { indexOf, lastIndexOf, includes: includes2 } = array_prototype2;
  array_prototype2.indexOf = function(item, from_index) {
    const index2 = indexOf.call(this, item, from_index);
    if (index2 === -1) {
      for (let i = from_index ?? 0; i < this.length; i += 1) {
        if (get_proxied_value(this[i]) === item) {
          state_proxy_equality_mismatch("array.indexOf(...)");
          break;
        }
      }
    }
    return index2;
  };
  array_prototype2.lastIndexOf = function(item, from_index) {
    const index2 = lastIndexOf.call(this, item, from_index ?? this.length - 1);
    if (index2 === -1) {
      for (let i = 0; i <= (from_index ?? this.length - 1); i += 1) {
        if (get_proxied_value(this[i]) === item) {
          state_proxy_equality_mismatch("array.lastIndexOf(...)");
          break;
        }
      }
    }
    return index2;
  };
  array_prototype2.includes = function(item, from_index) {
    const has = includes2.call(this, item, from_index);
    if (!has) {
      for (let i = 0; i < this.length; i += 1) {
        if (get_proxied_value(this[i]) === item) {
          state_proxy_equality_mismatch("array.includes(...)");
          break;
        }
      }
    }
    return has;
  };
  Array.__svelte_cleanup = () => {
    array_prototype2.indexOf = indexOf;
    array_prototype2.lastIndexOf = lastIndexOf;
    array_prototype2.includes = includes2;
  };
}
function strict_equals(a, b, equal = true) {
  try {
    if (a === b !== (get_proxied_value(a) === get_proxied_value(b))) {
      state_proxy_equality_mismatch(equal ? "===" : "!==");
    }
  } catch {
  }
  return a === b === equal;
}

// node_modules/svelte/src/internal/client/dom/operations.js
var $window;
var $document;
var is_firefox;
var first_child_getter;
var next_sibling_getter;
function init_operations() {
  if ($window !== void 0) {
    return;
  }
  $window = window;
  $document = document;
  is_firefox = /Firefox/.test(navigator.userAgent);
  var element_prototype = Element.prototype;
  var node_prototype = Node.prototype;
  var text_prototype = Text.prototype;
  first_child_getter = get_descriptor(node_prototype, "firstChild").get;
  next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
  if (is_extensible(element_prototype)) {
    element_prototype.__click = void 0;
    element_prototype.__className = void 0;
    element_prototype.__attributes = null;
    element_prototype.__style = void 0;
    element_prototype.__e = void 0;
  }
  if (is_extensible(text_prototype)) {
    text_prototype.__t = void 0;
  }
  if (dev_fallback_default) {
    element_prototype.__svelte_meta = null;
    init_array_prototype_warnings();
  }
}
function create_text(value = "") {
  return document.createTextNode(value);
}
// @__NO_SIDE_EFFECTS__
function get_first_child(node) {
  return (
    /** @type {TemplateNode | null} */
    first_child_getter.call(node)
  );
}
// @__NO_SIDE_EFFECTS__
function get_next_sibling(node) {
  return (
    /** @type {TemplateNode | null} */
    next_sibling_getter.call(node)
  );
}
function child(node, is_text) {
  if (!hydrating) {
    return /* @__PURE__ */ get_first_child(node);
  }
  var child2 = /* @__PURE__ */ get_first_child(hydrate_node);
  if (child2 === null) {
    child2 = hydrate_node.appendChild(create_text());
  } else if (is_text && child2.nodeType !== TEXT_NODE) {
    var text2 = create_text();
    child2?.before(text2);
    set_hydrate_node(text2);
    return text2;
  }
  if (is_text) {
    merge_text_nodes(
      /** @type {Text} */
      child2
    );
  }
  set_hydrate_node(child2);
  return child2;
}
function first_child(node, is_text = false) {
  if (!hydrating) {
    var first = /* @__PURE__ */ get_first_child(node);
    if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
    return first;
  }
  if (is_text) {
    if (hydrate_node?.nodeType !== TEXT_NODE) {
      var text2 = create_text();
      hydrate_node?.before(text2);
      set_hydrate_node(text2);
      return text2;
    }
    merge_text_nodes(
      /** @type {Text} */
      hydrate_node
    );
  }
  return hydrate_node;
}
function sibling(node, count = 1, is_text = false) {
  let next_sibling = hydrating ? hydrate_node : node;
  var last_sibling;
  while (count--) {
    last_sibling = next_sibling;
    next_sibling = /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(next_sibling);
  }
  if (!hydrating) {
    return next_sibling;
  }
  if (is_text) {
    if (next_sibling?.nodeType !== TEXT_NODE) {
      var text2 = create_text();
      if (next_sibling === null) {
        last_sibling?.after(text2);
      } else {
        next_sibling.before(text2);
      }
      set_hydrate_node(text2);
      return text2;
    }
    merge_text_nodes(
      /** @type {Text} */
      next_sibling
    );
  }
  set_hydrate_node(next_sibling);
  return next_sibling;
}
function clear_text_content(node) {
  node.textContent = "";
}
function should_defer_append() {
  if (!async_mode_flag) return false;
  if (eager_block_effects !== null) return false;
  var flags2 = (
    /** @type {Effect} */
    active_effect.f
  );
  return (flags2 & REACTION_RAN) !== 0;
}
function create_element(tag2, namespace, is2) {
  let options = is2 ? { is: is2 } : void 0;
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(namespace ?? NAMESPACE_HTML, tag2, options)
  );
}
function merge_text_nodes(text2) {
  if (
    /** @type {string} */
    text2.nodeValue.length < 65536
  ) {
    return;
  }
  let next2 = text2.nextSibling;
  while (next2 !== null && next2.nodeType === TEXT_NODE) {
    next2.remove();
    text2.nodeValue += /** @type {string} */
    next2.nodeValue;
    next2 = text2.nextSibling;
  }
}

// node_modules/svelte/src/internal/client/dom/elements/misc.js
function remove_textarea_child(dom) {
  if (hydrating && get_first_child(dom) !== null) {
    clear_text_content(dom);
  }
}
var listening_to_form_reset = false;
function add_form_reset_listener() {
  if (!listening_to_form_reset) {
    listening_to_form_reset = true;
    document.addEventListener(
      "reset",
      (evt) => {
        Promise.resolve().then(() => {
          if (!evt.defaultPrevented) {
            for (
              const e of
              /**@type {HTMLFormElement} */
              evt.target.elements
            ) {
              e.__on_r?.();
            }
          }
        });
      },
      // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
      { capture: true }
    );
  }
}

// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function without_reactive_context(fn) {
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    return fn();
  } finally {
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
function listen_to_event_and_reset_event(element2, event2, handler, on_reset = handler) {
  element2.addEventListener(event2, () => without_reactive_context(handler));
  const prev = element2.__on_r;
  if (prev) {
    element2.__on_r = () => {
      prev();
      on_reset(true);
    };
  } else {
    element2.__on_r = () => on_reset(true);
  }
  add_form_reset_listener();
}

// node_modules/svelte/src/internal/client/reactivity/effects.js
function validate_effect(rune) {
  if (active_effect === null) {
    if (active_reaction === null) {
      effect_orphan(rune);
    }
    effect_in_unowned_derived();
  }
  if (is_destroying_effect) {
    effect_in_teardown(rune);
  }
}
function push_effect(effect2, parent_effect) {
  var parent_last = parent_effect.last;
  if (parent_last === null) {
    parent_effect.last = parent_effect.first = effect2;
  } else {
    parent_last.next = effect2;
    effect2.prev = parent_last;
    parent_effect.last = effect2;
  }
}
function create_effect(type, fn) {
  var parent = active_effect;
  if (dev_fallback_default) {
    while (parent !== null && (parent.f & EAGER_EFFECT) !== 0) {
      parent = parent.parent;
    }
  }
  if (parent !== null && (parent.f & INERT) !== 0) {
    type |= INERT;
  }
  var effect2 = {
    ctx: component_context,
    deps: null,
    nodes: null,
    f: type | DIRTY | CONNECTED,
    first: null,
    fn,
    last: null,
    next: null,
    parent,
    b: parent && parent.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  if (dev_fallback_default) {
    effect2.component_function = dev_current_component_function;
  }
  current_batch?.register_created_effect(effect2);
  var e = effect2;
  if ((type & EFFECT) !== 0) {
    if (collected_effects !== null) {
      collected_effects.push(effect2);
    } else {
      Batch.ensure().schedule(effect2);
    }
  } else if (fn !== null) {
    try {
      update_effect(effect2);
    } catch (e2) {
      destroy_effect(effect2);
      throw e2;
    }
    if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && // either `null`, or a singular child
    (e.f & EFFECT_PRESERVED) === 0) {
      e = e.first;
      if ((type & BLOCK_EFFECT) !== 0 && (type & EFFECT_TRANSPARENT) !== 0 && e !== null) {
        e.f |= EFFECT_TRANSPARENT;
      }
    }
  }
  if (e !== null) {
    e.parent = parent;
    if (parent !== null) {
      push_effect(e, parent);
    }
    if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0 && (type & ROOT_EFFECT) === 0) {
      var derived3 = (
        /** @type {Derived} */
        active_reaction
      );
      (derived3.effects ??= []).push(e);
    }
  }
  return effect2;
}
function effect_tracking() {
  return active_reaction !== null && !untracking;
}
function teardown(fn) {
  const effect2 = create_effect(RENDER_EFFECT, null);
  set_signal_status(effect2, CLEAN);
  effect2.teardown = fn;
  return effect2;
}
function user_effect(fn) {
  validate_effect("$effect");
  if (dev_fallback_default) {
    define_property(fn, "name", {
      value: "$effect"
    });
  }
  var flags2 = (
    /** @type {Effect} */
    active_effect.f
  );
  var defer = !active_reaction && (flags2 & BRANCH_EFFECT) !== 0 && (flags2 & REACTION_RAN) === 0;
  if (defer) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    (context.e ??= []).push(fn);
  } else {
    return create_user_effect(fn);
  }
}
function create_user_effect(fn) {
  return create_effect(EFFECT | USER_EFFECT, fn);
}
function effect_root(fn) {
  Batch.ensure();
  const effect2 = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn);
  return () => {
    destroy_effect(effect2);
  };
}
function component_root(fn) {
  Batch.ensure();
  const effect2 = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn);
  return (options = {}) => {
    return new Promise((fulfil) => {
      if (options.outro) {
        pause_effect(effect2, () => {
          destroy_effect(effect2);
          fulfil(void 0);
        });
      } else {
        destroy_effect(effect2);
        fulfil(void 0);
      }
    });
  };
}
function effect(fn) {
  return create_effect(EFFECT, fn);
}
function async_effect(fn) {
  return create_effect(ASYNC | EFFECT_PRESERVED, fn);
}
function render_effect(fn, flags2 = 0) {
  return create_effect(RENDER_EFFECT | flags2, fn);
}
function template_effect(fn, sync = [], async2 = [], blockers = []) {
  flatten(blockers, sync, async2, (values) => {
    create_effect(RENDER_EFFECT, () => fn(...values.map(get2)));
  });
}
function block(fn, flags2 = 0) {
  var effect2 = create_effect(BLOCK_EFFECT | flags2, fn);
  if (dev_fallback_default) {
    effect2.dev_stack = dev_stack;
  }
  return effect2;
}
function branch(fn) {
  return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn);
}
function execute_effect_teardown(effect2) {
  var teardown2 = effect2.teardown;
  if (teardown2 !== null) {
    const previously_destroying_effect = is_destroying_effect;
    const previous_reaction = active_reaction;
    set_is_destroying_effect(true);
    set_active_reaction(null);
    try {
      teardown2.call(null);
    } finally {
      set_is_destroying_effect(previously_destroying_effect);
      set_active_reaction(previous_reaction);
    }
  }
}
function destroy_effect_children(signal, remove_dom = false) {
  var effect2 = signal.first;
  signal.first = signal.last = null;
  while (effect2 !== null) {
    const controller = effect2.ac;
    if (controller !== null) {
      without_reactive_context(() => {
        controller.abort(STALE_REACTION);
      });
    }
    var next2 = effect2.next;
    if ((effect2.f & ROOT_EFFECT) !== 0) {
      effect2.parent = null;
    } else {
      destroy_effect(effect2, remove_dom);
    }
    effect2 = next2;
  }
}
function destroy_block_effect_children(signal) {
  var effect2 = signal.first;
  while (effect2 !== null) {
    var next2 = effect2.next;
    if ((effect2.f & BRANCH_EFFECT) === 0) {
      destroy_effect(effect2);
    }
    effect2 = next2;
  }
}
function destroy_effect(effect2, remove_dom = true) {
  var removed = false;
  if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes !== null && effect2.nodes.end !== null) {
    remove_effect_dom(
      effect2.nodes.start,
      /** @type {TemplateNode} */
      effect2.nodes.end
    );
    removed = true;
  }
  set_signal_status(effect2, DESTROYING);
  destroy_effect_children(effect2, remove_dom && !removed);
  remove_reactions(effect2, 0);
  var transitions = effect2.nodes && effect2.nodes.t;
  if (transitions !== null) {
    for (const transition2 of transitions) {
      transition2.stop();
    }
  }
  execute_effect_teardown(effect2);
  effect2.f ^= DESTROYING;
  effect2.f |= DESTROYED;
  var parent = effect2.parent;
  if (parent !== null && parent.first !== null) {
    unlink_effect(effect2);
  }
  if (dev_fallback_default) {
    effect2.component_function = null;
  }
  effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes = effect2.ac = effect2.b = null;
}
function remove_effect_dom(node, end) {
  while (node !== null) {
    var next2 = node === end ? null : get_next_sibling(node);
    node.remove();
    node = next2;
  }
}
function unlink_effect(effect2) {
  var parent = effect2.parent;
  var prev = effect2.prev;
  var next2 = effect2.next;
  if (prev !== null) prev.next = next2;
  if (next2 !== null) next2.prev = prev;
  if (parent !== null) {
    if (parent.first === effect2) parent.first = next2;
    if (parent.last === effect2) parent.last = prev;
  }
}
function pause_effect(effect2, callback, destroy = true) {
  var transitions = [];
  pause_children(effect2, transitions, true);
  var fn = () => {
    if (destroy) destroy_effect(effect2);
    if (callback) callback();
  };
  var remaining = transitions.length;
  if (remaining > 0) {
    var check = () => --remaining || fn();
    for (var transition2 of transitions) {
      transition2.out(check);
    }
  } else {
    fn();
  }
}
function pause_children(effect2, transitions, local) {
  if ((effect2.f & INERT) !== 0) return;
  effect2.f ^= INERT;
  var t = effect2.nodes && effect2.nodes.t;
  if (t !== null) {
    for (const transition2 of t) {
      if (transition2.is_global || local) {
        transitions.push(transition2);
      }
    }
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || // If this is a branch effect without a block effect parent,
    // it means the parent block effect was pruned. In that case,
    // transparency information was transferred to the branch effect.
    (child2.f & BRANCH_EFFECT) !== 0 && (effect2.f & BLOCK_EFFECT) !== 0;
    pause_children(child2, transitions, transparent ? local : false);
    child2 = sibling2;
  }
}
function resume_effect(effect2) {
  resume_children(effect2, true);
}
function resume_children(effect2, local) {
  if ((effect2.f & INERT) === 0) return;
  effect2.f ^= INERT;
  if ((effect2.f & CLEAN) === 0) {
    set_signal_status(effect2, DIRTY);
    Batch.ensure().schedule(effect2);
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
    resume_children(child2, transparent ? local : false);
    child2 = sibling2;
  }
  var t = effect2.nodes && effect2.nodes.t;
  if (t !== null) {
    for (const transition2 of t) {
      if (transition2.is_global || local) {
        transition2.in();
      }
    }
  }
}
function move_effect(effect2, fragment) {
  if (!effect2.nodes) return;
  var node = effect2.nodes.start;
  var end = effect2.nodes.end;
  while (node !== null) {
    var next2 = node === end ? null : get_next_sibling(node);
    fragment.append(node);
    node = next2;
  }
}

// node_modules/svelte/src/internal/client/legacy.js
var captured_signals = null;

// node_modules/svelte/src/internal/client/runtime.js
var is_updating_effect = false;
var is_destroying_effect = false;
function set_is_destroying_effect(value) {
  is_destroying_effect = value;
}
var active_reaction = null;
var untracking = false;
function set_active_reaction(reaction) {
  active_reaction = reaction;
}
var active_effect = null;
function set_active_effect(effect2) {
  active_effect = effect2;
}
var current_sources = null;
function push_reaction_value(value) {
  if (active_reaction !== null && (!async_mode_flag || (active_reaction.f & DERIVED) !== 0)) {
    if (current_sources === null) {
      current_sources = [value];
    } else {
      current_sources.push(value);
    }
  }
}
var new_deps = null;
var skipped_deps = 0;
var untracked_writes = null;
function set_untracked_writes(value) {
  untracked_writes = value;
}
var write_version = 1;
var read_version = 0;
var update_version = read_version;
function set_update_version(value) {
  update_version = value;
}
function increment_write_version() {
  return ++write_version;
}
function is_dirty(reaction) {
  var flags2 = reaction.f;
  if ((flags2 & DIRTY) !== 0) {
    return true;
  }
  if (flags2 & DERIVED) {
    reaction.f &= ~WAS_MARKED;
  }
  if ((flags2 & MAYBE_DIRTY) !== 0) {
    var dependencies = (
      /** @type {Value[]} */
      reaction.deps
    );
    var length = dependencies.length;
    for (var i = 0; i < length; i++) {
      var dependency = dependencies[i];
      if (is_dirty(
        /** @type {Derived} */
        dependency
      )) {
        update_derived(
          /** @type {Derived} */
          dependency
        );
      }
      if (dependency.wv > reaction.wv) {
        return true;
      }
    }
    if ((flags2 & CONNECTED) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    batch_values === null) {
      set_signal_status(reaction, CLEAN);
    }
  }
  return false;
}
function schedule_possible_effect_self_invalidation(signal, effect2, root13 = true) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  if (!async_mode_flag && current_sources !== null && includes.call(current_sources, signal)) {
    return;
  }
  for (var i = 0; i < reactions.length; i++) {
    var reaction = reactions[i];
    if ((reaction.f & DERIVED) !== 0) {
      schedule_possible_effect_self_invalidation(
        /** @type {Derived} */
        reaction,
        effect2,
        false
      );
    } else if (effect2 === reaction) {
      if (root13) {
        set_signal_status(reaction, DIRTY);
      } else if ((reaction.f & CLEAN) !== 0) {
        set_signal_status(reaction, MAYBE_DIRTY);
      }
      schedule_effect(
        /** @type {Effect} */
        reaction
      );
    }
  }
}
function update_reaction(reaction) {
  var previous_deps = new_deps;
  var previous_skipped_deps = skipped_deps;
  var previous_untracked_writes = untracked_writes;
  var previous_reaction = active_reaction;
  var previous_sources = current_sources;
  var previous_component_context = component_context;
  var previous_untracking = untracking;
  var previous_update_version = update_version;
  var flags2 = reaction.f;
  new_deps = /** @type {null | Value[]} */
  null;
  skipped_deps = 0;
  untracked_writes = null;
  active_reaction = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
  current_sources = null;
  set_component_context(reaction.ctx);
  untracking = false;
  update_version = ++read_version;
  if (reaction.ac !== null) {
    without_reactive_context(() => {
      reaction.ac.abort(STALE_REACTION);
    });
    reaction.ac = null;
  }
  try {
    reaction.f |= REACTION_IS_UPDATING;
    var fn = (
      /** @type {Function} */
      reaction.fn
    );
    var result = fn();
    reaction.f |= REACTION_RAN;
    var deps = reaction.deps;
    var is_fork = current_batch?.is_fork;
    if (new_deps !== null) {
      var i;
      if (!is_fork) {
        remove_reactions(reaction, skipped_deps);
      }
      if (deps !== null && skipped_deps > 0) {
        deps.length = skipped_deps + new_deps.length;
        for (i = 0; i < new_deps.length; i++) {
          deps[skipped_deps + i] = new_deps[i];
        }
      } else {
        reaction.deps = deps = new_deps;
      }
      if (effect_tracking() && (reaction.f & CONNECTED) !== 0) {
        for (i = skipped_deps; i < deps.length; i++) {
          (deps[i].reactions ??= []).push(reaction);
        }
      }
    } else if (!is_fork && deps !== null && skipped_deps < deps.length) {
      remove_reactions(reaction, skipped_deps);
      deps.length = skipped_deps;
    }
    if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
      for (i = 0; i < /** @type {Source[]} */
      untracked_writes.length; i++) {
        schedule_possible_effect_self_invalidation(
          untracked_writes[i],
          /** @type {Effect} */
          reaction
        );
      }
    }
    if (previous_reaction !== null && previous_reaction !== reaction) {
      read_version++;
      if (previous_reaction.deps !== null) {
        for (let i2 = 0; i2 < previous_skipped_deps; i2 += 1) {
          previous_reaction.deps[i2].rv = read_version;
        }
      }
      if (previous_deps !== null) {
        for (const dep of previous_deps) {
          dep.rv = read_version;
        }
      }
      if (untracked_writes !== null) {
        if (previous_untracked_writes === null) {
          previous_untracked_writes = untracked_writes;
        } else {
          previous_untracked_writes.push(.../** @type {Source[]} */
          untracked_writes);
        }
      }
    }
    if ((reaction.f & ERROR_VALUE) !== 0) {
      reaction.f ^= ERROR_VALUE;
    }
    return result;
  } catch (error) {
    return handle_error(error);
  } finally {
    reaction.f ^= REACTION_IS_UPDATING;
    new_deps = previous_deps;
    skipped_deps = previous_skipped_deps;
    untracked_writes = previous_untracked_writes;
    active_reaction = previous_reaction;
    current_sources = previous_sources;
    set_component_context(previous_component_context);
    untracking = previous_untracking;
    update_version = previous_update_version;
  }
}
function remove_reaction(signal, dependency) {
  let reactions = dependency.reactions;
  if (reactions !== null) {
    var index2 = index_of.call(reactions, signal);
    if (index2 !== -1) {
      var new_length = reactions.length - 1;
      if (new_length === 0) {
        reactions = dependency.reactions = null;
      } else {
        reactions[index2] = reactions[new_length];
        reactions.pop();
      }
    }
  }
  if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (new_deps === null || !includes.call(new_deps, dependency))) {
    var derived3 = (
      /** @type {Derived} */
      dependency
    );
    if ((derived3.f & CONNECTED) !== 0) {
      derived3.f ^= CONNECTED;
      derived3.f &= ~WAS_MARKED;
    }
    if (derived3.v !== UNINITIALIZED) {
      update_derived_status(derived3);
    }
    freeze_derived_effects(derived3);
    remove_reactions(derived3, 0);
  }
}
function remove_reactions(signal, start_index) {
  var dependencies = signal.deps;
  if (dependencies === null) return;
  for (var i = start_index; i < dependencies.length; i++) {
    remove_reaction(signal, dependencies[i]);
  }
}
function update_effect(effect2) {
  var flags2 = effect2.f;
  if ((flags2 & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect2, CLEAN);
  var previous_effect = active_effect;
  var was_updating_effect = is_updating_effect;
  active_effect = effect2;
  is_updating_effect = true;
  if (dev_fallback_default) {
    var previous_component_fn = dev_current_component_function;
    set_dev_current_component_function(effect2.component_function);
    var previous_stack = (
      /** @type {any} */
      dev_stack
    );
    set_dev_stack(effect2.dev_stack ?? dev_stack);
  }
  try {
    if ((flags2 & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0) {
      destroy_block_effect_children(effect2);
    } else {
      destroy_effect_children(effect2);
    }
    execute_effect_teardown(effect2);
    var teardown2 = update_reaction(effect2);
    effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
    effect2.wv = write_version;
    if (dev_fallback_default && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && effect2.deps !== null) {
      for (var dep of effect2.deps) {
        if (dep.set_during_effect) {
          dep.wv = increment_write_version();
          dep.set_during_effect = false;
        }
      }
    }
  } finally {
    is_updating_effect = was_updating_effect;
    active_effect = previous_effect;
    if (dev_fallback_default) {
      set_dev_current_component_function(previous_component_fn);
      set_dev_stack(previous_stack);
    }
  }
}
async function tick() {
  if (async_mode_flag) {
    return new Promise((f) => {
      requestAnimationFrame(() => f());
      setTimeout(() => f());
    });
  }
  await Promise.resolve();
  flushSync();
}
function get2(signal) {
  var flags2 = signal.f;
  var is_derived = (flags2 & DERIVED) !== 0;
  captured_signals?.add(signal);
  if (active_reaction !== null && !untracking) {
    var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
    if (!destroyed && (current_sources === null || !includes.call(current_sources, signal))) {
      var deps = active_reaction.deps;
      if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
        if (signal.rv < read_version) {
          signal.rv = read_version;
          if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
            skipped_deps++;
          } else if (new_deps === null) {
            new_deps = [signal];
          } else {
            new_deps.push(signal);
          }
        }
      } else {
        (active_reaction.deps ??= []).push(signal);
        var reactions = signal.reactions;
        if (reactions === null) {
          signal.reactions = [active_reaction];
        } else if (!includes.call(reactions, active_reaction)) {
          reactions.push(active_reaction);
        }
      }
    }
  }
  if (dev_fallback_default) {
    if (!untracking && reactivity_loss_tracker && !reactivity_loss_tracker.warned && (reactivity_loss_tracker.effect.f & REACTION_IS_UPDATING) === 0) {
      reactivity_loss_tracker.warned = true;
      await_reactivity_loss(
        /** @type {string} */
        signal.label
      );
      var trace2 = get_error("traced at");
      if (trace2) console.warn(trace2);
    }
    recent_async_deriveds.delete(signal);
    if (tracing_mode_flag && !untracking && tracing_expressions !== null && active_reaction !== null && tracing_expressions.reaction === active_reaction) {
      if (signal.trace) {
        signal.trace();
      } else {
        trace2 = get_error("traced at");
        if (trace2) {
          var entry = tracing_expressions.entries.get(signal);
          if (entry === void 0) {
            entry = { traces: [] };
            tracing_expressions.entries.set(signal, entry);
          }
          var last = entry.traces[entry.traces.length - 1];
          if (trace2.stack !== last?.stack) {
            entry.traces.push(trace2);
          }
        }
      }
    }
  }
  if (is_destroying_effect && old_values.has(signal)) {
    return old_values.get(signal);
  }
  if (is_derived) {
    var derived3 = (
      /** @type {Derived} */
      signal
    );
    if (is_destroying_effect) {
      var value = derived3.v;
      if ((derived3.f & CLEAN) === 0 && derived3.reactions !== null || depends_on_old_values(derived3)) {
        value = execute_derived(derived3);
      }
      old_values.set(derived3, value);
      return value;
    }
    var should_connect = (derived3.f & CONNECTED) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & CONNECTED) !== 0);
    var is_new = (derived3.f & REACTION_RAN) === 0;
    if (is_dirty(derived3)) {
      if (should_connect) {
        derived3.f |= CONNECTED;
      }
      update_derived(derived3);
    }
    if (should_connect && !is_new) {
      unfreeze_derived_effects(derived3);
      reconnect(derived3);
    }
  }
  if (batch_values?.has(signal)) {
    return batch_values.get(signal);
  }
  if ((signal.f & ERROR_VALUE) !== 0) {
    throw signal.v;
  }
  return signal.v;
}
function reconnect(derived3) {
  derived3.f |= CONNECTED;
  if (derived3.deps === null) return;
  for (const dep of derived3.deps) {
    (dep.reactions ??= []).push(derived3);
    if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
      unfreeze_derived_effects(
        /** @type {Derived} */
        dep
      );
      reconnect(
        /** @type {Derived} */
        dep
      );
    }
  }
}
function depends_on_old_values(derived3) {
  if (derived3.v === UNINITIALIZED) return true;
  if (derived3.deps === null) return false;
  for (const dep of derived3.deps) {
    if (old_values.has(dep)) {
      return true;
    }
    if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
      /** @type {Derived} */
      dep
    )) {
      return true;
    }
  }
  return false;
}
function untrack(fn) {
  var previous_untracking = untracking;
  try {
    untracking = true;
    return fn();
  } finally {
    untracking = previous_untracking;
  }
}

// node_modules/svelte/src/internal/client/dom/elements/events.js
var event_symbol = /* @__PURE__ */ Symbol("events");
var all_registered_events = /* @__PURE__ */ new Set();
var root_event_handles = /* @__PURE__ */ new Set();
function replay_events(dom) {
  if (!hydrating) return;
  dom.removeAttribute("onload");
  dom.removeAttribute("onerror");
  const event2 = dom.__e;
  if (event2 !== void 0) {
    dom.__e = void 0;
    queueMicrotask(() => {
      if (dom.isConnected) {
        dom.dispatchEvent(event2);
      }
    });
  }
}
function create_event(event_name, dom, handler, options = {}) {
  function target_handler(event2) {
    if (!options.capture) {
      handle_event_propagation.call(dom, event2);
    }
    if (!event2.cancelBubble) {
      return without_reactive_context(() => {
        return handler?.call(this, event2);
      });
    }
  }
  if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
    queue_micro_task(() => {
      dom.addEventListener(event_name, target_handler, options);
    });
  } else {
    dom.addEventListener(event_name, target_handler, options);
  }
  return target_handler;
}
function event(event_name, dom, handler, capture2, passive2) {
  var options = { capture: capture2, passive: passive2 };
  var target_handler = create_event(event_name, dom, handler, options);
  if (dom === document.body || // @ts-ignore
  dom === window || // @ts-ignore
  dom === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  dom instanceof HTMLMediaElement) {
    teardown(() => {
      dom.removeEventListener(event_name, target_handler, options);
    });
  }
}
function delegated(event_name, element2, handler) {
  (element2[event_symbol] ??= {})[event_name] = handler;
}
function delegate(events) {
  for (var i = 0; i < events.length; i++) {
    all_registered_events.add(events[i]);
  }
  for (var fn of root_event_handles) {
    fn(events);
  }
}
var last_propagated_event = null;
function handle_event_propagation(event2) {
  var handler_element = this;
  var owner_document = (
    /** @type {Node} */
    handler_element.ownerDocument
  );
  var event_name = event2.type;
  var path = event2.composedPath?.() || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event2.target
  );
  last_propagated_event = event2;
  var path_idx = 0;
  var handled_at = last_propagated_event === event2 && event2[event_symbol];
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event2[event_symbol] = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event2.target;
  if (current_target === handler_element) return;
  define_property(event2, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    var throw_error;
    var other_errors = [];
    while (current_target !== null) {
      var parent_element = current_target.assignedSlot || current_target.parentNode || /** @type {any} */
      current_target.host || null;
      try {
        var delegated2 = current_target[event_symbol]?.[event_name];
        if (delegated2 != null && (!/** @type {any} */
        current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
        // -> the target could not have been disabled because it emits the event in the first place
        event2.target === current_target)) {
          delegated2.call(current_target, event2);
        }
      } catch (error) {
        if (throw_error) {
          other_errors.push(error);
        } else {
          throw_error = error;
        }
      }
      if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
        break;
      }
      current_target = parent_element;
    }
    if (throw_error) {
      for (let error of other_errors) {
        queueMicrotask(() => {
          throw error;
        });
      }
      throw throw_error;
    }
  } finally {
    event2[event_symbol] = handler_element;
    delete event2.currentTarget;
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
function apply(thunk, element2, args, component2, loc, has_side_effects = false, remove_parens = false) {
  let handler;
  let error;
  try {
    handler = thunk();
  } catch (e) {
    error = e;
  }
  if (typeof handler !== "function" && (has_side_effects || handler != null || error)) {
    const filename = component2?.[FILENAME];
    const location = loc ? ` at ${filename}:${loc[0]}:${loc[1]}` : ` in ${filename}`;
    const phase = args[0]?.eventPhase < Event.BUBBLING_PHASE ? "capture" : "";
    const event_name = args[0]?.type + phase;
    const description = `\`${event_name}\` handler${location}`;
    const suggestion = remove_parens ? "remove the trailing `()`" : "add a leading `() =>`";
    event_handler_invalid(description, suggestion);
    if (error) {
      throw error;
    }
  }
  handler?.apply(element2, args);
}

// node_modules/svelte/src/internal/client/dom/reconciler.js
var policy = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (html2) => {
      return html2;
    }
  })
);
function create_trusted_html(html2) {
  return (
    /** @type {string} */
    policy?.createHTML(html2) ?? html2
  );
}
function create_fragment_from_html(html2) {
  var elem = create_element("template");
  elem.innerHTML = create_trusted_html(html2.replaceAll("<!>", "<!---->"));
  return elem.content;
}

// node_modules/svelte/src/internal/client/dom/template.js
function assign_nodes(start, end) {
  var effect2 = (
    /** @type {Effect} */
    active_effect
  );
  if (effect2.nodes === null) {
    effect2.nodes = { start, end, a: null, t: null };
  }
}
// @__NO_SIDE_EFFECTS__
function from_html(content, flags2) {
  var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
  var use_import_node = (flags2 & TEMPLATE_USE_IMPORT_NODE) !== 0;
  var node;
  var has_start = !content.startsWith("<!>");
  return () => {
    if (hydrating) {
      assign_nodes(hydrate_node, null);
      return hydrate_node;
    }
    if (node === void 0) {
      node = create_fragment_from_html(has_start ? content : "<!>" + content);
      if (!is_fragment) node = /** @type {TemplateNode} */
      get_first_child(node);
    }
    var clone = (
      /** @type {TemplateNode} */
      use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
    );
    if (is_fragment) {
      var start = (
        /** @type {TemplateNode} */
        get_first_child(clone)
      );
      var end = (
        /** @type {TemplateNode} */
        clone.lastChild
      );
      assign_nodes(start, end);
    } else {
      assign_nodes(clone, clone);
    }
    return clone;
  };
}
// @__NO_SIDE_EFFECTS__
function from_namespace(content, flags2, ns = "svg") {
  var has_start = !content.startsWith("<!>");
  var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
  var wrapped = `<${ns}>${has_start ? content : "<!>" + content}</${ns}>`;
  var node;
  return () => {
    if (hydrating) {
      assign_nodes(hydrate_node, null);
      return hydrate_node;
    }
    if (!node) {
      var fragment = (
        /** @type {DocumentFragment} */
        create_fragment_from_html(wrapped)
      );
      var root13 = (
        /** @type {Element} */
        get_first_child(fragment)
      );
      if (is_fragment) {
        node = document.createDocumentFragment();
        while (get_first_child(root13)) {
          node.appendChild(
            /** @type {TemplateNode} */
            get_first_child(root13)
          );
        }
      } else {
        node = /** @type {Element} */
        get_first_child(root13);
      }
    }
    var clone = (
      /** @type {TemplateNode} */
      node.cloneNode(true)
    );
    if (is_fragment) {
      var start = (
        /** @type {TemplateNode} */
        get_first_child(clone)
      );
      var end = (
        /** @type {TemplateNode} */
        clone.lastChild
      );
      assign_nodes(start, end);
    } else {
      assign_nodes(clone, clone);
    }
    return clone;
  };
}
// @__NO_SIDE_EFFECTS__
function from_svg(content, flags2) {
  return /* @__PURE__ */ from_namespace(content, flags2, "svg");
}
function comment() {
  if (hydrating) {
    assign_nodes(hydrate_node, null);
    return hydrate_node;
  }
  var frag = document.createDocumentFragment();
  var start = document.createComment("");
  var anchor = create_text();
  frag.append(start, anchor);
  assign_nodes(start, anchor);
  return frag;
}
function append(anchor, dom) {
  if (hydrating) {
    var effect2 = (
      /** @type {Effect & { nodes: EffectNodes }} */
      active_effect
    );
    if ((effect2.f & REACTION_RAN) === 0 || effect2.nodes.end === null) {
      effect2.nodes.end = hydrate_node;
    }
    hydrate_next();
    return;
  }
  if (anchor === null) {
    return;
  }
  anchor.before(
    /** @type {Node} */
    dom
  );
}

// node_modules/svelte/src/utils.js
var regex_return_characters = /\r/g;
function hash(str) {
  str = str.replace(regex_return_characters, "");
  let hash2 = 5381;
  let i = str.length;
  while (i--) hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
  return (hash2 >>> 0).toString(36);
}
var DOM_BOOLEAN_ATTRIBUTES = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "indeterminate",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected",
  "webkitdirectory",
  "defer",
  "disablepictureinpicture",
  "disableremoteplayback"
];
var DOM_PROPERTIES = [
  ...DOM_BOOLEAN_ATTRIBUTES,
  "formNoValidate",
  "isMap",
  "noModule",
  "playsInline",
  "readOnly",
  "value",
  "volume",
  "defaultValue",
  "defaultChecked",
  "srcObject",
  "noValidate",
  "allowFullscreen",
  "disablePictureInPicture",
  "disableRemotePlayback"
];
var PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(name) {
  return PASSIVE_EVENTS.includes(name);
}
var STATE_CREATION_RUNES = (
  /** @type {const} */
  [
    "$state",
    "$state.raw",
    "$derived",
    "$derived.by"
  ]
);
var RUNES = (
  /** @type {const} */
  [
    ...STATE_CREATION_RUNES,
    "$state.eager",
    "$state.snapshot",
    "$props",
    "$props.id",
    "$bindable",
    "$effect",
    "$effect.pre",
    "$effect.tracking",
    "$effect.root",
    "$effect.pending",
    "$inspect",
    "$inspect().with",
    "$inspect.trace",
    "$host"
  ]
);
function sanitize_location(location) {
  return (
    /** @type {T} */
    location?.replace(/\//g, "/\u200B")
  );
}

// node_modules/svelte/src/internal/client/render.js
var should_intro = true;
function set_text(text2, value) {
  var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
  if (str !== (text2.__t ??= text2.nodeValue)) {
    text2.__t = str;
    text2.nodeValue = `${str}`;
  }
}
function mount(component2, options) {
  return _mount(component2, options);
}
function hydrate(component2, options) {
  init_operations();
  options.intro = options.intro ?? false;
  const target = options.target;
  const was_hydrating = hydrating;
  const previous_hydrate_node = hydrate_node;
  try {
    var anchor = get_first_child(target);
    while (anchor && (anchor.nodeType !== COMMENT_NODE || /** @type {Comment} */
    anchor.data !== HYDRATION_START)) {
      anchor = get_next_sibling(anchor);
    }
    if (!anchor) {
      throw HYDRATION_ERROR;
    }
    set_hydrating(true);
    set_hydrate_node(
      /** @type {Comment} */
      anchor
    );
    const instance = _mount(component2, { ...options, anchor });
    set_hydrating(false);
    return (
      /**  @type {Exports} */
      instance
    );
  } catch (error) {
    if (error instanceof Error && error.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) {
      throw error;
    }
    if (error !== HYDRATION_ERROR) {
      console.warn("Failed to hydrate: ", error);
    }
    if (options.recover === false) {
      hydration_failed();
    }
    init_operations();
    clear_text_content(target);
    set_hydrating(false);
    return mount(component2, options);
  } finally {
    set_hydrating(was_hydrating);
    set_hydrate_node(previous_hydrate_node);
  }
}
var listeners = /* @__PURE__ */ new Map();
function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
  init_operations();
  var component2 = void 0;
  var unmount2 = component_root(() => {
    var anchor_node = anchor ?? target.appendChild(create_text());
    boundary(
      /** @type {TemplateNode} */
      anchor_node,
      {
        pending: () => {
        }
      },
      (anchor_node2) => {
        push({});
        var ctx = (
          /** @type {ComponentContext} */
          component_context
        );
        if (context) ctx.c = context;
        if (events) {
          props.$$events = events;
        }
        if (hydrating) {
          assign_nodes(
            /** @type {TemplateNode} */
            anchor_node2,
            null
          );
        }
        should_intro = intro;
        component2 = Component(anchor_node2, props) || {};
        should_intro = true;
        if (hydrating) {
          active_effect.nodes.end = hydrate_node;
          if (hydrate_node === null || hydrate_node.nodeType !== COMMENT_NODE || /** @type {Comment} */
          hydrate_node.data !== HYDRATION_END) {
            hydration_mismatch();
            throw HYDRATION_ERROR;
          }
        }
        pop();
      },
      transformError
    );
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive2 = is_passive_event(event_name);
        for (const node of [target, document]) {
          var counts = listeners.get(node);
          if (counts === void 0) {
            counts = /* @__PURE__ */ new Map();
            listeners.set(node, counts);
          }
          var count = counts.get(event_name);
          if (count === void 0) {
            node.addEventListener(event_name, handle_event_propagation, { passive: passive2 });
            counts.set(event_name, 1);
          } else {
            counts.set(event_name, count + 1);
          }
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    return () => {
      for (var event_name of registered_events) {
        for (const node of [target, document]) {
          var counts = (
            /** @type {Map<string, number>} */
            listeners.get(node)
          );
          var count = (
            /** @type {number} */
            counts.get(event_name)
          );
          if (--count == 0) {
            node.removeEventListener(event_name, handle_event_propagation);
            counts.delete(event_name);
            if (counts.size === 0) {
              listeners.delete(node);
            }
          } else {
            counts.set(event_name, count);
          }
        }
      }
      root_event_handles.delete(event_handle);
      if (anchor_node !== anchor) {
        anchor_node.parentNode?.removeChild(anchor_node);
      }
    };
  });
  mounted_components.set(component2, unmount2);
  return component2;
}
var mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component2, options) {
  const fn = mounted_components.get(component2);
  if (fn) {
    mounted_components.delete(component2);
    return fn(options);
  }
  if (dev_fallback_default) {
    if (STATE_SYMBOL in component2) {
      state_proxy_unmount();
    } else {
      lifecycle_double_unmount();
    }
  }
  return Promise.resolve();
}

// node_modules/svelte/src/internal/shared/validate.js
function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== "function") {
    store_invalid_shape(name);
  }
}

// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var BranchManager = class {
  /** @type {TemplateNode} */
  anchor;
  /** @type {Map<Batch, Key>} */
  #batches = /* @__PURE__ */ new Map();
  /**
   * Map of keys to effects that are currently rendered in the DOM.
   * These effects are visible and actively part of the document tree.
   * Example:
   * ```
   * {#if condition}
   * 	foo
   * {:else}
   * 	bar
   * {/if}
   * ```
   * Can result in the entries `true->Effect` and `false->Effect`
   * @type {Map<Key, Effect>}
   */
  #onscreen = /* @__PURE__ */ new Map();
  /**
   * Similar to #onscreen with respect to the keys, but contains branches that are not yet
   * in the DOM, because their insertion is deferred.
   * @type {Map<Key, Branch>}
   */
  #offscreen = /* @__PURE__ */ new Map();
  /**
   * Keys of effects that are currently outroing
   * @type {Set<Key>}
   */
  #outroing = /* @__PURE__ */ new Set();
  /**
   * Whether to pause (i.e. outro) on change, or destroy immediately.
   * This is necessary for `<svelte:element>`
   */
  #transition = true;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(anchor, transition2 = true) {
    this.anchor = anchor;
    this.#transition = transition2;
  }
  /**
   * @param {Batch} batch
   */
  #commit = (batch) => {
    if (!this.#batches.has(batch)) return;
    var key2 = (
      /** @type {Key} */
      this.#batches.get(batch)
    );
    var onscreen = this.#onscreen.get(key2);
    if (onscreen) {
      resume_effect(onscreen);
      this.#outroing.delete(key2);
    } else {
      var offscreen = this.#offscreen.get(key2);
      if (offscreen) {
        this.#onscreen.set(key2, offscreen.effect);
        this.#offscreen.delete(key2);
        offscreen.fragment.lastChild.remove();
        this.anchor.before(offscreen.fragment);
        onscreen = offscreen.effect;
      }
    }
    for (const [b, k] of this.#batches) {
      this.#batches.delete(b);
      if (b === batch) {
        break;
      }
      const offscreen2 = this.#offscreen.get(k);
      if (offscreen2) {
        destroy_effect(offscreen2.effect);
        this.#offscreen.delete(k);
      }
    }
    for (const [k, effect2] of this.#onscreen) {
      if (k === key2 || this.#outroing.has(k)) continue;
      const on_destroy = () => {
        const keys = Array.from(this.#batches.values());
        if (keys.includes(k)) {
          var fragment = document.createDocumentFragment();
          move_effect(effect2, fragment);
          fragment.append(create_text());
          this.#offscreen.set(k, { effect: effect2, fragment });
        } else {
          destroy_effect(effect2);
        }
        this.#outroing.delete(k);
        this.#onscreen.delete(k);
      };
      if (this.#transition || !onscreen) {
        this.#outroing.add(k);
        pause_effect(effect2, on_destroy, false);
      } else {
        on_destroy();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #discard = (batch) => {
    this.#batches.delete(batch);
    const keys = Array.from(this.#batches.values());
    for (const [k, branch2] of this.#offscreen) {
      if (!keys.includes(k)) {
        destroy_effect(branch2.effect);
        this.#offscreen.delete(k);
      }
    }
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(key2, fn) {
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var defer = should_defer_append();
    if (fn && !this.#onscreen.has(key2) && !this.#offscreen.has(key2)) {
      if (defer) {
        var fragment = document.createDocumentFragment();
        var target = create_text();
        fragment.append(target);
        this.#offscreen.set(key2, {
          effect: branch(() => fn(target)),
          fragment
        });
      } else {
        this.#onscreen.set(
          key2,
          branch(() => fn(this.anchor))
        );
      }
    }
    this.#batches.set(batch, key2);
    if (defer) {
      for (const [k, effect2] of this.#onscreen) {
        if (k === key2) {
          batch.unskip_effect(effect2);
        } else {
          batch.skip_effect(effect2);
        }
      }
      for (const [k, branch2] of this.#offscreen) {
        if (k === key2) {
          batch.unskip_effect(branch2.effect);
        } else {
          batch.skip_effect(branch2.effect);
        }
      }
      batch.oncommit(this.#commit);
      batch.ondiscard(this.#discard);
    } else {
      if (hydrating) {
        this.anchor = hydrate_node;
      }
      this.#commit(batch);
    }
  }
};

// node_modules/svelte/src/index-client.js
if (dev_fallback_default) {
  let throw_rune_error = function(rune) {
    if (!(rune in globalThis)) {
      let value;
      Object.defineProperty(globalThis, rune, {
        configurable: true,
        // eslint-disable-next-line getter-return
        get: () => {
          if (value !== void 0) {
            return value;
          }
          rune_outside_svelte(rune);
        },
        set: (v) => {
          value = v;
        }
      });
    }
  };
  throw_rune_error("$state");
  throw_rune_error("$effect");
  throw_rune_error("$derived");
  throw_rune_error("$inspect");
  throw_rune_error("$props");
  throw_rune_error("$bindable");
}
function onMount(fn) {
  if (component_context === null) {
    lifecycle_outside_component("onMount");
  }
  if (legacy_mode_flag && component_context.l !== null) {
    init_update_callbacks(component_context).m.push(fn);
  } else {
    user_effect(() => {
      const cleanup = untrack(fn);
      if (typeof cleanup === "function") return (
        /** @type {() => void} */
        cleanup
      );
    });
  }
}
function onDestroy(fn) {
  if (component_context === null) {
    lifecycle_outside_component("onDestroy");
  }
  onMount(() => () => untrack(fn));
}
function init_update_callbacks(context) {
  var l = (
    /** @type {ComponentContextLegacy} */
    context.l
  );
  return l.u ??= { a: [], b: [], m: [] };
}

// node_modules/svelte/src/internal/client/dev/css.js
var all_styles = /* @__PURE__ */ new Map();
function register_style(hash2, style) {
  var styles = all_styles.get(hash2);
  if (!styles) {
    styles = /* @__PURE__ */ new Set();
    all_styles.set(hash2, styles);
  }
  styles.add(style);
}

// node_modules/svelte/src/internal/client/dev/elements.js
function add_locations(fn, filename, locations) {
  return (...args) => {
    const dom = fn(...args);
    var node = hydrating ? dom : dom.nodeType === DOCUMENT_FRAGMENT_NODE ? dom.firstChild : dom;
    assign_locations(node, filename, locations);
    return dom;
  };
}
function assign_location(element2, filename, location) {
  element2.__svelte_meta = {
    parent: dev_stack,
    loc: { file: filename, line: location[0], column: location[1] }
  };
  if (location[2]) {
    assign_locations(element2.firstChild, filename, location[2]);
  }
}
function assign_locations(node, filename, locations) {
  var i = 0;
  var depth = 0;
  while (node && i < locations.length) {
    if (hydrating && node.nodeType === COMMENT_NODE) {
      var comment2 = (
        /** @type {Comment} */
        node
      );
      if (comment2.data[0] === HYDRATION_START) depth += 1;
      else if (comment2.data[0] === HYDRATION_END) depth -= 1;
    }
    if (depth === 0 && node.nodeType === ELEMENT_NODE) {
      assign_location(
        /** @type {Element} */
        node,
        filename,
        locations[i++]
      );
    }
    node = node.nextSibling;
  }
}

// node_modules/svelte/src/internal/client/dev/legacy.js
function check_target(target) {
  if (target) {
    component_api_invalid_new(target[FILENAME] ?? "a component", target.name);
  }
}
function legacy_api() {
  const component2 = component_context?.function;
  function error(method) {
    component_api_changed(method, component2[FILENAME]);
  }
  return {
    $destroy: () => error("$destroy()"),
    $on: () => error("$on(...)"),
    $set: () => error("$set(...)")
  };
}

// node_modules/svelte/src/internal/client/dom/blocks/if.js
function if_block(node, fn, elseif = false) {
  var marker;
  if (hydrating) {
    marker = hydrate_node;
    hydrate_next();
  }
  var branches = new BranchManager(node);
  var flags2 = elseif ? EFFECT_TRANSPARENT : 0;
  function update_branch(key2, fn2) {
    if (hydrating) {
      var data = read_hydration_instruction(
        /** @type {TemplateNode} */
        marker
      );
      if (key2 !== parseInt(data.substring(1))) {
        var anchor = skip_nodes();
        set_hydrate_node(anchor);
        branches.anchor = anchor;
        set_hydrating(false);
        branches.ensure(key2, fn2);
        set_hydrating(true);
        return;
      }
    }
    branches.ensure(key2, fn2);
  }
  block(() => {
    var has_branch = false;
    fn((fn2, key2 = 0) => {
      has_branch = true;
      update_branch(key2, fn2);
    });
    if (!has_branch) {
      update_branch(-1, null);
    }
  }, flags2);
}

// node_modules/svelte/src/internal/client/dom/blocks/each.js
function index(_, i) {
  return i;
}
function pause_effects(state2, to_destroy, controlled_anchor) {
  var transitions = [];
  var length = to_destroy.length;
  var group;
  var remaining = to_destroy.length;
  for (var i = 0; i < length; i++) {
    let effect2 = to_destroy[i];
    pause_effect(
      effect2,
      () => {
        if (group) {
          group.pending.delete(effect2);
          group.done.add(effect2);
          if (group.pending.size === 0) {
            var groups = (
              /** @type {Set<EachOutroGroup>} */
              state2.outrogroups
            );
            destroy_effects(state2, array_from(group.done));
            groups.delete(group);
            if (groups.size === 0) {
              state2.outrogroups = null;
            }
          }
        } else {
          remaining -= 1;
        }
      },
      false
    );
  }
  if (remaining === 0) {
    var fast_path = transitions.length === 0 && controlled_anchor !== null;
    if (fast_path) {
      var anchor = (
        /** @type {Element} */
        controlled_anchor
      );
      var parent_node = (
        /** @type {Element} */
        anchor.parentNode
      );
      clear_text_content(parent_node);
      parent_node.append(anchor);
      state2.items.clear();
    }
    destroy_effects(state2, to_destroy, !fast_path);
  } else {
    group = {
      pending: new Set(to_destroy),
      done: /* @__PURE__ */ new Set()
    };
    (state2.outrogroups ??= /* @__PURE__ */ new Set()).add(group);
  }
}
function destroy_effects(state2, to_destroy, remove_dom = true) {
  var preserved_effects;
  if (state2.pending.size > 0) {
    preserved_effects = /* @__PURE__ */ new Set();
    for (const keys of state2.pending.values()) {
      for (const key2 of keys) {
        preserved_effects.add(
          /** @type {EachItem} */
          state2.items.get(key2).e
        );
      }
    }
  }
  for (var i = 0; i < to_destroy.length; i++) {
    var e = to_destroy[i];
    if (preserved_effects?.has(e)) {
      e.f |= EFFECT_OFFSCREEN;
      const fragment = document.createDocumentFragment();
      move_effect(e, fragment);
    } else {
      destroy_effect(to_destroy[i], remove_dom);
    }
  }
}
var offscreen_anchor;
function each(node, flags2, get_collection, get_key, render_fn, fallback_fn = null) {
  var anchor = node;
  var items = /* @__PURE__ */ new Map();
  var is_controlled = (flags2 & EACH_IS_CONTROLLED) !== 0;
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      node
    );
    anchor = hydrating ? set_hydrate_node(get_first_child(parent_node)) : parent_node.appendChild(create_text());
  }
  if (hydrating) {
    hydrate_next();
  }
  var fallback2 = null;
  var each_array = derived_safe_equal(() => {
    var collection = get_collection();
    return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
  });
  if (dev_fallback_default) {
    tag(each_array, "{#each ...}");
  }
  var array;
  var pending2 = /* @__PURE__ */ new Map();
  var first_run = true;
  function commit(batch) {
    if ((state2.effect.f & DESTROYED) !== 0) {
      return;
    }
    state2.pending.delete(batch);
    state2.fallback = fallback2;
    reconcile(state2, array, anchor, flags2, get_key);
    if (fallback2 !== null) {
      if (array.length === 0) {
        if ((fallback2.f & EFFECT_OFFSCREEN) === 0) {
          resume_effect(fallback2);
        } else {
          fallback2.f ^= EFFECT_OFFSCREEN;
          move(fallback2, null, anchor);
        }
      } else {
        pause_effect(fallback2, () => {
          fallback2 = null;
        });
      }
    }
  }
  function discard(batch) {
    state2.pending.delete(batch);
  }
  var effect2 = block(() => {
    array = /** @type {V[]} */
    get2(each_array);
    var length = array.length;
    let mismatch = false;
    if (hydrating) {
      var is_else = read_hydration_instruction(anchor) === HYDRATION_START_ELSE;
      if (is_else !== (length === 0)) {
        anchor = skip_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
      }
    }
    var keys = /* @__PURE__ */ new Set();
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var defer = should_defer_append();
    for (var index2 = 0; index2 < length; index2 += 1) {
      if (hydrating && hydrate_node.nodeType === COMMENT_NODE && /** @type {Comment} */
      hydrate_node.data === HYDRATION_END) {
        anchor = /** @type {Comment} */
        hydrate_node;
        mismatch = true;
        set_hydrating(false);
      }
      var value = array[index2];
      var key2 = get_key(value, index2);
      if (dev_fallback_default) {
        var key_again = get_key(value, index2);
        if (key2 !== key_again) {
          each_key_volatile(String(index2), String(key2), String(key_again));
        }
      }
      var item = first_run ? null : items.get(key2);
      if (item) {
        if (item.v) internal_set(item.v, value);
        if (item.i) internal_set(item.i, index2);
        if (defer) {
          batch.unskip_effect(item.e);
        }
      } else {
        item = create_item(
          items,
          first_run ? anchor : offscreen_anchor ??= create_text(),
          value,
          key2,
          index2,
          render_fn,
          flags2,
          get_collection
        );
        if (!first_run) {
          item.e.f |= EFFECT_OFFSCREEN;
        }
        items.set(key2, item);
      }
      keys.add(key2);
    }
    if (length === 0 && fallback_fn && !fallback2) {
      if (first_run) {
        fallback2 = branch(() => fallback_fn(anchor));
      } else {
        fallback2 = branch(() => fallback_fn(offscreen_anchor ??= create_text()));
        fallback2.f |= EFFECT_OFFSCREEN;
      }
    }
    if (length > keys.size) {
      if (dev_fallback_default) {
        validate_each_keys(array, get_key);
      } else {
        each_key_duplicate("", "", "");
      }
    }
    if (hydrating && length > 0) {
      set_hydrate_node(skip_nodes());
    }
    if (!first_run) {
      pending2.set(batch, keys);
      if (defer) {
        for (const [key3, item2] of items) {
          if (!keys.has(key3)) {
            batch.skip_effect(item2.e);
          }
        }
        batch.oncommit(commit);
        batch.ondiscard(discard);
      } else {
        commit(batch);
      }
    }
    if (mismatch) {
      set_hydrating(true);
    }
    get2(each_array);
  });
  var state2 = { effect: effect2, flags: flags2, items, pending: pending2, outrogroups: null, fallback: fallback2 };
  first_run = false;
  if (hydrating) {
    anchor = hydrate_node;
  }
}
function skip_to_branch(effect2) {
  while (effect2 !== null && (effect2.f & BRANCH_EFFECT) === 0) {
    effect2 = effect2.next;
  }
  return effect2;
}
function reconcile(state2, array, anchor, flags2, get_key) {
  var is_animated = (flags2 & EACH_IS_ANIMATED) !== 0;
  var length = array.length;
  var items = state2.items;
  var current = skip_to_branch(state2.effect.first);
  var seen;
  var prev = null;
  var to_animate;
  var matched = [];
  var stashed = [];
  var value;
  var key2;
  var effect2;
  var i;
  if (is_animated) {
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key2 = get_key(value, i);
      effect2 = /** @type {EachItem} */
      items.get(key2).e;
      if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
        effect2.nodes?.a?.measure();
        (to_animate ??= /* @__PURE__ */ new Set()).add(effect2);
      }
    }
  }
  for (i = 0; i < length; i += 1) {
    value = array[i];
    key2 = get_key(value, i);
    effect2 = /** @type {EachItem} */
    items.get(key2).e;
    if (state2.outrogroups !== null) {
      for (const group of state2.outrogroups) {
        group.pending.delete(effect2);
        group.done.delete(effect2);
      }
    }
    if ((effect2.f & INERT) !== 0) {
      resume_effect(effect2);
      if (is_animated) {
        effect2.nodes?.a?.unfix();
        (to_animate ??= /* @__PURE__ */ new Set()).delete(effect2);
      }
    }
    if ((effect2.f & EFFECT_OFFSCREEN) !== 0) {
      effect2.f ^= EFFECT_OFFSCREEN;
      if (effect2 === current) {
        move(effect2, null, anchor);
      } else {
        var next2 = prev ? prev.next : current;
        if (effect2 === state2.effect.last) {
          state2.effect.last = effect2.prev;
        }
        if (effect2.prev) effect2.prev.next = effect2.next;
        if (effect2.next) effect2.next.prev = effect2.prev;
        link(state2, prev, effect2);
        link(state2, effect2, next2);
        move(effect2, next2, anchor);
        prev = effect2;
        matched = [];
        stashed = [];
        current = skip_to_branch(prev.next);
        continue;
      }
    }
    if (effect2 !== current) {
      if (seen !== void 0 && seen.has(effect2)) {
        if (matched.length < stashed.length) {
          var start = stashed[0];
          var j;
          prev = start.prev;
          var a = matched[0];
          var b = matched[matched.length - 1];
          for (j = 0; j < matched.length; j += 1) {
            move(matched[j], start, anchor);
          }
          for (j = 0; j < stashed.length; j += 1) {
            seen.delete(stashed[j]);
          }
          link(state2, a.prev, b.next);
          link(state2, prev, a);
          link(state2, b, start);
          current = start;
          prev = b;
          i -= 1;
          matched = [];
          stashed = [];
        } else {
          seen.delete(effect2);
          move(effect2, current, anchor);
          link(state2, effect2.prev, effect2.next);
          link(state2, effect2, prev === null ? state2.effect.first : prev.next);
          link(state2, prev, effect2);
          prev = effect2;
        }
        continue;
      }
      matched = [];
      stashed = [];
      while (current !== null && current !== effect2) {
        (seen ??= /* @__PURE__ */ new Set()).add(current);
        stashed.push(current);
        current = skip_to_branch(current.next);
      }
      if (current === null) {
        continue;
      }
    }
    if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
      matched.push(effect2);
    }
    prev = effect2;
    current = skip_to_branch(effect2.next);
  }
  if (state2.outrogroups !== null) {
    for (const group of state2.outrogroups) {
      if (group.pending.size === 0) {
        destroy_effects(state2, array_from(group.done));
        state2.outrogroups?.delete(group);
      }
    }
    if (state2.outrogroups.size === 0) {
      state2.outrogroups = null;
    }
  }
  if (current !== null || seen !== void 0) {
    var to_destroy = [];
    if (seen !== void 0) {
      for (effect2 of seen) {
        if ((effect2.f & INERT) === 0) {
          to_destroy.push(effect2);
        }
      }
    }
    while (current !== null) {
      if ((current.f & INERT) === 0 && current !== state2.fallback) {
        to_destroy.push(current);
      }
      current = skip_to_branch(current.next);
    }
    var destroy_length = to_destroy.length;
    if (destroy_length > 0) {
      var controlled_anchor = (flags2 & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
      if (is_animated) {
        for (i = 0; i < destroy_length; i += 1) {
          to_destroy[i].nodes?.a?.measure();
        }
        for (i = 0; i < destroy_length; i += 1) {
          to_destroy[i].nodes?.a?.fix();
        }
      }
      pause_effects(state2, to_destroy, controlled_anchor);
    }
  }
  if (is_animated) {
    queue_micro_task(() => {
      if (to_animate === void 0) return;
      for (effect2 of to_animate) {
        effect2.nodes?.a?.apply();
      }
    });
  }
}
function create_item(items, anchor, value, key2, index2, render_fn, flags2, get_collection) {
  var v = (flags2 & EACH_ITEM_REACTIVE) !== 0 ? (flags2 & EACH_ITEM_IMMUTABLE) === 0 ? mutable_source(value, false, false) : source(value) : null;
  var i = (flags2 & EACH_INDEX_REACTIVE) !== 0 ? source(index2) : null;
  if (dev_fallback_default && v) {
    v.trace = () => {
      get_collection()[i?.v ?? index2];
    };
  }
  return {
    v,
    i,
    e: branch(() => {
      render_fn(anchor, v ?? value, i ?? index2, get_collection);
      return () => {
        items.delete(key2);
      };
    })
  };
}
function move(effect2, next2, anchor) {
  if (!effect2.nodes) return;
  var node = effect2.nodes.start;
  var end = effect2.nodes.end;
  var dest = next2 && (next2.f & EFFECT_OFFSCREEN) === 0 ? (
    /** @type {EffectNodes} */
    next2.nodes.start
  ) : anchor;
  while (node !== null) {
    var next_node = (
      /** @type {TemplateNode} */
      get_next_sibling(node)
    );
    dest.before(node);
    if (node === end) {
      return;
    }
    node = next_node;
  }
}
function link(state2, prev, next2) {
  if (prev === null) {
    state2.effect.first = next2;
  } else {
    prev.next = next2;
  }
  if (next2 === null) {
    state2.effect.last = prev;
  } else {
    next2.prev = prev;
  }
}
function validate_each_keys(array, key_fn) {
  const keys = /* @__PURE__ */ new Map();
  const length = array.length;
  for (let i = 0; i < length; i++) {
    const key2 = key_fn(array[i], i);
    if (keys.has(key2)) {
      const a = String(keys.get(key2));
      const b = String(i);
      let k = String(key2);
      if (k.startsWith("[object ")) k = null;
      each_key_duplicate(a, b, k);
    }
    keys.set(key2, i);
  }
}

// node_modules/svelte/src/internal/client/dom/blocks/html.js
function check_hash(element2, server_hash, value) {
  if (!server_hash || server_hash === hash(String(value ?? ""))) return;
  let location;
  const loc = element2.__svelte_meta?.loc;
  if (loc) {
    location = `near ${loc.file}:${loc.line}:${loc.column}`;
  } else if (dev_current_component_function?.[FILENAME]) {
    location = `in ${dev_current_component_function[FILENAME]}`;
  }
  hydration_html_changed(sanitize_location(location));
}
function html(node, get_value, is_controlled = false, svg = false, mathml = false, skip_warning = false) {
  var anchor = node;
  var value = "";
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      node
    );
    if (hydrating) {
      anchor = set_hydrate_node(get_first_child(parent_node));
    }
  }
  template_effect(() => {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (value === (value = get_value() ?? "")) {
      if (hydrating) hydrate_next();
      return;
    }
    if (is_controlled && !hydrating) {
      effect2.nodes = null;
      parent_node.innerHTML = /** @type {string} */
      value;
      if (value !== "") {
        assign_nodes(
          /** @type {TemplateNode} */
          get_first_child(parent_node),
          /** @type {TemplateNode} */
          parent_node.lastChild
        );
      }
      return;
    }
    if (effect2.nodes !== null) {
      remove_effect_dom(
        effect2.nodes.start,
        /** @type {TemplateNode} */
        effect2.nodes.end
      );
      effect2.nodes = null;
    }
    if (value === "") return;
    if (hydrating) {
      var hash2 = (
        /** @type {Comment} */
        hydrate_node.data
      );
      var next2 = hydrate_next();
      var last = next2;
      while (next2 !== null && (next2.nodeType !== COMMENT_NODE || /** @type {Comment} */
      next2.data !== "")) {
        last = next2;
        next2 = get_next_sibling(next2);
      }
      if (next2 === null) {
        hydration_mismatch();
        throw HYDRATION_ERROR;
      }
      if (dev_fallback_default && !skip_warning) {
        check_hash(
          /** @type {Element} */
          next2.parentNode,
          hash2,
          value
        );
      }
      assign_nodes(hydrate_node, last);
      anchor = set_hydrate_node(next2);
      return;
    }
    var ns = svg ? NAMESPACE_SVG : mathml ? NAMESPACE_MATHML : void 0;
    var wrapper = (
      /** @type {HTMLTemplateElement | SVGElement | MathMLElement} */
      create_element(svg ? "svg" : mathml ? "math" : "template", ns)
    );
    wrapper.innerHTML = /** @type {any} */
    value;
    var node2 = svg || mathml ? wrapper : (
      /** @type {HTMLTemplateElement} */
      wrapper.content
    );
    assign_nodes(
      /** @type {TemplateNode} */
      get_first_child(node2),
      /** @type {TemplateNode} */
      node2.lastChild
    );
    if (svg || mathml) {
      while (get_first_child(node2)) {
        anchor.before(
          /** @type {TemplateNode} */
          get_first_child(node2)
        );
      }
    } else {
      anchor.before(node2);
    }
  });
}

// node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function component(node, get_component, render_fn) {
  var hydration_start_node;
  if (hydrating) {
    hydration_start_node = hydrate_node;
    hydrate_next();
  }
  var branches = new BranchManager(node);
  block(() => {
    var component2 = get_component() ?? null;
    if (hydrating) {
      var data = read_hydration_instruction(
        /** @type {TemplateNode} */
        hydration_start_node
      );
      var server_had_component = data === HYDRATION_START;
      var client_has_component = component2 !== null;
      if (server_had_component !== client_has_component) {
        var anchor = skip_nodes();
        set_hydrate_node(anchor);
        branches.anchor = anchor;
        set_hydrating(false);
        branches.ensure(component2, component2 && ((target) => render_fn(target, component2)));
        set_hydrating(true);
        return;
      }
    }
    branches.ensure(component2, component2 && ((target) => render_fn(target, component2)));
  }, EFFECT_TRANSPARENT);
}

// node_modules/svelte/src/internal/client/timing.js
var now = true_default ? () => performance.now() : () => Date.now();
var raf = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (_) => (true_default ? requestAnimationFrame : noop)(_)
  ),
  now: () => now(),
  tasks: /* @__PURE__ */ new Set()
};

// node_modules/svelte/src/internal/client/loop.js
function run_tasks() {
  const now2 = raf.now();
  raf.tasks.forEach((task) => {
    if (!task.c(now2)) {
      raf.tasks.delete(task);
      task.f();
    }
  });
  if (raf.tasks.size !== 0) {
    raf.tick(run_tasks);
  }
}
function loop(callback) {
  let task;
  if (raf.tasks.size === 0) {
    raf.tick(run_tasks);
  }
  return {
    promise: new Promise((fulfill) => {
      raf.tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      raf.tasks.delete(task);
    }
  };
}

// node_modules/svelte/src/internal/client/dom/elements/transitions.js
function dispatch_event(element2, type) {
  without_reactive_context(() => {
    element2.dispatchEvent(new CustomEvent(type));
  });
}
function css_property_to_camelcase(style) {
  if (style === "float") return "cssFloat";
  if (style === "offset") return "cssOffset";
  if (style.startsWith("--")) return style;
  const parts = style.split("-");
  if (parts.length === 1) return parts[0];
  return parts[0] + parts.slice(1).map(
    /** @param {any} word */
    (word) => word[0].toUpperCase() + word.slice(1)
  ).join("");
}
function css_to_keyframe(css) {
  const keyframe = {};
  const parts = css.split(";");
  for (const part of parts) {
    const [property, value] = part.split(":");
    if (!property || value === void 0) break;
    const formatted_property = css_property_to_camelcase(property.trim());
    keyframe[formatted_property] = value.trim();
  }
  return keyframe;
}
var linear = (t) => t;
function transition(flags2, element2, get_fn, get_params) {
  var is_intro = (flags2 & TRANSITION_IN) !== 0;
  var is_outro = (flags2 & TRANSITION_OUT) !== 0;
  var is_both = is_intro && is_outro;
  var is_global = (flags2 & TRANSITION_GLOBAL) !== 0;
  var direction = is_both ? "both" : is_intro ? "in" : "out";
  var current_options;
  var inert = element2.inert;
  var overflow = element2.style.overflow;
  var intro;
  var outro;
  function get_options() {
    return without_reactive_context(() => {
      return current_options ??= get_fn()(element2, get_params?.() ?? /** @type {P} */
      {}, {
        direction
      });
    });
  }
  var transition2 = {
    is_global,
    in() {
      element2.inert = inert;
      if (!is_intro) {
        outro?.abort();
        outro?.reset?.();
        return;
      }
      if (!is_outro) {
        intro?.abort();
      }
      intro = animate(element2, get_options(), outro, 1, () => {
        dispatch_event(element2, "introend");
        intro?.abort();
        intro = current_options = void 0;
        element2.style.overflow = overflow;
      });
    },
    out(fn) {
      if (!is_outro) {
        fn?.();
        current_options = void 0;
        return;
      }
      element2.inert = true;
      outro = animate(element2, get_options(), intro, 0, () => {
        dispatch_event(element2, "outroend");
        fn?.();
      });
    },
    stop: () => {
      intro?.abort();
      outro?.abort();
    }
  };
  var e = (
    /** @type {Effect & { nodes: EffectNodes }} */
    active_effect
  );
  (e.nodes.t ??= []).push(transition2);
  if (is_intro && should_intro) {
    var run3 = is_global;
    if (!run3) {
      var block2 = (
        /** @type {Effect | null} */
        e.parent
      );
      while (block2 && (block2.f & EFFECT_TRANSPARENT) !== 0) {
        while (block2 = block2.parent) {
          if ((block2.f & BLOCK_EFFECT) !== 0) break;
        }
      }
      run3 = !block2 || (block2.f & REACTION_RAN) !== 0;
    }
    if (run3) {
      effect(() => {
        untrack(() => transition2.in());
      });
    }
  }
}
function animate(element2, options, counterpart, t2, on_finish) {
  var is_intro = t2 === 1;
  if (is_function(options)) {
    var a;
    var aborted2 = false;
    queue_micro_task(() => {
      if (aborted2) return;
      var o = options({ direction: is_intro ? "in" : "out" });
      a = animate(element2, o, counterpart, t2, on_finish);
    });
    return {
      abort: () => {
        aborted2 = true;
        a?.abort();
      },
      deactivate: () => a.deactivate(),
      reset: () => a.reset(),
      t: () => a.t()
    };
  }
  counterpart?.deactivate();
  if (!options?.duration && !options?.delay) {
    dispatch_event(element2, is_intro ? "introstart" : "outrostart");
    on_finish();
    return {
      abort: noop,
      deactivate: noop,
      reset: noop,
      t: () => t2
    };
  }
  const { delay = 0, css, tick: tick2, easing = linear } = options;
  var keyframes = [];
  if (is_intro && counterpart === void 0) {
    if (tick2) {
      tick2(0, 1);
    }
    if (css) {
      var styles = css_to_keyframe(css(0, 1));
      keyframes.push(styles, styles);
    }
  }
  var get_t = () => 1 - t2;
  var animation2 = element2.animate(keyframes, { duration: delay, fill: "forwards" });
  animation2.onfinish = () => {
    animation2.cancel();
    dispatch_event(element2, is_intro ? "introstart" : "outrostart");
    var t1 = counterpart?.t() ?? 1 - t2;
    counterpart?.abort();
    var delta = t2 - t1;
    var duration = (
      /** @type {number} */
      options.duration * Math.abs(delta)
    );
    var keyframes2 = [];
    if (duration > 0) {
      var needs_overflow_hidden = false;
      if (css) {
        var n = Math.ceil(duration / (1e3 / 60));
        for (var i = 0; i <= n; i += 1) {
          var t = t1 + delta * easing(i / n);
          var styles2 = css_to_keyframe(css(t, 1 - t));
          keyframes2.push(styles2);
          needs_overflow_hidden ||= styles2.overflow === "hidden";
        }
      }
      if (needs_overflow_hidden) {
        element2.style.overflow = "hidden";
      }
      get_t = () => {
        var time = (
          /** @type {number} */
          /** @type {globalThis.Animation} */
          animation2.currentTime
        );
        return t1 + delta * easing(time / duration);
      };
      if (tick2) {
        loop(() => {
          if (animation2.playState !== "running") return false;
          var t3 = get_t();
          tick2(t3, 1 - t3);
          return true;
        });
      }
    }
    animation2 = element2.animate(keyframes2, { duration, fill: "forwards" });
    animation2.onfinish = () => {
      get_t = () => t2;
      tick2?.(t2, 1 - t2);
      on_finish();
    };
  };
  return {
    abort: () => {
      if (animation2) {
        animation2.cancel();
        animation2.effect = null;
        animation2.onfinish = noop;
      }
    },
    deactivate: () => {
      on_finish = noop;
    },
    reset: () => {
      if (t2 === 0) {
        tick2?.(1, 0);
      }
    },
    t: () => get_t()
  };
}

// node_modules/svelte/src/internal/client/dom/css.js
function append_styles(anchor, css) {
  effect(() => {
    var root13 = anchor.getRootNode();
    var target = (
      /** @type {ShadowRoot} */
      root13.host ? (
        /** @type {ShadowRoot} */
        root13
      ) : (
        /** @type {Document} */
        root13.head ?? /** @type {Document} */
        root13.ownerDocument.head
      )
    );
    if (!target.querySelector("#" + css.hash)) {
      const style = create_element("style");
      style.id = css.hash;
      style.textContent = css.code;
      target.appendChild(style);
      if (dev_fallback_default) {
        register_style(css.hash, style);
      }
    }
  });
}

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// node_modules/svelte/src/internal/shared/attributes.js
function clsx2(value) {
  if (typeof value === "object") {
    return clsx(value);
  } else {
    return value ?? "";
  }
}
var whitespace = [..." 	\n\r\f\xA0\v\uFEFF"];
function to_class(value, hash2, directives) {
  var classname = value == null ? "" : "" + value;
  if (hash2) {
    classname = classname ? classname + " " + hash2 : hash2;
  }
  if (directives) {
    for (var key2 of Object.keys(directives)) {
      if (directives[key2]) {
        classname = classname ? classname + " " + key2 : key2;
      } else if (classname.length) {
        var len = key2.length;
        var a = 0;
        while ((a = classname.indexOf(key2, a)) >= 0) {
          var b = a + len;
          if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
            classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
          } else {
            a = b;
          }
        }
      }
    }
  }
  return classname === "" ? null : classname;
}
function append_styles2(styles, important = false) {
  var separator = important ? " !important;" : ";";
  var css = "";
  for (var key2 of Object.keys(styles)) {
    var value = styles[key2];
    if (value != null && value !== "") {
      css += " " + key2 + ": " + value + separator;
    }
  }
  return css;
}
function to_css_name(name) {
  if (name[0] !== "-" || name[1] !== "-") {
    return name.toLowerCase();
  }
  return name;
}
function to_style(value, styles) {
  if (styles) {
    var new_style = "";
    var normal_styles;
    var important_styles;
    if (Array.isArray(styles)) {
      normal_styles = styles[0];
      important_styles = styles[1];
    } else {
      normal_styles = styles;
    }
    if (value) {
      value = String(value).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
      var in_str = false;
      var in_apo = 0;
      var in_comment = false;
      var reserved_names = [];
      if (normal_styles) {
        reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
      }
      if (important_styles) {
        reserved_names.push(...Object.keys(important_styles).map(to_css_name));
      }
      var start_index = 0;
      var name_index = -1;
      const len = value.length;
      for (var i = 0; i < len; i++) {
        var c = value[i];
        if (in_comment) {
          if (c === "/" && value[i - 1] === "*") {
            in_comment = false;
          }
        } else if (in_str) {
          if (in_str === c) {
            in_str = false;
          }
        } else if (c === "/" && value[i + 1] === "*") {
          in_comment = true;
        } else if (c === '"' || c === "'") {
          in_str = c;
        } else if (c === "(") {
          in_apo++;
        } else if (c === ")") {
          in_apo--;
        }
        if (!in_comment && in_str === false && in_apo === 0) {
          if (c === ":" && name_index === -1) {
            name_index = i;
          } else if (c === ";" || i === len - 1) {
            if (name_index !== -1) {
              var name = to_css_name(value.substring(start_index, name_index).trim());
              if (!reserved_names.includes(name)) {
                if (c !== ";") {
                  i++;
                }
                var property = value.substring(start_index, i).trim();
                new_style += " " + property + ";";
              }
            }
            start_index = i + 1;
            name_index = -1;
          }
        }
      }
    }
    if (normal_styles) {
      new_style += append_styles2(normal_styles);
    }
    if (important_styles) {
      new_style += append_styles2(important_styles, true);
    }
    new_style = new_style.trim();
    return new_style === "" ? null : new_style;
  }
  return value == null ? null : String(value);
}

// node_modules/svelte/src/internal/client/dom/elements/class.js
function set_class(dom, is_html, value, hash2, prev_classes, next_classes) {
  var prev = dom.__className;
  if (hydrating || prev !== value || prev === void 0) {
    var next_class_name = to_class(value, hash2, next_classes);
    if (!hydrating || next_class_name !== dom.getAttribute("class")) {
      if (next_class_name == null) {
        dom.removeAttribute("class");
      } else if (is_html) {
        dom.className = next_class_name;
      } else {
        dom.setAttribute("class", next_class_name);
      }
    }
    dom.__className = value;
  } else if (next_classes && prev_classes !== next_classes) {
    for (var key2 in next_classes) {
      var is_present = !!next_classes[key2];
      if (prev_classes == null || is_present !== !!prev_classes[key2]) {
        dom.classList.toggle(key2, is_present);
      }
    }
  }
  return next_classes;
}

// node_modules/svelte/src/internal/client/dom/elements/style.js
function update_styles(dom, prev = {}, next2, priority) {
  for (var key2 in next2) {
    var value = next2[key2];
    if (prev[key2] !== value) {
      if (next2[key2] == null) {
        dom.style.removeProperty(key2);
      } else {
        dom.style.setProperty(key2, value, priority);
      }
    }
  }
}
function set_style(dom, value, prev_styles, next_styles) {
  var prev = dom.__style;
  if (hydrating || prev !== value) {
    var next_style_attr = to_style(value, next_styles);
    if (!hydrating || next_style_attr !== dom.getAttribute("style")) {
      if (next_style_attr == null) {
        dom.removeAttribute("style");
      } else {
        dom.style.cssText = next_style_attr;
      }
    }
    dom.__style = value;
  } else if (next_styles) {
    if (Array.isArray(next_styles)) {
      update_styles(dom, prev_styles?.[0], next_styles[0]);
      update_styles(dom, prev_styles?.[1], next_styles[1], "important");
    } else {
      update_styles(dom, prev_styles, next_styles);
    }
  }
  return next_styles;
}

// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function select_option(select, value, mounting = false) {
  if (select.multiple) {
    if (value == void 0) {
      return;
    }
    if (!is_array(value)) {
      return select_multiple_invalid_value();
    }
    for (var option of select.options) {
      option.selected = value.includes(get_option_value(option));
    }
    return;
  }
  for (option of select.options) {
    var option_value = get_option_value(option);
    if (is(option_value, value)) {
      option.selected = true;
      return;
    }
  }
  if (!mounting || value !== void 0) {
    select.selectedIndex = -1;
  }
}
function init_select(select) {
  var observer = new MutationObserver(() => {
    select_option(select, select.__value);
  });
  observer.observe(select, {
    // Listen to option element changes
    childList: true,
    subtree: true,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: true,
    attributeFilter: ["value"]
  });
  teardown(() => {
    observer.disconnect();
  });
}
function bind_select_value(select, get3, set2 = get3) {
  var batches2 = /* @__PURE__ */ new WeakSet();
  var mounting = true;
  listen_to_event_and_reset_event(select, "change", (is_reset) => {
    var query = is_reset ? "[selected]" : ":checked";
    var value;
    if (select.multiple) {
      value = [].map.call(select.querySelectorAll(query), get_option_value);
    } else {
      var selected_option = select.querySelector(query) ?? // will fall back to first non-disabled option if no option is selected
      select.querySelector("option:not([disabled])");
      value = selected_option && get_option_value(selected_option);
    }
    set2(value);
    select.__value = value;
    if (current_batch !== null) {
      batches2.add(current_batch);
    }
  });
  effect(() => {
    var value = get3();
    if (select === document.activeElement) {
      var batch = (
        /** @type {Batch} */
        async_mode_flag ? previous_batch : current_batch
      );
      if (batches2.has(batch)) {
        return;
      }
    }
    select_option(select, value, mounting);
    if (mounting && value === void 0) {
      var selected_option = select.querySelector(":checked");
      if (selected_option !== null) {
        value = get_option_value(selected_option);
        set2(value);
      }
    }
    select.__value = value;
    mounting = false;
  });
  init_select(select);
}
function get_option_value(option) {
  if ("__value" in option) {
    return option.__value;
  } else {
    return option.value;
  }
}

// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var IS_CUSTOM_ELEMENT = /* @__PURE__ */ Symbol("is custom element");
var IS_HTML = /* @__PURE__ */ Symbol("is html");
var LINK_TAG = IS_XHTML ? "link" : "LINK";
var PROGRESS_TAG = IS_XHTML ? "progress" : "PROGRESS";
function remove_input_defaults(input) {
  if (!hydrating) return;
  var already_removed = false;
  var remove_defaults = () => {
    if (already_removed) return;
    already_removed = true;
    if (input.hasAttribute("value")) {
      var value = input.value;
      set_attribute2(input, "value", null);
      input.value = value;
    }
    if (input.hasAttribute("checked")) {
      var checked = input.checked;
      set_attribute2(input, "checked", null);
      input.checked = checked;
    }
  };
  input.__on_r = remove_defaults;
  queue_micro_task(remove_defaults);
  add_form_reset_listener();
}
function set_value(element2, value) {
  var attributes = get_attributes(element2);
  if (attributes.value === (attributes.value = // treat null and undefined the same for the initial value
  value ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  element2.value === value && (value !== 0 || element2.nodeName !== PROGRESS_TAG)) {
    return;
  }
  element2.value = value ?? "";
}
function set_checked(element2, checked) {
  var attributes = get_attributes(element2);
  if (attributes.checked === (attributes.checked = // treat null and undefined the same for the initial value
  checked ?? void 0)) {
    return;
  }
  element2.checked = checked;
}
function set_attribute2(element2, attribute, value, skip_warning) {
  var attributes = get_attributes(element2);
  if (hydrating) {
    attributes[attribute] = element2.getAttribute(attribute);
    if (attribute === "src" || attribute === "srcset" || attribute === "href" && element2.nodeName === LINK_TAG) {
      if (!skip_warning) {
        check_src_in_dev_hydration(element2, attribute, value ?? "");
      }
      return;
    }
  }
  if (attributes[attribute] === (attributes[attribute] = value)) return;
  if (attribute === "loading") {
    element2[LOADING_ATTR_SYMBOL] = value;
  }
  if (value == null) {
    element2.removeAttribute(attribute);
  } else if (typeof value !== "string" && get_setters(element2).includes(attribute)) {
    element2[attribute] = value;
  } else {
    element2.setAttribute(attribute, value);
  }
}
function get_attributes(element2) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    element2.__attributes ??= {
      [IS_CUSTOM_ELEMENT]: element2.nodeName.includes("-"),
      [IS_HTML]: element2.namespaceURI === NAMESPACE_HTML
    }
  );
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(element2) {
  var cache_key = element2.getAttribute("is") || element2.nodeName;
  var setters = setters_cache.get(cache_key);
  if (setters) return setters;
  setters_cache.set(cache_key, setters = []);
  var descriptors;
  var proto = element2;
  var element_proto = Element.prototype;
  while (element_proto !== proto) {
    descriptors = get_descriptors(proto);
    for (var key2 in descriptors) {
      if (descriptors[key2].set) {
        setters.push(key2);
      }
    }
    proto = get_prototype_of(proto);
  }
  return setters;
}
function check_src_in_dev_hydration(element2, attribute, value) {
  if (!dev_fallback_default) return;
  if (attribute === "srcset" && srcset_url_equal(element2, value)) return;
  if (src_url_equal(element2.getAttribute(attribute) ?? "", value)) return;
  hydration_attribute_changed(
    attribute,
    element2.outerHTML.replace(element2.innerHTML, element2.innerHTML && "..."),
    String(value)
  );
}
function src_url_equal(element_src, url) {
  if (element_src === url) return true;
  return new URL(element_src, document.baseURI).href === new URL(url, document.baseURI).href;
}
function split_srcset(srcset) {
  return srcset.split(",").map((src) => src.trim().split(" ").filter(Boolean));
}
function srcset_url_equal(element2, srcset) {
  var element_urls = split_srcset(element2.srcset);
  var urls = split_srcset(srcset);
  return urls.length === element_urls.length && urls.every(
    ([url, width], i) => width === element_urls[i][1] && // We need to test both ways because Vite will create an a full URL with
    // `new URL(asset, import.meta.url).href` for the client when `base: './'`, and the
    // relative URLs inside srcset are not automatically resolved to absolute URLs by
    // browsers (in contrast to img.src). This means both SSR and DOM code could
    // contain relative or absolute URLs.
    (src_url_equal(element_urls[i][0], url) || src_url_equal(url, element_urls[i][0]))
  );
}

// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function bind_value(input, get3, set2 = get3) {
  var batches2 = /* @__PURE__ */ new WeakSet();
  listen_to_event_and_reset_event(input, "input", async (is_reset) => {
    if (dev_fallback_default && input.type === "checkbox") {
      bind_invalid_checkbox_value();
    }
    var value = is_reset ? input.defaultValue : input.value;
    value = is_numberlike_input(input) ? to_number(value) : value;
    set2(value);
    if (current_batch !== null) {
      batches2.add(current_batch);
    }
    await tick();
    if (value !== (value = get3())) {
      var start = input.selectionStart;
      var end = input.selectionEnd;
      var length = input.value.length;
      input.value = value ?? "";
      if (end !== null) {
        var new_length = input.value.length;
        if (start === end && end === length && new_length > length) {
          input.selectionStart = new_length;
          input.selectionEnd = new_length;
        } else {
          input.selectionStart = start;
          input.selectionEnd = Math.min(end, new_length);
        }
      }
    }
  });
  if (
    // If we are hydrating and the value has since changed,
    // then use the updated value from the input instead.
    hydrating && input.defaultValue !== input.value || // If defaultValue is set, then value == defaultValue
    // TODO Svelte 6: remove input.value check and set to empty string?
    untrack(get3) == null && input.value
  ) {
    set2(is_numberlike_input(input) ? to_number(input.value) : input.value);
    if (current_batch !== null) {
      batches2.add(current_batch);
    }
  }
  render_effect(() => {
    if (dev_fallback_default && input.type === "checkbox") {
      bind_invalid_checkbox_value();
    }
    var value = get3();
    if (input === document.activeElement) {
      var batch = (
        /** @type {Batch} */
        async_mode_flag ? previous_batch : current_batch
      );
      if (batches2.has(batch)) {
        return;
      }
    }
    if (is_numberlike_input(input) && value === to_number(input.value)) {
      return;
    }
    if (input.type === "date" && !value && !input.value) {
      return;
    }
    if (value !== input.value) {
      input.value = value ?? "";
    }
  });
}
function is_numberlike_input(input) {
  var type = input.type;
  return type === "number" || type === "range";
}
function to_number(value) {
  return value === "" ? null : +value;
}

// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function is_bound_this(bound_value, element_or_component) {
  return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
}
function bind_this(element_or_component = {}, update2, get_value, get_parts) {
  var component_effect = (
    /** @type {ComponentContext} */
    component_context.r
  );
  var parent = (
    /** @type {Effect} */
    active_effect
  );
  effect(() => {
    var old_parts;
    var parts;
    render_effect(() => {
      old_parts = parts;
      parts = get_parts?.() || [];
      untrack(() => {
        if (element_or_component !== get_value(...parts)) {
          update2(element_or_component, ...parts);
          if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
            update2(null, ...old_parts);
          }
        }
      });
    });
    return () => {
      let p = parent;
      while (p !== component_effect && p.parent !== null && p.parent.f & DESTROYING) {
        p = p.parent;
      }
      const teardown2 = () => {
        if (parts && is_bound_this(get_value(...parts), element_or_component)) {
          update2(null, ...parts);
        }
      };
      const original_teardown = p.teardown;
      p.teardown = () => {
        teardown2();
        original_teardown?.();
      };
    };
  });
  return element_or_component;
}

// node_modules/svelte/src/internal/client/reactivity/props.js
function prop(props, key2, flags2, fallback2) {
  var runes = !legacy_mode_flag || (flags2 & PROPS_IS_RUNES) !== 0;
  var bindable = (flags2 & PROPS_IS_BINDABLE) !== 0;
  var lazy = (flags2 & PROPS_IS_LAZY_INITIAL) !== 0;
  var fallback_value = (
    /** @type {V} */
    fallback2
  );
  var fallback_dirty = true;
  var get_fallback = () => {
    if (fallback_dirty) {
      fallback_dirty = false;
      fallback_value = lazy ? untrack(
        /** @type {() => V} */
        fallback2
      ) : (
        /** @type {V} */
        fallback2
      );
    }
    return fallback_value;
  };
  let setter;
  if (bindable) {
    var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
    setter = get_descriptor(props, key2)?.set ?? (is_entry_props && key2 in props ? (v) => props[key2] = v : void 0);
  }
  var initial_value;
  var is_store_sub = false;
  if (bindable) {
    [initial_value, is_store_sub] = capture_store_binding(() => (
      /** @type {V} */
      props[key2]
    ));
  } else {
    initial_value = /** @type {V} */
    props[key2];
  }
  if (initial_value === void 0 && fallback2 !== void 0) {
    initial_value = get_fallback();
    if (setter) {
      if (runes) props_invalid_value(key2);
      setter(initial_value);
    }
  }
  var getter;
  if (runes) {
    getter = () => {
      var value = (
        /** @type {V} */
        props[key2]
      );
      if (value === void 0) return get_fallback();
      fallback_dirty = true;
      return value;
    };
  } else {
    getter = () => {
      var value = (
        /** @type {V} */
        props[key2]
      );
      if (value !== void 0) {
        fallback_value = /** @type {V} */
        void 0;
      }
      return value === void 0 ? fallback_value : value;
    };
  }
  if (runes && (flags2 & PROPS_IS_UPDATED) === 0) {
    return getter;
  }
  if (setter) {
    var legacy_parent = props.$$legacy;
    return (
      /** @type {() => V} */
      (function(value, mutation) {
        if (arguments.length > 0) {
          if (!runes || !mutation || legacy_parent || is_store_sub) {
            setter(mutation ? getter() : value);
          }
          return value;
        }
        return getter();
      })
    );
  }
  var overridden = false;
  var d = ((flags2 & PROPS_IS_IMMUTABLE) !== 0 ? derived : derived_safe_equal)(() => {
    overridden = false;
    return getter();
  });
  if (dev_fallback_default) {
    d.label = key2;
  }
  if (bindable) get2(d);
  var parent_effect = (
    /** @type {Effect} */
    active_effect
  );
  return (
    /** @type {() => V} */
    (function(value, mutation) {
      if (arguments.length > 0) {
        const new_value = mutation ? get2(d) : runes && bindable ? proxy(value) : value;
        set(d, new_value);
        overridden = true;
        if (fallback_value !== void 0) {
          fallback_value = new_value;
        }
        return value;
      }
      if (is_destroying_effect && overridden || (parent_effect.f & DESTROYED) !== 0) {
        return d.v;
      }
      return get2(d);
    })
  );
}

// node_modules/svelte/src/internal/client/validate.js
function validate_binding(binding, blockers, get_object, get_property, line, column) {
  run_after_blockers(blockers, () => {
    var warned = false;
    var filename = dev_current_component_function?.[FILENAME];
    render_effect(() => {
      if (warned) return;
      var [object, is_store_sub] = capture_store_binding(get_object);
      if (is_store_sub) return;
      var property = get_property();
      var ran = false;
      var effect2 = render_effect(() => {
        if (ran) return;
        object[property];
      });
      ran = true;
      if (effect2.deps === null) {
        var location = `${filename}:${line}:${column}`;
        binding_property_non_reactive(binding, location);
        warned = true;
      }
    });
  });
}

// node_modules/svelte/src/legacy/legacy-client.js
function createClassComponent(options) {
  return new Svelte4Component(options);
}
var Svelte4Component = class {
  /** @type {any} */
  #events;
  /** @type {Record<string, any>} */
  #instance;
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(options) {
    var sources = /* @__PURE__ */ new Map();
    var add_source = (key2, value) => {
      var s = mutable_source(value, false, false);
      sources.set(key2, s);
      return s;
    };
    const props = new Proxy(
      { ...options.props || {}, $$events: {} },
      {
        get(target, prop2) {
          return get2(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
        },
        has(target, prop2) {
          if (prop2 === LEGACY_PROPS) return true;
          get2(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
          return Reflect.has(target, prop2);
        },
        set(target, prop2, value) {
          set(sources.get(prop2) ?? add_source(prop2, value), value);
          return Reflect.set(target, prop2, value);
        }
      }
    );
    this.#instance = (options.hydrate ? hydrate : mount)(options.component, {
      target: options.target,
      anchor: options.anchor,
      props,
      context: options.context,
      intro: options.intro ?? false,
      recover: options.recover,
      transformError: options.transformError
    });
    if (!async_mode_flag && (!options?.props?.$$host || options.sync === false)) {
      flushSync();
    }
    this.#events = props.$$events;
    for (const key2 of Object.keys(this.#instance)) {
      if (key2 === "$set" || key2 === "$destroy" || key2 === "$on") continue;
      define_property(this, key2, {
        get() {
          return this.#instance[key2];
        },
        /** @param {any} value */
        set(value) {
          this.#instance[key2] = value;
        },
        enumerable: true
      });
    }
    this.#instance.$set = /** @param {Record<string, any>} next */
    (next2) => {
      Object.assign(props, next2);
    };
    this.#instance.$destroy = () => {
      unmount(this.#instance);
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    this.#instance.$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event2, callback) {
    this.#events[event2] = this.#events[event2] || [];
    const cb = (...args) => callback.call(this, ...args);
    this.#events[event2].push(cb);
    return () => {
      this.#events[event2] = this.#events[event2].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    this.#instance.$destroy();
  }
};

// node_modules/svelte/src/internal/client/dom/elements/custom-element.js
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    /** The Svelte component constructor */
    $$ctor;
    /** Slots */
    $$s;
    /** @type {any} The Svelte component instance */
    $$c;
    /** Whether or not the custom element is connected */
    $$cn = false;
    /** @type {Record<string, any>} Component props data */
    $$d = {};
    /** `true` if currently in the process of reflecting component props back to attributes */
    $$r = false;
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    $$p_d = {};
    /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
    $$l = {};
    /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
    $$l_u = /* @__PURE__ */ new Map();
    /** @type {any} The managed render effect for reflecting attributes */
    $$me;
    /** @type {ShadowRoot | null} The ShadowRoot of the custom element */
    $$shadowRoot = null;
    /**
     * @param {*} $$componentCtor
     * @param {*} $$slots
     * @param {ShadowRootInit | undefined} shadow_root_init
     */
    constructor($$componentCtor, $$slots, shadow_root_init) {
      super();
      this.$$ctor = $$componentCtor;
      this.$$s = $$slots;
      if (shadow_root_init) {
        this.$$shadowRoot = this.attachShadow(shadow_root_init);
      }
    }
    /**
     * @param {string} type
     * @param {EventListenerOrEventListenerObject} listener
     * @param {boolean | AddEventListenerOptions} [options]
     */
    addEventListener(type, listener, options) {
      this.$$l[type] = this.$$l[type] || [];
      this.$$l[type].push(listener);
      if (this.$$c) {
        const unsub = this.$$c.$on(type, listener);
        this.$$l_u.set(listener, unsub);
      }
      super.addEventListener(type, listener, options);
    }
    /**
     * @param {string} type
     * @param {EventListenerOrEventListenerObject} listener
     * @param {boolean | AddEventListenerOptions} [options]
     */
    removeEventListener(type, listener, options) {
      super.removeEventListener(type, listener, options);
      if (this.$$c) {
        const unsub = this.$$l_u.get(listener);
        if (unsub) {
          unsub();
          this.$$l_u.delete(listener);
        }
      }
    }
    async connectedCallback() {
      this.$$cn = true;
      if (!this.$$c) {
        let create_slot = function(name) {
          return (anchor) => {
            const slot2 = create_element("slot");
            if (name !== "default") slot2.name = name;
            append(anchor, slot2);
          };
        };
        await Promise.resolve();
        if (!this.$$cn || this.$$c) {
          return;
        }
        const $$slots = {};
        const existing_slots = get_custom_elements_slots(this);
        for (const name of this.$$s) {
          if (name in existing_slots) {
            if (name === "default" && !this.$$d.children) {
              this.$$d.children = create_slot(name);
              $$slots.default = true;
            } else {
              $$slots[name] = create_slot(name);
            }
          }
        }
        for (const attribute of this.attributes) {
          const name = this.$$g_p(attribute.name);
          if (!(name in this.$$d)) {
            this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
          }
        }
        for (const key2 in this.$$p_d) {
          if (!(key2 in this.$$d) && this[key2] !== void 0) {
            this.$$d[key2] = this[key2];
            delete this[key2];
          }
        }
        this.$$c = createClassComponent({
          component: this.$$ctor,
          target: this.$$shadowRoot || this,
          props: {
            ...this.$$d,
            $$slots,
            $$host: this
          }
        });
        this.$$me = effect_root(() => {
          render_effect(() => {
            this.$$r = true;
            for (const key2 of object_keys(this.$$c)) {
              if (!this.$$p_d[key2]?.reflect) continue;
              this.$$d[key2] = this.$$c[key2];
              const attribute_value = get_custom_element_value(
                key2,
                this.$$d[key2],
                this.$$p_d,
                "toAttribute"
              );
              if (attribute_value == null) {
                this.removeAttribute(this.$$p_d[key2].attribute || key2);
              } else {
                this.setAttribute(this.$$p_d[key2].attribute || key2, attribute_value);
              }
            }
            this.$$r = false;
          });
        });
        for (const type in this.$$l) {
          for (const listener of this.$$l[type]) {
            const unsub = this.$$c.$on(type, listener);
            this.$$l_u.set(listener, unsub);
          }
        }
        this.$$l = {};
      }
    }
    // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
    // and setting attributes through setAttribute etc, this is helpful
    /**
     * @param {string} attr
     * @param {string} _oldValue
     * @param {string} newValue
     */
    attributeChangedCallback(attr2, _oldValue, newValue) {
      if (this.$$r) return;
      attr2 = this.$$g_p(attr2);
      this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
      this.$$c?.$set({ [attr2]: this.$$d[attr2] });
    }
    disconnectedCallback() {
      this.$$cn = false;
      Promise.resolve().then(() => {
        if (!this.$$cn && this.$$c) {
          this.$$c.$destroy();
          this.$$me();
          this.$$c = void 0;
        }
      });
    }
    /**
     * @param {string} attribute_name
     */
    $$g_p(attribute_name) {
      return object_keys(this.$$p_d).find(
        (key2) => this.$$p_d[key2].attribute === attribute_name || !this.$$p_d[key2].attribute && key2.toLowerCase() === attribute_name
      ) || attribute_name;
    }
  };
}
function get_custom_element_value(prop2, value, props_definition, transform) {
  const type = props_definition[prop2]?.type;
  value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
  if (!transform || !props_definition[prop2]) {
    return value;
  } else if (transform === "toAttribute") {
    switch (type) {
      case "Object":
      case "Array":
        return value == null ? null : JSON.stringify(value);
      case "Boolean":
        return value ? "" : null;
      case "Number":
        return value == null ? null : value;
      default:
        return value;
    }
  } else {
    switch (type) {
      case "Object":
      case "Array":
        return value && JSON.parse(value);
      case "Boolean":
        return value;
      // conversion already handled above
      case "Number":
        return value != null ? +value : value;
      default:
        return value;
    }
  }
}
function get_custom_elements_slots(element2) {
  const result = {};
  element2.childNodes.forEach((node) => {
    result[
      /** @type {Element} node */
      node.slot || "default"
    ] = true;
  });
  return result;
}
function create_custom_element(Component, props_definition, slots, exports, shadow_root_init, extend) {
  let Class = class extends SvelteElement {
    constructor() {
      super(Component, slots, shadow_root_init);
      this.$$p_d = props_definition;
    }
    static get observedAttributes() {
      return object_keys(props_definition).map(
        (key2) => (props_definition[key2].attribute || key2).toLowerCase()
      );
    }
  };
  object_keys(props_definition).forEach((prop2) => {
    define_property(Class.prototype, prop2, {
      get() {
        return this.$$c && prop2 in this.$$c ? this.$$c[prop2] : this.$$d[prop2];
      },
      set(value) {
        value = get_custom_element_value(prop2, value, props_definition);
        this.$$d[prop2] = value;
        var component2 = this.$$c;
        if (component2) {
          var setter = get_descriptor(component2, prop2)?.get;
          if (setter) {
            component2[prop2] = value;
          } else {
            component2.$set({ [prop2]: value });
          }
        }
      }
    });
  });
  exports.forEach((property) => {
    define_property(Class.prototype, property, {
      get() {
        return this.$$c?.[property];
      }
    });
  });
  if (extend) {
    Class = extend(Class);
  }
  Component.element = /** @type {any} */
  Class;
  return Class;
}

// node_modules/svelte/src/easing/index.js
function cubicIn(t) {
  return t * t * t;
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}

// node_modules/svelte/src/transition/index.js
var linear2 = (x) => x;
function cubic_out(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function split_css_unit(value) {
  const split = typeof value === "string" && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return split ? [parseFloat(split[1]), split[2] || "px"] : [
    /** @type {number} */
    value,
    "px"
  ];
}
function fade(node, { delay = 0, duration = 400, easing = linear2 } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function fly(node, { delay = 0, duration = 400, easing = cubic_out, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  const [x_value, x_unit] = split_css_unit(x);
  const [y_value, y_unit] = split_css_unit(y);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x_value}${x_unit}, ${(1 - t) * y_value}${y_unit});
			opacity: ${target_opacity - od * u}`
  };
}

// Resources/Private/JavaScript/components/Image.svelte
import interact from "interactjs";

// Resources/Private/JavaScript/shapes/Polygon.svelte
Polygon[FILENAME] = "Resources/Private/JavaScript/shapes/Polygon.svelte";
var root = add_locations(from_svg(`<polygon class="shape"></polygon>`), Polygon[FILENAME], [[26, 0]]);
function Polygon($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Polygon);
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const [$$stores, $$cleanup] = setup_stores();
  const index2 = prop($$props, "index", 7);
  function getHandles() {
    return $focuspoints()[index2()].__data.points;
  }
  function onDrag(event2) {
    store_mutate(focuspoints, untrack($focuspoints)[index2()].__data.points = $focuspoints()[index2()].__data.points.map(([x, y]) => [x + event2.dx, y + event2.dy]), untrack($focuspoints));
  }
  function onHandleDrag(event2) {
    const handleIndex = parseInt(event2.target.getAttribute("data-index"));
    const [x, y] = $focuspoints()[index2()].__data.points[handleIndex];
    store_mutate(focuspoints, untrack($focuspoints)[index2()].__data.points[handleIndex] = [x + event2.dx, y + event2.dy], untrack($focuspoints));
  }
  function onHandleDoubleClick(event2) {
    const handleIndex = parseInt(event2.currentTarget.getAttribute("data-index"));
    store_mutate(focuspoints, untrack($focuspoints)[index2()].__data.points = $focuspoints()[index2()].__data.points.filter((point, i) => strict_equals(i, handleIndex, false)), untrack($focuspoints));
  }
  var $$exports = {
    ...legacy_api(),
    get getHandles() {
      return getHandles;
    },
    get onDrag() {
      return onDrag;
    },
    get onHandleDrag() {
      return onHandleDrag;
    },
    get onHandleDoubleClick() {
      return onHandleDoubleClick;
    },
    get index() {
      return index2();
    },
    set index($$value) {
      index2($$value);
      flushSync();
    }
  };
  var polygon = root();
  template_effect(
    ($0) => {
      set_attribute2(polygon, "points", $0);
      set_attribute2(polygon, "data-index", index2());
    },
    [
      () => $focuspoints()[index2()].__data.points.map((point) => point.join(",")).join(" ")
    ]
  );
  append($$anchor, polygon);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
create_custom_element(
  Polygon,
  { index: {} },
  [],
  [
    "getHandles",
    "onDrag",
    "onHandleDrag",
    "onHandleDoubleClick"
  ],
  { mode: "open" }
);

// Resources/Private/JavaScript/shapes/Rect.svelte
Rect[FILENAME] = "Resources/Private/JavaScript/shapes/Rect.svelte";
var root2 = add_locations(from_svg(`<rect class="draggable shape"></rect>`), Rect[FILENAME], [[67, 0]]);
function Rect($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Rect);
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const [$$stores, $$cleanup] = setup_stores();
  const index2 = prop($$props, "index", 7);
  function onDrag(event2) {
    store_mutate(focuspoints, untrack($focuspoints)[index2()].__data.x = $focuspoints()[index2()].__data.x + event2.dx, untrack($focuspoints));
    store_mutate(focuspoints, untrack($focuspoints)[index2()].__data.y = $focuspoints()[index2()].__data.y + event2.dy, untrack($focuspoints));
  }
  function onHandleDrag({ dx, dy, target }) {
    const handleIndex = parseInt(target.getAttribute("data-index"));
    let { x, y, width, height } = $focuspoints()[index2()].__data;
    switch (handleIndex) {
      case 0:
        x += dx;
        y += dy;
        width -= dx;
        height -= dy;
        break;
      case 1:
        y += dy;
        width += dx;
        height -= dy;
        break;
      case 2:
        width += dx;
        height += dy;
        break;
      case 3:
        x += dx;
        width -= dx;
        height += dy;
        break;
    }
    if (width < 1) {
      if (strict_equals(handleIndex, 0) || strict_equals(handleIndex, 3)) x += width - 1;
      width = 1;
    }
    if (height < 1) {
      if (handleIndex <= 1) y += height - 1;
      height = 1;
    }
    store_mutate(focuspoints, untrack($focuspoints)[index2()].__data = { x, y, width, height }, untrack($focuspoints));
  }
  function getHandles() {
    const { x, y, width, height } = $focuspoints()[index2()].__data;
    return [
      [x, y],
      [x + width, y],
      [x + width, y + height],
      [x, y + height]
    ];
  }
  var $$exports = {
    ...legacy_api(),
    get onDrag() {
      return onDrag;
    },
    get onHandleDrag() {
      return onHandleDrag;
    },
    get getHandles() {
      return getHandles;
    },
    get index() {
      return index2();
    },
    set index($$value) {
      index2($$value);
      flushSync();
    }
  };
  var rect = root2();
  template_effect(() => {
    set_attribute2(rect, "x", $focuspoints()[index2()].__data.x);
    set_attribute2(rect, "y", $focuspoints()[index2()].__data.y);
    set_attribute2(rect, "width", $focuspoints()[index2()].__data.width);
    set_attribute2(rect, "height", $focuspoints()[index2()].__data.height);
    set_attribute2(rect, "data-index", index2());
  });
  append($$anchor, rect);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
create_custom_element(Rect, { index: {} }, [], ["onDrag", "onHandleDrag", "getHandles"], { mode: "open" });

// Resources/Private/JavaScript/store.svelte.ts
var imageMeta = writable(null);
var focuspointChannelName = (itemFormElName) => `focuspoint:${itemFormElName}`;
var detectionMode = writable(false);
var SHAPES = {
  rect: {
    component: Rect,
    constructor(config) {
      const meta = get(imageMeta);
      const wParsed = parseFloat(config.defaultWidth ?? "0");
      const hParsed = parseFloat(config.defaultHeight ?? "0");
      let width = Number.isFinite(wParsed) && wParsed > 0 ? wParsed : meta ? Math.round(meta.w * 0.25) : 200;
      let height = Number.isFinite(hParsed) && hParsed > 0 ? hParsed : meta ? Math.round(meta.h * 0.25) : 150;
      width = Math.max(50, width);
      height = Math.max(50, height);
      let x = 20, y = 20;
      if (meta) {
        x = Math.round((meta.w - width) / 2);
        y = Math.round((meta.h - height) / 2);
        x = Math.max(0, Math.min(x, Math.max(0, meta.w - width)));
        y = Math.max(0, Math.min(y, Math.max(0, meta.h - height)));
      }
      return { x, y, width, height };
    }
  },
  polygon: {
    component: Polygon,
    constructor() {
      const meta = get(imageMeta);
      const size = meta ? Math.round(Math.min(meta.w, meta.h) * 0.2) : 200;
      const s = Math.max(20, size);
      let cx = 20 + s / 2;
      let cy = 20 + s / 2;
      if (meta) {
        cx = Math.round(meta.w / 2);
        cy = Math.round(meta.h / 2);
      }
      const half = Math.floor(s / 2);
      return {
        points: [
          [cx - half, cy - half],
          [cx + half, cy - half],
          [cx + half, cy + half],
          [cx - half, cy + half]
        ]
      };
    }
  }
};
var wizardConfigStore = writable({ fields: {}, lang: {}, pid: 0 });
var focuspoints = writable([]);
var activeIndex = state(0);
var initStores = (initialValue, wizardConfig) => {
  wizardConfigStore.set(JSON.parse(wizardConfig));
  focuspoints.set(JSON.parse(initialValue && initialValue !== "" ? initialValue : "[]"));
};
var fieldMeetsCondition = (fieldName, point) => {
  const condition = get(wizardConfigStore).fields[fieldName].displayCond;
  if (!condition) {
    return true;
  }
  const parts = condition.split(":");
  if (parts.length < 4 || parts[0] !== "FIELD") {
    return true;
  }
  const [, field, operator, value] = parts;
  if (!Object.hasOwn(point, field)) {
    return true;
  }
  const raw = point[field];
  const normalizeRaw = (v) => {
    if (v === true) return "1";
    if (v === false) return "0";
    if (v === null || v === void 0) return "";
    return String(v).trim();
  };
  const normalizeCond = (v) => {
    const t = v.trim().toLowerCase();
    if (t === "true") return "1";
    if (t === "false") return "0";
    return v.trim();
  };
  const toNumber = (v) => Number(v);
  const isFiniteNumber = (v) => Number.isFinite(v);
  const pointStr = normalizeRaw(raw);
  const condStr = normalizeCond(value);
  switch (operator) {
    case "REQ":
      return pointStr !== "" && pointStr !== "0" && pointStr.toLowerCase() !== "false";
    case "!=":
      return pointStr !== condStr;
    case "=":
      return pointStr === condStr;
    case ">": {
      const pointVal = toNumber(raw);
      const compareVal = toNumber(value);
      return isFiniteNumber(pointVal) && isFiniteNumber(compareVal) && pointVal > compareVal;
    }
    case "<": {
      const pointVal = toNumber(raw);
      const compareVal = toNumber(value);
      return isFiniteNumber(pointVal) && isFiniteNumber(compareVal) && pointVal < compareVal;
    }
    case ">=": {
      const pointVal = toNumber(raw);
      const compareVal = toNumber(value);
      return isFiniteNumber(pointVal) && isFiniteNumber(compareVal) && pointVal >= compareVal;
    }
    case "<=": {
      const pointVal = toNumber(raw);
      const compareVal = toNumber(value);
      return isFiniteNumber(pointVal) && isFiniteNumber(compareVal) && pointVal <= compareVal;
    }
    case "IN": {
      const list = value.split(",").map((v) => normalizeCond(v));
      return list.includes(pointStr);
    }
    case "!IN": {
      const list = value.split(",").map((v) => normalizeCond(v));
      return !list.includes(pointStr);
    }
    case "-": {
      const range = value.split("-");
      if (range.length !== 2) return false;
      const pointVal = toNumber(raw);
      const min = toNumber(range[0]);
      const max = toNumber(range[1]);
      return isFiniteNumber(pointVal) && isFiniteNumber(min) && isFiniteNumber(max) && pointVal >= min && pointVal <= max;
    }
    case "!-": {
      const range = value.split("-");
      if (range.length !== 2) return false;
      const pointVal = toNumber(raw);
      const min = toNumber(range[0]);
      const max = toNumber(range[1]);
      return isFiniteNumber(pointVal) && isFiniteNumber(min) && isFiniteNumber(max) && (pointVal < min || pointVal > max);
    }
    default:
      return false;
  }
};
var createNewFocuspoint = (shape) => {
  const config = get(wizardConfigStore);
  const newFocuspoint = Object.keys(config.fields).reduce(
    (acc, key2) => {
      acc[key2] = config.fields[key2].default ?? null;
      return acc;
    },
    {}
  );
  newFocuspoint.__shape = shape;
  newFocuspoint.__data = SHAPES[shape].constructor(config);
  focuspoints.update((focuspoints2) => [...focuspoints2, newFocuspoint]);
  set(activeIndex, get(focuspoints).length - 1);
  activateFocuspoint(get2(activeIndex));
};
var setActiveIndex = (index2) => {
  set(activeIndex, index2, true);
};
var getActiveIndex = () => {
  return get2(activeIndex);
};
var activateFocuspoint = (index2) => {
  focuspoints.update((store) => {
    store.forEach((focuspoint, i) => {
      if (i === index2) {
        setActiveIndex(index2);
        focuspoint.active = true;
      } else {
        focuspoint.active = false;
      }
    });
    return store;
  });
};
var deactivateAllFocuspoints = () => {
  focuspoints.update((store) => {
    store.forEach((focuspoint) => focuspoint.active = false);
    return store;
  });
};
var focusPointName = (index2) => {
  const config = get(wizardConfigStore);
  const nameFields = Object.entries(config.fields).filter(([key2, value]) => {
    return value["useAsName"] === true || value["useAsName"] === "true" || value["useAsName"] === "1" || value["useAsName"] === 1;
  }).map(([key2, value]) => {
    return key2;
  });
  const defaultName = "Focus Point " + (index2 + 1);
  if (nameFields.length === 0) {
    return defaultName;
  }
  const store = get(focuspoints);
  const names = Object.entries(store[index2]).filter(([key2, value]) => {
    return nameFields.includes(key2) && value !== null && value !== "";
  }).map(([key2, value]) => {
    return value;
  });
  if (names.length === 0) {
    return defaultName;
  }
  return names.join(", ");
};
var createFocuspointFromDetection = (detectionResult) => {
  if (!detectionResult) {
    return;
  }
  const config = get(wizardConfigStore);
  const newFocuspoint = Object.keys(config.fields).reduce(
    (acc, key2) => {
      acc[key2] = config.fields[key2].default ?? null;
      return acc;
    },
    {}
  );
  newFocuspoint.__shape = detectionResult.shapeType;
  newFocuspoint.__data = detectionResult.data;
  focuspoints.update((focuspoints2) => [...focuspoints2, newFocuspoint]);
  activateFocuspoint(get2(activeIndex));
};

// Resources/Private/JavaScript/segmentation/floodFill.ts
function floodFill(pixelBuffer, imageWidthInPixels, imageHeightInPixels, seedPixelX, seedPixelY, maxColorDistance) {
  const totalPixelCount = imageWidthInPixels * imageHeightInPixels;
  const regionMask = new Uint8Array(totalPixelCount);
  if (seedPixelX < 0 || seedPixelX >= imageWidthInPixels || seedPixelY < 0 || seedPixelY >= imageHeightInPixels) {
    return regionMask;
  }
  const scanLineStack = [];
  const seedNeighborhoodRadius = 2;
  let totalRed = 0, totalGreen = 0, totalBlue = 0, sampleCount = 0;
  for (let dy = -seedNeighborhoodRadius; dy <= seedNeighborhoodRadius; dy++) {
    for (let dx = -seedNeighborhoodRadius; dx <= seedNeighborhoodRadius; dx++) {
      const nx = seedPixelX + dx;
      const ny = seedPixelY + dy;
      if (nx >= 0 && nx < imageWidthInPixels && ny >= 0 && ny < imageHeightInPixels) {
        const offset = (ny * imageWidthInPixels + nx) * 4;
        totalRed += pixelBuffer[offset];
        totalGreen += pixelBuffer[offset + 1];
        totalBlue += pixelBuffer[offset + 2];
        sampleCount++;
      }
    }
  }
  const seedRed = Math.round(totalRed / sampleCount);
  const seedGreen = Math.round(totalGreen / sampleCount);
  const seedBlue = Math.round(totalBlue / sampleCount);
  const maxColorDistanceSquared = maxColorDistance * maxColorDistance;
  const isPixelWithinTolerance = (columnIndex, rowIndex) => {
    const candidateByteOffset = (rowIndex * imageWidthInPixels + columnIndex) * 4;
    const redDelta = pixelBuffer[candidateByteOffset] - seedRed;
    const greenDelta = pixelBuffer[candidateByteOffset + 1] - seedGreen;
    const blueDelta = pixelBuffer[candidateByteOffset + 2] - seedBlue;
    return redDelta * redDelta + greenDelta * greenDelta + blueDelta * blueDelta <= maxColorDistanceSquared;
  };
  let scanlineLeftColumn = seedPixelX;
  let scanlineRightColumn = seedPixelX;
  while (scanlineLeftColumn > 0 && isPixelWithinTolerance(scanlineLeftColumn - 1, seedPixelY)) {
    scanlineLeftColumn--;
  }
  while (scanlineRightColumn < imageWidthInPixels - 1 && isPixelWithinTolerance(scanlineRightColumn + 1, seedPixelY)) {
    scanlineRightColumn++;
  }
  for (let columnIndex = scanlineLeftColumn; columnIndex <= scanlineRightColumn; columnIndex++) {
    regionMask[seedPixelY * imageWidthInPixels + columnIndex] = 1;
  }
  scanLineStack.push([scanlineLeftColumn, scanlineRightColumn, seedPixelY, 0]);
  while (scanLineStack.length > 0) {
    const [parentLeft, parentRight, parentRow, parentDirection] = scanLineStack.pop();
    const rowsToCheck = [];
    if (parentRow > 0 && parentDirection <= 0) {
      rowsToCheck.push(parentRow - 1);
    }
    if (parentRow < imageHeightInPixels - 1 && parentDirection >= 0) {
      rowsToCheck.push(parentRow + 1);
    }
    for (const currentRowIndex of rowsToCheck) {
      let currentColumnIndex = parentLeft;
      while (currentColumnIndex <= parentRight) {
        while (currentColumnIndex <= parentRight && (regionMask[currentRowIndex * imageWidthInPixels + currentColumnIndex] === 1 || !isPixelWithinTolerance(currentColumnIndex, currentRowIndex))) {
          currentColumnIndex++;
        }
        if (currentColumnIndex > parentRight) {
          break;
        }
        let spanLeftColumn = currentColumnIndex;
        let spanRightColumn = currentColumnIndex;
        while (spanLeftColumn > 0 && regionMask[currentRowIndex * imageWidthInPixels + (spanLeftColumn - 1)] === 0 && isPixelWithinTolerance(spanLeftColumn - 1, currentRowIndex)) {
          spanLeftColumn--;
        }
        while (spanRightColumn < imageWidthInPixels - 1 && regionMask[currentRowIndex * imageWidthInPixels + (spanRightColumn + 1)] === 0 && isPixelWithinTolerance(spanRightColumn + 1, currentRowIndex)) {
          spanRightColumn++;
        }
        for (let markColumn = spanLeftColumn; markColumn <= spanRightColumn; markColumn++) {
          regionMask[currentRowIndex * imageWidthInPixels + markColumn] = 1;
        }
        const directionFromParent = currentRowIndex < parentRow ? -1 : 1;
        scanLineStack.push([spanLeftColumn, spanRightColumn, currentRowIndex, directionFromParent]);
        const returnDirection = -directionFromParent;
        if (spanLeftColumn < parentLeft) {
          scanLineStack.push([spanLeftColumn, parentLeft - 1, currentRowIndex, returnDirection]);
        }
        if (spanRightColumn > parentRight) {
          scanLineStack.push([parentRight + 1, spanRightColumn, currentRowIndex, returnDirection]);
        }
        currentColumnIndex = spanRightColumn + 1;
      }
    }
  }
  return regionMask;
}

// Resources/Private/JavaScript/segmentation/contourTrace.ts
function traceContour(regionMask, imageWidthInPixels, imageHeightInPixels) {
  const contourPoints = [];
  let entryPixelX = -1;
  let entryPixelY = -1;
  outerSearch:
    for (let rowIndex = 0; rowIndex < imageHeightInPixels; rowIndex++) {
      for (let columnIndex = 0; columnIndex < imageWidthInPixels; columnIndex++) {
        if (regionMask[rowIndex * imageWidthInPixels + columnIndex] === 1) {
          entryPixelX = columnIndex;
          entryPixelY = rowIndex;
          break outerSearch;
        }
      }
    }
  if (entryPixelX === -1 || entryPixelY === -1) {
    return contourPoints;
  }
  const mooreNeighborOffsets = [
    [0, -1],
    // top
    [1, -1],
    // top-right
    [1, 0],
    // right
    [1, 1],
    // bottom-right
    [0, 1],
    // bottom
    [-1, 1],
    // bottom-left
    [-1, 0],
    // left
    [-1, -1]
    // top-left
  ];
  const isRegionPixel = (columnIndex, rowIndex) => {
    if (columnIndex < 0 || columnIndex >= imageWidthInPixels || rowIndex < 0 || rowIndex >= imageHeightInPixels) {
      return false;
    }
    return regionMask[rowIndex * imageWidthInPixels + columnIndex] === 1;
  };
  let currentPixelX = entryPixelX;
  let currentPixelY = entryPixelY;
  let backtrackDirectionIndex = 7;
  const maximumContourSteps = imageWidthInPixels * imageHeightInPixels * 2;
  let stepCounter = 0;
  do {
    contourPoints.push([currentPixelX, currentPixelY]);
    let foundNextPixel = false;
    for (let neighborCheckOffset = 0; neighborCheckOffset < 8; neighborCheckOffset++) {
      const neighborDirectionIndex = (backtrackDirectionIndex + neighborCheckOffset) % 8;
      const [columnOffset, rowOffset] = mooreNeighborOffsets[neighborDirectionIndex];
      const neighborPixelX = currentPixelX + columnOffset;
      const neighborPixelY = currentPixelY + rowOffset;
      if (isRegionPixel(neighborPixelX, neighborPixelY)) {
        currentPixelX = neighborPixelX;
        currentPixelY = neighborPixelY;
        backtrackDirectionIndex = (neighborDirectionIndex + 4 + 1) % 8;
        foundNextPixel = true;
        break;
      }
    }
    if (!foundNextPixel) {
      break;
    }
    stepCounter++;
    if (stepCounter > maximumContourSteps) {
      break;
    }
  } while (currentPixelX !== entryPixelX || currentPixelY !== entryPixelY);
  return removeCollinearPoints(contourPoints);
}
function removeCollinearPoints(contourPoints) {
  const pointCount = contourPoints.length;
  if (pointCount <= 3) {
    return contourPoints;
  }
  const reducedContour = [];
  for (let currentIndex = 0; currentIndex < pointCount; currentIndex++) {
    const previousIndex = (currentIndex - 1 + pointCount) % pointCount;
    const nextIndex = (currentIndex + 1) % pointCount;
    const [previousX, previousY] = contourPoints[previousIndex];
    const [currentX, currentY] = contourPoints[currentIndex];
    const [nextX, nextY] = contourPoints[nextIndex];
    const crossProduct = (currentX - previousX) * (nextY - previousY) - (currentY - previousY) * (nextX - previousX);
    if (crossProduct !== 0) {
      reducedContour.push(contourPoints[currentIndex]);
    }
  }
  return reducedContour;
}

// Resources/Private/JavaScript/segmentation/simplify.ts
function simplifyPolygon(contourPoints, maxDeviationTolerance) {
  const pointCount = contourPoints.length;
  if (pointCount <= 3) {
    return contourPoints.slice();
  }
  const firstPointIndex = 0;
  const lastPointIndex = pointCount - 1;
  let largestDeviation = 0;
  let farthestPointIndex = 0;
  const [lineStartX, lineStartY] = contourPoints[firstPointIndex];
  const [lineEndX, lineEndY] = contourPoints[lastPointIndex];
  for (let candidateIndex = 1; candidateIndex < lastPointIndex; candidateIndex++) {
    const perpendicularDistance = perpendicularDistanceToLine(contourPoints[candidateIndex], lineStartX, lineStartY, lineEndX, lineEndY);
    if (perpendicularDistance > largestDeviation) {
      largestDeviation = perpendicularDistance;
      farthestPointIndex = candidateIndex;
    }
  }
  if (largestDeviation > maxDeviationTolerance) {
    const leftHalfSimplified = simplifyPolygon(
      contourPoints.slice(firstPointIndex, farthestPointIndex + 1),
      maxDeviationTolerance
    );
    const rightHalfSimplified = simplifyPolygon(
      contourPoints.slice(farthestPointIndex),
      maxDeviationTolerance
    );
    return [...leftHalfSimplified.slice(0, -1), ...rightHalfSimplified];
  } else {
    return [contourPoints[firstPointIndex], contourPoints[lastPointIndex]];
  }
}
function perpendicularDistanceToLine(point, lineStartX, lineStartY, lineEndX, lineEndY) {
  const [pointX, pointY] = point;
  const lineLengthX = lineEndX - lineStartX;
  const lineLengthY = lineEndY - lineStartY;
  const lineLengthSquared = lineLengthX * lineLengthX + lineLengthY * lineLengthY;
  if (lineLengthSquared === 0) {
    const deltaX = pointX - lineStartX;
    const deltaY = pointY - lineStartY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
  const crossProduct = Math.abs(
    lineLengthY * pointX - lineLengthX * pointY + lineEndX * lineStartY - lineEndY * lineStartX
  );
  return crossProduct / Math.sqrt(lineLengthSquared);
}

// Resources/Private/JavaScript/segmentation/detectRegion.ts
function detectRegion(imageElement, clickXInImageCoords, clickYInImageCoords, colorToleranceThreshold = 32, polygonSimplificationEpsilon, rectangularityThreshold = 0.88) {
  const naturalImageWidth = imageElement.naturalWidth;
  const naturalImageHeight = imageElement.naturalHeight;
  const offscreenCanvas = document.createElement("canvas");
  offscreenCanvas.width = naturalImageWidth;
  offscreenCanvas.height = naturalImageHeight;
  const canvasRenderingContext = offscreenCanvas.getContext("2d", { willReadFrequently: true });
  if (!canvasRenderingContext) {
    return null;
  }
  canvasRenderingContext.drawImage(imageElement, 0, 0, naturalImageWidth, naturalImageHeight);
  const imageData = canvasRenderingContext.getImageData(0, 0, naturalImageWidth, naturalImageHeight);
  const rawPixelBuffer = imageData.data;
  const roundedClickX = Math.round(clickXInImageCoords);
  const roundedClickY = Math.round(clickYInImageCoords);
  const filledRegionMask = floodFill(
    rawPixelBuffer,
    naturalImageWidth,
    naturalImageHeight,
    roundedClickX,
    roundedClickY,
    colorToleranceThreshold
  );
  const processedRegionMask = dilateRegionMask(filledRegionMask, naturalImageWidth, naturalImageHeight, 2, rawPixelBuffer);
  const boundingBox = computeBoundingBoxFromMask(processedRegionMask, naturalImageWidth, naturalImageHeight);
  offscreenCanvas.width = 0;
  offscreenCanvas.height = 0;
  if (!boundingBox) {
    return null;
  }
  const { minX, minY, maxX, maxY, filledPixelCount } = boundingBox;
  const boundingBoxWidth = maxX - minX + 1;
  const boundingBoxHeight = maxY - minY + 1;
  const boundingBoxArea = boundingBoxWidth * boundingBoxHeight;
  const minimumRegionPixelCount = 100;
  if (filledPixelCount < minimumRegionPixelCount) {
    return null;
  }
  const rectangularityRatio = filledPixelCount / boundingBoxArea;
  if (rectangularityRatio >= rectangularityThreshold) {
    return {
      shapeType: "rect",
      data: {
        x: minX,
        y: minY,
        width: boundingBoxWidth,
        height: boundingBoxHeight
      }
    };
  }
  const rawContourPoints = traceContour(processedRegionMask, naturalImageWidth, naturalImageHeight);
  if (rawContourPoints.length < 3) {
    return null;
  }
  const imageDiagonalLength = Math.sqrt(naturalImageWidth * naturalImageWidth + naturalImageHeight * naturalImageHeight);
  const regionDiagonalLength = Math.sqrt(boundingBoxWidth * boundingBoxWidth + boundingBoxHeight * boundingBoxHeight);
  const imageBasedEpsilon = imageDiagonalLength * 15e-4;
  const regionBasedEpsilon = regionDiagonalLength * 0.01;
  const effectiveEpsilon = polygonSimplificationEpsilon ?? Math.max(imageBasedEpsilon, regionBasedEpsilon);
  const simplifiedPolygonPoints = simplifyPolygon(rawContourPoints, Math.max(1, effectiveEpsilon));
  if (simplifiedPolygonPoints.length <= 8) {
    const polygonBoundsMinX = Math.min(...simplifiedPolygonPoints.map(([x]) => x));
    const polygonBoundsMinY = Math.min(...simplifiedPolygonPoints.map(([, y]) => y));
    const polygonBoundsMaxX = Math.max(...simplifiedPolygonPoints.map(([x]) => x));
    const polygonBoundsMaxY = Math.max(...simplifiedPolygonPoints.map(([, y]) => y));
    const polygonActualArea = computePolygonArea(simplifiedPolygonPoints);
    const polygonBoundingBoxArea = (polygonBoundsMaxX - polygonBoundsMinX) * (polygonBoundsMaxY - polygonBoundsMinY);
    const polygonRectangularityRatio = polygonBoundingBoxArea > 0 ? polygonActualArea / polygonBoundingBoxArea : 0;
    if (polygonRectangularityRatio >= 0.9) {
      return {
        shapeType: "rect",
        data: {
          x: polygonBoundsMinX,
          y: polygonBoundsMinY,
          width: polygonBoundsMaxX - polygonBoundsMinX,
          height: polygonBoundsMaxY - polygonBoundsMinY
        }
      };
    }
  }
  const centeredPolygonPoints = simplifiedPolygonPoints.map(
    ([x, y]) => [x + 0.5, y + 0.5]
  );
  return { shapeType: "polygon", data: { points: centeredPolygonPoints } };
}
function computeBoundingBoxFromMask(regionMask, imageWidthInPixels, imageHeightInPixels) {
  let minX = imageWidthInPixels;
  let minY = imageHeightInPixels;
  let maxX = -1;
  let maxY = -1;
  let filledPixelCount = 0;
  for (let rowIndex = 0; rowIndex < imageHeightInPixels; rowIndex++) {
    const rowStartOffset = rowIndex * imageWidthInPixels;
    for (let columnIndex = 0; columnIndex < imageWidthInPixels; columnIndex++) {
      if (regionMask[rowStartOffset + columnIndex] === 1) {
        filledPixelCount++;
        if (columnIndex < minX) {
          minX = columnIndex;
        }
        if (columnIndex > maxX) {
          maxX = columnIndex;
        }
        if (rowIndex < minY) {
          minY = rowIndex;
        }
        if (rowIndex > maxY) {
          maxY = rowIndex;
        }
      }
    }
  }
  if (filledPixelCount === 0) {
    return null;
  }
  return { minX, minY, maxX, maxY, filledPixelCount };
}
function computePolygonArea(polygonPoints) {
  let twiceSignedArea = 0;
  const vertexCount = polygonPoints.length;
  for (let currentIndex = 0; currentIndex < vertexCount; currentIndex++) {
    const [currentX, currentY] = polygonPoints[currentIndex];
    const [nextX, nextY] = polygonPoints[(currentIndex + 1) % vertexCount];
    twiceSignedArea += currentX * nextY - nextX * currentY;
  }
  return Math.abs(twiceSignedArea) / 2;
}
function dilateRegionMask(mask, width, height, radius, pixelBuffer) {
  const dilated = new Uint8Array(mask);
  const maxDilationColorDistanceSquared = 30 * 30;
  for (let pass = 0; pass < radius; pass++) {
    const snapshot2 = new Uint8Array(dilated);
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const pixelIndex = row * width + col;
        if (snapshot2[pixelIndex] === 1) {
          continue;
        }
        const hasFilledNeighbor = col > 0 && snapshot2[pixelIndex - 1] === 1 || col < width - 1 && snapshot2[pixelIndex + 1] === 1 || row > 0 && snapshot2[pixelIndex - width] === 1 || row < height - 1 && snapshot2[pixelIndex + width] === 1;
        if (!hasFilledNeighbor) {
          continue;
        }
        const candidateByteOffset = pixelIndex * 4;
        const candidateRed = pixelBuffer[candidateByteOffset];
        const candidateGreen = pixelBuffer[candidateByteOffset + 1];
        const candidateBlue = pixelBuffer[candidateByteOffset + 2];
        let isColorCompatible = false;
        const neighborOffsets = [
          col > 0 ? pixelIndex - 1 : -1,
          col < width - 1 ? pixelIndex + 1 : -1,
          row > 0 ? pixelIndex - width : -1,
          row < height - 1 ? pixelIndex + width : -1
        ];
        for (const neighborIndex of neighborOffsets) {
          if (neighborIndex === -1 || snapshot2[neighborIndex] !== 1) {
            continue;
          }
          const neighborByteOffset = neighborIndex * 4;
          const redDelta = candidateRed - pixelBuffer[neighborByteOffset];
          const greenDelta = candidateGreen - pixelBuffer[neighborByteOffset + 1];
          const blueDelta = candidateBlue - pixelBuffer[neighborByteOffset + 2];
          const colorDistSq = redDelta * redDelta + greenDelta * greenDelta + blueDelta * blueDelta;
          if (colorDistSq <= maxDilationColorDistanceSquared) {
            isColorCompatible = true;
            break;
          }
        }
        if (isColorCompatible) {
          dilated[pixelIndex] = 1;
        }
      }
    }
  }
  return dilated;
}

// Resources/Private/JavaScript/components/Image.svelte
import Notification from "@typo3/backend/notification.js";
Image[FILENAME] = "Resources/Private/JavaScript/components/Image.svelte";
var root_3 = add_locations(from_svg(`<circle r="3" class="shape-handle svelte-v1zpcc" role="button" tabindex="0"></circle>`), Image[FILENAME], [[322, 28]]);
var root_2 = add_locations(from_svg(`<g role="button" tabindex="0"><!><!></g>`), Image[FILENAME], [[311, 20]]);
var root_1 = add_locations(from_svg(`<svg role="application" aria-label="editor" class="svelte-v1zpcc"></svg>`), Image[FILENAME], [[299, 12]]);
var root3 = add_locations(from_html(`<div><div class="wrapper svelte-v1zpcc"><!> <img alt="Selected" unselectable="on"/></div></div>`), Image[FILENAME], [[296, 0, [[297, 4, [[328, 8]]]]]]);
var $$css = {
  hash: "svelte-v1zpcc",
  code: "\n    img.svelte-v1zpcc {\n        pointer-events: none;\n        -moz-user-select: none;\n        -webkit-user-select: none;\n        user-select: none;\n        max-width: 100%;\n        max-height: calc(100vh - 200px);\n    }\n\n    .cropper-bg.svelte-v1zpcc {\n        padding: 20px;\n        display: flex;\n        justify-content: center;\n\n        --chess-color: rgba(0, 0, 0, 0.1);\n        opacity: 0.8;\n        background-image: linear-gradient(45deg, var(--chess-color) 25%, transparent 25%), linear-gradient(-45deg, var(--chess-color) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--chess-color) 75%), linear-gradient(-45deg, transparent 75%, var(--chess-color) 75%);\n        background-size: 20px 20px;\n        background-position: 0 0, 0 10px, 10px -10px, -10px 0;\n    }\n\n    .cropper-bg--dark.svelte-v1zpcc {\n        --chess-color: rgba(255, 255, 255, 0.1);\n    }\n\n    .wrapper.svelte-v1zpcc {\n        position: relative;\n        align-self: center;\n    }\n\n    svg.svelte-v1zpcc {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    .shape-group.svelte-v1zpcc:focus,\n    .shape-handle.svelte-v1zpcc:focus {\n        outline: none;\n    }\n\n    .shape-handle.svelte-v1zpcc:focus-visible {\n        outline: 2px solid #0d6efd;\n        outline-offset: 2px;\n    }\n\n    .detection-cursor.svelte-v1zpcc {\n        pointer-events: auto !important;\n        cursor: crosshair !important;\n    }\n\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2Uuc3ZlbHRlIiwic291cmNlcyI6WyJJbWFnZS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgICBpbXBvcnQgaW50ZXJhY3QgZnJvbSAnaW50ZXJhY3Rqcyc7XG4gICAgaW1wb3J0IHtcbiAgICAgICAgZm9jdXNwb2ludHMsXG4gICAgICAgIGdldEFjdGl2ZUluZGV4LFxuICAgICAgICBzZXRBY3RpdmVJbmRleCxcbiAgICAgICAgU0hBUEVTLFxuICAgICAgICBpbWFnZU1ldGEsXG4gICAgICAgIGZvY3VzUG9pbnROYW1lLFxuICAgICAgICBhY3RpdmF0ZUZvY3VzcG9pbnQsXG4gICAgICAgIGRldGVjdGlvbk1vZGUsXG4gICAgICAgIGNyZWF0ZUZvY3VzcG9pbnRGcm9tRGV0ZWN0aW9uLFxuICAgICAgICB3aXphcmRDb25maWdTdG9yZVxuICAgIH0gZnJvbSBcIi4uL3N0b3JlLnN2ZWx0ZVwiO1xuICAgIGltcG9ydCB7b25EZXN0cm95LCBvbk1vdW50fSBmcm9tIFwic3ZlbHRlXCI7XG4gICAgaW1wb3J0IHtmYWRlfSBmcm9tIFwic3ZlbHRlL3RyYW5zaXRpb25cIjtcbiAgICBpbXBvcnQge2RldGVjdFJlZ2lvbn0gZnJvbSBcIi4uL3NlZ21lbnRhdGlvbi9kZXRlY3RSZWdpb25cIjtcbiAgICBpbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gXCJAdHlwbzMvYmFja2VuZC9ub3RpZmljYXRpb24uanNcIjtcblxuICAgIGNvbnN0IHtpbWFnZX06IHtpbWFnZTogc3RyaW5nfSA9ICRwcm9wcygpO1xuXG4gICAgbGV0IGNhbnZhc0hlaWdodDogbnVtYmVyID0gJHN0YXRlKDApO1xuICAgIGxldCBjYW52YXNXaWR0aDogbnVtYmVyID0gJHN0YXRlKDApO1xuICAgIGxldCBpbWFnZVdpZHRoOiBudW1iZXIgPSAkc3RhdGUoMCk7XG4gICAgbGV0IGltYWdlSGVpZ2h0OiBudW1iZXIgPSAkc3RhdGUoMCk7XG4gICAgbGV0IGlzRGFya01vZGU6IGJvb2xlYW4gPSAkc3RhdGUoZmFsc2UpO1xuICAgIGxldCBpbnN0YW5jZUFycmF5OiBhbnlbXSA9ICRzdGF0ZShbXSk7XG4gICAgbGV0IGltZ0VsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgbGV0IHN2Z1Jvb3Q6IFNWR1NWR0VsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAgIC8vIGNvbnZlcnQgcGl4ZWwgLT4gc3ZnIGNvb3JkaW5hdGVzXG4gICAgZnVuY3Rpb24gY2xpZW50VG9Tdmcoc3ZnOiBTVkdTVkdFbGVtZW50LCBjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgICAgICBjb25zdCBwdCA9IHN2Zy5jcmVhdGVTVkdQb2ludCgpO1xuICAgICAgICBwdC54ID0gY2xpZW50WDtcbiAgICAgICAgcHQueSA9IGNsaWVudFk7XG4gICAgICAgIGNvbnN0IGN0bSA9IHN2Zy5nZXRTY3JlZW5DVE0oKTtcbiAgICAgICAgaWYgKCFjdG0pIHJldHVybiBbMCwgMF07XG4gICAgICAgIGNvbnN0IGludiA9IGN0bS5pbnZlcnNlKCk7XG4gICAgICAgIGNvbnN0IHAgPSBwdC5tYXRyaXhUcmFuc2Zvcm0oaW52KTtcbiAgICAgICAgcmV0dXJuIFtwLngsIHAueV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3ZnU2NhbGUoc3ZnOiBTVkdTVkdFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSBzdmcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHZiID0gc3ZnLnZpZXdCb3guYmFzZVZhbDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJhdGlvWDogdmIud2lkdGggLyByZWN0LndpZHRoLFxuICAgICAgICAgICAgcmF0aW9ZOiB2Yi5oZWlnaHQgLyByZWN0LmhlaWdodFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVBvc2l0aW9ucyhldmVudDogSW50ZXJhY3Rqc0RyYWdFdmVudCk6IGFueSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBFbGVtZW50IHwgbnVsbDtcbiAgICAgICAgY29uc3Qgc3ZnID0gKHRhcmdldCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQgPyAodGFyZ2V0Lm93bmVyU1ZHRWxlbWVudCA/PyAodGFyZ2V0IGluc3RhbmNlb2YgU1ZHU1ZHRWxlbWVudCA/IHRhcmdldCA6IG51bGwpKSA6IG51bGwpID8/IHN2Z1Jvb3Q7XG4gICAgICAgIGlmICghc3ZnKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgeyByYXRpb1gsIHJhdGlvWSB9ID0gZ2V0U3ZnU2NhbGUoc3ZnKTtcbiAgICAgICAgY29uc3QgW3N4LCBzeV0gPSBjbGllbnRUb1N2ZyhzdmcsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5ldmVudCxcbiAgICAgICAgICAgIGR4OiBldmVudC5keCAqIHJhdGlvWCxcbiAgICAgICAgICAgIGR5OiBldmVudC5keSAqIHJhdGlvWSxcbiAgICAgICAgICAgIGNsaWVudFg6IHN4LFxuICAgICAgICAgICAgY2xpZW50WTogc3lcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblNoYXBlZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInIHx8IGV2ZW50LmtleSA9PT0gJyAnKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgoaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW50ZXJhY3QoXCIuc2hhcGVcIikuZHJhZ2dhYmxlKHtcbiAgICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgICAgICBpbnRlcmFjdC5tb2RpZmllcnMucmVzdHJpY3RSZWN0KHtcbiAgICAgICAgICAgICAgICByZXN0cmljdGlvbjogJ3BhcmVudCcsXG4gICAgICAgICAgICAgICAgZW5kT25seTogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgYXV0b1Njcm9sbDogdHJ1ZSxcbiAgICAgICAgbGlzdGVuZXJzOiB7XG4gICAgICAgICAgICBzdGFydDogc2V0QWN0aXZlRm9jdXNwb2ludCxcbiAgICAgICAgICAgIG1vdmUoZXZlbnQ6IEludGVyYWN0anNEcmFnRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSA/PyBcIi0xXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFkakV2ZW50ID0gbm9ybWFsaXplUG9zaXRpb25zKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZUFycmF5W2luZGV4XT8ub25EcmFnPy4oYWRqRXZlbnQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZDogc2V0QWN0aXZlRm9jdXNwb2ludFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpbnRlcmFjdChcIi5zaGFwZS1oYW5kbGVcIikuZHJhZ2dhYmxlKHtcbiAgICAgICAgbW9kaWZpZXJzOiBbXG4gICAgICAgICAgICBpbnRlcmFjdC5tb2RpZmllcnMucmVzdHJpY3RSZWN0KHtcbiAgICAgICAgICAgICAgICByZXN0cmljdGlvbjogJ3BhcmVudCcsXG4gICAgICAgICAgICAgICAgZW5kT25seTogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgYXV0b1Njcm9sbDogdHJ1ZSxcbiAgICAgICAgbGlzdGVuZXJzOiB7XG4gICAgICAgICAgICBzdGFydDogc2V0QWN0aXZlRm9jdXNwb2ludCxcbiAgICAgICAgICAgIG1vdmUoZXZlbnQ6IEludGVyYWN0anNEcmFnRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGFwZUluZGV4ID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1zaGFwZS1pbmRleCcpID8/IFwiLTFcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgYWRqRXZlbnQgPSBub3JtYWxpemVQb3NpdGlvbnMoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGluc3RhbmNlQXJyYXlbc2hhcGVJbmRleF0/Lm9uSGFuZGxlRHJhZz8uKGFkakV2ZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmQ6IHNldEFjdGl2ZUZvY3VzcG9pbnRcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgb25Nb3VudCgoKSA9PiB7XG4gICAgICAgIGlmIChpbWdFbGVtZW50LmNvbXBsZXRlKSB7XG4gICAgICAgICAgICBzZXRDYW52YXNTaXplcygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbWdFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBzZXRDYW52YXNTaXplcylcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVDYW52YXNTaXplcylcbiAgICAgICAgY29uc3QgY29sb3JTY2hlbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykhLmdldEF0dHJpYnV0ZSgnZGF0YS1jb2xvci1zY2hlbWUnKTtcbiAgICAgICAgY29uc3QgdGhlbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykhLmdldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScpO1xuICAgICAgICBjb25zdCBkYXJrTW9kZVByZWZlciA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcbiAgICAgICAgaXNEYXJrTW9kZSA9IGNvbG9yU2NoZW1lID09PSAnZGFyaycgfHwgKHRoZW1lID09PSAnYXV0bycgJiYgZGFya01vZGVQcmVmZXIgJiYgY29sb3JTY2hlbWUgIT09ICdsaWdodCcpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gc2V0QWN0aXZlRm9jdXNwb2ludChldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc2hhcGUtaW5kZXhcIikgPz8gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKTtcbiAgICAgICAgc2V0QWN0aXZlSW5kZXgoaW5kZXgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9ubG9hZCgpIHtcbiAgICAgICAgaW1hZ2VXaWR0aCA9IGltZ0VsZW1lbnQubmF0dXJhbFdpZHRoO1xuICAgICAgICBpbWFnZUhlaWdodCA9IGltZ0VsZW1lbnQubmF0dXJhbEhlaWdodDtcblxuICAgICAgICBpbWFnZU1ldGEuc2V0KHsgdzogaW1hZ2VXaWR0aCwgaDogaW1hZ2VIZWlnaHQgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TdmdEYmxDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAoISRmb2N1c3BvaW50c1tnZXRBY3RpdmVJbmRleCgpXSB8fCAhKGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIFNWR1NWR0VsZW1lbnQpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBhY3RpdmUgPSAkZm9jdXNwb2ludHNbZ2V0QWN0aXZlSW5kZXgoKV07XG4gICAgICAgIGlmICghYWN0aXZlIHx8IGFjdGl2ZS5fX3NoYXBlICE9PSAncG9seWdvbicgfHwgIShldmVudC50YXJnZXQgaW5zdGFuY2VvZiBTVkdTVkdFbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgW3N4LCBzeV0gPSBjbGllbnRUb1N2ZyhldmVudC50YXJnZXQsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICBjb25zdCBwb2ludCA9IFtzeCwgc3ldIGFzIFtudW1iZXIsIG51bWJlcl07XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZmluZENsb3Nlc3RNaWRkbGVQb2ludEluZGV4KHBvaW50KTtcbiAgICAgICAgY29uc3QgcG9pbnRzID0gJGZvY3VzcG9pbnRzW2dldEFjdGl2ZUluZGV4KCldLl9fZGF0YS5wb2ludHMuc2xpY2UoKTtcbiAgICAgICAgcG9pbnRzLnNwbGljZShpbmRleCArIDEsIDAsIHBvaW50KTtcbiAgICAgICAgJGZvY3VzcG9pbnRzW2dldEFjdGl2ZUluZGV4KCldLl9fZGF0YS5wb2ludHMgPSBwb2ludHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZENsb3Nlc3RNaWRkbGVQb2ludEluZGV4KHBvaW50OiBbbnVtYmVyLCBudW1iZXJdKSB7XG4gICAgICAgIGNvbnN0IHBvaW50cyA9ICRmb2N1c3BvaW50c1tnZXRBY3RpdmVJbmRleCgpXS5fX2RhdGEucG9pbnRzO1xuICAgICAgICBjb25zdCBtaWRkbGVQb2ludHMgPSBbLi4ucG9pbnRzLCBwb2ludHNbMF1dLnJlZHVjZSgoYWNjLCBjdXIsIGksIGFycikgPT4gWy4uLmFjYywgW2N1ciwgYXJyW2kgKyAxXV1dLCBbXSkuc2xpY2UoMCwgLTEpLm1hcCgoc2VnbWVudDogW1tudW1iZXIsIG51bWJlcl0sIFtudW1iZXIsIG51bWJlcl1dKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbW3gxLCB5MV0sIFt4MiwgeTJdXSA9IHNlZ21lbnQ7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHgxICsgKHgyIC0geDEpIC8gMixcbiAgICAgICAgICAgICAgICB5MSArICh5MiAtIHkxKSAvIDJcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBsZXQgY2xvc2VzdCA9IFtJbmZpbml0eSwgSW5maW5pdHldIGFzIFtudW1iZXIsIG51bWJlcl07XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiBtaWRkbGVQb2ludHMpIHtcbiAgICAgICAgICAgIGNvbnN0IG1pZGRsZVBvaW50ID0gbWlkZGxlUG9pbnRzW2ldO1xuICAgICAgICAgICAgaWYgKGRpc3RhbmNlKHBvaW50LCBtaWRkbGVQb2ludCkgPCBkaXN0YW5jZShwb2ludCwgY2xvc2VzdCkpIHtcbiAgICAgICAgICAgICAgICBjbG9zZXN0ID0gbWlkZGxlUG9pbnQ7XG4gICAgICAgICAgICAgICAgaW5kZXggPSAraTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gK2luZGV4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc3RhbmNlKFt4MSwgeTFdOiBbbnVtYmVyLCBudW1iZXJdLCBbeDIsIHkyXTogW251bWJlciwgbnVtYmVyXSkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KCh4MiAtIHgxKSAqKiAyICsgKHkyIC0geTEpICoqIDIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNoYXBlQ29tcG9uZW50KHNoYXBlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIFNIQVBFU1tzaGFwZSBhcyBrZXlvZiB0eXBlb2YgU0hBUEVTXS5jb21wb25lbnQ7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCgpID0+IHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZUNhbnZhc1NpemVzKVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBzZXRDYW52YXNTaXplcygpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVDYW52YXNTaXplcygpXG4gICAgICAgIH0sIDMwMClcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2FudmFzU2l6ZXMoKSB7XG4gICAgICAgIGNhbnZhc0hlaWdodCA9IGltZ0VsZW1lbnQucGFyZW50RWxlbWVudCEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG4gICAgICAgIGNhbnZhc1dpZHRoID0gaW1nRWxlbWVudC5wYXJlbnRFbGVtZW50IS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGF1dG9DcmVhdGVQb2x5Z29uKGNsaWNrRXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKCEkZGV0ZWN0aW9uTW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29udmVydCBicm93c2VyIHZpZXdwb3J0IGNvb3JkaW5hdGVzIOKGkiBpbWFnZS1uYXRpdmUgcGl4ZWwgY29vcmRpbmF0ZXNcbiAgICAgICAgLy8gV2UgdXNlIGEgdGVtcG9yYXJ5IFNWRy1iYXNlZCBjb252ZXJzaW9uIHNpbmNlIHRoZSBpbWFnZSBtYXkgYmUgc2NhbGVkXG4gICAgICAgIGNvbnN0IGltYWdlTmF0dXJhbFdpZHRoID0gaW1nRWxlbWVudC5uYXR1cmFsV2lkdGg7XG4gICAgICAgIGNvbnN0IGltYWdlTmF0dXJhbEhlaWdodCA9IGltZ0VsZW1lbnQubmF0dXJhbEhlaWdodDtcbiAgICAgICAgY29uc3QgaW1hZ2VEaXNwbGF5UmVjdCA9IGltZ0VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgY29uc3QgZGlzcGxheVRvTmF0dXJhbFNjYWxlWCA9IGltYWdlTmF0dXJhbFdpZHRoIC8gaW1hZ2VEaXNwbGF5UmVjdC53aWR0aDtcbiAgICAgICAgY29uc3QgZGlzcGxheVRvTmF0dXJhbFNjYWxlWSA9IGltYWdlTmF0dXJhbEhlaWdodCAvIGltYWdlRGlzcGxheVJlY3QuaGVpZ2h0O1xuXG4gICAgICAgIGNvbnN0IGNsaWNrWFJlbGF0aXZlVG9JbWFnZSA9IGNsaWNrRXZlbnQuY2xpZW50WCAtIGltYWdlRGlzcGxheVJlY3QubGVmdDtcbiAgICAgICAgY29uc3QgY2xpY2tZUmVsYXRpdmVUb0ltYWdlID0gY2xpY2tFdmVudC5jbGllbnRZIC0gaW1hZ2VEaXNwbGF5UmVjdC50b3A7XG5cbiAgICAgICAgY29uc3QgY2xpY2tYSW5JbWFnZVBpeGVscyA9IE1hdGgucm91bmQoY2xpY2tYUmVsYXRpdmVUb0ltYWdlICogZGlzcGxheVRvTmF0dXJhbFNjYWxlWCk7XG4gICAgICAgIGNvbnN0IGNsaWNrWUluSW1hZ2VQaXhlbHMgPSBNYXRoLnJvdW5kKGNsaWNrWVJlbGF0aXZlVG9JbWFnZSAqIGRpc3BsYXlUb05hdHVyYWxTY2FsZVkpO1xuXG4gICAgICAgIGNvbnN0IGRldGVjdGlvblJlc3VsdCA9IGRldGVjdFJlZ2lvbihcbiAgICAgICAgICAgIGltZ0VsZW1lbnQsXG4gICAgICAgICAgICBjbGlja1hJbkltYWdlUGl4ZWxzLFxuICAgICAgICAgICAgY2xpY2tZSW5JbWFnZVBpeGVsc1xuICAgICAgICApO1xuXG4gICAgICAgIGlmIChkZXRlY3Rpb25SZXN1bHQpIHtcbiAgICAgICAgICAgIGNyZWF0ZUZvY3VzcG9pbnRGcm9tRGV0ZWN0aW9uKGRldGVjdGlvblJlc3VsdCk7XG4gICAgICAgICAgICBkZXRlY3Rpb25Nb2RlLnNldChmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBOb3RpZmljYXRpb24uaW5mbyhcbiAgICAgICAgICAgICAgICAkd2l6YXJkQ29uZmlnU3RvcmU/LmxhbmdbJ3dpemFyZC5kZXRlY3Rpb25fbW9kZS5ub19yZWdpb25fZm91bmQnXSA/PyAnTm8gcmVnaW9uIGZvdW5kJyxcbiAgICAgICAgICAgICAgICAkd2l6YXJkQ29uZmlnU3RvcmU/LmxhbmdbJ3dpemFyZC5kZXRlY3Rpb25fbW9kZS5ub19yZWdpb25fZm91bmRfbWVzc2FnZSddID8/ICdObyByZWdpb24gY291bGQgYmUgZGV0ZWN0ZWQgYXQgdGhlIGNsaWNrZWQgcG9zaXRpb24uJyxcbiAgICAgICAgICAgICAgICA2MFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgICBpbWcge1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDIwMHB4KTtcbiAgICB9XG5cbiAgICAuY3JvcHBlci1iZyB7XG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gICAgICAgIC0tY2hlc3MtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgb3BhY2l0eTogMC44O1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIHZhcigtLWNoZXNzLWNvbG9yKSAyNSUsIHRyYW5zcGFyZW50IDI1JSksIGxpbmVhci1ncmFkaWVudCgtNDVkZWcsIHZhcigtLWNoZXNzLWNvbG9yKSAyNSUsIHRyYW5zcGFyZW50IDI1JSksIGxpbmVhci1ncmFkaWVudCg0NWRlZywgdHJhbnNwYXJlbnQgNzUlLCB2YXIoLS1jaGVzcy1jb2xvcikgNzUlKSwgbGluZWFyLWdyYWRpZW50KC00NWRlZywgdHJhbnNwYXJlbnQgNzUlLCB2YXIoLS1jaGVzcy1jb2xvcikgNzUlKTtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiAyMHB4IDIwcHg7XG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMCwgMCAxMHB4LCAxMHB4IC0xMHB4LCAtMTBweCAwO1xuICAgIH1cblxuICAgIC5jcm9wcGVyLWJnLS1kYXJrIHtcbiAgICAgICAgLS1jaGVzcy1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICAgIH1cblxuICAgIC53cmFwcGVyIHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgc3ZnIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgfVxuXG4gICAgLnNoYXBlLWdyb3VwOmZvY3VzLFxuICAgIC5zaGFwZS1oYW5kbGU6Zm9jdXMge1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgIH1cblxuICAgIC5zaGFwZS1oYW5kbGU6Zm9jdXMtdmlzaWJsZSB7XG4gICAgICAgIG91dGxpbmU6IDJweCBzb2xpZCAjMGQ2ZWZkO1xuICAgICAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICAgIH1cblxuICAgIC5kZXRlY3Rpb24tY3Vyc29yIHtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IGF1dG8gIWltcG9ydGFudDtcbiAgICAgICAgY3Vyc29yOiBjcm9zc2hhaXIgIWltcG9ydGFudDtcbiAgICB9XG5cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJjcm9wcGVyLWJnXCIgY2xhc3M6Y3JvcHBlci1iZy0tZGFyaz17aXNEYXJrTW9kZX0+XG4gICAgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICAgICAgeyNpZiAhJGRldGVjdGlvbk1vZGV9XG4gICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgICAgYmluZDp0aGlzPXtzdmdSb290fVxuICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAge2ltYWdlV2lkdGh9IHtpbWFnZUhlaWdodH1cIlxuICAgICAgICAgICAgICAgIG9uZGJsY2xpY2s9e29uU3ZnRGJsQ2xpY2t9XG4gICAgICAgICAgICAgICAgcm9sZT1cImFwcGxpY2F0aW9uXCJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiZWRpdG9yXCJcbiAgICAgICAgICAgICAgICBpbjpmYWRlPXt7ZHVyYXRpb246IDI2MH19XG4gICAgICAgICAgICAgICAgb3V0OmZhZGU9e3tkdXJhdGlvbjogMTgwfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7I2VhY2ggJGZvY3VzcG9pbnRzIGFzIGZvY3VzcG9pbnQsIGluZGV4fVxuICAgICAgICAgICAgICAgICAgICB7QGNvbnN0IFNoYXBlQ29tcG9uZW50ID0gZ2V0U2hhcGVDb21wb25lbnQoZm9jdXNwb2ludC5fX3NoYXBlKX1cblxuICAgICAgICAgICAgICAgICAgICA8ZyBjbGFzcz17W1wic2hhcGUtZ3JvdXBcIiwgaW5kZXggPT09IGdldEFjdGl2ZUluZGV4KCkgJiYgXCJhY3RpdmVcIl19IG9uY2xpY2s9eygpID0+IGFjdGl2YXRlRm9jdXNwb2ludChpbmRleCl9IHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPXtgc2VsZWN0ICR7Zm9jdXNQb2ludE5hbWUoaW5kZXgpfWB9IGFyaWEtcHJlc3NlZD17aW5kZXggPT09IGdldEFjdGl2ZUluZGV4KCl9IHRhYmluZGV4PVwiMFwiIG9ua2V5ZG93bj17KGV2ZW50KSA9PiBvblNoYXBlZG93bihldmVudCwgaW5kZXgpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTaGFwZUNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQ6dGhpcz17aW5zdGFuY2VBcnJheVtpbmRleF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlV2lkdGg9e2ltYWdlV2lkdGh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VIZWlnaHQ9e2ltYWdlSGVpZ2h0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc1dpZHRoPXtjYW52YXNXaWR0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNIZWlnaHQ9e2NhbnZhc0hlaWdodH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsjZWFjaCBpbnN0YW5jZUFycmF5W2luZGV4XT8uZ2V0SGFuZGxlcz8uKCkgYXMgW3gsIHldLCBoYW5kbGVJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGN4PXt4fSBjeT17eX0gcj1cIjNcIiBkYXRhLXNoYXBlLWluZGV4PXtpbmRleH0gZGF0YS1pbmRleD17aGFuZGxlSW5kZXh9IG9uZGJsY2xpY2s9e2luc3RhbmNlQXJyYXlbaW5kZXhdPy5vbkhhbmRsZURvdWJsZUNsaWNrfSBjbGFzcz1cInNoYXBlLWhhbmRsZVwiIHJvbGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIiBhcmlhLWxhYmVsPXtgSGFuZGxlIHBvaW50IG9mICR7Zm9jdXNQb2ludE5hbWUoaW5kZXgpfWB9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICB7L2VhY2h9XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgey9pZn1cbiAgICAgICAgPGltZyBiaW5kOnRoaXM9e2ltZ0VsZW1lbnR9XG4gICAgICAgICAgICAgc3JjPXtpbWFnZX1cbiAgICAgICAgICAgICBhbHQ9XCJTZWxlY3RlZFwiXG4gICAgICAgICAgICAgdW5zZWxlY3RhYmxlPVwib25cIlxuICAgICAgICAgICAgIHtvbmxvYWR9XG4gICAgICAgICAgICAgb25jbGljaz17YXV0b0NyZWF0ZVBvbHlnb259XG4gICAgICAgICAgICAgY2xhc3M6ZGV0ZWN0aW9uLWN1cnNvcj17JGRldGVjdGlvbk1vZGV9XG4gICAgICAgIC8+XG4gICAgPC9kaXY+XG48L2Rpdj5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBZ1BBLElBQUksaUJBQUcsQ0FBQztBQUNSLFFBQVEsb0JBQW9CO0FBQzVCLFFBQVEsc0JBQXNCO0FBQzlCLFFBQVEseUJBQXlCO0FBQ2pDLFFBQVEsaUJBQWlCO0FBQ3pCLFFBQVEsZUFBZTtBQUN2QixRQUFRLCtCQUErQjtBQUN2Qzs7QUFFQSxJQUFJLHlCQUFXLENBQUM7QUFDaEIsUUFBUSxhQUFhO0FBQ3JCLFFBQVEsYUFBYTtBQUNyQixRQUFRLHVCQUF1Qjs7QUFFL0IsUUFBUSxpQ0FBaUM7QUFDekMsUUFBUSxZQUFZO0FBQ3BCLFFBQVEsc1JBQXNSO0FBQzlSLFFBQVEsMEJBQTBCO0FBQ2xDLFFBQVEscURBQXFEO0FBQzdEOztBQUVBLElBQUksK0JBQWlCLENBQUM7QUFDdEIsUUFBUSx1Q0FBdUM7QUFDL0M7O0FBRUEsSUFBSSxzQkFBUSxDQUFDO0FBQ2IsUUFBUSxrQkFBa0I7QUFDMUIsUUFBUSxrQkFBa0I7QUFDMUI7O0FBRUEsSUFBSSxpQkFBRyxDQUFDO0FBQ1IsUUFBUSxrQkFBa0I7QUFDMUIsUUFBUSxPQUFPO0FBQ2YsUUFBUSxNQUFNO0FBQ2QsUUFBUSxXQUFXO0FBQ25CLFFBQVEsWUFBWTtBQUNwQjs7QUFFQSxJQUFJLDBCQUFZLE1BQU07QUFDdEIsSUFBSSwyQkFBYSxNQUFNLENBQUM7QUFDeEIsUUFBUSxhQUFhO0FBQ3JCOztBQUVBLElBQUksMkJBQWEsY0FBYyxDQUFDO0FBQ2hDLFFBQVEsMEJBQTBCO0FBQ2xDLFFBQVEsbUJBQW1CO0FBQzNCOztBQUVBLElBQUksK0JBQWlCLENBQUM7QUFDdEIsUUFBUSwrQkFBK0I7QUFDdkMsUUFBUSw0QkFBNEI7QUFDcEM7OyJ9 */"
};
function Image($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Image);
  append_styles($$anchor, $$css);
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const $detectionMode = () => (validate_store(detectionMode, "detectionMode"), store_get(detectionMode, "$detectionMode", $$stores));
  const $wizardConfigStore = () => (validate_store(wizardConfigStore, "wizardConfigStore"), store_get(wizardConfigStore, "$wizardConfigStore", $$stores));
  const [$$stores, $$cleanup] = setup_stores();
  const image = prop($$props, "image", 7);
  let canvasHeight = tag(state(0), "canvasHeight");
  let canvasWidth = tag(state(0), "canvasWidth");
  let imageWidth = tag(state(0), "imageWidth");
  let imageHeight = tag(state(0), "imageHeight");
  let isDarkMode = tag(state(false), "isDarkMode");
  let instanceArray = tag(state(proxy([])), "instanceArray");
  let imgElement;
  let svgRoot = null;
  function clientToSvg(svg, clientX, clientY) {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return [0, 0];
    const inv = ctm.inverse();
    const p = pt.matrixTransform(inv);
    return [p.x, p.y];
  }
  function getSvgScale(svg) {
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    return {
      ratioX: vb.width / rect.width,
      ratioY: vb.height / rect.height
    };
  }
  function normalizePositions(event2) {
    const target = event2.target;
    const svg = (target instanceof SVGElement ? target.ownerSVGElement ?? (target instanceof SVGSVGElement ? target : null) : null) ?? svgRoot;
    if (!svg) return;
    const { ratioX, ratioY } = getSvgScale(svg);
    const [sx, sy] = clientToSvg(svg, event2.clientX, event2.clientY);
    return {
      ...event2,
      dx: event2.dx * ratioX,
      dy: event2.dy * ratioY,
      clientX: sx,
      clientY: sy
    };
  }
  function onShapedown(event2, index2) {
    if (strict_equals(event2.key, "Enter") || strict_equals(event2.key, " ")) {
      event2.preventDefault();
      setActiveIndex(index2);
    }
  }
  interact(".shape").draggable({
    modifiers: [
      interact.modifiers.restrictRect({ restriction: "parent", endOnly: true })
    ],
    autoScroll: true,
    listeners: {
      start: setActiveFocuspoint,
      move(event2) {
        const index2 = parseInt(event2.target.getAttribute("data-index") ?? "-1");
        const adjEvent = normalizePositions(event2);
        get2(instanceArray)[index2]?.onDrag?.(adjEvent);
      },
      end: setActiveFocuspoint
    }
  });
  interact(".shape-handle").draggable({
    modifiers: [
      interact.modifiers.restrictRect({ restriction: "parent", endOnly: true })
    ],
    autoScroll: true,
    listeners: {
      start: setActiveFocuspoint,
      move(event2) {
        const shapeIndex = parseInt(event2.target.getAttribute("data-shape-index") ?? "-1");
        const adjEvent = normalizePositions(event2);
        get2(instanceArray)[shapeIndex]?.onHandleDrag?.(adjEvent);
      },
      end: setActiveFocuspoint
    }
  });
  onMount(() => {
    if (imgElement.complete) {
      setCanvasSizes();
    } else {
      imgElement.addEventListener("load", setCanvasSizes);
    }
    window.addEventListener("resize", updateCanvasSizes);
    const colorScheme = document.querySelector("html").getAttribute("data-color-scheme");
    const theme = document.querySelector("html").getAttribute("data-theme");
    const darkModePrefer = window.matchMedia("(prefers-color-scheme: dark)").matches;
    set(isDarkMode, strict_equals(colorScheme, "dark") || strict_equals(theme, "auto") && darkModePrefer && strict_equals(colorScheme, "light", false), true);
  });
  function setActiveFocuspoint(event2) {
    const index2 = parseInt(event2.target.getAttribute("data-shape-index") ?? event2.target.getAttribute("data-index"));
    setActiveIndex(index2);
  }
  function onload() {
    set(imageWidth, imgElement.naturalWidth, true);
    set(imageHeight, imgElement.naturalHeight, true);
    imageMeta.set({ w: get2(imageWidth), h: get2(imageHeight) });
  }
  function onSvgDblClick(event2) {
    if (!$focuspoints()[getActiveIndex()] || !(event2.target instanceof SVGSVGElement)) return;
    const active = $focuspoints()[getActiveIndex()];
    if (!active || strict_equals(active.__shape, "polygon", false) || !(event2.target instanceof SVGSVGElement)) {
      return;
    }
    const [sx, sy] = clientToSvg(event2.target, event2.clientX, event2.clientY);
    const point = [sx, sy];
    const index2 = findClosestMiddlePointIndex(point);
    const points = $focuspoints()[getActiveIndex()].__data.points.slice();
    points.splice(index2 + 1, 0, point);
    store_mutate(focuspoints, untrack($focuspoints)[getActiveIndex()].__data.points = points, untrack($focuspoints));
  }
  function findClosestMiddlePointIndex(point) {
    const points = $focuspoints()[getActiveIndex()].__data.points;
    const middlePoints = [...points, points[0]].reduce((acc, cur, i, arr) => [...acc, [cur, arr[i + 1]]], []).slice(0, -1).map((segment) => {
      const [[x1, y1], [x2, y2]] = segment;
      return [x1 + (x2 - x1) / 2, y1 + (y2 - y1) / 2];
    });
    let index2 = 0;
    let closest = [Infinity, Infinity];
    for (const i in middlePoints) {
      const middlePoint = middlePoints[i];
      if (distance(point, middlePoint) < distance(point, closest)) {
        closest = middlePoint;
        index2 = +i;
      }
    }
    return +index2;
  }
  function distance([x1, y1], [x2, y2]) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
  function getShapeComponent(shape) {
    return SHAPES[shape].component;
  }
  onDestroy(() => {
    window.removeEventListener("resize", updateCanvasSizes);
  });
  function setCanvasSizes() {
    setTimeout(
      () => {
        updateCanvasSizes();
      },
      300
    );
  }
  function updateCanvasSizes() {
    set(canvasHeight, imgElement.parentElement.getBoundingClientRect().height, true);
    set(canvasWidth, imgElement.parentElement.getBoundingClientRect().width, true);
  }
  function autoCreatePolygon(clickEvent) {
    if (!$detectionMode()) {
      return;
    }
    const imageNaturalWidth = imgElement.naturalWidth;
    const imageNaturalHeight = imgElement.naturalHeight;
    const imageDisplayRect = imgElement.getBoundingClientRect();
    const displayToNaturalScaleX = imageNaturalWidth / imageDisplayRect.width;
    const displayToNaturalScaleY = imageNaturalHeight / imageDisplayRect.height;
    const clickXRelativeToImage = clickEvent.clientX - imageDisplayRect.left;
    const clickYRelativeToImage = clickEvent.clientY - imageDisplayRect.top;
    const clickXInImagePixels = Math.round(clickXRelativeToImage * displayToNaturalScaleX);
    const clickYInImagePixels = Math.round(clickYRelativeToImage * displayToNaturalScaleY);
    const detectionResult = detectRegion(imgElement, clickXInImagePixels, clickYInImagePixels);
    if (detectionResult) {
      createFocuspointFromDetection(detectionResult);
      detectionMode.set(false);
    } else {
      Notification.info($wizardConfigStore()?.lang["wizard.detection_mode.no_region_found"] ?? "No region found", $wizardConfigStore()?.lang["wizard.detection_mode.no_region_found_message"] ?? "No region could be detected at the clicked position.", 60);
    }
  }
  var $$exports = {
    ...legacy_api(),
    get updateCanvasSizes() {
      return updateCanvasSizes;
    },
    get image() {
      return image();
    },
    set image($$value) {
      image($$value);
      flushSync();
    }
  };
  var div = root3();
  let classes;
  var div_1 = child(div);
  var node = child(div_1);
  {
    var consequent = ($$anchor2) => {
      var svg_1 = root_1();
      add_svelte_meta(
        () => each(svg_1, 5, $focuspoints, index, ($$anchor3, focuspoint, index2) => {
          const ShapeComponent = tag(user_derived(() => getShapeComponent(get2(focuspoint).__shape)), "ShapeComponent");
          get2(ShapeComponent);
          var g = root_2();
          var node_1 = child(g);
          validate_binding("bind:this={instanceArray[index]}", [], () => (mark_store_binding(), get2(instanceArray)), () => index2, 313, 28);
          add_svelte_meta(
            () => component(node_1, () => get2(ShapeComponent), ($$anchor4, ShapeComponent_1) => {
              bind_this(
                ShapeComponent_1($$anchor4, {
                  index: index2,
                  get imageWidth() {
                    return get2(imageWidth);
                  },
                  get imageHeight() {
                    return get2(imageHeight);
                  },
                  get canvasWidth() {
                    return get2(canvasWidth);
                  },
                  get canvasHeight() {
                    return get2(canvasHeight);
                  }
                }),
                ($$value, index3) => get2(instanceArray)[index3] = $$value,
                (index3) => get2(instanceArray)?.[index3],
                () => [index2]
              );
            }),
            "component",
            Image,
            312,
            24,
            { componentTag: "ShapeComponent" }
          );
          var node_2 = sibling(node_1);
          add_svelte_meta(
            () => each(node_2, 17, () => get2(instanceArray)[index2]?.getHandles?.(), index, ($$anchor4, $$item, handleIndex) => {
              var $$array = user_derived(() => to_array(get2($$item), 2));
              let x = () => get2($$array)[0];
              x();
              let y = () => get2($$array)[1];
              y();
              var circle = root_3();
              set_attribute2(circle, "data-shape-index", index2);
              set_attribute2(circle, "data-index", handleIndex);
              template_effect(
                ($0) => {
                  set_attribute2(circle, "cx", x());
                  set_attribute2(circle, "cy", y());
                  set_attribute2(circle, "aria-label", $0);
                },
                [() => `Handle point of ${focusPointName(index2)}`]
              );
              delegated("dblclick", circle, function(...$$args) {
                apply(() => get2(instanceArray)[index2]?.onHandleDoubleClick, this, $$args, Image, [322, 118]);
              });
              append($$anchor4, circle);
            }),
            "each",
            Image,
            321,
            24
          );
          reset(g);
          template_effect(
            ($0, $1, $2) => {
              set_class(g, 0, $0, "svelte-v1zpcc");
              set_attribute2(g, "aria-label", $1);
              set_attribute2(g, "aria-pressed", $2);
            },
            [
              () => clsx2([
                "shape-group",
                strict_equals(index2, getActiveIndex()) && "active"
              ]),
              () => `select ${focusPointName(index2)}`,
              () => strict_equals(index2, getActiveIndex())
            ]
          );
          delegated("click", g, function click() {
            return activateFocuspoint(index2);
          });
          delegated("keydown", g, function keydown(event2) {
            return onShapedown(event2, index2);
          });
          append($$anchor3, g);
        }),
        "each",
        Image,
        308,
        16
      );
      reset(svg_1);
      bind_this(svg_1, ($$value) => svgRoot = $$value, () => svgRoot);
      template_effect(() => set_attribute2(svg_1, "viewBox", `0 0 ${get2(imageWidth) ?? ""} ${get2(imageHeight) ?? ""}`));
      delegated("dblclick", svg_1, onSvgDblClick);
      transition(1, svg_1, () => fade, () => ({ duration: 260 }));
      transition(2, svg_1, () => fade, () => ({ duration: 180 }));
      append($$anchor2, svg_1);
    };
    add_svelte_meta(
      () => if_block(node, ($$render) => {
        if (!$detectionMode()) $$render(consequent);
      }),
      "if",
      Image,
      298,
      8
    );
  }
  var img = sibling(node, 2);
  let classes_1;
  bind_this(img, ($$value) => imgElement = $$value, () => imgElement);
  reset(div_1);
  reset(div);
  template_effect(() => {
    classes = set_class(div, 1, "cropper-bg svelte-v1zpcc", null, classes, { "cropper-bg--dark": get2(isDarkMode) });
    set_attribute2(img, "src", image());
    classes_1 = set_class(img, 1, "svelte-v1zpcc", null, classes_1, { "detection-cursor": $detectionMode() });
  });
  event("load", img, onload);
  delegated("click", img, autoCreatePolygon);
  replay_events(img);
  append($$anchor, div);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
delegate(["dblclick", "click", "keydown"]);
create_custom_element(Image, { image: {} }, [], ["updateCanvasSizes"], { mode: "open" });

// Resources/Private/JavaScript/components/Fields/Select.svelte
Select[FILENAME] = "Resources/Private/JavaScript/components/Fields/Select.svelte";
var root_12 = add_locations(from_html(`<option> </option>`), Select[FILENAME], [[14, 12]]);
var root4 = add_locations(from_html(`<div class="form-group"><label class="form-label"> </label> <select class="form-select"></select></div>`), Select[FILENAME], [[8, 0, [[9, 4], [12, 4]]]]);
function Select($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Select);
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const [$$stores, $$cleanup] = setup_stores();
  let config = prop($$props, "config", 7), index2 = prop($$props, "index", 7), name = prop($$props, "name", 7);
  let options = tag(user_derived(() => Object.entries(config().options).map(([value, label]) => ({ value, label }))), "options");
  var $$exports = {
    ...legacy_api(),
    get config() {
      return config();
    },
    set config($$value) {
      config($$value);
      flushSync();
    },
    get index() {
      return index2();
    },
    set index($$value) {
      index2($$value);
      flushSync();
    },
    get name() {
      return name();
    },
    set name($$value) {
      name($$value);
      flushSync();
    }
  };
  var div = root4();
  var label_1 = child(div);
  var text2 = child(label_1, true);
  reset(label_1);
  var select = sibling(label_1, 2);
  add_svelte_meta(
    () => each(select, 21, () => get2(options), index, ($$anchor2, $$item) => {
      let value = () => get2($$item).value;
      value();
      let label = () => get2($$item).label;
      label();
      var option = root_12();
      var text_1 = child(option, true);
      reset(option);
      var option_value = {};
      template_effect(() => {
        set_text(text_1, label());
        if (option_value !== (option_value = value())) {
          option.value = (option.__value = value()) ?? "";
        }
      });
      append($$anchor2, option);
    }),
    "each",
    Select,
    13,
    8
  );
  reset(select);
  reset(div);
  template_effect(() => {
    set_attribute2(label_1, "for", `input-${index2() ?? ""}-${name() ?? ""}`);
    set_text(text2, config().title);
    set_attribute2(select, "id", `input-${index2() ?? ""}-${name() ?? ""}`);
  });
  bind_select_value(
    select,
    function get3() {
      return $focuspoints()[index2()][name()];
    },
    function set2($$value) {
      store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = $$value, untrack($focuspoints));
    }
  );
  append($$anchor, div);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
create_custom_element(Select, { config: {}, index: {}, name: {} }, [], [], { mode: "open" });

// Resources/Private/JavaScript/components/Fields/Text.svelte
Text2[FILENAME] = "Resources/Private/JavaScript/components/Fields/Text.svelte";
var root5 = add_locations(from_html(`<div class="form-group"><label class="form-label"> </label> <input type="text" class="form-control"/></div>`), Text2[FILENAME], [[7, 0, [[8, 4], [11, 4]]]]);
function Text2($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Text2);
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const [$$stores, $$cleanup] = setup_stores();
  let config = prop($$props, "config", 7), index2 = prop($$props, "index", 7), name = prop($$props, "name", 7);
  var $$exports = {
    ...legacy_api(),
    get config() {
      return config();
    },
    set config($$value) {
      config($$value);
      flushSync();
    },
    get index() {
      return index2();
    },
    set index($$value) {
      index2($$value);
      flushSync();
    },
    get name() {
      return name();
    },
    set name($$value) {
      name($$value);
      flushSync();
    }
  };
  var div = root5();
  var label = child(div);
  var text2 = child(label, true);
  reset(label);
  var input = sibling(label, 2);
  remove_input_defaults(input);
  reset(div);
  template_effect(() => {
    set_attribute2(label, "for", `input-${index2() ?? ""}-${name() ?? ""}`);
    set_text(text2, config().title);
    set_attribute2(input, "id", `input-${index2() ?? ""}-${name() ?? ""}`);
  });
  bind_value(
    input,
    function get3() {
      return $focuspoints()[index2()][name()];
    },
    function set2($$value) {
      store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = $$value, untrack($focuspoints));
    }
  );
  append($$anchor, div);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
create_custom_element(Text2, { config: {}, index: {}, name: {} }, [], [], { mode: "open" });

// Resources/Private/JavaScript/components/Fields/Textarea.svelte
Textarea[FILENAME] = "Resources/Private/JavaScript/components/Fields/Textarea.svelte";
var root6 = add_locations(from_html(`<div class="form-group"><label class="form-label"> </label> <textarea class="form-control"></textarea></div>`), Textarea[FILENAME], [[7, 0, [[8, 4], [11, 4]]]]);
function Textarea($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Textarea);
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const [$$stores, $$cleanup] = setup_stores();
  let config = prop($$props, "config", 7), index2 = prop($$props, "index", 7), name = prop($$props, "name", 7);
  var $$exports = {
    ...legacy_api(),
    get config() {
      return config();
    },
    set config($$value) {
      config($$value);
      flushSync();
    },
    get index() {
      return index2();
    },
    set index($$value) {
      index2($$value);
      flushSync();
    },
    get name() {
      return name();
    },
    set name($$value) {
      name($$value);
      flushSync();
    }
  };
  var div = root6();
  var label = child(div);
  var text2 = child(label, true);
  reset(label);
  var textarea = sibling(label, 2);
  remove_textarea_child(textarea);
  reset(div);
  template_effect(() => {
    set_attribute2(label, "for", `input-${index2() ?? ""}-${name() ?? ""}`);
    set_text(text2, config().title);
    set_attribute2(textarea, "id", `input-${index2() ?? ""}-${name() ?? ""}`);
  });
  bind_value(
    textarea,
    function get3() {
      return $focuspoints()[index2()][name()];
    },
    function set2($$value) {
      store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = $$value, untrack($focuspoints));
    }
  );
  append($$anchor, div);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
create_custom_element(Textarea, { config: {}, index: {}, name: {} }, [], [], { mode: "open" });

// Resources/Private/JavaScript/components/Fields/Link.svelte
import AjaxRequest from "@typo3/core/ajax/ajax-request.js";
import Modal from "@typo3/backend/modal.js";

// Resources/Private/JavaScript/components/Icon.svelte
import Icons from "@typo3/backend/icons.js";
Icon[FILENAME] = "Resources/Private/JavaScript/components/Icon.svelte";
function Icon($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Icon);
  const name = prop($$props, "name", 7);
  let innerHtml = tag(state(""), "innerHtml");
  user_effect(() => {
    Icons.getIcon(name(), Icons.sizes.small).then((html2) => {
      set(innerHtml, html2, true);
    });
  });
  var $$exports = {
    ...legacy_api(),
    get name() {
      return name();
    },
    set name($$value) {
      name($$value);
      flushSync();
    }
  };
  var fragment = comment();
  var node = first_child(fragment);
  html(node, () => get2(innerHtml));
  append($$anchor, fragment);
  return pop($$exports);
}
create_custom_element(Icon, { name: {} }, [], [], { mode: "open" });

// Resources/Private/JavaScript/components/Fields/Link.svelte
Link[FILENAME] = "Resources/Private/JavaScript/components/Fields/Link.svelte";
var root_13 = add_locations(from_html(`<div class="form-wizards-item-bottom"><div class="callout callout-info mt-3 mb-0"><div class="callout-content"><div class="callout-body"></div></div></div></div>`), Link[FILENAME], [[139, 8, [[140, 12, [[141, 16, [[142, 20]]]]]]]]);
var root7 = add_locations(from_html(`<div class="form-group"><label class="form-label"> </label> <div class="form-wizards-wrap"><div class="form-wizards-element"><div class="input-group t3js-form-field-link"><span class="t3js-form-field-link-icon input-group-text"></span> <input class="form-control" title="" value="" readonly="" hidden=""/> <div class="form-control-clearable-wrapper"><input type="text" readonly=""/> <input type="text"/> <button type="button" tabindex="-1" title="Clear input" aria-label="Clear input"><!></button></div> <button class="btn btn-default"><!></button></div></div> <div class="form-wizards-item-aside formwizards-item-aside--field-control"><div class="btn-group"><button aria-label="Open link wizard" class="btn btn-default"><!></button></div></div></div> <!></div>`), Link[FILENAME], [
  [
    90,
    0,
    [
      [91, 4],
      [
        94,
        4,
        [
          [
            95,
            8,
            [
              [
                96,
                12,
                [
                  [97, 16],
                  [98, 16],
                  [99, 16, [[100, 20], [107, 20], [113, 20]]],
                  [124, 16]
                ]
              ]
            ]
          ],
          [129, 8, [[130, 12, [[131, 16]]]]]
        ]
      ]
    ]
  ]
]);
function Link($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Link);
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const $wizardConfigStore = () => (validate_store(wizardConfigStore, "wizardConfigStore"), store_get(wizardConfigStore, "$wizardConfigStore", $$stores));
  const [$$stores, $$cleanup] = setup_stores();
  let config = prop($$props, "config", 7), index2 = prop($$props, "index", 7), name = prop($$props, "name", 7);
  let linkBrowserData = tag(state(null), "linkBrowserData");
  let readOnly = tag(state(true), "readOnly");
  let previewText = tag(user_derived(() => get2(linkBrowserData)?.preview?.text ?? ""), "previewText");
  let previewIcon = tag(user_derived(() => get2(linkBrowserData)?.preview?.icon ?? ""), "previewIcon");
  let previewAdditionalAttributes = tag(user_derived(() => get2(linkBrowserData)?.preview?.additionalAttributes ?? ""), "previewAdditionalAttributes");
  user_effect(() => {
    if ($focuspoints()?.[index2()]?.[name()]) {
      updateLinkBrowserInfo();
    }
  });
  const handleLinkSelection = (event2) => {
    store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = event2.detail.link, untrack($focuspoints));
    updateLinkBrowserInfo();
  };
  async function updateLinkBrowserInfo() {
    let url = TYPO3.settings.ajaxUrls["wizard_focuspoint_linkbrowserurl"];
    url += `&inputName=${encodeURIComponent($wizardConfigStore().itemFormElName + "-hidden-link-field")}`;
    url += "&inputValue=" + encodeURIComponent($focuspoints()[index2()][name()] || "");
    url += "&config=" + encodeURIComponent(JSON.stringify(config() || {}));
    url += "&pid=" + encodeURIComponent($wizardConfigStore().pid);
    return new AjaxRequest(url).get().then(async (response) => {
      set(linkBrowserData, (await track_reactivity_loss(response.resolve()))(), true);
    });
  }
  function openModal() {
    const modal = Modal.advanced({
      type: Modal.types.iframe,
      content: get2(linkBrowserData).url,
      size: Modal.sizes.large
    });
    modal.addEventListener("typo3:form-engine:link-browser:set-link", (e) => {
      handleLinkSelection({ detail: { link: e.value } });
      modal.hideModal();
    });
    const itemFormElName = $wizardConfigStore().itemFormElName;
    if (!itemFormElName) {
      return;
    }
    const linkChannel = new BroadcastChannel(focuspointChannelName(itemFormElName));
    linkChannel.onmessage = (e) => {
      if (strict_equals(e.data.type, "link-selected")) {
        handleLinkSelection({ detail: { link: e.data.link } });
        linkChannel.close();
      }
    };
    modal.addEventListener("typo3-modal-hidden", () => {
      linkChannel.close();
    });
  }
  function onInputClear(index3) {
    store_mutate(focuspoints, untrack($focuspoints)[index3][name()] = "", untrack($focuspoints));
    get2(linkBrowserData).preview = null;
  }
  var $$exports = {
    ...legacy_api(),
    get config() {
      return config();
    },
    set config($$value) {
      config($$value);
      flushSync();
    },
    get index() {
      return index2();
    },
    set index($$value) {
      index2($$value);
      flushSync();
    },
    get name() {
      return name();
    },
    set name($$value) {
      name($$value);
      flushSync();
    }
  };
  var div = root7();
  var label = child(div);
  var text2 = child(label, true);
  reset(label);
  var div_1 = sibling(label, 2);
  var div_2 = child(div_1);
  var div_3 = child(div_2);
  var span = child(div_3);
  html(span, () => get2(previewIcon), true);
  reset(span);
  var input = sibling(span, 2);
  var div_4 = sibling(input, 2);
  var input_1 = child(div_4);
  remove_input_defaults(input_1);
  let classes;
  var input_2 = sibling(input_1, 2);
  remove_input_defaults(input_2);
  let classes_1;
  var button = sibling(input_2, 2);
  let classes_2;
  var node = child(button);
  add_svelte_meta(() => Icon(node, { name: "actions-close" }), "component", Link, 121, 24, { componentTag: "Icon" });
  reset(button);
  reset(div_4);
  var button_1 = sibling(div_4, 2);
  var node_1 = child(button_1);
  add_svelte_meta(() => Icon(node_1, { name: "actions-version-workspaces-preview-link" }), "component", Link, 125, 20, { componentTag: "Icon" });
  reset(button_1);
  reset(div_3);
  reset(div_2);
  var div_5 = sibling(div_2, 2);
  var div_6 = child(div_5);
  var button_2 = child(div_6);
  var node_2 = child(button_2);
  add_svelte_meta(() => Icon(node_2, { name: "actions-wizard-link" }), "component", Link, 133, 20, { componentTag: "Icon" });
  reset(button_2);
  reset(div_6);
  reset(div_5);
  reset(div_1);
  var node_3 = sibling(div_1, 2);
  {
    var consequent = ($$anchor2) => {
      var div_7 = root_13();
      var div_8 = child(div_7);
      var div_9 = child(div_8);
      var div_10 = child(div_9);
      html(div_10, () => get2(previewAdditionalAttributes), true);
      reset(div_10);
      reset(div_9);
      reset(div_8);
      reset(div_7);
      append($$anchor2, div_7);
    };
    add_svelte_meta(
      () => if_block(node_3, ($$render) => {
        if (get2(previewAdditionalAttributes)) $$render(consequent);
      }),
      "if",
      Link,
      138,
      4
    );
  }
  reset(div);
  template_effect(() => {
    set_attribute2(label, "for", `input-${index2() ?? ""}-${name() ?? ""}`);
    set_text(text2, config().title);
    set_attribute2(input_1, "id", `input-${index2() ?? ""}-${name() ?? ""}`);
    classes = set_class(input_1, 1, "form-control form-control-clearable", null, classes, { hidden: !get2(readOnly) });
    set_value(input_1, get2(previewText));
    classes_1 = set_class(input_2, 1, "form-control form-control-clearable", null, classes_1, { hidden: get2(readOnly) });
    set_attribute2(input_2, "id", `input-${index2() ?? ""}-${name() ?? ""}`);
    classes_2 = set_class(button, 1, "close text-black", null, classes_2, { hidden: strict_equals($focuspoints()[index2()][name()], "") });
  });
  bind_value(
    input_2,
    function get3() {
      return $focuspoints()[index2()][name()];
    },
    function set2($$value) {
      store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = $$value, untrack($focuspoints));
    }
  );
  delegated("click", button, function click(e) {
    e.preventDefault();
    onInputClear(index2());
  });
  delegated("click", button_1, function click_1(e) {
    e.preventDefault();
    set(readOnly, !get2(readOnly));
  });
  delegated("click", button_2, function click_2(e) {
    e.preventDefault();
    openModal();
  });
  append($$anchor, div);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
delegate(["click"]);
create_custom_element(Link, { config: {}, index: {}, name: {} }, [], [], { mode: "open" });

// Resources/Private/JavaScript/components/Fields/Checkbox.svelte
Checkbox[FILENAME] = "Resources/Private/JavaScript/components/Fields/Checkbox.svelte";
var root_14 = add_locations(from_html(`<span class="form-check-label-icon"><span class="form-check-label-icon-checked"><!></span> <span class="form-check-label-icon-unchecked"><!></span></span>`), Checkbox[FILENAME], [[30, 16, [[31, 20], [34, 20]]]]);
var root8 = add_locations(from_html(`<div class="form-group"><label class="form-label"> </label> <div><input type="checkbox" class="form-check-input me-1"/> <label class="form-check-label"><!> </label></div></div>`), Checkbox[FILENAME], [[13, 0, [[14, 4], [17, 4, [[19, 8], [28, 8]]]]]]);
function Checkbox($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Checkbox);
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const [$$stores, $$cleanup] = setup_stores();
  let config = prop($$props, "config", 7), index2 = prop($$props, "index", 7), name = prop($$props, "name", 7);
  let isCheckbox = tag(user_derived(() => strict_equals(config()?.renderType, "check") || !Object.hasOwn(config(), "renderType")), "isCheckbox");
  let isToggle = tag(user_derived(() => strict_equals(config()?.renderType, "checkboxToggle")), "isToggle");
  var $$exports = {
    ...legacy_api(),
    get config() {
      return config();
    },
    set config($$value) {
      config($$value);
      flushSync();
    },
    get index() {
      return index2();
    },
    set index($$value) {
      index2($$value);
      flushSync();
    },
    get name() {
      return name();
    },
    set name($$value) {
      name($$value);
      flushSync();
    }
  };
  var div = root8();
  var label = child(div);
  var text2 = child(label, true);
  reset(label);
  var div_1 = sibling(label, 2);
  let classes;
  var input = child(div_1);
  remove_input_defaults(input);
  var label_1 = sibling(input, 2);
  var node = child(label_1);
  {
    var consequent = ($$anchor2) => {
      var span = root_14();
      var span_1 = child(span);
      var node_1 = child(span_1);
      add_svelte_meta(() => Icon(node_1, { name: "actions-check" }), "component", Checkbox, 32, 24, { componentTag: "Icon" });
      reset(span_1);
      var span_2 = sibling(span_1, 2);
      var node_2 = child(span_2);
      add_svelte_meta(() => Icon(node_2, { name: "empty-empty" }), "component", Checkbox, 35, 24, { componentTag: "Icon" });
      reset(span_2);
      reset(span);
      append($$anchor2, span);
    };
    add_svelte_meta(
      () => if_block(node, ($$render) => {
        if (get2(isCheckbox)) $$render(consequent);
      }),
      "if",
      Checkbox,
      29,
      12
    );
  }
  var text_1 = sibling(node);
  reset(label_1);
  reset(div_1);
  reset(div);
  template_effect(
    ($0) => {
      set_attribute2(label, "for", `input-${index2() ?? ""}-${name() ?? ""}`);
      set_attribute2(label, "id", `label-${index2() ?? ""}-${name() ?? ""}`);
      set_text(text2, config()?.title ?? config().title);
      classes = set_class(div_1, 1, "form-check", null, classes, {
        "form-check-type-icon-toggle": get2(isCheckbox),
        "form-switch": get2(isToggle)
      });
      set_attribute2(input, "id", `input-${index2() ?? ""}-${name() ?? ""}`);
      set_checked(input, $0);
      set_attribute2(input, "aria-labelledby", `label-${index2() ?? ""}-${name() ?? ""}`);
      set_attribute2(label_1, "for", `input-${index2() ?? ""}-${name() ?? ""}`);
      set_text(text_1, ` ${config()?.label ?? "" ?? ""}`);
    },
    [
      () => ["1", 1, true, "true"].includes($focuspoints()[index2()]?.[name()])
    ]
  );
  delegated("change", input, function change(e) {
    store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = e.currentTarget.checked ? "1" : "0", untrack($focuspoints));
  });
  append($$anchor, div);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
delegate(["change"]);
create_custom_element(Checkbox, { config: {}, index: {}, name: {} }, [], [], { mode: "open" });

// Resources/Private/JavaScript/components/Sidebar.svelte
Sidebar[FILENAME] = "Resources/Private/JavaScript/components/Sidebar.svelte";
var root_15 = add_locations(from_html(`<div class="panel panel-default" data-crop-variant-container="default"><div class="panel-heading" role="tab"><h4 class="panel-title"><button data-bs-toggle="collapse"><span class="caret"></span> <span class="panel-title"> </span></button></h4></div> <div role="tabpanel"><div class="panel-body"><!> <button class="btn btn-danger" name="reset" title="Reset"><!> </button></div></div></div>`), Sidebar[FILENAME], [
  [
    136,
    12,
    [
      [137, 16, [[138, 20, [[139, 24, [[154, 28], [155, 28]]]]]]],
      [161, 16, [[168, 20, [[178, 24]]]]]
    ]
  ]
]);
var root_5 = add_locations(from_html(`<button><!> </button>`), Sidebar[FILENAME], [[193, 12]]);
var root9 = add_locations(from_html(`<div class="modal-panel-sidebar svelte-156mjrz"><div class="panel-group svelte-156mjrz" role="tablist" aria-multiselectable="false"></div> <div class="button-group svelte-156mjrz"><!> <button><!> </button></div></div>`), Sidebar[FILENAME], [[133, 0, [[134, 4], [191, 4, [[203, 8]]]]]]);
var $$css2 = {
  hash: "svelte-156mjrz",
  code: "\n    .modal-panel-sidebar.svelte-156mjrz {\n        display: flex;\n        flex-direction: column;\n        width: 100%;\n        height: 100%;\n        padding-top: 0;\n        min-height: 0;\n        overflow: hidden;\n        --typo3-state-primary-bg: #ff8700;\n        --typo3-component-border-radius: 0;\n        --panel-border-radius: 0;\n    }\n\n    .panel-group.svelte-156mjrz {\n        margin-top: 0;\n        margin-bottom: 0;\n        flex: 1;\n        overflow-y: auto;\n        overflow-x: hidden;\n        min-height: 0;\n    }\n\n    .button-group.svelte-156mjrz {\n        flex-shrink: 0;\n        margin-top: auto;\n        padding: 12px;\n        border-top: 1px solid var(--typo3-state-primary-bg, #ff8700);\n        display: flex;\n        flex-direction: row;\n        flex-wrap: wrap;\n        gap: 8px;\n    }\n\n    .button-group.svelte-156mjrz button:where(.svelte-156mjrz) {\n        flex: 1 1 auto;\n        min-width: 120px;\n    }\n\n    .callout {\n        --typo3-component-border-radius: 4px;\n    }\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lkZWJhci5zdmVsdGUiLCJzb3VyY2VzIjpbIlNpZGViYXIuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG4gICAgaW1wb3J0IHtcbiAgICAgICAgZm9jdXNwb2ludHMsXG4gICAgICAgIGNyZWF0ZU5ld0ZvY3VzcG9pbnQsXG4gICAgICAgIHdpemFyZENvbmZpZ1N0b3JlLFxuICAgICAgICBmb2N1c1BvaW50TmFtZSwgZmllbGRNZWV0c0NvbmRpdGlvbixcbiAgICAgICAgYWN0aXZhdGVGb2N1c3BvaW50LFxuICAgICAgICBTSEFQRVMsIHR5cGUgRm9jdXNwb2ludCxcbiAgICAgICAgZGV0ZWN0aW9uTW9kZSwgZGVhY3RpdmF0ZUFsbEZvY3VzcG9pbnRzXG4gICAgfSBmcm9tICcuLi9zdG9yZS5zdmVsdGUnXG4gICAgaW1wb3J0IHR5cGUge1NoYXBlVHlwZX0gZnJvbSBcIi4uL3N0b3JlLnN2ZWx0ZVwiO1xuICAgIGltcG9ydCBTZWxlY3QgZnJvbSBcIi4vRmllbGRzL1NlbGVjdC5zdmVsdGVcIjtcbiAgICBpbXBvcnQgVGV4dCBmcm9tIFwiLi9GaWVsZHMvVGV4dC5zdmVsdGVcIjtcbiAgICBpbXBvcnQgVGV4dGFyZWEgZnJvbSBcIi4vRmllbGRzL1RleHRhcmVhLnN2ZWx0ZVwiO1xuICAgIGltcG9ydCBMaW5rIGZyb20gXCIuL0ZpZWxkcy9MaW5rLnN2ZWx0ZVwiO1xuICAgIGltcG9ydCBDaGVja2JveCBmcm9tIFwiLi9GaWVsZHMvQ2hlY2tib3guc3ZlbHRlXCI7XG4gICAgaW1wb3J0IEljb24gZnJvbSAnLi9JY29uLnN2ZWx0ZSc7XG5cbiAgICBsZXQgZm9jdXNwb2ludE5hbWUgPSAkZGVyaXZlZCgoZm9jdXNwb2ludDogRm9jdXNwb2ludCwgaW5kZXg6IG51bWJlcikgPT4gZm9jdXNQb2ludE5hbWUoaW5kZXgpKVxuICAgIGxldCBwYW5lbEdyb3VwOiBIVE1MRGl2RWxlbWVudFxuICAgIGZ1bmN0aW9uIGRlbGV0ZUZvY3VzcG9pbnQoaW5kZXg6IG51bWJlcikge1xuICAgICAgICAkZm9jdXNwb2ludHMgPSAkZm9jdXNwb2ludHMuZmlsdGVyKChmb2N1c3BvaW50LCBpKSA9PiBpICE9PSBpbmRleClcbiAgICB9XG5cbiAgICBjb25zdCBjb21wb25lbnRzID0ge1xuICAgICAgICB0ZXh0OiBUZXh0LFxuICAgICAgICB0ZXh0YXJlYTogVGV4dGFyZWEsXG4gICAgICAgIHNlbGVjdDogU2VsZWN0LFxuICAgICAgICBsaW5rOiBMaW5rLFxuICAgICAgICBjaGVja2JveDogQ2hlY2tib3hcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0RmllbGRDb21wb25lbnQodHlwZSA/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0eXBlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHNbdHlwZSBhcyBrZXlvZiB0eXBlb2YgY29tcG9uZW50c10gPz8gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b1NoYXBlVHlwZShrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4ga2V5IGFzIFNoYXBlVHlwZTtcbiAgICB9XG5cbiAgICBjb25zdCB0b2dnbGVEZXRlY3Rpb25Nb2RlID0gKCkgPT4ge1xuICAgICAgICBkZXRlY3Rpb25Nb2RlLnVwZGF0ZSgodmFsdWUpID0+ICF2YWx1ZSk7XG4gICAgICAgIGlmICgkZGV0ZWN0aW9uTW9kZSkge1xuICAgICAgICAgICAgZGVhY3RpdmF0ZUFsbEZvY3VzcG9pbnRzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkZXRlY3Rpb25CdXR0b25DbGFzcyA9ICRkZXJpdmVkKCRkZXRlY3Rpb25Nb2RlID8gJ2J0bi13YXJuaW5nJyA6ICdidG4tc3VjY2VzcycpO1xuICAgIGNvbnN0IGRldGVjdGlvbkJ1dHRvbkljb24gPSAkZGVyaXZlZCgkZGV0ZWN0aW9uTW9kZSA/ICdhY3Rpb25zLWJhbicgOiAnYWN0aW9ucy13YW5kLXNwYXJrbGVzJyk7XG4gICAgY29uc3QgZGV0ZWN0aW9uQnV0dG9uVGV4dCA9ICRkZXJpdmVkKFxuICAgICAgICAkZGV0ZWN0aW9uTW9kZVxuICAgICAgICAgICAgPyAkd2l6YXJkQ29uZmlnU3RvcmU/LmxhbmdbJ3dpemFyZC5zaW5nbGVfcG9pbnQuYnV0dG9uLmRldGVjdGlvbl9tb2RlLnN0b3AnXVxuICAgICAgICAgICAgOiAkd2l6YXJkQ29uZmlnU3RvcmU/LmxhbmdbJ3dpemFyZC5zaW5nbGVfcG9pbnQuYnV0dG9uLmRldGVjdGlvbl9tb2RlLnN0YXJ0J11cbiAgICApXG5cbiAgICAkZWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHBhbmVsR3JvdXApIHtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gKGV2ZW50LnRhcmdldCBhcyBFbGVtZW50KS5jbG9zZXN0KCcucGFuZWwtYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgaWYgKGJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYW5lbCA9IGJ1dHRvbi5jbG9zZXN0KCcucGFuZWwnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYW5lbC5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2VuZCd9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYW5lbEdyb3VwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gcGFuZWxHcm91cC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgICRlZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoJGZvY3VzcG9pbnRzLmxlbmd0aCA+IDAgJiYgcGFuZWxHcm91cCkge1xuICAgICAgICAgICAgY29uc3QgbGFzUGFuZWwgPSBwYW5lbEdyb3VwLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNyb3AtdmFyaWFudC1jb250YWluZXJdOmxhc3Qtb2YtdHlwZScpO1xuICAgICAgICAgICAgaWYgKGxhc1BhbmVsKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxhc1BhbmVsLnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnZW5kJ30pO1xuICAgICAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG48L3NjcmlwdD5cblxuXG48c3R5bGU+XG4gICAgLm1vZGFsLXBhbmVsLXNpZGViYXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwYWRkaW5nLXRvcDogMDtcbiAgICAgICAgbWluLWhlaWdodDogMDtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgLS10eXBvMy1zdGF0ZS1wcmltYXJ5LWJnOiAjZmY4NzAwO1xuICAgICAgICAtLXR5cG8zLWNvbXBvbmVudC1ib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAtLXBhbmVsLWJvcmRlci1yYWRpdXM6IDA7XG4gICAgfVxuXG4gICAgLnBhbmVsLWdyb3VwIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgICAgICBtaW4taGVpZ2h0OiAwO1xuICAgIH1cblxuICAgIC5idXR0b24tZ3JvdXAge1xuICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICAgICAgbWFyZ2luLXRvcDogYXV0bztcbiAgICAgICAgcGFkZGluZzogMTJweDtcbiAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXR5cG8zLXN0YXRlLXByaW1hcnktYmcsICNmZjg3MDApO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAgIGdhcDogOHB4O1xuICAgIH1cblxuICAgIC5idXR0b24tZ3JvdXAgYnV0dG9uIHtcbiAgICAgICAgZmxleDogMSAxIGF1dG87XG4gICAgICAgIG1pbi13aWR0aDogMTIwcHg7XG4gICAgfVxuXG4gICAgOmdsb2JhbCguY2FsbG91dCkge1xuICAgICAgICAtLXR5cG8zLWNvbXBvbmVudC1ib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgfVxuPC9zdHlsZT5cblxuPGRpdiBjbGFzcz1cIm1vZGFsLXBhbmVsLXNpZGViYXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwicGFuZWwtZ3JvdXBcIiByb2xlPVwidGFibGlzdFwiIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwiZmFsc2VcIiBiaW5kOnRoaXM9e3BhbmVsR3JvdXB9PlxuICAgICAgICB7I2VhY2ggJGZvY3VzcG9pbnRzIGFzIGZvY3VzcG9pbnQsIGluZGV4fVxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWRlZmF1bHRcIiBkYXRhLWNyb3AtdmFyaWFudC1jb250YWluZXI9XCJkZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIiByb2xlPVwidGFiXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzcz1cInBhbmVsLXRpdGxlXCIgaWQ9XCJjcm9wcGVyLWFjY29yZGlvbi1oZWFkaW5nLXtpbmRleH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17JGRldGVjdGlvbk1vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkZGV0ZWN0aW9uTW9kZSkgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2YXRlRm9jdXNwb2ludChpbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYnMtdG9nZ2xlPVwiY29sbGFwc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYnMtdGFyZ2V0PVwiI2Nyb3BwZXItY29sbGFwc2Ute2luZGV4fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17Zm9jdXNwb2ludC5hY3RpdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz1cImNyb3BwZXItY29sbGFwc2Ute2luZGV4fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6Y29sbGFwc2VkPXshZm9jdXNwb2ludC5hY3RpdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6c2hvdz17Zm9jdXNwb2ludC5hY3RpdmV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ZGlzYWJsZWQ9eyRkZXRlY3Rpb25Nb2RlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGFuZWwtYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJldFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBhbmVsLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb2N1c3BvaW50TmFtZShmb2N1c3BvaW50LCBpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBpZD1cImNyb3BwZXItY29sbGFwc2Ute2luZGV4fVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGFuZWwtY29sbGFwc2VcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzczpzaG93PXtmb2N1c3BvaW50LmFjdGl2ZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6Y29sbGFwc2U9eyFmb2N1c3BvaW50LmFjdGl2ZX1cbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cInRhYnBhbmVsXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbGxlZGJ5PVwiY3JvcHBlci1hY2NvcmRpb24taGVhZGluZy17aW5kZXh9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7I2VhY2ggT2JqZWN0LmVudHJpZXMoJHdpemFyZENvbmZpZ1N0b3JlLmZpZWxkcykgYXMgW2tleSwgZmllbGRdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsjaWYgZmllbGRNZWV0c0NvbmRpdGlvbihrZXksIGZvY3VzcG9pbnQpICYmIGZpZWxkLnR5cGUgJiYgZmllbGQudHlwZSBpbiBjb21wb25lbnRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7QGNvbnN0IEZpZWxkQ29tcG9uZW50ID0gZ2V0RmllbGRDb21wb25lbnQoZmllbGQudHlwZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsjaWYgRmllbGRDb21wb25lbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RmllbGRDb21wb25lbnQgaW5kZXg9e2luZGV4fSBuYW1lPXtrZXl9IGNvbmZpZz17ZmllbGQgPz8ge319Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey9pZn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7L2lmfVxuICAgICAgICAgICAgICAgICAgICAgICAgey9lYWNofVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIiBuYW1lPVwicmVzZXRcIiB0aXRsZT1cIlJlc2V0XCIgb25jbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZUZvY3VzcG9pbnQoaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT1cImFjdGlvbnMtZGVsZXRlXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHskd2l6YXJkQ29uZmlnU3RvcmU/LmxhbmdbJ3dpemFyZC5zaW5nbGVfcG9pbnQuYnV0dG9uLmRlbGV0ZSddfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIHsvZWFjaH1cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJidXR0b24tZ3JvdXBcIj5cbiAgICAgICAgeyNlYWNoIE9iamVjdC5lbnRyaWVzKFNIQVBFUykgYXMgW2tleV19XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIG10LTNcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzczpkaXNhYmxlZD17JGRldGVjdGlvbk1vZGV9XG4gICAgICAgICAgICAgICAgICAgIG9uY2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZU5ld0ZvY3VzcG9pbnQodG9TaGFwZVR5cGUoa2V5KSlcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9XCJhY3Rpb25zLWFkZFwiLz5cbiAgICAgICAgICAgICAgICB7JHdpemFyZENvbmZpZ1N0b3JlPy5sYW5nW2B3aXphcmQuc2luZ2xlX3BvaW50LmJ1dHRvbi5uZXcuJHtrZXl9YF19XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgey9lYWNofVxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBtdC0zIHtkZXRlY3Rpb25CdXR0b25DbGFzc31cIlxuICAgICAgICAgICAgb25jbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdG9nZ2xlRGV0ZWN0aW9uTW9kZSgpO1xuICAgICAgICB9fT5cbiAgICAgICAgICAgIDxJY29uIG5hbWU9e2RldGVjdGlvbkJ1dHRvbkljb259Lz5cbiAgICAgICAgICAgIHtkZXRlY3Rpb25CdXR0b25UZXh0fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUF5RkEsSUFBSSxtQ0FBb0IsQ0FBQztBQUN6QixRQUFRLGFBQWE7QUFDckIsUUFBUSxzQkFBc0I7QUFDOUIsUUFBUSxXQUFXO0FBQ25CLFFBQVEsWUFBWTtBQUNwQixRQUFRLGNBQWM7QUFDdEIsUUFBUSxhQUFhO0FBQ3JCLFFBQVEsZ0JBQWdCO0FBQ3hCLFFBQVEsaUNBQWlDO0FBQ3pDLFFBQVEsa0NBQWtDO0FBQzFDLFFBQVEsd0JBQXdCO0FBQ2hDOztBQUVBLElBQUksMkJBQVksQ0FBQztBQUNqQixRQUFRLGFBQWE7QUFDckIsUUFBUSxnQkFBZ0I7QUFDeEIsUUFBUSxPQUFPO0FBQ2YsUUFBUSxnQkFBZ0I7QUFDeEIsUUFBUSxrQkFBa0I7QUFDMUIsUUFBUSxhQUFhO0FBQ3JCOztBQUVBLElBQUksNEJBQWEsQ0FBQztBQUNsQixRQUFRLGNBQWM7QUFDdEIsUUFBUSxnQkFBZ0I7QUFDeEIsUUFBUSxhQUFhO0FBQ3JCLFFBQVEsNERBQTREO0FBQ3BFLFFBQVEsYUFBYTtBQUNyQixRQUFRLG1CQUFtQjtBQUMzQixRQUFRLGVBQWU7QUFDdkIsUUFBUSxRQUFRO0FBQ2hCOztBQUVBLElBQUksNEJBQWEsQ0FBQyw2QkFBTSxDQUFDO0FBQ3pCLFFBQVEsY0FBYztBQUN0QixRQUFRLGdCQUFnQjtBQUN4Qjs7QUFFQSxJQUFZLFFBQVMsQ0FBQztBQUN0QixRQUFRLG9DQUFvQztBQUM1QzsifQ== */"
};
function Sidebar($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Sidebar);
  append_styles($$anchor, $$css2);
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const $detectionMode = () => (validate_store(detectionMode, "detectionMode"), store_get(detectionMode, "$detectionMode", $$stores));
  const $wizardConfigStore = () => (validate_store(wizardConfigStore, "wizardConfigStore"), store_get(wizardConfigStore, "$wizardConfigStore", $$stores));
  const [$$stores, $$cleanup] = setup_stores();
  let focuspointName = tag(user_derived(() => (focuspoint, index2) => focusPointName(index2)), "focuspointName");
  let panelGroup;
  function deleteFocuspoint(index2) {
    store_set(focuspoints, $focuspoints().filter((focuspoint, i) => strict_equals(i, index2, false)));
  }
  const components = {
    text: Text2,
    textarea: Textarea,
    select: Select,
    link: Link,
    checkbox: Checkbox
  };
  function getFieldComponent(type) {
    if (!type) return null;
    return components[type] ?? null;
  }
  function toShapeType(key2) {
    return key2;
  }
  const toggleDetectionMode = () => {
    detectionMode.update((value) => !value);
    if ($detectionMode()) {
      deactivateAllFocuspoints();
    }
  };
  const detectionButtonClass = tag(user_derived(() => $detectionMode() ? "btn-warning" : "btn-success"), "detectionButtonClass");
  const detectionButtonIcon = tag(user_derived(() => $detectionMode() ? "actions-ban" : "actions-wand-sparkles"), "detectionButtonIcon");
  const detectionButtonText = tag(
    user_derived(() => $detectionMode() ? $wizardConfigStore()?.lang["wizard.single_point.button.detection_mode.stop"] : $wizardConfigStore()?.lang["wizard.single_point.button.detection_mode.start"]),
    "detectionButtonText"
  );
  user_effect(() => {
    if (panelGroup) {
      const handler = (event2) => {
        const button = event2.target.closest(".panel-button");
        if (button) {
          const panel = button.closest(".panel");
          if (panel) {
            setTimeout(
              () => {
                panel.scrollIntoView({ behavior: "smooth", block: "end" });
              },
              100
            );
          }
        }
      };
      panelGroup.addEventListener("click", handler);
      return () => panelGroup.removeEventListener("click", handler);
    }
  });
  user_effect(() => {
    if ($focuspoints().length > 0 && panelGroup) {
      const lasPanel = panelGroup.querySelector("[data-crop-variant-container]:last-of-type");
      if (lasPanel) {
        setTimeout(
          () => {
            lasPanel.scrollIntoView({ behavior: "smooth", block: "end" });
          },
          100
        );
      }
    }
  });
  var $$exports = { ...legacy_api() };
  var div = root9();
  var div_1 = child(div);
  add_svelte_meta(
    () => each(div_1, 5, $focuspoints, index, ($$anchor2, focuspoint, index2) => {
      var div_2 = root_15();
      var div_3 = child(div_2);
      var h4 = child(div_3);
      set_attribute2(h4, "id", `cropper-accordion-heading-${index2}`);
      var button_1 = child(h4);
      set_attribute2(button_1, "data-bs-target", `#cropper-collapse-${index2}`);
      set_attribute2(button_1, "aria-controls", `cropper-collapse-${index2}`);
      let classes;
      var span = sibling(child(button_1), 2);
      var text2 = child(span, true);
      reset(span);
      reset(button_1);
      reset(h4);
      reset(div_3);
      var div_4 = sibling(div_3, 2);
      set_attribute2(div_4, "id", `cropper-collapse-${index2}`);
      let classes_1;
      set_attribute2(div_4, "aria-labelledby", `cropper-accordion-heading-${index2}`);
      var div_5 = child(div_4);
      var node = child(div_5);
      add_svelte_meta(
        () => each(node, 1, () => Object.entries($wizardConfigStore().fields), index, ($$anchor3, $$item) => {
          var $$array = user_derived(() => to_array(get2($$item), 2));
          let key2 = () => get2($$array)[0];
          key2();
          let field = () => get2($$array)[1];
          field();
          var fragment = comment();
          var node_1 = first_child(fragment);
          {
            var consequent_1 = ($$anchor4) => {
              const FieldComponent = tag(user_derived(() => getFieldComponent(field().type)), "FieldComponent");
              get2(FieldComponent);
              var fragment_1 = comment();
              var node_2 = first_child(fragment_1);
              {
                var consequent = ($$anchor5) => {
                  var fragment_2 = comment();
                  var node_3 = first_child(fragment_2);
                  {
                    let $0 = user_derived(() => field() ?? {});
                    add_svelte_meta(
                      () => component(node_3, () => get2(FieldComponent), ($$anchor6, FieldComponent_1) => {
                        FieldComponent_1($$anchor6, {
                          index: index2,
                          get name() {
                            return key2();
                          },
                          get config() {
                            return get2($0);
                          }
                        });
                      }),
                      "component",
                      Sidebar,
                      173,
                      36,
                      { componentTag: "FieldComponent" }
                    );
                  }
                  append($$anchor5, fragment_2);
                };
                add_svelte_meta(
                  () => if_block(node_2, ($$render) => {
                    if (get2(FieldComponent)) $$render(consequent);
                  }),
                  "if",
                  Sidebar,
                  172,
                  32
                );
              }
              append($$anchor4, fragment_1);
            };
            var d = user_derived(() => fieldMeetsCondition(key2(), get2(focuspoint)) && field().type && field().type in components);
            add_svelte_meta(
              () => if_block(node_1, ($$render) => {
                if (get2(d)) $$render(consequent_1);
              }),
              "if",
              Sidebar,
              170,
              28
            );
          }
          append($$anchor3, fragment);
        }),
        "each",
        Sidebar,
        169,
        24
      );
      var button_2 = sibling(node, 2);
      var node_4 = child(button_2);
      add_svelte_meta(() => Icon(node_4, { name: "actions-delete" }), "component", Sidebar, 182, 28, { componentTag: "Icon" });
      var text_1 = sibling(node_4);
      reset(button_2);
      reset(div_5);
      reset(div_4);
      reset(div_2);
      template_effect(
        ($0) => {
          button_1.disabled = $detectionMode();
          set_attribute2(button_1, "aria-expanded", get2(focuspoint).active);
          classes = set_class(button_1, 1, "panel-button", null, classes, {
            collapsed: !get2(focuspoint).active,
            show: get2(focuspoint).active,
            disabled: $detectionMode()
          });
          set_text(text2, $0);
          classes_1 = set_class(div_4, 1, "panel-collapse", null, classes_1, {
            show: get2(focuspoint).active,
            collapse: !get2(focuspoint).active
          });
          set_text(text_1, ` ${$wizardConfigStore()?.lang["wizard.single_point.button.delete"] ?? ""}`);
        },
        [() => get2(focuspointName)(get2(focuspoint), index2)]
      );
      delegated("click", button_1, function click(e) {
        e.preventDefault();
        if ($detectionMode()) return;
        activateFocuspoint(index2);
      });
      delegated("click", button_2, function click_1(e) {
        e.preventDefault();
        deleteFocuspoint(index2);
      });
      append($$anchor2, div_2);
    }),
    "each",
    Sidebar,
    135,
    8
  );
  reset(div_1);
  bind_this(div_1, ($$value) => panelGroup = $$value, () => panelGroup);
  var div_6 = sibling(div_1, 2);
  var node_5 = child(div_6);
  add_svelte_meta(
    () => each(node_5, 17, () => Object.entries(SHAPES), index, ($$anchor2, $$item) => {
      var $$array_1 = user_derived(() => to_array(get2($$item), 1));
      let key2 = () => get2($$array_1)[0];
      key2();
      var button_3 = root_5();
      let classes_2;
      var node_6 = child(button_3);
      add_svelte_meta(() => Icon(node_6, { name: "actions-add" }), "component", Sidebar, 199, 16, { componentTag: "Icon" });
      var text_2 = sibling(node_6);
      reset(button_3);
      template_effect(() => {
        classes_2 = set_class(button_3, 1, "btn btn-success mt-3 svelte-156mjrz", null, classes_2, { disabled: $detectionMode() });
        set_text(text_2, ` ${$wizardConfigStore()?.lang[`wizard.single_point.button.new.${key2()}`] ?? ""}`);
      });
      delegated("click", button_3, function click_2(e) {
        e.preventDefault();
        createNewFocuspoint(toShapeType(key2()));
      });
      append($$anchor2, button_3);
    }),
    "each",
    Sidebar,
    192,
    8
  );
  var button_4 = sibling(node_5, 2);
  var node_7 = child(button_4);
  add_svelte_meta(
    () => Icon(node_7, {
      get name() {
        return get2(detectionButtonIcon);
      }
    }),
    "component",
    Sidebar,
    209,
    12,
    { componentTag: "Icon" }
  );
  var text_3 = sibling(node_7);
  reset(button_4);
  reset(div_6);
  reset(div);
  template_effect(() => {
    set_class(button_4, 1, `btn mt-3 ${get2(detectionButtonClass) ?? ""}`, "svelte-156mjrz");
    set_text(text_3, ` ${get2(detectionButtonText) ?? ""}`);
  });
  delegated("click", button_4, function click_3(e) {
    e.preventDefault();
    toggleDetectionMode();
  });
  append($$anchor, div);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
delegate(["click"]);
create_custom_element(Sidebar, {}, [], [], { mode: "open" });

// Resources/Private/JavaScript/FocuspointWizard.svelte
import interact2 from "interactjs";

// Resources/Private/JavaScript/components/Settings.svelte
import Notification2 from "@typo3/backend/notification.js";
Settings[FILENAME] = "Resources/Private/JavaScript/components/Settings.svelte";
var root10 = add_locations(from_html(`<div class="d-flex justify-content-center align-items-center wrapper svelte-10s059u"><fieldset class="form-section svelte-10s059u"><div class="d-flex justify-content-between"><h3 class="form-section-headline"> </h3> <button aria-label="Close settings" class="btn-close svelte-10s059u"><!> <span class="visually-hidden"> </span></button></div> <div class="row"><label for="points">Import / Export</label> <div class="form-group"><textarea id="points" rows="10" cols="50"></textarea> <div class="d-flex justify-content-between"><div><button class="btn btn-default"><!> </button> <button class="btn btn-default"><!> </button></div> <div><button class="btn btn-default"><!> </button> <button class="btn btn-primary"><!> </button></div></div></div></div></fieldset></div>`), Settings[FILENAME], [
  [
    74,
    0,
    [
      [
        76,
        4,
        [
          [77, 8, [[78, 12], [79, 12, [[81, 16]]]]],
          [
            84,
            8,
            [
              [85, 12],
              [
                86,
                12,
                [
                  [87, 20],
                  [
                    96,
                    16,
                    [
                      [97, 20, [[98, 24], [101, 24]]],
                      [105, 20, [[106, 24], [109, 24]]]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
]);
var $$css3 = {
  hash: "svelte-10s059u",
  code: "\n    .wrapper.svelte-10s059u {\n        grid-column: 1 / 4;\n    }\n\n    .btn-close.svelte-10s059u {\n        background: transparent;\n        border: none;\n        height: fit-content;\n        padding-top: 0;\n        color: var(--icon-color-primary, currentColor)\n    }\n\n    fieldset.svelte-10s059u {\n        width: 600px;\n        border: solid var(--typo3-form-section-border-width) var(--typo3-form-section-border-color);\n        padding: 1rem 1rem;\n        border-radius: var(--typo3-component-border-radius);\n    }\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3Muc3ZlbHRlIiwic291cmNlcyI6WyJTZXR0aW5ncy5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgICBpbXBvcnQge2ZvY3VzcG9pbnRzLCB3aXphcmRDb25maWdTdG9yZX0gZnJvbSAnLi4vc3RvcmUuc3ZlbHRlJztcbiAgICBpbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gXCJAdHlwbzMvYmFja2VuZC9ub3RpZmljYXRpb24uanNcIjtcbiAgICBpbXBvcnQgSWNvbiBmcm9tIFwiLi9JY29uLnN2ZWx0ZVwiO1xuXG4gICAgbGV0IHtpdGVtRm9ybUVsTmFtZSwgaXNTZXR0aW5nc09wZW5WYWx1ZSA9ICRiaW5kYWJsZSgpfSA9ICRwcm9wcygpXG4gICAgbGV0IGZvY3VzcG9pbnRBcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIGxldCBqc29uUG9pbnRzID0gJHN0YXRlKEpTT04uc3RyaW5naWZ5KCRmb2N1c3BvaW50cywgbnVsbCwgXCJcXHRcIikpO1xuICAgIGxldCBoYXNFcnJvciA9ICRzdGF0ZShmYWxzZSlcbiAgICBsZXQgaGFzQ2hhbmdlID0gJHN0YXRlKGZhbHNlKVxuXG4gICAgJGVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBKU09OLnBhcnNlKGpzb25Qb2ludHMpXG4gICAgICAgICAgICBoYXNFcnJvciA9IGZhbHNlXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGhhc0Vycm9yID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgaGFzQ2hhbmdlID0ganNvblBvaW50cyAhPT0gSlNPTi5zdHJpbmdpZnkoJGZvY3VzcG9pbnRzKVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gb25Db3B5QnV0dG9uQ2xpY2soKSB7XG4gICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGZvY3VzcG9pbnRBcmVhLnZhbHVlKTtcblxuICAgICAgICBOb3RpZmljYXRpb24uc3VjY2VzcyhcbiAgICAgICAgICAgICAgICAkd2l6YXJkQ29uZmlnU3RvcmU/LmxhbmdbJ3dpemFyZC5zZXR0aW5ncy5jb3BpZWQnXSxcbiAgICAgICAgICAgICAgICAkd2l6YXJkQ29uZmlnU3RvcmU/LmxhbmdbJ3dpemFyZC5zZXR0aW5ncy5jb3BpZWQubWVzc2FnZSddLFxuICAgICAgICAgICAgICAgIDNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhc3RlQnV0dG9uQ2xpY2soKSB7XG4gICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKS50aGVuKHRleHQgPT4ge1xuICAgICAgICAgICAganNvblBvaW50cyA9IHRleHRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25VbmRvQnV0dG9uQ2xpY2soKSB7XG4gICAgICAgIGpzb25Qb2ludHMgPSBKU09OLnN0cmluZ2lmeSgkZm9jdXNwb2ludHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uU2F2ZUJ1dHRvbkNsaWNrKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgJGZvY3VzcG9pbnRzID0gSlNPTi5wYXJzZShqc29uUG9pbnRzKTtcbiAgICAgICAgICAgIHdpbmRvdy5wYXJlbnQuZnJhbWVzLmxpc3RfZnJhbWUuZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoYCR7aXRlbUZvcm1FbE5hbWV9LXNldHRpbmdzYCwge30pKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBOb3RpZmljYXRpb24uZXJyb3IoJ0Vycm9yJywgJ0ludmFsaWQgSlNPTicsIDUpO1xuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgICAud3JhcHBlciB7XG4gICAgICAgIGdyaWQtY29sdW1uOiAxIC8gNDtcbiAgICB9XG5cbiAgICAuYnRuLWNsb3NlIHtcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgaGVpZ2h0OiBmaXQtY29udGVudDtcbiAgICAgICAgcGFkZGluZy10b3A6IDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pY29uLWNvbG9yLXByaW1hcnksIGN1cnJlbnRDb2xvcilcbiAgICB9XG5cbiAgICBmaWVsZHNldCB7XG4gICAgICAgIHdpZHRoOiA2MDBweDtcbiAgICAgICAgYm9yZGVyOiBzb2xpZCB2YXIoLS10eXBvMy1mb3JtLXNlY3Rpb24tYm9yZGVyLXdpZHRoKSB2YXIoLS10eXBvMy1mb3JtLXNlY3Rpb24tYm9yZGVyLWNvbG9yKTtcbiAgICAgICAgcGFkZGluZzogMXJlbSAxcmVtO1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS10eXBvMy1jb21wb25lbnQtYm9yZGVyLXJhZGl1cyk7XG4gICAgfVxuPC9zdHlsZT5cblxuPGRpdiBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciB3cmFwcGVyXCI+XG5cbiAgICA8ZmllbGRzZXQgY2xhc3M9XCJmb3JtLXNlY3Rpb25cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiZm9ybS1zZWN0aW9uLWhlYWRsaW5lXCI+eyR3aXphcmRDb25maWdTdG9yZT8ubGFuZ1snd2l6YXJkLmJ1dHRvbi5zZXR0aW5ncyddfTwvaDM+XG4gICAgICAgICAgICA8YnV0dG9uIG9uY2xpY2s9eygpID0+IGlzU2V0dGluZ3NPcGVuVmFsdWUgPSBmYWxzZX0gYXJpYS1sYWJlbD1cIkNsb3NlIHNldHRpbmdzXCIgY2xhc3M9XCJidG4tY2xvc2VcIj5cbiAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwiYWN0aW9ucy1jbG9zZVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2aXN1YWxseS1oaWRkZW5cIj57JHdpemFyZENvbmZpZ1N0b3JlPy5sYW5nWyd3aXphcmQuYnV0dG9uLmNhbmNlbCddfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiIGNsYXNzOmhhcy1lcnJvcj17aGFzRXJyb3J9IGNsYXNzOmhhcy1jaGFuZ2U9e2hhc0NoYW5nZX0gZm9yPVwicG9pbnRzXCI+SW1wb3J0IC8gRXhwb3J0PC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIHQzanMtZm9ybWVuZ2luZS10ZXh0YXJlYSBmb3JtZW5naW5lLXRleHRhcmVhIG1iLTNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQ6dGhpcz17Zm9jdXNwb2ludEFyZWF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZDp2YWx1ZT17anNvblBvaW50c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczpoYXMtZXJyb3I9e2hhc0Vycm9yfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOmhhcy1jaGFuZ2U9e2hhc0NoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cInBvaW50c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cz1cIjEwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzPVwiNTBcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBvbmNsaWNrPXtvbkNvcHlCdXR0b25DbGlja30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT1cImFjdGlvbnMtY2xpcGJvYXJkXCIgLz4geyR3aXphcmRDb25maWdTdG9yZT8ubGFuZ1snd2l6YXJkLmJ1dHRvbi5jb3B5J119XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiBvbmNsaWNrPXtvblBhc3RlQnV0dG9uQ2xpY2t9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9XCJhY3Rpb25zLWNsaXBib2FyZC1wYXN0ZVwiIC8+IHskd2l6YXJkQ29uZmlnU3RvcmU/LmxhbmdbJ3dpemFyZC5idXR0b24ucGFzdGUnXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gZGlzYWJsZWQ9eyFoYXNDaGFuZ2V9IGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25jbGljaz17b25VbmRvQnV0dG9uQ2xpY2t9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9XCJhY3Rpb25zLXVuZG9cIiAvPiB7JHdpemFyZENvbmZpZ1N0b3JlPy5sYW5nWyd3aXphcmQuYnV0dG9uLnVuZG8nXX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkaXNhYmxlZD17IWhhc0NoYW5nZSB8fCBoYXNFcnJvcn0gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBvbmNsaWNrPXtvblNhdmVCdXR0b25DbGlja30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT1cImFjdGlvbnMtY2hlY2tcIiAvPiB7JHdpemFyZENvbmZpZ1N0b3JlPy5sYW5nWyd3aXphcmQuYnV0dG9uLmFjY2VwdCddfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZmllbGRzZXQ+XG48L2Rpdj5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBcURBLElBQUksdUJBQVEsQ0FBQztBQUNiLFFBQVEsa0JBQWtCO0FBQzFCOztBQUVBLElBQUkseUJBQVUsQ0FBQztBQUNmLFFBQVEsdUJBQXVCO0FBQy9CLFFBQVEsWUFBWTtBQUNwQixRQUFRLG1CQUFtQjtBQUMzQixRQUFRLGNBQWM7QUFDdEIsUUFBUTtBQUNSLElBQUk7O0FBRUosSUFBSSx1QkFBUSxDQUFDO0FBQ2IsUUFBUSxZQUFZO0FBQ3BCLFFBQVEsMkZBQTJGO0FBQ25HLFFBQVEsa0JBQWtCO0FBQzFCLFFBQVEsbURBQW1EO0FBQzNEOyJ9 */"
};
function Settings($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Settings);
  append_styles($$anchor, $$css3);
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const $wizardConfigStore = () => (validate_store(wizardConfigStore, "wizardConfigStore"), store_get(wizardConfigStore, "$wizardConfigStore", $$stores));
  const [$$stores, $$cleanup] = setup_stores();
  let itemFormElName = prop($$props, "itemFormElName", 7), isSettingsOpenValue = prop($$props, "isSettingsOpenValue", 15);
  let focuspointArea;
  let jsonPoints = tag(state(proxy(JSON.stringify($focuspoints(), null, "	"))), "jsonPoints");
  let hasError = tag(state(false), "hasError");
  let hasChange = tag(state(false), "hasChange");
  user_effect(() => {
    try {
      JSON.parse(get2(jsonPoints));
      set(hasError, false);
    } catch (e) {
      set(hasError, true);
    }
    set(hasChange, strict_equals(get2(jsonPoints), JSON.stringify($focuspoints()), false));
  });
  function onCopyButtonClick() {
    navigator.clipboard.writeText(focuspointArea.value);
    Notification2.success($wizardConfigStore()?.lang["wizard.settings.copied"], $wizardConfigStore()?.lang["wizard.settings.copied.message"], 3);
  }
  function onPasteButtonClick() {
    navigator.clipboard.readText().then((text2) => {
      set(jsonPoints, text2, true);
    });
  }
  function onUndoButtonClick() {
    set(jsonPoints, JSON.stringify($focuspoints()), true);
  }
  function onSaveButtonClick() {
    try {
      store_set(focuspoints, JSON.parse(get2(jsonPoints)));
      window.parent.frames.list_frame.document.dispatchEvent(new CustomEvent(`${itemFormElName()}-settings`, {}));
    } catch (e) {
      Notification2.error("Error", "Invalid JSON", 5);
    }
  }
  var $$exports = {
    ...legacy_api(),
    get itemFormElName() {
      return itemFormElName();
    },
    set itemFormElName($$value) {
      itemFormElName($$value);
      flushSync();
    },
    get isSettingsOpenValue() {
      return isSettingsOpenValue();
    },
    set isSettingsOpenValue($$value) {
      isSettingsOpenValue($$value);
      flushSync();
    }
  };
  var div = root10();
  var fieldset = child(div);
  var div_1 = child(fieldset);
  var h3 = child(div_1);
  var text_1 = child(h3, true);
  reset(h3);
  var button = sibling(h3, 2);
  var node = child(button);
  add_svelte_meta(() => Icon(node, { name: "actions-close" }), "component", Settings, 80, 16, { componentTag: "Icon" });
  var span = sibling(node, 2);
  var text_2 = child(span, true);
  reset(span);
  reset(button);
  reset(div_1);
  var div_2 = sibling(div_1, 2);
  var label = child(div_2);
  let classes;
  var div_3 = sibling(label, 2);
  var textarea = child(div_3);
  remove_textarea_child(textarea);
  let classes_1;
  bind_this(textarea, ($$value) => focuspointArea = $$value, () => focuspointArea);
  var div_4 = sibling(textarea, 2);
  var div_5 = child(div_4);
  var button_1 = child(div_5);
  var node_1 = child(button_1);
  add_svelte_meta(() => Icon(node_1, { name: "actions-clipboard" }), "component", Settings, 99, 28, { componentTag: "Icon" });
  var text_3 = sibling(node_1);
  reset(button_1);
  var button_2 = sibling(button_1, 2);
  var node_2 = child(button_2);
  add_svelte_meta(() => Icon(node_2, { name: "actions-clipboard-paste" }), "component", Settings, 102, 28, { componentTag: "Icon" });
  var text_4 = sibling(node_2);
  reset(button_2);
  reset(div_5);
  var div_6 = sibling(div_5, 2);
  var button_3 = child(div_6);
  var node_3 = child(button_3);
  add_svelte_meta(() => Icon(node_3, { name: "actions-undo" }), "component", Settings, 107, 28, { componentTag: "Icon" });
  var text_5 = sibling(node_3);
  reset(button_3);
  var button_4 = sibling(button_3, 2);
  var node_4 = child(button_4);
  add_svelte_meta(() => Icon(node_4, { name: "actions-check" }), "component", Settings, 110, 28, { componentTag: "Icon" });
  var text_6 = sibling(node_4);
  reset(button_4);
  reset(div_6);
  reset(div_4);
  reset(div_3);
  reset(div_2);
  reset(fieldset);
  reset(div);
  template_effect(() => {
    set_text(text_1, $wizardConfigStore()?.lang["wizard.button.settings"]);
    set_text(text_2, $wizardConfigStore()?.lang["wizard.button.cancel"]);
    classes = set_class(label, 1, "form-label", null, classes, { "has-error": get2(hasError), "has-change": get2(hasChange) });
    classes_1 = set_class(textarea, 1, "form-control t3js-formengine-textarea formengine-textarea mb-3", null, classes_1, { "has-error": get2(hasError), "has-change": get2(hasChange) });
    set_text(text_3, ` ${$wizardConfigStore()?.lang["wizard.button.copy"] ?? ""}`);
    set_text(text_4, ` ${$wizardConfigStore()?.lang["wizard.button.paste"] ?? ""}`);
    button_3.disabled = !get2(hasChange);
    set_text(text_5, ` ${$wizardConfigStore()?.lang["wizard.button.undo"] ?? ""}`);
    button_4.disabled = !get2(hasChange) || get2(hasError);
    set_text(text_6, ` ${$wizardConfigStore()?.lang["wizard.button.accept"] ?? ""}`);
  });
  delegated("click", button, function click() {
    return isSettingsOpenValue(false);
  });
  bind_value(
    textarea,
    function get3() {
      return get2(jsonPoints);
    },
    function set2($$value) {
      set(jsonPoints, $$value);
    }
  );
  delegated("click", button_1, onCopyButtonClick);
  delegated("click", button_2, onPasteButtonClick);
  delegated("click", button_3, onUndoButtonClick);
  delegated("click", button_4, onSaveButtonClick);
  append($$anchor, div);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
delegate(["click"]);
create_custom_element(Settings, { itemFormElName: {}, isSettingsOpenValue: {} }, [], [], { mode: "open" });

// Resources/Private/JavaScript/components/DetectionModeIndicator.svelte
DetectionModeIndicator[FILENAME] = "Resources/Private/JavaScript/components/DetectionModeIndicator.svelte";
var root11 = add_locations(from_html(`<div class="detection-mode-indicator svelte-uvf34u"><span class="detection-mode-indicator-inner svelte-uvf34u"> <span class="help-icon svelte-uvf34u"><!></span></span></div>`), DetectionModeIndicator[FILENAME], [[52, 0, [[53, 4, [[55, 8]]]]]]);
var $$css4 = {
  hash: "svelte-uvf34u",
  code: "\n    .detection-mode-indicator.svelte-uvf34u {\n        --indicator-font-size: .75rem;\n        --indicator-color: white;\n        --indicator-bg: #6E00B3;\n        --indicator-height: calc(var(--indicator-badge-height) * 0.75);\n        --indicator-badge-padding-x: .75rem;\n        --indicator-badge-padding-y: .05rem;\n        --indicator-badge-height:\n            calc(var(--indicator-font-size) + var(--indicator-badge-padding-y) * 2);\n        display: block;\n        position: relative;\n        color: var(--indicator-color);\n        height: var(--indicator-height);\n        background-color: var(--indicator-bg);\n        font-size: var(--indicator-font-size);\n        line-height: 1;\n        user-select: none;\n        transition: margin-top .25s ease-out, background-color .25s ease-out, color .25s ease-out, display allow-discrete .25s ease-out;\n    }\n\n    .detection-mode-indicator-inner.svelte-uvf34u {\n        position: absolute;\n        top: 0;\n        left: var(--indicator-badge-padding-x);\n        right: var(--indicator-badge-padding-x);\n        width: fit-content;\n        max-width: calc(100% - var(--indicator-badge-padding-x) * 2);\n        margin-inline: auto;\n        box-sizing: border-box;\n        padding:  var(--indicator-badge-padding-y)  var(--indicator-badge-padding-x);\n        border-radius: 0 0 0.5rem 0.5rem;\n        background-color: inherit;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        overflow: hidden;\n        transition: background-color .25s ease-out;\n\n        .help-icon:where(.svelte-uvf34u) {\n            cursor: help;\n        }\n    }\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGV0ZWN0aW9uTW9kZUluZGljYXRvci5zdmVsdGUiLCJzb3VyY2VzIjpbIkRldGVjdGlvbk1vZGVJbmRpY2F0b3Iuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgbGFuZz1cInRzXCI+XG4gICAgaW1wb3J0IHt3aXphcmRDb25maWdTdG9yZX0gZnJvbSBcIi4uL3N0b3JlLnN2ZWx0ZVwiO1xuICAgIGltcG9ydCBJY29uIGZyb20gXCIuL0ljb24uc3ZlbHRlXCI7XG5cbiAgICAgbGV0IGxhbmdEZXRlY3Rpb25Nb2RlID0gJGRlcml2ZWQoJHdpemFyZENvbmZpZ1N0b3JlPy5sYW5nWyd3aXphcmQuZGV0ZWN0aW9uX21vZGUnXSA/PyAnRGV0ZWN0aW9uIE1vZGUnKTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gICAgLmRldGVjdGlvbi1tb2RlLWluZGljYXRvciB7XG4gICAgICAgIC0taW5kaWNhdG9yLWZvbnQtc2l6ZTogLjc1cmVtO1xuICAgICAgICAtLWluZGljYXRvci1jb2xvcjogd2hpdGU7XG4gICAgICAgIC0taW5kaWNhdG9yLWJnOiAjNkUwMEIzO1xuICAgICAgICAtLWluZGljYXRvci1oZWlnaHQ6IGNhbGModmFyKC0taW5kaWNhdG9yLWJhZGdlLWhlaWdodCkgKiAwLjc1KTtcbiAgICAgICAgLS1pbmRpY2F0b3ItYmFkZ2UtcGFkZGluZy14OiAuNzVyZW07XG4gICAgICAgIC0taW5kaWNhdG9yLWJhZGdlLXBhZGRpbmcteTogLjA1cmVtO1xuICAgICAgICAtLWluZGljYXRvci1iYWRnZS1oZWlnaHQ6XG4gICAgICAgICAgICBjYWxjKHZhcigtLWluZGljYXRvci1mb250LXNpemUpICsgdmFyKC0taW5kaWNhdG9yLWJhZGdlLXBhZGRpbmcteSkgKiAyKTtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgY29sb3I6IHZhcigtLWluZGljYXRvci1jb2xvcik7XG4gICAgICAgIGhlaWdodDogdmFyKC0taW5kaWNhdG9yLWhlaWdodCk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWluZGljYXRvci1iZyk7XG4gICAgICAgIGZvbnQtc2l6ZTogdmFyKC0taW5kaWNhdG9yLWZvbnQtc2l6ZSk7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxO1xuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgdHJhbnNpdGlvbjogbWFyZ2luLXRvcCAuMjVzIGVhc2Utb3V0LCBiYWNrZ3JvdW5kLWNvbG9yIC4yNXMgZWFzZS1vdXQsIGNvbG9yIC4yNXMgZWFzZS1vdXQsIGRpc3BsYXkgYWxsb3ctZGlzY3JldGUgLjI1cyBlYXNlLW91dDtcbiAgICB9XG5cbiAgICAuZGV0ZWN0aW9uLW1vZGUtaW5kaWNhdG9yLWlubmVyIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IHZhcigtLWluZGljYXRvci1iYWRnZS1wYWRkaW5nLXgpO1xuICAgICAgICByaWdodDogdmFyKC0taW5kaWNhdG9yLWJhZGdlLXBhZGRpbmcteCk7XG4gICAgICAgIHdpZHRoOiBmaXQtY29udGVudDtcbiAgICAgICAgbWF4LXdpZHRoOiBjYWxjKDEwMCUgLSB2YXIoLS1pbmRpY2F0b3ItYmFkZ2UtcGFkZGluZy14KSAqIDIpO1xuICAgICAgICBtYXJnaW4taW5saW5lOiBhdXRvO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBwYWRkaW5nOiAgdmFyKC0taW5kaWNhdG9yLWJhZGdlLXBhZGRpbmcteSkgIHZhcigtLWluZGljYXRvci1iYWRnZS1wYWRkaW5nLXgpO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwIDAgMC41cmVtIDAuNXJlbTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgLjI1cyBlYXNlLW91dDtcblxuICAgICAgICAuaGVscC1pY29uIHtcbiAgICAgICAgICAgIGN1cnNvcjogaGVscDtcbiAgICAgICAgfVxuICAgIH1cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJkZXRlY3Rpb24tbW9kZS1pbmRpY2F0b3JcIj5cbiAgICA8c3BhbiBjbGFzcz1cImRldGVjdGlvbi1tb2RlLWluZGljYXRvci1pbm5lclwiPlxuICAgICAgICB7bGFuZ0RldGVjdGlvbk1vZGV9XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1pY29uXCI+PEljb24gbmFtZT1cImFjdGlvbnMtcXVlc3Rpb24tY2lyY2xlXCIgLz48L3NwYW4+XG4gICAgICAgIDwhLS0gQHRvZG8gYWRkIHBvcG92ZXIgb3Igc29tZXRoaW5nIGxpa2UgdGhhdCB0byBleHBsYWluIHdoYXQgZGV0ZWN0aW9uIG1vZGUgaXMgYW5kIGhvdyBpdHMgd29ya3MgLS0+XG4gICAgPC9zcGFuPlxuPC9kaXY+XG5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBUUEsSUFBSSx1Q0FBeUIsQ0FBQztBQUM5QixRQUFRLDZCQUE2QjtBQUNyQyxRQUFRLHdCQUF3QjtBQUNoQyxRQUFRLHVCQUF1QjtBQUMvQixRQUFRLDhEQUE4RDtBQUN0RSxRQUFRLG1DQUFtQztBQUMzQyxRQUFRLG1DQUFtQztBQUMzQyxRQUFRO0FBQ1IsbUZBQW1GO0FBQ25GLFFBQVEsY0FBYztBQUN0QixRQUFRLGtCQUFrQjtBQUMxQixRQUFRLDZCQUE2QjtBQUNyQyxRQUFRLCtCQUErQjtBQUN2QyxRQUFRLHFDQUFxQztBQUM3QyxRQUFRLHFDQUFxQztBQUM3QyxRQUFRLGNBQWM7QUFDdEIsUUFBUSxpQkFBaUI7QUFDekIsUUFBUSwrSEFBK0g7QUFDdkk7O0FBRUEsSUFBSSw2Q0FBK0IsQ0FBQztBQUNwQyxRQUFRLGtCQUFrQjtBQUMxQixRQUFRLE1BQU07QUFDZCxRQUFRLHNDQUFzQztBQUM5QyxRQUFRLHVDQUF1QztBQUMvQyxRQUFRLGtCQUFrQjtBQUMxQixRQUFRLDREQUE0RDtBQUNwRSxRQUFRLG1CQUFtQjtBQUMzQixRQUFRLHNCQUFzQjtBQUM5QixRQUFRLDRFQUE0RTtBQUNwRixRQUFRLGdDQUFnQztBQUN4QyxRQUFRLHlCQUF5QjtBQUNqQyxRQUFRLHVCQUF1QjtBQUMvQixRQUFRLG1CQUFtQjtBQUMzQixRQUFRLGdCQUFnQjtBQUN4QixRQUFRLDBDQUEwQzs7QUFFbEQsUUFBUSxnQ0FBVSxDQUFDO0FBQ25CLFlBQVksWUFBWTtBQUN4QjtBQUNBOyJ9 */"
};
function DetectionModeIndicator($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, DetectionModeIndicator);
  append_styles($$anchor, $$css4);
  const $wizardConfigStore = () => (validate_store(wizardConfigStore, "wizardConfigStore"), store_get(wizardConfigStore, "$wizardConfigStore", $$stores));
  const [$$stores, $$cleanup] = setup_stores();
  let langDetectionMode = tag(user_derived(() => $wizardConfigStore()?.lang["wizard.detection_mode"] ?? "Detection Mode"), "langDetectionMode");
  var $$exports = { ...legacy_api() };
  var div = root11();
  var span = child(div);
  var text2 = child(span);
  var span_1 = sibling(text2);
  var node = child(span_1);
  add_svelte_meta(() => Icon(node, { name: "actions-question-circle" }), "component", DetectionModeIndicator, 55, 32, { componentTag: "Icon" });
  reset(span_1);
  reset(span);
  reset(div);
  template_effect(() => set_text(text2, `${get2(langDetectionMode) ?? ""} `));
  append($$anchor, div);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
create_custom_element(DetectionModeIndicator, {}, [], [], { mode: "open" });

// Resources/Private/JavaScript/FocuspointWizard.svelte
FocuspointWizard[FILENAME] = "Resources/Private/JavaScript/FocuspointWizard.svelte";
var root_16 = add_locations(from_html(`<div class="detection-mode-overlay svelte-162s9id"><!></div>`), FocuspointWizard[FILENAME], [[115, 4]]);
var root_32 = add_locations(from_html(`<!> <div class="resize-handle svelte-162s9id" aria-label="Resize sidebar"></div> <!>`, 1), FocuspointWizard[FILENAME], [[129, 8]]);
var root12 = add_locations(from_html(`<!> <div class="wizard svelte-162s9id"><!></div>`, 1), FocuspointWizard[FILENAME], [[124, 0]]);
var $$css5 = {
  hash: "svelte-162s9id",
  code: "\n    .wizard.svelte-162s9id {\n        display: grid;\n        max-height: 100%;\n        min-height: 0;\n        grid-template-columns: 1fr 1px var(--sidebar-width, 300px);\n        grid-template-rows: minmax(0, 1fr);\n    }\n\n    .detection-mode-overlay.svelte-162s9id {\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        z-index: 2;\n    }\n\n    .resize-handle.svelte-162s9id {\n        cursor: ew-resize !important;\n        user-select: none;\n        position: relative;\n    }\n\n    .resize-handle.svelte-162s9id:after {\n        content: '';\n        position: absolute;\n        z-index: 1;\n        top: 0;\n        right: -4px;\n        width: 4px;\n        height: 100%;\n        background: rgba(255, 255, 255, 0);\n    }\n\n    .resize-handle.svelte-162s9id:hover:after {\n        background: var(--scaffold-content-navigation-drag-bg-hover, #bbb);\n    }\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9jdXNwb2ludFdpemFyZC5zdmVsdGUiLCJzb3VyY2VzIjpbIkZvY3VzcG9pbnRXaXphcmQuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzdmVsdGU6b3B0aW9ucyBjdXN0b21FbGVtZW50PXt7dGFnOiAnZm9jdXNwb2ludC13aXphcmQnLCBzaGFkb3c6ICdub25lJ319IC8+XG5cbjxzdHlsZT5cbiAgICAud2l6YXJkIHtcbiAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgbWF4LWhlaWdodDogMTAwJTtcbiAgICAgICAgbWluLWhlaWdodDogMDtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMXB4IHZhcigtLXNpZGViYXItd2lkdGgsIDMwMHB4KTtcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtaW5tYXgoMCwgMWZyKTtcbiAgICB9XG5cbiAgICAuZGV0ZWN0aW9uLW1vZGUtb3ZlcmxheSB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgei1pbmRleDogMjtcbiAgICB9XG5cbiAgICAucmVzaXplLWhhbmRsZSB7XG4gICAgICAgIGN1cnNvcjogZXctcmVzaXplICFpbXBvcnRhbnQ7XG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuXG4gICAgLnJlc2l6ZS1oYW5kbGU6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB6LWluZGV4OiAxO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHJpZ2h0OiAtNHB4O1xuICAgICAgICB3aWR0aDogNHB4O1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XG4gICAgfVxuXG4gICAgLnJlc2l6ZS1oYW5kbGU6aG92ZXI6YWZ0ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zY2FmZm9sZC1jb250ZW50LW5hdmlnYXRpb24tZHJhZy1iZy1ob3ZlciwgI2JiYik7XG4gICAgfVxuPC9zdHlsZT5cblxuPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgICBpbXBvcnQge29uRGVzdHJveSwgb25Nb3VudH0gZnJvbSBcInN2ZWx0ZVwiO1xuICAgIGltcG9ydCB7Y3ViaWNJbiwgY3ViaWNPdXR9IGZyb20gXCJzdmVsdGUvZWFzaW5nXCI7XG4gICAgaW1wb3J0IHtmbHl9IGZyb20gJ3N2ZWx0ZS90cmFuc2l0aW9uJztcbiAgICBpbXBvcnQgSW1hZ2UgZnJvbSAnLi9jb21wb25lbnRzL0ltYWdlLnN2ZWx0ZSc7XG4gICAgaW1wb3J0IFNpZGViYXIgZnJvbSBcIi4vY29tcG9uZW50cy9TaWRlYmFyLnN2ZWx0ZVwiO1xuICAgIGltcG9ydCB7ZGV0ZWN0aW9uTW9kZSwgZm9jdXNwb2ludENoYW5uZWxOYW1lLCBpbml0U3RvcmVzLCBhY3RpdmF0ZUZvY3VzcG9pbnQsIGRlYWN0aXZhdGVBbGxGb2N1c3BvaW50c30gZnJvbSAnLi9zdG9yZS5zdmVsdGUnO1xuICAgIGltcG9ydCB7Zm9jdXNwb2ludHN9IGZyb20gJy4vc3RvcmUuc3ZlbHRlJztcbiAgICBpbXBvcnQgaW50ZXJhY3QgZnJvbSAnaW50ZXJhY3Rqcyc7XG4gICAgaW1wb3J0IFNldHRpbmdzIGZyb20gXCIuL2NvbXBvbmVudHMvU2V0dGluZ3Muc3ZlbHRlXCI7XG4gICAgaW1wb3J0IERldGVjdGlvbk1vZGVJbmRpY2F0b3IgZnJvbSBcIi4vY29tcG9uZW50cy9EZXRlY3Rpb25Nb2RlSW5kaWNhdG9yLnN2ZWx0ZVwiO1xuXG4gICAgbGV0IHtpdGVtRm9ybUVsTmFtZSwgd2l6YXJkQ29uZmlnLCBpbWFnZSwgaXRlbUZvcm1FbFZhbHVlfSA9ICRwcm9wcygpXG4gICAgbGV0IGlzU2V0dGluZ3NPcGVuID0gJHN0YXRlKGZhbHNlKVxuICAgIGxldCBpbWFnZUNvbXBvbmVudCA9ICRzdGF0ZSg8e3VwZGF0ZUNhbnZhc1NpemVzOiAoKSA9PiB2b2lkfSB8IG51bGw+KG51bGwpKVxuICAgIGxldCBzaWRlYmFyV2lkdGggPSAkc3RhdGUoMzAwKVxuICAgIGNvbnN0IG1pblNpZGViYXJXaWR0aCA9IDIwMFxuICAgIGxldCBjaGFubmVsOiBCcm9hZGNhc3RDaGFubmVsfG51bGwgPSBudWxsXG5cblxuICAgIG9uTW91bnQoKCkgPT4ge1xuICAgICAgICBpbml0U3RvcmVzKGl0ZW1Gb3JtRWxWYWx1ZSwgd2l6YXJkQ29uZmlnKVxuXG4gICAgICAgIGlmICgkZm9jdXNwb2ludHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZGVhY3RpdmF0ZUFsbEZvY3VzcG9pbnRzKClcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlRm9jdXNwb2ludCgwKVxuICAgICAgICAgICAgfSwgMzAwKVxuICAgICAgICB9XG5cbiAgICAgICAgY2hhbm5lbCA9IG5ldyBCcm9hZGNhc3RDaGFubmVsKGZvY3VzcG9pbnRDaGFubmVsTmFtZShpdGVtRm9ybUVsTmFtZSkpXG4gICAgICAgIGNoYW5uZWwub25tZXNzYWdlID0gKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmRhdGEudHlwZSA9PT0gJ21vZGFsLXNhdmUnKSBvbk1vZGFsU2F2ZSgpXG4gICAgICAgICAgICBpZiAoZS5kYXRhLnR5cGUgPT09ICdzZXR0aW5ncycpIGhhbmRsZVNldHRpbmdzKClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlc3RvcmUgc2F2ZWQgc2lkZWJhciB3aWR0aCBpZiBhdmFpbGFibGVcbiAgICAgICAgY29uc3Qgc2F2ZWRXaWR0aCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmb2N1c3BvaW50LXNpZGViYXItd2lkdGgnKVxuICAgICAgICBpZiAoc2F2ZWRXaWR0aCAmJiBwYXJzZUludChzYXZlZFdpZHRoKSA+PSBtaW5TaWRlYmFyV2lkdGgpIHtcbiAgICAgICAgICAgIHNpZGViYXJXaWR0aCA9IHBhcnNlSW50KHNhdmVkV2lkdGgpXG4gICAgICAgIH1cblxuICAgICAgICBpbnRlcmFjdCgnLnJlc2l6ZS1oYW5kbGUnKS5kcmFnZ2FibGUoe1xuICAgICAgICAgICAgYXhpczogJ3gnLFxuICAgICAgICAgICAgbGlzdGVuZXJzOiB7XG4gICAgICAgICAgICAgICAgbW92ZShldmVudDoge2R4OiBudW1iZXJ9KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1dpZHRoID0gc2lkZWJhcldpZHRoICsgZXZlbnQuZHggKiAtMVxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3V2lkdGggPj0gbWluU2lkZWJhcldpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFyV2lkdGggPSBuZXdXaWR0aFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ZvY3VzcG9pbnQtc2lkZWJhci13aWR0aCcsIHNpZGViYXJXaWR0aC50b1N0cmluZygpKVxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VDb21wb25lbnQ/LnVwZGF0ZUNhbnZhc1NpemVzKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIG9uRGVzdHJveSgoKSA9PiB7XG4gICAgICAgIGNoYW5uZWw/LmNsb3NlKClcbiAgICAgICAgJGZvY3VzcG9pbnRzID0gW11cbiAgICAgICAgaW50ZXJhY3QoJy5yZXNpemUtaGFuZGxlJykudW5zZXQoKVxuICAgIH0pO1xuXG4gICAgY29uc3Qgb25Nb2RhbFNhdmUgPSAoKSA9PiB7XG4gICAgICAgIGNoYW5uZWw/LnBvc3RNZXNzYWdlKHt0eXBlOiAnd2l6YXJkLXVwZGF0ZScsIGZvY3VzcG9pbnRzOiAkZm9jdXNwb2ludHN9KVxuICAgIH1cblxuICAgIGNvbnN0IGhhbmRsZVNldHRpbmdzID0gKCkgPT4ge1xuICAgICAgICBpc1NldHRpbmdzT3BlbiA9ICFpc1NldHRpbmdzT3BlblxuICAgIH1cbjwvc2NyaXB0PlxuXG57I2lmICRkZXRlY3Rpb25Nb2RlfVxuICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJkZXRlY3Rpb24tbW9kZS1vdmVybGF5XCJcbiAgICAgICAgaW46Zmx5PXt7IHk6IC0yNCwgZHVyYXRpb246IDI2MCwgZWFzaW5nOiBjdWJpY091dCB9fVxuICAgICAgICBvdXQ6Zmx5PXt7IHk6IC0xNiwgZHVyYXRpb246IDE4MCwgZWFzaW5nOiBjdWJpY0luIH19XG4gICAgPlxuICAgICAgICA8RGV0ZWN0aW9uTW9kZUluZGljYXRvciAvPlxuICAgIDwvZGl2Plxuey9pZn1cblxuPGRpdiBjbGFzcz1cIndpemFyZFwiIHN0eWxlPVwiLS1zaWRlYmFyLXdpZHRoOiB7c2lkZWJhcldpZHRofXB4O1wiPlxuICAgIHsjaWYgaXNTZXR0aW5nc09wZW59XG4gICAgICAgIDxTZXR0aW5ncyBpdGVtRm9ybUVsTmFtZT17aXRlbUZvcm1FbE5hbWV9IGJpbmQ6aXNTZXR0aW5nc09wZW5WYWx1ZT17aXNTZXR0aW5nc09wZW59IC8+XG4gICAgezplbHNlfVxuICAgICAgICA8SW1hZ2UgYmluZDp0aGlzPXtpbWFnZUNvbXBvbmVudH0gaW1hZ2U9e2ltYWdlfSAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmVzaXplLWhhbmRsZVwiIGFyaWEtbGFiZWw9XCJSZXNpemUgc2lkZWJhclwiPjwvZGl2PlxuICAgICAgICA8U2lkZWJhciAvPlxuICAgIHsvaWZ9XG48L2Rpdj5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsSUFBSSxzQkFBTyxDQUFDO0FBQ1osUUFBUSxhQUFhO0FBQ3JCLFFBQVEsZ0JBQWdCO0FBQ3hCLFFBQVEsYUFBYTtBQUNyQixRQUFRLDBEQUEwRDtBQUNsRSxRQUFRLGtDQUFrQztBQUMxQzs7QUFFQSxJQUFJLHNDQUF1QixDQUFDO0FBQzVCLFFBQVEsa0JBQWtCO0FBQzFCLFFBQVEsTUFBTTtBQUNkLFFBQVEsT0FBTztBQUNmLFFBQVEsUUFBUTtBQUNoQixRQUFRLFVBQVU7QUFDbEI7O0FBRUEsSUFBSSw2QkFBYyxDQUFDO0FBQ25CLFFBQVEsNEJBQTRCO0FBQ3BDLFFBQVEsaUJBQWlCO0FBQ3pCLFFBQVEsa0JBQWtCO0FBQzFCOztBQUVBLElBQUksNkJBQWMsTUFBTSxDQUFDO0FBQ3pCLFFBQVEsV0FBVztBQUNuQixRQUFRLGtCQUFrQjtBQUMxQixRQUFRLFVBQVU7QUFDbEIsUUFBUSxNQUFNO0FBQ2QsUUFBUSxXQUFXO0FBQ25CLFFBQVEsVUFBVTtBQUNsQixRQUFRLFlBQVk7QUFDcEIsUUFBUSxrQ0FBa0M7QUFDMUM7O0FBRUEsSUFBSSw2QkFBYyxNQUFNLE1BQU0sQ0FBQztBQUMvQixRQUFRLGtFQUFrRTtBQUMxRTsifQ== */"
};
function FocuspointWizard($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, FocuspointWizard);
  append_styles($$anchor, $$css5);
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const $detectionMode = () => (validate_store(detectionMode, "detectionMode"), store_get(detectionMode, "$detectionMode", $$stores));
  const [$$stores, $$cleanup] = setup_stores();
  let itemFormElName = prop($$props, "itemFormElName", 7), wizardConfig = prop($$props, "wizardConfig", 7), image = prop($$props, "image", 7), itemFormElValue = prop($$props, "itemFormElValue", 7);
  let isSettingsOpen = tag(state(false), "isSettingsOpen");
  let imageComponent = tag(state(null), "imageComponent");
  let sidebarWidth = tag(state(300), "sidebarWidth");
  const minSidebarWidth = 200;
  let channel = null;
  onMount(() => {
    initStores(itemFormElValue(), wizardConfig());
    if ($focuspoints().length > 0) {
      deactivateAllFocuspoints();
      setTimeout(
        () => {
          activateFocuspoint(0);
        },
        300
      );
    }
    channel = new BroadcastChannel(focuspointChannelName(itemFormElName()));
    channel.onmessage = (e) => {
      if (strict_equals(e.data.type, "modal-save")) onModalSave();
      if (strict_equals(e.data.type, "settings")) handleSettings();
    };
    const savedWidth = localStorage.getItem("focuspoint-sidebar-width");
    if (savedWidth && parseInt(savedWidth) >= minSidebarWidth) {
      set(sidebarWidth, parseInt(savedWidth), true);
    }
    interact2(".resize-handle").draggable({
      axis: "x",
      listeners: {
        move(event2) {
          const newWidth = get2(sidebarWidth) + event2.dx * -1;
          if (newWidth >= minSidebarWidth) {
            set(sidebarWidth, newWidth);
            localStorage.setItem("focuspoint-sidebar-width", get2(sidebarWidth).toString());
            get2(imageComponent)?.updateCanvasSizes();
          }
        }
      }
    });
  });
  onDestroy(() => {
    channel?.close();
    store_set(focuspoints, []);
    interact2(".resize-handle").unset();
  });
  const onModalSave = () => {
    channel?.postMessage({ type: "wizard-update", focuspoints: $focuspoints() });
  };
  const handleSettings = () => {
    set(isSettingsOpen, !get2(isSettingsOpen));
  };
  var $$exports = {
    ...legacy_api(),
    get itemFormElName() {
      return itemFormElName();
    },
    set itemFormElName($$value) {
      itemFormElName($$value);
      flushSync();
    },
    get wizardConfig() {
      return wizardConfig();
    },
    set wizardConfig($$value) {
      wizardConfig($$value);
      flushSync();
    },
    get image() {
      return image();
    },
    set image($$value) {
      image($$value);
      flushSync();
    },
    get itemFormElValue() {
      return itemFormElValue();
    },
    set itemFormElValue($$value) {
      itemFormElValue($$value);
      flushSync();
    }
  };
  var fragment = root12();
  var node = first_child(fragment);
  {
    var consequent = ($$anchor2) => {
      var div = root_16();
      var node_1 = child(div);
      add_svelte_meta(() => DetectionModeIndicator(node_1, {}), "component", FocuspointWizard, 120, 8, { componentTag: "DetectionModeIndicator" });
      reset(div);
      transition(1, div, () => fly, () => ({ y: -24, duration: 260, easing: cubicOut }));
      transition(2, div, () => fly, () => ({ y: -16, duration: 180, easing: cubicIn }));
      append($$anchor2, div);
    };
    add_svelte_meta(
      () => if_block(node, ($$render) => {
        if ($detectionMode()) $$render(consequent);
      }),
      "if",
      FocuspointWizard,
      114,
      0
    );
  }
  var div_1 = sibling(node, 2);
  var node_2 = child(div_1);
  {
    var consequent_1 = ($$anchor2) => {
      add_svelte_meta(
        () => Settings($$anchor2, {
          get itemFormElName() {
            return itemFormElName();
          },
          get isSettingsOpenValue() {
            return get2(isSettingsOpen);
          },
          set isSettingsOpenValue($$value) {
            set(isSettingsOpen, $$value, true);
          }
        }),
        "component",
        FocuspointWizard,
        126,
        8,
        { componentTag: "Settings" }
      );
    };
    var alternate = ($$anchor2) => {
      var fragment_2 = root_32();
      var node_3 = first_child(fragment_2);
      add_svelte_meta(
        () => bind_this(
          Image(node_3, {
            get image() {
              return image();
            }
          }),
          ($$value) => set(imageComponent, $$value, true),
          () => get2(imageComponent)
        ),
        "component",
        FocuspointWizard,
        128,
        8,
        { componentTag: "Image" }
      );
      var node_4 = sibling(node_3, 4);
      add_svelte_meta(() => Sidebar(node_4, {}), "component", FocuspointWizard, 130, 8, { componentTag: "Sidebar" });
      append($$anchor2, fragment_2);
    };
    add_svelte_meta(
      () => if_block(node_2, ($$render) => {
        if (get2(isSettingsOpen)) $$render(consequent_1);
        else $$render(alternate, -1);
      }),
      "if",
      FocuspointWizard,
      125,
      4
    );
  }
  reset(div_1);
  template_effect(() => set_style(div_1, `--sidebar-width: ${get2(sidebarWidth) ?? ""}px;`));
  append($$anchor, fragment);
  var $$pop = pop($$exports);
  $$cleanup();
  return $$pop;
}
customElements.define("focuspoint-wizard", create_custom_element(
  FocuspointWizard,
  {
    itemFormElName: {},
    wizardConfig: {},
    image: {},
    itemFormElValue: {}
  },
  [],
  []
));
export {
  FocuspointWizard as default
};
//# sourceMappingURL=FocuspointWizard.js.map
