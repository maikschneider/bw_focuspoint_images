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
var TRANSITION_OUT = 1 << 1;
var TRANSITION_GLOBAL = 1 << 2;
var TEMPLATE_FRAGMENT = 1;
var TEMPLATE_USE_IMPORT_NODE = 1 << 1;
var HYDRATION_START = "[";
var HYDRATION_START_ELSE = "[!";
var HYDRATION_END = "]";
var HYDRATION_ERROR = {};
var ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
var UNINITIALIZED = Symbol();
var FILENAME = Symbol("filename");
var HMR = Symbol("hmr");
var NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";

// node_modules/esm-env/dev-fallback.js
var node_env = globalThis.process?.env?.NODE_ENV;
var dev_fallback_default = node_env && !node_env.toLowerCase().startsWith("prod");

// node_modules/svelte/src/internal/shared/errors.js
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

// node_modules/svelte/src/internal/shared/utils.js
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var array_from = Array.from;
var object_keys = Object.keys;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
var noop = () => {
};
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}

// node_modules/svelte/src/internal/client/constants.js
var DERIVED = 1 << 1;
var EFFECT = 1 << 2;
var RENDER_EFFECT = 1 << 3;
var BLOCK_EFFECT = 1 << 4;
var BRANCH_EFFECT = 1 << 5;
var ROOT_EFFECT = 1 << 6;
var BOUNDARY_EFFECT = 1 << 7;
var UNOWNED = 1 << 8;
var DISCONNECTED = 1 << 9;
var CLEAN = 1 << 10;
var DIRTY = 1 << 11;
var MAYBE_DIRTY = 1 << 12;
var INERT = 1 << 13;
var DESTROYED = 1 << 14;
var EFFECT_RAN = 1 << 15;
var EFFECT_TRANSPARENT = 1 << 16;
var LEGACY_DERIVED_PROP = 1 << 17;
var INSPECT_EFFECT = 1 << 18;
var HEAD_EFFECT = 1 << 19;
var EFFECT_HAS_DERIVED = 1 << 20;
var EFFECT_IS_UPDATING = 1 << 21;
var STATE_SYMBOL = Symbol("$state");
var LEGACY_PROPS = Symbol("legacy props");
var LOADING_ATTR_SYMBOL = Symbol("");

// node_modules/svelte/src/internal/client/errors.js
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
Maximum update depth exceeded. This can happen when a reactive block or effect repeatedly sets a new value. Svelte limits the number of nested updates to prevent infinite loops
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
function props_invalid_value(key) {
  if (dev_fallback_default) {
    const error = new Error(`props_invalid_value
Cannot do \`bind:${key}={undefined}\` when \`${key}\` has a fallback value
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
Updating state inside a derived or a template expression is forbidden. If the value should not be reactive, declare it without \`$state\`
https://svelte.dev/e/state_unsafe_mutation`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
  }
}

// node_modules/svelte/src/internal/client/warnings.js
var bold = "font-weight: bold";
var normal = "font-weight: normal";
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
    console.warn(`%c[svelte] hydration_html_changed
%c${location ? `The value of an \`{@html ...}\` block ${location} changed between server and client renders. The client value will be ignored in favour of the server value` : "The value of an `{@html ...}` block changed between server and client renders. The client value will be ignored in favour of the server value"}
https://svelte.dev/e/hydration_html_changed`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/hydration_html_changed`);
  }
}
function hydration_mismatch(location) {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] hydration_mismatch
%c${location ? `Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near ${location}` : "Hydration failed because the initial UI does not match what was rendered on the server"}
https://svelte.dev/e/hydration_mismatch`, bold, normal);
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
function state_proxy_equality_mismatch(operator) {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] state_proxy_equality_mismatch
%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${operator}\` will produce unexpected results
https://svelte.dev/e/state_proxy_equality_mismatch`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/state_proxy_equality_mismatch`);
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
  return set_hydrate_node(
    /** @type {TemplateNode} */
    get_next_sibling(hydrate_node)
  );
}
function reset(node) {
  if (!hydrating) return;
  if (get_next_sibling(hydrate_node) !== null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  hydrate_node = node;
}
function remove_nodes() {
  var depth = 0;
  var node = hydrate_node;
  while (true) {
    if (node.nodeType === 8) {
      var data = (
        /** @type {Comment} */
        node.data
      );
      if (data === HYDRATION_END) {
        if (depth === 0) return node;
        depth -= 1;
      } else if (data === HYDRATION_START || data === HYDRATION_START_ELSE) {
        depth += 1;
      }
    }
    var next2 = (
      /** @type {TemplateNode} */
      get_next_sibling(node)
    );
    node.remove();
    node = next2;
  }
}

// node_modules/svelte/src/internal/client/dev/tracing.js
var tracing_expressions = null;
function get_stack(label) {
  let error = Error();
  const stack2 = error.stack;
  if (stack2) {
    const lines = stack2.split("\n");
    const new_lines = ["\n"];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === "Error") {
        continue;
      }
      if (line.includes("validate_each_keys")) {
        return null;
      }
      if (line.includes("svelte/src/internal")) {
        continue;
      }
      new_lines.push(line);
    }
    if (new_lines.length === 1) {
      return null;
    }
    define_property(error, "stack", {
      value: new_lines.join("\n")
    });
    define_property(error, "name", {
      // 'Error' suffix is required for stack traces to be rendered properly
      value: `${label}Error`
    });
  }
  return error;
}

// node_modules/svelte/src/internal/flags/index.js
var legacy_mode_flag = false;
var tracing_mode_flag = false;

// node_modules/svelte/src/internal/client/proxy.js
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
  var stack2 = dev_fallback_default && tracing_mode_flag ? get_stack("CreatedAt") : null;
  var reaction = active_reaction;
  var with_parent = (fn) => {
    var previous_reaction = active_reaction;
    set_active_reaction(reaction);
    var result = fn();
    set_active_reaction(previous_reaction);
    return result;
  };
  if (is_proxied_array) {
    sources.set("length", state(
      /** @type {any[]} */
      value.length,
      stack2
    ));
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
          s = with_parent(() => state(descriptor.value, stack2));
          sources.set(prop2, s);
        } else {
          set(
            s,
            with_parent(() => proxy(descriptor.value))
          );
        }
        return true;
      },
      deleteProperty(target, prop2) {
        var s = sources.get(prop2);
        if (s === void 0) {
          if (prop2 in target) {
            sources.set(
              prop2,
              with_parent(() => state(UNINITIALIZED, stack2))
            );
          }
        } else {
          if (is_proxied_array && typeof prop2 === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n = Number(prop2);
            if (Number.isInteger(n) && n < ls.v) {
              set(ls, n);
            }
          }
          set(s, UNINITIALIZED);
          update_version(version);
        }
        return true;
      },
      get(target, prop2, receiver) {
        if (prop2 === STATE_SYMBOL) {
          return value;
        }
        var s = sources.get(prop2);
        var exists = prop2 in target;
        if (s === void 0 && (!exists || get_descriptor(target, prop2)?.writable)) {
          s = with_parent(() => state(proxy(exists ? target[prop2] : UNINITIALIZED), stack2));
          sources.set(prop2, s);
        }
        if (s !== void 0) {
          var v = get(s);
          return v === UNINITIALIZED ? void 0 : v;
        }
        return Reflect.get(target, prop2, receiver);
      },
      getOwnPropertyDescriptor(target, prop2) {
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
        if (descriptor && "value" in descriptor) {
          var s = sources.get(prop2);
          if (s) descriptor.value = get(s);
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
            s = with_parent(() => state(has ? proxy(target[prop2]) : UNINITIALIZED, stack2));
            sources.set(prop2, s);
          }
          var value2 = get(s);
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
            }
          }
        }
        if (s === void 0) {
          if (!has || get_descriptor(target, prop2)?.writable) {
            s = with_parent(() => state(void 0, stack2));
            set(
              s,
              with_parent(() => proxy(value2))
            );
            sources.set(prop2, s);
          }
        } else {
          has = s.v !== UNINITIALIZED;
          set(
            s,
            with_parent(() => proxy(value2))
          );
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
          update_version(version);
        }
        return true;
      },
      ownKeys(target) {
        get(version);
        var own_keys = Reflect.ownKeys(target).filter((key2) => {
          var source3 = sources.get(key2);
          return source3 === void 0 || source3.v !== UNINITIALIZED;
        });
        for (var [key, source2] of sources) {
          if (source2.v !== UNINITIALIZED && !(key in target)) {
            own_keys.push(key);
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
function update_version(signal, d = 1) {
  set(signal, signal.v + d);
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

// node_modules/svelte/src/internal/client/dev/equality.js
function init_array_prototype_warnings() {
  const array_prototype2 = Array.prototype;
  const cleanup = Array.__svelte_cleanup;
  if (cleanup) {
    cleanup();
  }
  const { indexOf, lastIndexOf, includes } = array_prototype2;
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
    const has = includes.call(this, item, from_index);
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
    array_prototype2.includes = includes;
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
  return first_child_getter.call(node);
}
// @__NO_SIDE_EFFECTS__
function get_next_sibling(node) {
  return next_sibling_getter.call(node);
}
function child(node, is_text) {
  if (!hydrating) {
    return /* @__PURE__ */ get_first_child(node);
  }
  var child2 = (
    /** @type {TemplateNode} */
    /* @__PURE__ */ get_first_child(hydrate_node)
  );
  if (child2 === null) {
    child2 = hydrate_node.appendChild(create_text());
  } else if (is_text && child2.nodeType !== 3) {
    var text2 = create_text();
    child2?.before(text2);
    set_hydrate_node(text2);
    return text2;
  }
  set_hydrate_node(child2);
  return child2;
}
function first_child(fragment, is_text) {
  if (!hydrating) {
    var first = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ get_first_child(
        /** @type {Node} */
        fragment
      )
    );
    if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
    return first;
  }
  if (is_text && hydrate_node?.nodeType !== 3) {
    var text2 = create_text();
    hydrate_node?.before(text2);
    set_hydrate_node(text2);
    return text2;
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
  var type = next_sibling?.nodeType;
  if (is_text && type !== 3) {
    var text2 = create_text();
    if (next_sibling === null) {
      last_sibling?.after(text2);
    } else {
      next_sibling.before(text2);
    }
    set_hydrate_node(text2);
    return text2;
  }
  set_hydrate_node(next_sibling);
  return (
    /** @type {TemplateNode} */
    next_sibling
  );
}
function clear_text_content(node) {
  node.textContent = "";
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

// node_modules/svelte/src/internal/client/reactivity/deriveds.js
// @__NO_SIDE_EFFECTS__
function derived(fn) {
  var flags = DERIVED | DIRTY;
  var parent_derived = active_reaction !== null && (active_reaction.f & DERIVED) !== 0 ? (
    /** @type {Derived} */
    active_reaction
  ) : null;
  if (active_effect === null || parent_derived !== null && (parent_derived.f & UNOWNED) !== 0) {
    flags |= UNOWNED;
  } else {
    active_effect.f |= EFFECT_HAS_DERIVED;
  }
  const signal = {
    ctx: component_context,
    deps: null,
    effects: null,
    equals,
    f: flags,
    fn,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      null
    ),
    wv: 0,
    parent: parent_derived ?? active_effect
  };
  if (dev_fallback_default && tracing_mode_flag) {
    signal.created = get_stack("CreatedAt");
  }
  return signal;
}
// @__NO_SIDE_EFFECTS__
function user_derived(fn) {
  const d = /* @__PURE__ */ derived(fn);
  push_reaction_value(d);
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
      return (
        /** @type {Effect} */
        parent
      );
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
    let prev_inspect_effects = inspect_effects;
    set_inspect_effects(/* @__PURE__ */ new Set());
    try {
      if (stack.includes(derived3)) {
        derived_references_self();
      }
      stack.push(derived3);
      destroy_derived_effects(derived3);
      value = update_reaction(derived3);
    } finally {
      set_active_effect(prev_active_effect);
      set_inspect_effects(prev_inspect_effects);
      stack.pop();
    }
  } else {
    try {
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
  var status = (skip_reaction || (derived3.f & UNOWNED) !== 0) && derived3.deps !== null ? MAYBE_DIRTY : CLEAN;
  set_signal_status(derived3, status);
  if (!derived3.equals(value)) {
    derived3.v = value;
    derived3.wv = increment_write_version();
  }
}

// node_modules/svelte/src/internal/client/reactivity/effects.js
function validate_effect(rune) {
  if (active_effect === null && active_reaction === null) {
    effect_orphan(rune);
  }
  if (active_reaction !== null && (active_reaction.f & UNOWNED) !== 0 && active_effect === null) {
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
function create_effect(type, fn, sync, push2 = true) {
  var parent = active_effect;
  if (dev_fallback_default) {
    while (parent !== null && (parent.f & INSPECT_EFFECT) !== 0) {
      parent = parent.parent;
    }
  }
  var effect2 = {
    ctx: component_context,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: type | DIRTY,
    first: null,
    fn,
    last: null,
    next: null,
    parent,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0
  };
  if (dev_fallback_default) {
    effect2.component_function = dev_current_component_function;
  }
  if (sync) {
    try {
      update_effect(effect2);
      effect2.f |= EFFECT_RAN;
    } catch (e) {
      destroy_effect(effect2);
      throw e;
    }
  } else if (fn !== null) {
    schedule_effect(effect2);
  }
  var inert = sync && effect2.deps === null && effect2.first === null && effect2.nodes_start === null && effect2.teardown === null && (effect2.f & (EFFECT_HAS_DERIVED | BOUNDARY_EFFECT)) === 0;
  if (!inert && push2) {
    if (parent !== null) {
      push_effect(effect2, parent);
    }
    if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0) {
      var derived3 = (
        /** @type {Derived} */
        active_reaction
      );
      (derived3.effects ??= []).push(effect2);
    }
  }
  return effect2;
}
function teardown(fn) {
  const effect2 = create_effect(RENDER_EFFECT, null, false);
  set_signal_status(effect2, CLEAN);
  effect2.teardown = fn;
  return effect2;
}
function user_effect(fn) {
  validate_effect("$effect");
  var defer = active_effect !== null && (active_effect.f & BRANCH_EFFECT) !== 0 && component_context !== null && !component_context.m;
  if (dev_fallback_default) {
    define_property(fn, "name", {
      value: "$effect"
    });
  }
  if (defer) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    (context.e ??= []).push({
      fn,
      effect: active_effect,
      reaction: active_reaction
    });
  } else {
    var signal = effect(fn);
    return signal;
  }
}
function effect_root(fn) {
  const effect2 = create_effect(ROOT_EFFECT, fn, true);
  return () => {
    destroy_effect(effect2);
  };
}
function component_root(fn) {
  const effect2 = create_effect(ROOT_EFFECT, fn, true);
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
  return create_effect(EFFECT, fn, false);
}
function render_effect(fn) {
  return create_effect(RENDER_EFFECT, fn, true);
}
function template_effect(fn, thunks = [], d = derived) {
  const deriveds = thunks.map(d);
  const effect2 = () => fn(...deriveds.map(get));
  if (dev_fallback_default) {
    define_property(effect2, "name", {
      value: "{expression}"
    });
  }
  return block(effect2);
}
function block(fn, flags = 0) {
  return create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
}
function branch(fn, push2 = true) {
  return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true, push2);
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
  if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes_start !== null) {
    var node = effect2.nodes_start;
    var end = effect2.nodes_end;
    while (node !== null) {
      var next2 = node === end ? null : (
        /** @type {TemplateNode} */
        get_next_sibling(node)
      );
      node.remove();
      node = next2;
    }
    removed = true;
  }
  destroy_effect_children(effect2, remove_dom && !removed);
  remove_reactions(effect2, 0);
  set_signal_status(effect2, DESTROYED);
  var transitions = effect2.transitions;
  if (transitions !== null) {
    for (const transition2 of transitions) {
      transition2.stop();
    }
  }
  execute_effect_teardown(effect2);
  var parent = effect2.parent;
  if (parent !== null && parent.first !== null) {
    unlink_effect(effect2);
  }
  if (dev_fallback_default) {
    effect2.component_function = null;
  }
  effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes_start = effect2.nodes_end = null;
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
function pause_effect(effect2, callback) {
  var transitions = [];
  pause_children(effect2, transitions, true);
  run_out_transitions(transitions, () => {
    destroy_effect(effect2);
    if (callback) callback();
  });
}
function run_out_transitions(transitions, fn) {
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
  if (effect2.transitions !== null) {
    for (const transition2 of effect2.transitions) {
      if (transition2.is_global || local) {
        transitions.push(transition2);
      }
    }
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
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
    effect2.f ^= CLEAN;
  }
  if (check_dirtiness(effect2)) {
    set_signal_status(effect2, DIRTY);
    schedule_effect(effect2);
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
    resume_children(child2, transparent ? local : false);
    child2 = sibling2;
  }
  if (effect2.transitions !== null) {
    for (const transition2 of effect2.transitions) {
      if (transition2.is_global || local) {
        transition2.in();
      }
    }
  }
}

// node_modules/svelte/src/internal/client/dom/task.js
var request_idle_callback = typeof requestIdleCallback === "undefined" ? (cb) => setTimeout(cb, 1) : requestIdleCallback;
var micro_tasks = [];
var idle_tasks = [];
function run_micro_tasks() {
  var tasks = micro_tasks;
  micro_tasks = [];
  run_all(tasks);
}
function run_idle_tasks() {
  var tasks = idle_tasks;
  idle_tasks = [];
  run_all(tasks);
}
function queue_micro_task(fn) {
  if (micro_tasks.length === 0) {
    queueMicrotask(run_micro_tasks);
  }
  micro_tasks.push(fn);
}
function queue_idle_task(fn) {
  if (idle_tasks.length === 0) {
    request_idle_callback(run_idle_tasks);
  }
  idle_tasks.push(fn);
}
function flush_tasks() {
  if (micro_tasks.length > 0) {
    run_micro_tasks();
  }
  if (idle_tasks.length > 0) {
    run_idle_tasks();
  }
}

// node_modules/svelte/src/internal/client/runtime.js
var handled_errors = /* @__PURE__ */ new WeakSet();
var is_throwing_error = false;
var is_flushing = false;
var last_scheduled_effect = null;
var is_updating_effect = false;
var is_destroying_effect = false;
function set_is_destroying_effect(value) {
  is_destroying_effect = value;
}
var queued_root_effects = [];
var dev_effect_stack = [];
var active_reaction = null;
var untracking = false;
function set_active_reaction(reaction) {
  active_reaction = reaction;
}
var active_effect = null;
function set_active_effect(effect2) {
  active_effect = effect2;
}
var reaction_sources = null;
function push_reaction_value(value) {
  if (active_reaction !== null && active_reaction.f & EFFECT_IS_UPDATING) {
    if (reaction_sources === null) {
      reaction_sources = [value];
    } else {
      reaction_sources.push(value);
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
var skip_reaction = false;
var captured_signals = null;
function increment_write_version() {
  return ++write_version;
}
function check_dirtiness(reaction) {
  var flags = reaction.f;
  if ((flags & DIRTY) !== 0) {
    return true;
  }
  if ((flags & MAYBE_DIRTY) !== 0) {
    var dependencies = reaction.deps;
    var is_unowned = (flags & UNOWNED) !== 0;
    if (dependencies !== null) {
      var i;
      var dependency;
      var is_disconnected = (flags & DISCONNECTED) !== 0;
      var is_unowned_connected = is_unowned && active_effect !== null && !skip_reaction;
      var length = dependencies.length;
      if (is_disconnected || is_unowned_connected) {
        var derived3 = (
          /** @type {Derived} */
          reaction
        );
        var parent = derived3.parent;
        for (i = 0; i < length; i++) {
          dependency = dependencies[i];
          if (is_disconnected || !dependency?.reactions?.includes(derived3)) {
            (dependency.reactions ??= []).push(derived3);
          }
        }
        if (is_disconnected) {
          derived3.f ^= DISCONNECTED;
        }
        if (is_unowned_connected && parent !== null && (parent.f & UNOWNED) === 0) {
          derived3.f ^= UNOWNED;
        }
      }
      for (i = 0; i < length; i++) {
        dependency = dependencies[i];
        if (check_dirtiness(
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
    }
    if (!is_unowned || active_effect !== null && !skip_reaction) {
      set_signal_status(reaction, CLEAN);
    }
  }
  return false;
}
function propagate_error(error, effect2) {
  var current = effect2;
  while (current !== null) {
    if ((current.f & BOUNDARY_EFFECT) !== 0) {
      try {
        current.fn(error);
        return;
      } catch {
        current.f ^= BOUNDARY_EFFECT;
      }
    }
    current = current.parent;
  }
  is_throwing_error = false;
  throw error;
}
function should_rethrow_error(effect2) {
  return (effect2.f & DESTROYED) === 0 && (effect2.parent === null || (effect2.parent.f & BOUNDARY_EFFECT) === 0);
}
function handle_error(error, effect2, previous_effect, component_context2) {
  if (is_throwing_error) {
    if (previous_effect === null) {
      is_throwing_error = false;
    }
    if (should_rethrow_error(effect2)) {
      throw error;
    }
    return;
  }
  if (previous_effect !== null) {
    is_throwing_error = true;
  }
  if (!dev_fallback_default || component_context2 === null || !(error instanceof Error) || handled_errors.has(error)) {
    propagate_error(error, effect2);
    return;
  }
  handled_errors.add(error);
  const component_stack = [];
  const effect_name = effect2.fn?.name;
  if (effect_name) {
    component_stack.push(effect_name);
  }
  let current_context = component_context2;
  while (current_context !== null) {
    if (dev_fallback_default) {
      var filename = current_context.function?.[FILENAME];
      if (filename) {
        const file = filename.split("/").pop();
        component_stack.push(file);
      }
    }
    current_context = current_context.p;
  }
  const indent = is_firefox ? "  " : "	";
  define_property(error, "message", {
    value: error.message + `
${component_stack.map((name) => `
${indent}in ${name}`).join("")}
`
  });
  define_property(error, "component_stack", {
    value: component_stack
  });
  const stack2 = error.stack;
  if (stack2) {
    const lines = stack2.split("\n");
    const new_lines = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes("svelte/src/internal")) {
        continue;
      }
      new_lines.push(line);
    }
    define_property(error, "stack", {
      value: new_lines.join("\n")
    });
  }
  propagate_error(error, effect2);
  if (should_rethrow_error(effect2)) {
    throw error;
  }
}
function schedule_possible_effect_self_invalidation(signal, effect2, root12 = true) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  for (var i = 0; i < reactions.length; i++) {
    var reaction = reactions[i];
    if (reaction_sources?.includes(signal)) continue;
    if ((reaction.f & DERIVED) !== 0) {
      schedule_possible_effect_self_invalidation(
        /** @type {Derived} */
        reaction,
        effect2,
        false
      );
    } else if (effect2 === reaction) {
      if (root12) {
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
  var previous_skip_reaction = skip_reaction;
  var previous_reaction_sources = reaction_sources;
  var previous_component_context = component_context;
  var previous_untracking = untracking;
  var flags = reaction.f;
  new_deps = /** @type {null | Value[]} */
  null;
  skipped_deps = 0;
  untracked_writes = null;
  skip_reaction = (flags & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null);
  active_reaction = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
  reaction_sources = null;
  set_component_context(reaction.ctx);
  untracking = false;
  read_version++;
  reaction.f |= EFFECT_IS_UPDATING;
  try {
    var result = (
      /** @type {Function} */
      (0, reaction.fn)()
    );
    var deps = reaction.deps;
    if (new_deps !== null) {
      var i;
      remove_reactions(reaction, skipped_deps);
      if (deps !== null && skipped_deps > 0) {
        deps.length = skipped_deps + new_deps.length;
        for (i = 0; i < new_deps.length; i++) {
          deps[skipped_deps + i] = new_deps[i];
        }
      } else {
        reaction.deps = deps = new_deps;
      }
      if (!skip_reaction) {
        for (i = skipped_deps; i < deps.length; i++) {
          (deps[i].reactions ??= []).push(reaction);
        }
      }
    } else if (deps !== null && skipped_deps < deps.length) {
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
    if (previous_reaction !== reaction) {
      read_version++;
      if (untracked_writes !== null) {
        if (previous_untracked_writes === null) {
          previous_untracked_writes = untracked_writes;
        } else {
          previous_untracked_writes.push(.../** @type {Source[]} */
          untracked_writes);
        }
      }
    }
    return result;
  } finally {
    new_deps = previous_deps;
    skipped_deps = previous_skipped_deps;
    untracked_writes = previous_untracked_writes;
    active_reaction = previous_reaction;
    skip_reaction = previous_skip_reaction;
    reaction_sources = previous_reaction_sources;
    set_component_context(previous_component_context);
    untracking = previous_untracking;
    reaction.f ^= EFFECT_IS_UPDATING;
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
  (new_deps === null || !new_deps.includes(dependency))) {
    set_signal_status(dependency, MAYBE_DIRTY);
    if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
      dependency.f ^= DISCONNECTED;
    }
    destroy_derived_effects(
      /** @type {Derived} **/
      dependency
    );
    remove_reactions(
      /** @type {Derived} **/
      dependency,
      0
    );
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
  var flags = effect2.f;
  if ((flags & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect2, CLEAN);
  var previous_effect = active_effect;
  var previous_component_context = component_context;
  var was_updating_effect = is_updating_effect;
  active_effect = effect2;
  is_updating_effect = true;
  if (dev_fallback_default) {
    var previous_component_fn = dev_current_component_function;
    set_dev_current_component_function(effect2.component_function);
  }
  try {
    if ((flags & BLOCK_EFFECT) !== 0) {
      destroy_block_effect_children(effect2);
    } else {
      destroy_effect_children(effect2);
    }
    execute_effect_teardown(effect2);
    var teardown2 = update_reaction(effect2);
    effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
    effect2.wv = write_version;
    var deps = effect2.deps;
    if (dev_fallback_default && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && deps !== null) {
      for (let i = 0; i < deps.length; i++) {
        var dep = deps[i];
        if (dep.trace_need_increase) {
          dep.wv = increment_write_version();
          dep.trace_need_increase = void 0;
          dep.trace_v = void 0;
        }
      }
    }
    if (dev_fallback_default) {
      dev_effect_stack.push(effect2);
    }
  } catch (error) {
    handle_error(error, effect2, previous_effect, previous_component_context || effect2.ctx);
  } finally {
    is_updating_effect = was_updating_effect;
    active_effect = previous_effect;
    if (dev_fallback_default) {
      set_dev_current_component_function(previous_component_fn);
    }
  }
}
function log_effect_stack() {
  console.error(
    "Last ten effects were: ",
    dev_effect_stack.slice(-10).map((d) => d.fn)
  );
  dev_effect_stack = [];
}
function infinite_loop_guard() {
  try {
    effect_update_depth_exceeded();
  } catch (error) {
    if (dev_fallback_default) {
      define_property(error, "stack", {
        value: ""
      });
    }
    if (last_scheduled_effect !== null) {
      if (dev_fallback_default) {
        try {
          handle_error(error, last_scheduled_effect, null, null);
        } catch (e) {
          log_effect_stack();
          throw e;
        }
      } else {
        handle_error(error, last_scheduled_effect, null, null);
      }
    } else {
      if (dev_fallback_default) {
        log_effect_stack();
      }
      throw error;
    }
  }
}
function flush_queued_root_effects() {
  var was_updating_effect = is_updating_effect;
  try {
    var flush_count = 0;
    is_updating_effect = true;
    while (queued_root_effects.length > 0) {
      if (flush_count++ > 1e3) {
        infinite_loop_guard();
      }
      var root_effects = queued_root_effects;
      var length = root_effects.length;
      queued_root_effects = [];
      for (var i = 0; i < length; i++) {
        var collected_effects = process_effects(root_effects[i]);
        flush_queued_effects(collected_effects);
      }
      old_values.clear();
    }
  } finally {
    is_flushing = false;
    is_updating_effect = was_updating_effect;
    last_scheduled_effect = null;
    if (dev_fallback_default) {
      dev_effect_stack = [];
    }
  }
}
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0) return;
  for (var i = 0; i < length; i++) {
    var effect2 = effects[i];
    if ((effect2.f & (DESTROYED | INERT)) === 0) {
      try {
        if (check_dirtiness(effect2)) {
          update_effect(effect2);
          if (effect2.deps === null && effect2.first === null && effect2.nodes_start === null) {
            if (effect2.teardown === null) {
              unlink_effect(effect2);
            } else {
              effect2.fn = null;
            }
          }
        }
      } catch (error) {
        handle_error(error, effect2, null, effect2.ctx);
      }
    }
  }
}
function schedule_effect(signal) {
  if (!is_flushing) {
    is_flushing = true;
    queueMicrotask(flush_queued_root_effects);
  }
  var effect2 = last_scheduled_effect = signal;
  while (effect2.parent !== null) {
    effect2 = effect2.parent;
    var flags = effect2.f;
    if ((flags & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
      if ((flags & CLEAN) === 0) return;
      effect2.f ^= CLEAN;
    }
  }
  queued_root_effects.push(effect2);
}
function process_effects(root12) {
  var effects = [];
  var effect2 = root12;
  while (effect2 !== null) {
    var flags = effect2.f;
    var is_branch = (flags & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
    var is_skippable_branch = is_branch && (flags & CLEAN) !== 0;
    if (!is_skippable_branch && (flags & INERT) === 0) {
      if ((flags & EFFECT) !== 0) {
        effects.push(effect2);
      } else if (is_branch) {
        effect2.f ^= CLEAN;
      } else {
        var previous_active_reaction = active_reaction;
        try {
          active_reaction = effect2;
          if (check_dirtiness(effect2)) {
            update_effect(effect2);
          }
        } catch (error) {
          handle_error(error, effect2, null, effect2.ctx);
        } finally {
          active_reaction = previous_active_reaction;
        }
      }
      var child2 = effect2.first;
      if (child2 !== null) {
        effect2 = child2;
        continue;
      }
    }
    var parent = effect2.parent;
    effect2 = effect2.next;
    while (effect2 === null && parent !== null) {
      effect2 = parent.next;
      parent = parent.parent;
    }
  }
  return effects;
}
function flushSync(fn) {
  var result;
  if (fn) {
    is_flushing = true;
    flush_queued_root_effects();
    result = fn();
  }
  flush_tasks();
  while (queued_root_effects.length > 0) {
    is_flushing = true;
    flush_queued_root_effects();
    flush_tasks();
  }
  return (
    /** @type {T} */
    result
  );
}
function get(signal) {
  var flags = signal.f;
  var is_derived = (flags & DERIVED) !== 0;
  if (captured_signals !== null) {
    captured_signals.add(signal);
  }
  if (active_reaction !== null && !untracking) {
    if (!reaction_sources?.includes(signal)) {
      var deps = active_reaction.deps;
      if (signal.rv < read_version) {
        signal.rv = read_version;
        if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
          skipped_deps++;
        } else if (new_deps === null) {
          new_deps = [signal];
        } else if (!skip_reaction || !new_deps.includes(signal)) {
          new_deps.push(signal);
        }
      }
    }
  } else if (is_derived && /** @type {Derived} */
  signal.deps === null && /** @type {Derived} */
  signal.effects === null) {
    var derived3 = (
      /** @type {Derived} */
      signal
    );
    var parent = derived3.parent;
    if (parent !== null && (parent.f & UNOWNED) === 0) {
      derived3.f ^= UNOWNED;
    }
  }
  if (is_derived) {
    derived3 = /** @type {Derived} */
    signal;
    if (check_dirtiness(derived3)) {
      update_derived(derived3);
    }
  }
  if (dev_fallback_default && tracing_mode_flag && tracing_expressions !== null && active_reaction !== null && tracing_expressions.reaction === active_reaction) {
    if (signal.debug) {
      signal.debug();
    } else if (signal.created) {
      var entry = tracing_expressions.entries.get(signal);
      if (entry === void 0) {
        entry = { read: [] };
        tracing_expressions.entries.set(signal, entry);
      }
      entry.read.push(get_stack("TracedAt"));
    }
  }
  if (is_destroying_effect && old_values.has(signal)) {
    return old_values.get(signal);
  }
  return signal.v;
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
var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}

// node_modules/svelte/src/internal/client/reactivity/sources.js
var inspect_effects = /* @__PURE__ */ new Set();
var old_values = /* @__PURE__ */ new Map();
function set_inspect_effects(v) {
  inspect_effects = v;
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
    signal.created = stack2 ?? get_stack("CreatedAt");
    signal.debug = null;
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
function mutable_source(initial_value, immutable = false) {
  const s = source(initial_value);
  if (!immutable) {
    s.equals = safe_equals;
  }
  if (legacy_mode_flag && component_context !== null && component_context.l !== null) {
    (component_context.l.s ??= []).push(s);
  }
  return s;
}
function set(source2, value, should_proxy = false) {
  if (active_reaction !== null && !untracking && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT)) !== 0 && !reaction_sources?.includes(source2)) {
    state_unsafe_mutation();
  }
  let new_value = should_proxy ? proxy(value) : value;
  return internal_set(source2, new_value);
}
function internal_set(source2, value) {
  if (!source2.equals(value)) {
    var old_value = source2.v;
    if (is_destroying_effect) {
      old_values.set(source2, value);
    } else {
      old_values.set(source2, old_value);
    }
    source2.v = value;
    if (dev_fallback_default && tracing_mode_flag) {
      source2.updated = get_stack("UpdatedAt");
      if (active_effect != null) {
        source2.trace_need_increase = true;
        source2.trace_v ??= old_value;
      }
    }
    if ((source2.f & DERIVED) !== 0) {
      if ((source2.f & DIRTY) !== 0) {
        execute_derived(
          /** @type {Derived} */
          source2
        );
      }
      set_signal_status(source2, (source2.f & UNOWNED) === 0 ? CLEAN : MAYBE_DIRTY);
    }
    source2.wv = increment_write_version();
    mark_reactions(source2, DIRTY);
    if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
      if (untracked_writes === null) {
        set_untracked_writes([source2]);
      } else {
        untracked_writes.push(source2);
      }
    }
    if (dev_fallback_default && inspect_effects.size > 0) {
      const inspects = Array.from(inspect_effects);
      for (const effect2 of inspects) {
        if ((effect2.f & CLEAN) !== 0) {
          set_signal_status(effect2, MAYBE_DIRTY);
        }
        if (check_dirtiness(effect2)) {
          update_effect(effect2);
        }
      }
      inspect_effects.clear();
    }
  }
  return value;
}
function mark_reactions(signal, status) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  var runes = is_runes();
  var length = reactions.length;
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0) continue;
    if (!runes && reaction === active_effect) continue;
    if (dev_fallback_default && (flags & INSPECT_EFFECT) !== 0) {
      inspect_effects.add(reaction);
      continue;
    }
    set_signal_status(reaction, status);
    if ((flags & (CLEAN | UNOWNED)) !== 0) {
      if ((flags & DERIVED) !== 0) {
        mark_reactions(
          /** @type {Derived} */
          reaction,
          MAYBE_DIRTY
        );
      } else {
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
}

// node_modules/svelte/src/internal/client/context.js
var component_context = null;
function set_component_context(context) {
  component_context = context;
}
var dev_current_component_function = null;
function set_dev_current_component_function(fn) {
  dev_current_component_function = fn;
}
function push(props, runes = false, fn) {
  var ctx = component_context = {
    p: component_context,
    c: null,
    d: false,
    e: null,
    m: false,
    s: props,
    x: null,
    l: null
  };
  if (legacy_mode_flag && !runes) {
    component_context.l = {
      s: null,
      u: null,
      r1: [],
      r2: source(false)
    };
  }
  teardown(() => {
    ctx.d = true;
  });
  if (dev_fallback_default) {
    component_context.function = fn;
    dev_current_component_function = fn;
  }
}
function pop(component2) {
  const context_stack_item = component_context;
  if (context_stack_item !== null) {
    if (component2 !== void 0) {
      context_stack_item.x = component2;
    }
    const component_effects = context_stack_item.e;
    if (component_effects !== null) {
      var previous_effect = active_effect;
      var previous_reaction = active_reaction;
      context_stack_item.e = null;
      try {
        for (var i = 0; i < component_effects.length; i++) {
          var component_effect = component_effects[i];
          set_active_effect(component_effect.effect);
          set_active_reaction(component_effect.reaction);
          effect(component_effect.fn);
        }
      } finally {
        set_active_effect(previous_effect);
        set_active_reaction(previous_reaction);
      }
    }
    component_context = context_stack_item.p;
    if (dev_fallback_default) {
      dev_current_component_function = context_stack_item.p?.function ?? null;
    }
    context_stack_item.m = true;
  }
  return component2 || /** @type {T} */
  {};
}
function is_runes() {
  return !legacy_mode_flag || component_context !== null && component_context.l === null;
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
  "hidden",
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
function sanitize_location(location) {
  return (
    /** @type {T} */
    location?.replace(/\//g, "/\u200B")
  );
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
    var node = hydrating ? dom : dom.nodeType === 11 ? dom.firstChild : dom;
    assign_locations(node, filename, locations);
    return dom;
  };
}
function assign_location(element2, filename, location) {
  element2.__svelte_meta = {
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
    if (hydrating && node.nodeType === 8) {
      var comment2 = (
        /** @type {Comment} */
        node
      );
      if (comment2.data === HYDRATION_START || comment2.data === HYDRATION_START_ELSE) depth += 1;
      else if (comment2.data[0] === HYDRATION_END) depth -= 1;
    }
    if (depth === 0 && node.nodeType === 1) {
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
      // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
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

// node_modules/svelte/src/internal/client/dom/elements/events.js
var all_registered_events = /* @__PURE__ */ new Set();
var root_event_handles = /* @__PURE__ */ new Set();
function replay_events(dom) {
  if (!hydrating) return;
  if (dom.onload) {
    dom.removeAttribute("onload");
  }
  if (dom.onerror) {
    dom.removeAttribute("onerror");
  }
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
function event(event_name, dom, handler, capture, passive2) {
  var options = { capture, passive: passive2 };
  var target_handler = create_event(event_name, dom, handler, options);
  if (dom === document.body || dom === window || dom === document) {
    teardown(() => {
      dom.removeEventListener(event_name, target_handler, options);
    });
  }
}
function delegate(events) {
  for (var i = 0; i < events.length; i++) {
    all_registered_events.add(events[i]);
  }
  for (var fn of root_event_handles) {
    fn(events);
  }
}
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
  var path_idx = 0;
  var handled_at = event2.__root;
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event2.__root = handler_element;
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
        var delegated = current_target["__" + event_name];
        if (delegated != null && (!/** @type {any} */
        current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
        // -> the target could not have been disabled because it emits the event in the first place
        event2.target === current_target)) {
          if (is_array(delegated)) {
            var [fn, ...data] = delegated;
            fn.apply(current_target, [event2, ...data]);
          } else {
            delegated.call(current_target, event2);
          }
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
    event2.__root = handler_element;
    delete event2.currentTarget;
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}

// node_modules/svelte/src/internal/client/dom/blocks/svelte-head.js
var head_anchor;
function reset_head_anchor() {
  head_anchor = void 0;
}

// node_modules/svelte/src/internal/client/dom/reconciler.js
function create_fragment_from_html(html2) {
  var elem = document.createElement("template");
  elem.innerHTML = html2;
  return elem.content;
}

// node_modules/svelte/src/internal/client/dom/template.js
function assign_nodes(start, end) {
  var effect2 = (
    /** @type {Effect} */
    active_effect
  );
  if (effect2.nodes_start === null) {
    effect2.nodes_start = start;
    effect2.nodes_end = end;
  }
}
// @__NO_SIDE_EFFECTS__
function template(content, flags) {
  var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
  var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
  var node;
  var has_start = !content.startsWith("<!>");
  return () => {
    if (hydrating) {
      assign_nodes(hydrate_node, null);
      return hydrate_node;
    }
    if (node === void 0) {
      node = create_fragment_from_html(has_start ? content : "<!>" + content);
      if (!is_fragment) node = /** @type {Node} */
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
function ns_template(content, flags, ns = "svg") {
  var has_start = !content.startsWith("<!>");
  var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
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
      var root12 = (
        /** @type {Element} */
        get_first_child(fragment)
      );
      if (is_fragment) {
        node = document.createDocumentFragment();
        while (get_first_child(root12)) {
          node.appendChild(
            /** @type {Node} */
            get_first_child(root12)
          );
        }
      } else {
        node = /** @type {Element} */
        get_first_child(root12);
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
    active_effect.nodes_end = hydrate_node;
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

// node_modules/svelte/src/internal/client/render.js
var should_intro = true;
function set_text(text2, value) {
  var str = value == null ? "" : typeof value === "object" ? value + "" : value;
  if (str !== (text2.__t ??= text2.nodeValue)) {
    text2.__t = str;
    text2.nodeValue = str + "";
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
    var anchor = (
      /** @type {TemplateNode} */
      get_first_child(target)
    );
    while (anchor && (anchor.nodeType !== 8 || /** @type {Comment} */
    anchor.data !== HYDRATION_START)) {
      anchor = /** @type {TemplateNode} */
      get_next_sibling(anchor);
    }
    if (!anchor) {
      throw HYDRATION_ERROR;
    }
    set_hydrating(true);
    set_hydrate_node(
      /** @type {Comment} */
      anchor
    );
    hydrate_next();
    const instance = _mount(component2, { ...options, anchor });
    if (hydrate_node === null || hydrate_node.nodeType !== 8 || /** @type {Comment} */
    hydrate_node.data !== HYDRATION_END) {
      hydration_mismatch();
      throw HYDRATION_ERROR;
    }
    set_hydrating(false);
    return (
      /**  @type {Exports} */
      instance
    );
  } catch (error) {
    if (error === HYDRATION_ERROR) {
      if (options.recover === false) {
        hydration_failed();
      }
      init_operations();
      clear_text_content(target);
      set_hydrating(false);
      return mount(component2, options);
    }
    throw error;
  } finally {
    set_hydrating(was_hydrating);
    set_hydrate_node(previous_hydrate_node);
    reset_head_anchor();
  }
}
var document_listeners = /* @__PURE__ */ new Map();
function _mount(Component, { target, anchor, props = {}, events, context, intro = true }) {
  init_operations();
  var registered_events = /* @__PURE__ */ new Set();
  var event_handle = (events2) => {
    for (var i = 0; i < events2.length; i++) {
      var event_name = events2[i];
      if (registered_events.has(event_name)) continue;
      registered_events.add(event_name);
      var passive2 = is_passive_event(event_name);
      target.addEventListener(event_name, handle_event_propagation, { passive: passive2 });
      var n = document_listeners.get(event_name);
      if (n === void 0) {
        document.addEventListener(event_name, handle_event_propagation, { passive: passive2 });
        document_listeners.set(event_name, 1);
      } else {
        document_listeners.set(event_name, n + 1);
      }
    }
  };
  event_handle(array_from(all_registered_events));
  root_event_handles.add(event_handle);
  var component2 = void 0;
  var unmount2 = component_root(() => {
    var anchor_node = anchor ?? target.appendChild(create_text());
    branch(() => {
      if (context) {
        push({});
        var ctx = (
          /** @type {ComponentContext} */
          component_context
        );
        ctx.c = context;
      }
      if (events) {
        props.$$events = events;
      }
      if (hydrating) {
        assign_nodes(
          /** @type {TemplateNode} */
          anchor_node,
          null
        );
      }
      should_intro = intro;
      component2 = Component(anchor_node, props) || {};
      should_intro = true;
      if (hydrating) {
        active_effect.nodes_end = hydrate_node;
      }
      if (context) {
        pop();
      }
    });
    return () => {
      for (var event_name of registered_events) {
        target.removeEventListener(event_name, handle_event_propagation);
        var n = (
          /** @type {number} */
          document_listeners.get(event_name)
        );
        if (--n === 0) {
          document.removeEventListener(event_name, handle_event_propagation);
          document_listeners.delete(event_name);
        } else {
          document_listeners.set(event_name, n);
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
    lifecycle_double_unmount();
  }
  return Promise.resolve();
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
function if_block(node, fn, [root_index, hydrate_index] = [0, 0]) {
  if (hydrating && root_index === 0) {
    hydrate_next();
  }
  var anchor = node;
  var consequent_effect = null;
  var alternate_effect = null;
  var condition = UNINITIALIZED;
  var flags = root_index > 0 ? EFFECT_TRANSPARENT : 0;
  var has_branch = false;
  const set_branch = (fn2, flag = true) => {
    has_branch = true;
    update_branch(flag, fn2);
  };
  const update_branch = (new_condition, fn2) => {
    if (condition === (condition = new_condition)) return;
    let mismatch = false;
    if (hydrating && hydrate_index !== -1) {
      if (root_index === 0) {
        const data = (
          /** @type {Comment} */
          anchor.data
        );
        if (data === HYDRATION_START) {
          hydrate_index = 0;
        } else if (data === HYDRATION_START_ELSE) {
          hydrate_index = Infinity;
        } else {
          hydrate_index = parseInt(data.substring(1));
          if (hydrate_index !== hydrate_index) {
            hydrate_index = condition ? Infinity : -1;
          }
        }
      }
      const is_else = hydrate_index > root_index;
      if (!!condition === is_else) {
        anchor = remove_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
        hydrate_index = -1;
      }
    }
    if (condition) {
      if (consequent_effect) {
        resume_effect(consequent_effect);
      } else if (fn2) {
        consequent_effect = branch(() => fn2(anchor));
      }
      if (alternate_effect) {
        pause_effect(alternate_effect, () => {
          alternate_effect = null;
        });
      }
    } else {
      if (alternate_effect) {
        resume_effect(alternate_effect);
      } else if (fn2) {
        alternate_effect = branch(() => fn2(anchor, [root_index + 1, hydrate_index]));
      }
      if (consequent_effect) {
        pause_effect(consequent_effect, () => {
          consequent_effect = null;
        });
      }
    }
    if (mismatch) {
      set_hydrating(true);
    }
  };
  block(() => {
    has_branch = false;
    fn(set_branch);
    if (!has_branch) {
      update_branch(null, null);
    }
  }, flags);
  if (hydrating) {
    anchor = hydrate_node;
  }
}

// node_modules/svelte/src/internal/client/dom/blocks/each.js
var current_each_item = null;
function index(_, i) {
  return i;
}
function pause_effects(state2, items, controlled_anchor, items_map) {
  var transitions = [];
  var length = items.length;
  for (var i = 0; i < length; i++) {
    pause_children(items[i].e, transitions, true);
  }
  var is_controlled = length > 0 && transitions.length === 0 && controlled_anchor !== null;
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      /** @type {Element} */
      controlled_anchor.parentNode
    );
    clear_text_content(parent_node);
    parent_node.append(
      /** @type {Element} */
      controlled_anchor
    );
    items_map.clear();
    link(state2, items[0].prev, items[length - 1].next);
  }
  run_out_transitions(transitions, () => {
    for (var i2 = 0; i2 < length; i2++) {
      var item = items[i2];
      if (!is_controlled) {
        items_map.delete(item.k);
        link(state2, item.prev, item.next);
      }
      destroy_effect(item.e, !is_controlled);
    }
  });
}
function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
  var anchor = node;
  var state2 = { flags, items: /* @__PURE__ */ new Map(), first: null };
  var is_controlled = (flags & EACH_IS_CONTROLLED) !== 0;
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      node
    );
    anchor = hydrating ? set_hydrate_node(
      /** @type {Comment | Text} */
      get_first_child(parent_node)
    ) : parent_node.appendChild(create_text());
  }
  if (hydrating) {
    hydrate_next();
  }
  var fallback2 = null;
  var was_empty = false;
  var each_array = derived_safe_equal(() => {
    var collection = get_collection();
    return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
  });
  block(() => {
    var array = get(each_array);
    var length = array.length;
    if (was_empty && length === 0) {
      return;
    }
    was_empty = length === 0;
    let mismatch = false;
    if (hydrating) {
      var is_else = (
        /** @type {Comment} */
        anchor.data === HYDRATION_START_ELSE
      );
      if (is_else !== (length === 0)) {
        anchor = remove_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
      }
    }
    if (hydrating) {
      var prev = null;
      var item;
      for (var i = 0; i < length; i++) {
        if (hydrate_node.nodeType === 8 && /** @type {Comment} */
        hydrate_node.data === HYDRATION_END) {
          anchor = /** @type {Comment} */
          hydrate_node;
          mismatch = true;
          set_hydrating(false);
          break;
        }
        var value = array[i];
        var key = get_key(value, i);
        item = create_item(
          hydrate_node,
          state2,
          prev,
          null,
          value,
          key,
          i,
          render_fn,
          flags,
          get_collection
        );
        state2.items.set(key, item);
        prev = item;
      }
      if (length > 0) {
        set_hydrate_node(remove_nodes());
      }
    }
    if (!hydrating) {
      reconcile(array, state2, anchor, render_fn, flags, get_key, get_collection);
    }
    if (fallback_fn !== null) {
      if (length === 0) {
        if (fallback2) {
          resume_effect(fallback2);
        } else {
          fallback2 = branch(() => fallback_fn(anchor));
        }
      } else if (fallback2 !== null) {
        pause_effect(fallback2, () => {
          fallback2 = null;
        });
      }
    }
    if (mismatch) {
      set_hydrating(true);
    }
    get(each_array);
  });
  if (hydrating) {
    anchor = hydrate_node;
  }
}
function reconcile(array, state2, anchor, render_fn, flags, get_key, get_collection) {
  var is_animated = (flags & EACH_IS_ANIMATED) !== 0;
  var should_update = (flags & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0;
  var length = array.length;
  var items = state2.items;
  var first = state2.first;
  var current = first;
  var seen;
  var prev = null;
  var to_animate;
  var matched = [];
  var stashed = [];
  var value;
  var key;
  var item;
  var i;
  if (is_animated) {
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      item = items.get(key);
      if (item !== void 0) {
        item.a?.measure();
        (to_animate ??= /* @__PURE__ */ new Set()).add(item);
      }
    }
  }
  for (i = 0; i < length; i += 1) {
    value = array[i];
    key = get_key(value, i);
    item = items.get(key);
    if (item === void 0) {
      var child_anchor = current ? (
        /** @type {TemplateNode} */
        current.e.nodes_start
      ) : anchor;
      prev = create_item(
        child_anchor,
        state2,
        prev,
        prev === null ? state2.first : prev.next,
        value,
        key,
        i,
        render_fn,
        flags,
        get_collection
      );
      items.set(key, prev);
      matched = [];
      stashed = [];
      current = prev.next;
      continue;
    }
    if (should_update) {
      update_item(item, value, i, flags);
    }
    if ((item.e.f & INERT) !== 0) {
      resume_effect(item.e);
      if (is_animated) {
        item.a?.unfix();
        (to_animate ??= /* @__PURE__ */ new Set()).delete(item);
      }
    }
    if (item !== current) {
      if (seen !== void 0 && seen.has(item)) {
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
          seen.delete(item);
          move(item, current, anchor);
          link(state2, item.prev, item.next);
          link(state2, item, prev === null ? state2.first : prev.next);
          link(state2, prev, item);
          prev = item;
        }
        continue;
      }
      matched = [];
      stashed = [];
      while (current !== null && current.k !== key) {
        if ((current.e.f & INERT) === 0) {
          (seen ??= /* @__PURE__ */ new Set()).add(current);
        }
        stashed.push(current);
        current = current.next;
      }
      if (current === null) {
        continue;
      }
      item = current;
    }
    matched.push(item);
    prev = item;
    current = item.next;
  }
  if (current !== null || seen !== void 0) {
    var to_destroy = seen === void 0 ? [] : array_from(seen);
    while (current !== null) {
      if ((current.e.f & INERT) === 0) {
        to_destroy.push(current);
      }
      current = current.next;
    }
    var destroy_length = to_destroy.length;
    if (destroy_length > 0) {
      var controlled_anchor = (flags & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
      if (is_animated) {
        for (i = 0; i < destroy_length; i += 1) {
          to_destroy[i].a?.measure();
        }
        for (i = 0; i < destroy_length; i += 1) {
          to_destroy[i].a?.fix();
        }
      }
      pause_effects(state2, to_destroy, controlled_anchor, items);
    }
  }
  if (is_animated) {
    queue_micro_task(() => {
      if (to_animate === void 0) return;
      for (item of to_animate) {
        item.a?.apply();
      }
    });
  }
  active_effect.first = state2.first && state2.first.e;
  active_effect.last = prev && prev.e;
}
function update_item(item, value, index2, type) {
  if ((type & EACH_ITEM_REACTIVE) !== 0) {
    internal_set(item.v, value);
  }
  if ((type & EACH_INDEX_REACTIVE) !== 0) {
    internal_set(
      /** @type {Value<number>} */
      item.i,
      index2
    );
  } else {
    item.i = index2;
  }
}
function create_item(anchor, state2, prev, next2, value, key, index2, render_fn, flags, get_collection) {
  var previous_each_item = current_each_item;
  var reactive = (flags & EACH_ITEM_REACTIVE) !== 0;
  var mutable = (flags & EACH_ITEM_IMMUTABLE) === 0;
  var v = reactive ? mutable ? mutable_source(value) : source(value) : value;
  var i = (flags & EACH_INDEX_REACTIVE) === 0 ? index2 : source(index2);
  if (dev_fallback_default && reactive) {
    v.debug = () => {
      var collection_index = typeof i === "number" ? index2 : i.v;
      get_collection()[collection_index];
    };
  }
  var item = {
    i,
    v,
    k: key,
    a: null,
    // @ts-expect-error
    e: null,
    prev,
    next: next2
  };
  current_each_item = item;
  try {
    item.e = branch(() => render_fn(anchor, v, i, get_collection), hydrating);
    item.e.prev = prev && prev.e;
    item.e.next = next2 && next2.e;
    if (prev === null) {
      state2.first = item;
    } else {
      prev.next = item;
      prev.e.next = item.e;
    }
    if (next2 !== null) {
      next2.prev = item;
      next2.e.prev = item.e;
    }
    return item;
  } finally {
    current_each_item = previous_each_item;
  }
}
function move(item, next2, anchor) {
  var end = item.next ? (
    /** @type {TemplateNode} */
    item.next.e.nodes_start
  ) : anchor;
  var dest = next2 ? (
    /** @type {TemplateNode} */
    next2.e.nodes_start
  ) : anchor;
  var node = (
    /** @type {TemplateNode} */
    item.e.nodes_start
  );
  while (node !== end) {
    var next_node = (
      /** @type {TemplateNode} */
      get_next_sibling(node)
    );
    dest.before(node);
    node = next_node;
  }
}
function link(state2, prev, next2) {
  if (prev === null) {
    state2.first = next2;
  } else {
    prev.next = next2;
    prev.e.next = next2 && next2.e;
  }
  if (next2 !== null) {
    next2.prev = prev;
    next2.e.prev = prev && prev.e;
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
function html(node, get_value, svg, mathml, skip_warning) {
  var anchor = node;
  var value = "";
  var effect2;
  block(() => {
    if (value === (value = get_value() ?? "")) {
      if (hydrating) {
        hydrate_next();
      }
      return;
    }
    if (effect2 !== void 0) {
      destroy_effect(effect2);
      effect2 = void 0;
    }
    if (value === "") return;
    effect2 = branch(() => {
      if (hydrating) {
        var hash2 = (
          /** @type {Comment} */
          hydrate_node.data
        );
        var next2 = hydrate_next();
        var last = next2;
        while (next2 !== null && (next2.nodeType !== 8 || /** @type {Comment} */
        next2.data !== "")) {
          last = next2;
          next2 = /** @type {TemplateNode} */
          get_next_sibling(next2);
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
      var html2 = value + "";
      if (svg) html2 = `<svg>${html2}</svg>`;
      else if (mathml) html2 = `<math>${html2}</math>`;
      var node2 = create_fragment_from_html(html2);
      if (svg || mathml) {
        node2 = /** @type {Element} */
        get_first_child(node2);
      }
      assign_nodes(
        /** @type {TemplateNode} */
        get_first_child(node2),
        /** @type {TemplateNode} */
        node2.lastChild
      );
      if (svg || mathml) {
        while (get_first_child(node2)) {
          anchor.before(
            /** @type {Node} */
            get_first_child(node2)
          );
        }
      } else {
        anchor.before(node2);
      }
    });
  });
}

// node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
function component(node, get_component, render_fn) {
  if (hydrating) {
    hydrate_next();
  }
  var anchor = node;
  var component2;
  var effect2;
  block(() => {
    if (component2 === (component2 = get_component())) return;
    if (effect2) {
      pause_effect(effect2);
      effect2 = null;
    }
    if (component2) {
      effect2 = branch(() => render_fn(anchor, component2));
    }
  }, EFFECT_TRANSPARENT);
  if (hydrating) {
    anchor = hydrate_node;
  }
}

// node_modules/svelte/src/internal/client/dom/css.js
function append_styles(anchor, css) {
  queue_micro_task(() => {
    var root12 = anchor.getRootNode();
    var target = (
      /** @type {ShadowRoot} */
      root12.host ? (
        /** @type {ShadowRoot} */
        root12
      ) : (
        /** @type {Document} */
        root12.head ?? /** @type {Document} */
        root12.ownerDocument.head
      )
    );
    if (!target.querySelector("#" + css.hash)) {
      const style = document.createElement("style");
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
    for (var key in directives) {
      if (directives[key]) {
        classname = classname ? classname + " " + key : key;
      } else if (classname.length) {
        var len = key.length;
        var a = 0;
        while ((a = classname.indexOf(key, a)) >= 0) {
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
  for (var key in styles) {
    var value = styles[key];
    if (value != null && value !== "") {
      css += " " + key + ": " + value + separator;
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
    for (var key in next_classes) {
      var is_present = !!next_classes[key];
      if (prev_classes == null || is_present !== !!prev_classes[key]) {
        dom.classList.toggle(key, is_present);
      }
    }
  }
  return next_classes;
}

// node_modules/svelte/src/internal/client/dom/elements/style.js
function update_styles(dom, prev = {}, next2, priority) {
  for (var key in next2) {
    var value = next2[key];
    if (prev[key] !== value) {
      if (next2[key] == null) {
        dom.style.removeProperty(key);
      } else {
        dom.style.setProperty(key, value, priority);
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

// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var CLASS = Symbol("class");
var STYLE = Symbol("style");
var IS_CUSTOM_ELEMENT = Symbol("is custom element");
var IS_HTML = Symbol("is html");
function remove_input_defaults(input) {
  if (!hydrating) return;
  var already_removed = false;
  var remove_defaults = () => {
    if (already_removed) return;
    already_removed = true;
    if (input.hasAttribute("value")) {
      var value = input.value;
      set_attribute(input, "value", null);
      input.value = value;
    }
    if (input.hasAttribute("checked")) {
      var checked = input.checked;
      set_attribute(input, "checked", null);
      input.checked = checked;
    }
  };
  input.__on_r = remove_defaults;
  queue_idle_task(remove_defaults);
  add_form_reset_listener();
}
function set_value(element2, value) {
  var attributes = get_attributes(element2);
  if (attributes.value === (attributes.value = // treat null and undefined the same for the initial value
  value ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  element2.value === value && (value !== 0 || element2.nodeName !== "PROGRESS")) {
    return;
  }
  element2.value = value ?? "";
}
function set_attribute(element2, attribute, value, skip_warning) {
  var attributes = get_attributes(element2);
  if (hydrating) {
    attributes[attribute] = element2.getAttribute(attribute);
    if (attribute === "src" || attribute === "srcset" || attribute === "href" && element2.nodeName === "LINK") {
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
  var setters = setters_cache.get(element2.nodeName);
  if (setters) return setters;
  setters_cache.set(element2.nodeName, setters = []);
  var descriptors;
  var proto = element2;
  var element_proto = Element.prototype;
  while (element_proto !== proto) {
    descriptors = get_descriptors(proto);
    for (var key in descriptors) {
      if (descriptors[key].set) {
        setters.push(key);
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
  var runes = is_runes();
  listen_to_event_and_reset_event(input, "input", (is_reset) => {
    if (dev_fallback_default && input.type === "checkbox") {
      bind_invalid_checkbox_value();
    }
    var value = is_reset ? input.defaultValue : input.value;
    value = is_numberlike_input(input) ? to_number(value) : value;
    set2(value);
    if (runes && value !== (value = get3())) {
      var start = input.selectionStart;
      var end = input.selectionEnd;
      input.value = value ?? "";
      if (end !== null) {
        input.selectionStart = start;
        input.selectionEnd = Math.min(end, input.value.length);
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
  }
  render_effect(() => {
    if (dev_fallback_default && input.type === "checkbox") {
      bind_invalid_checkbox_value();
    }
    var value = get3();
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
function bind_checked(input, get3, set2 = get3) {
  listen_to_event_and_reset_event(input, "change", (is_reset) => {
    var value = is_reset ? input.defaultChecked : input.checked;
    set2(value);
  });
  if (
    // If we are hydrating and the value has since changed,
    // then use the update value from the input instead.
    hydrating && input.defaultChecked !== input.checked || // If defaultChecked is set, then checked == defaultChecked
    untrack(get3) == null
  ) {
    set2(input.checked);
  }
  render_effect(() => {
    var value = get3();
    input.checked = Boolean(value);
  });
}
function is_numberlike_input(input) {
  var type = input.type;
  return type === "number" || type === "range";
}
function to_number(value) {
  return value === "" ? null : +value;
}

// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function select_option(select, value, mounting) {
  if (select.multiple) {
    return select_options(select, value);
  }
  for (var option of select.options) {
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
function init_select(select, get_value) {
  let mounting = true;
  effect(() => {
    if (get_value) {
      select_option(select, untrack(get_value), mounting);
    }
    mounting = false;
    var observer = new MutationObserver(() => {
      var value = select.__value;
      select_option(select, value);
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
    return () => {
      observer.disconnect();
    };
  });
}
function bind_select_value(select, get3, set2 = get3) {
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
  });
  effect(() => {
    var value = get3();
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
function select_options(select, value) {
  for (var option of select.options) {
    option.selected = ~value.indexOf(get_option_value(option));
  }
}
function get_option_value(option) {
  if ("__value" in option) {
    return option.__value;
  } else {
    return option.value;
  }
}

// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function is_bound_this(bound_value, element_or_component) {
  return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
}
function bind_this(element_or_component = {}, update2, get_value, get_parts) {
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
      queue_micro_task(() => {
        if (parts && is_bound_this(get_value(...parts), element_or_component)) {
          update2(null, ...parts);
        }
      });
    };
  });
  return element_or_component;
}

// node_modules/svelte/src/internal/client/dom/legacy/event-modifiers.js
function preventDefault(fn) {
  return function(...args) {
    var event2 = (
      /** @type {Event} */
      args[0]
    );
    event2.preventDefault();
    return fn?.apply(this, args);
  };
}

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

// node_modules/svelte/src/store/utils.js
function subscribe_to_store(store, run2, invalidate) {
  if (store == null) {
    run2(void 0);
    if (invalidate) invalidate(void 0);
    return noop;
  }
  const unsub = untrack(
    () => store.subscribe(
      run2,
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
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update2) || noop;
    }
    run2(
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
function get2(store) {
  let value;
  subscribe_to_store(store, (_) => value = _)();
  return value;
}

// node_modules/svelte/src/internal/client/reactivity/store.js
var is_store_binding = false;
var IS_UNMOUNTED = Symbol();
function store_get(store, store_name, stores) {
  const entry = stores[store_name] ??= {
    store: null,
    source: mutable_source(void 0),
    unsubscribe: noop
  };
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
    return get2(store);
  }
  return get(entry.source);
}
function store_set(store, value) {
  store.set(value);
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
function store_mutate(store, expression, new_value) {
  store.set(new_value);
  return expression;
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

// node_modules/svelte/src/internal/client/reactivity/props.js
function has_destroyed_component_ctx(current_value) {
  return current_value.ctx?.d ?? false;
}
function prop(props, key, flags, fallback2) {
  var immutable = (flags & PROPS_IS_IMMUTABLE) !== 0;
  var runes = !legacy_mode_flag || (flags & PROPS_IS_RUNES) !== 0;
  var bindable = (flags & PROPS_IS_BINDABLE) !== 0;
  var lazy = (flags & PROPS_IS_LAZY_INITIAL) !== 0;
  var is_store_sub = false;
  var prop_value;
  if (bindable) {
    [prop_value, is_store_sub] = capture_store_binding(() => (
      /** @type {V} */
      props[key]
    ));
  } else {
    prop_value = /** @type {V} */
    props[key];
  }
  var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
  var setter = bindable && (get_descriptor(props, key)?.set ?? (is_entry_props && key in props && ((v) => props[key] = v))) || void 0;
  var fallback_value = (
    /** @type {V} */
    fallback2
  );
  var fallback_dirty = true;
  var fallback_used = false;
  var get_fallback = () => {
    fallback_used = true;
    if (fallback_dirty) {
      fallback_dirty = false;
      if (lazy) {
        fallback_value = untrack(
          /** @type {() => V} */
          fallback2
        );
      } else {
        fallback_value = /** @type {V} */
        fallback2;
      }
    }
    return fallback_value;
  };
  if (prop_value === void 0 && fallback2 !== void 0) {
    if (setter && runes) {
      props_invalid_value(key);
    }
    prop_value = get_fallback();
    if (setter) setter(prop_value);
  }
  var getter;
  if (runes) {
    getter = () => {
      var value = (
        /** @type {V} */
        props[key]
      );
      if (value === void 0) return get_fallback();
      fallback_dirty = true;
      fallback_used = false;
      return value;
    };
  } else {
    var derived_getter = (immutable ? derived : derived_safe_equal)(
      () => (
        /** @type {V} */
        props[key]
      )
    );
    derived_getter.f |= LEGACY_DERIVED_PROP;
    getter = () => {
      var value = get(derived_getter);
      if (value !== void 0) fallback_value = /** @type {V} */
      void 0;
      return value === void 0 ? fallback_value : value;
    };
  }
  if ((flags & PROPS_IS_UPDATED) === 0) {
    return getter;
  }
  if (setter) {
    var legacy_parent = props.$$legacy;
    return function(value, mutation) {
      if (arguments.length > 0) {
        if (!runes || !mutation || legacy_parent || is_store_sub) {
          setter(mutation ? getter() : value);
        }
        return value;
      } else {
        return getter();
      }
    };
  }
  var from_child = false;
  var was_from_child = false;
  var inner_current_value = mutable_source(prop_value);
  var current_value = derived(() => {
    var parent_value = getter();
    var child_value = get(inner_current_value);
    if (from_child) {
      from_child = false;
      was_from_child = true;
      return child_value;
    }
    was_from_child = false;
    return inner_current_value.v = parent_value;
  });
  if (bindable) {
    get(current_value);
  }
  if (!immutable) current_value.equals = safe_equals;
  return function(value, mutation) {
    if (captured_signals !== null) {
      from_child = was_from_child;
      getter();
      get(inner_current_value);
    }
    if (arguments.length > 0) {
      const new_value = mutation ? get(current_value) : runes && bindable ? proxy(value) : value;
      if (!current_value.equals(new_value)) {
        from_child = true;
        set(inner_current_value, new_value);
        if (fallback_used && fallback_value !== void 0) {
          fallback_value = new_value;
        }
        if (has_destroyed_component_ctx(current_value)) {
          return value;
        }
        untrack(() => get(current_value));
      }
      return value;
    }
    if (has_destroyed_component_ctx(current_value)) {
      return current_value.v;
    }
    return get(current_value);
  };
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
    var add_source = (key, value) => {
      var s = mutable_source(value);
      sources.set(key, s);
      return s;
    };
    const props = new Proxy(
      { ...options.props || {}, $$events: {} },
      {
        get(target, prop2) {
          return get(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
        },
        has(target, prop2) {
          if (prop2 === LEGACY_PROPS) return true;
          get(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
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
      recover: options.recover
    });
    if (!options?.props?.$$host || options.sync === false) {
      flushSync();
    }
    this.#events = props.$$events;
    for (const key of Object.keys(this.#instance)) {
      if (key === "$set" || key === "$destroy" || key === "$on") continue;
      define_property(this, key, {
        get() {
          return this.#instance[key];
        },
        /** @param {any} value */
        set(value) {
          this.#instance[key] = value;
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
    /**
     * @param {*} $$componentCtor
     * @param {*} $$slots
     * @param {*} use_shadow_dom
     */
    constructor($$componentCtor, $$slots, use_shadow_dom) {
      super();
      this.$$ctor = $$componentCtor;
      this.$$s = $$slots;
      if (use_shadow_dom) {
        this.attachShadow({ mode: "open" });
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
            const slot2 = document.createElement("slot");
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
        for (const key in this.$$p_d) {
          if (!(key in this.$$d) && this[key] !== void 0) {
            this.$$d[key] = this[key];
            delete this[key];
          }
        }
        this.$$c = createClassComponent({
          component: this.$$ctor,
          target: this.shadowRoot || this,
          props: {
            ...this.$$d,
            $$slots,
            $$host: this
          }
        });
        this.$$me = effect_root(() => {
          render_effect(() => {
            this.$$r = true;
            for (const key of object_keys(this.$$c)) {
              if (!this.$$p_d[key]?.reflect) continue;
              this.$$d[key] = this.$$c[key];
              const attribute_value = get_custom_element_value(
                key,
                this.$$d[key],
                this.$$p_d,
                "toAttribute"
              );
              if (attribute_value == null) {
                this.removeAttribute(this.$$p_d[key].attribute || key);
              } else {
                this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
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
        (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
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
function create_custom_element(Component, props_definition, slots, exports, use_shadow_dom, extend) {
  let Class = class extends SvelteElement {
    constructor() {
      super(Component, slots, use_shadow_dom);
      this.$$p_d = props_definition;
    }
    static get observedAttributes() {
      return object_keys(props_definition).map(
        (key) => (props_definition[key].attribute || key).toLowerCase()
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

// node_modules/svelte/src/internal/shared/validate.js
function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== "function") {
    store_invalid_shape(name);
  }
}

// Resources/Private/JavaScript/components/Image.svelte
import interact from "interactjs";

// Resources/Private/JavaScript/shapes/Polygon.svelte
Polygon[FILENAME] = "Resources/Private/JavaScript/shapes/Polygon.svelte";
var root_1 = add_locations(ns_template(`<circle r="3" class="shape-handle"></circle>`), Polygon[FILENAME], [[26, 4]]);
var root = add_locations(ns_template(`<polygon></polygon><!>`, 1), Polygon[FILENAME], [[21, 0]]);
function Polygon($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Polygon);
  const [$$stores, $$cleanup] = setup_stores();
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const index2 = prop($$props, "index", 7);
  function onCircleDblClick(event2) {
    const index3 = parseInt(event2.target.getAttribute("data-index"));
    const pointIndex = parseInt(event2.target.getAttribute("data-point-index"));
    store_mutate(focuspoints, untrack($focuspoints)[index3].__data.points = $focuspoints()[index3].__data.points.filter((point, i) => strict_equals(i, pointIndex, false)), untrack($focuspoints));
  }
  function getPoints() {
    return $focuspoints()[index2()].__data.points;
  }
  function onHandleDblClick(event2) {
  }
  var fragment = root();
  var polygon = first_child(fragment);
  var node = sibling(polygon);
  each(node, 1, () => $focuspoints()[index2()].__data.points, index, ($$anchor2, $$item, pointIndex) => {
    let x = () => get($$item)[0];
    x();
    let y = () => get($$item)[1];
    y();
    var circle = root_1();
    set_attribute(circle, "data-point-index", pointIndex);
    circle.__dblclick = onCircleDblClick;
    template_effect(() => {
      set_attribute(circle, "cx", x());
      set_attribute(circle, "cy", y());
      set_attribute(circle, "data-index", index2());
    });
    append($$anchor2, circle);
  });
  template_effect(
    ($0, $1) => {
      set_class(polygon, 0, $0);
      set_attribute(polygon, "points", $1);
      set_attribute(polygon, "data-index", index2());
    },
    [
      () => clsx2([
        "shape",
        strict_equals(index2(), getActiveIndex()) && "active"
      ]),
      () => $focuspoints()[index2()].__data.points.map((point) => point.join(",")).join(" ")
    ]
  );
  append($$anchor, fragment);
  var $$pop = pop({
    get getPoints() {
      return getPoints;
    },
    get onHandleDblClick() {
      return onHandleDblClick;
    },
    get index() {
      return index2();
    },
    set index($$value) {
      index2($$value);
      flushSync();
    },
    ...legacy_api()
  });
  $$cleanup();
  return $$pop;
}
delegate(["dblclick"]);
create_custom_element(Polygon, { index: {} }, [], ["getPoints", "onHandleDblClick"], true);

// Resources/Private/JavaScript/shapes/Rect.svelte
Rect[FILENAME] = "Resources/Private/JavaScript/shapes/Rect.svelte";
var root2 = add_locations(ns_template(`<circle r="3" class="shape-handle"></circle><circle r="3" class="shape-handle"></circle><circle r="3" class="shape-handle"></circle><circle r="3" class="shape-handle"></circle><rect></rect>`, 1), Rect[FILENAME], [
  [21, 0],
  [22, 0],
  [23, 0],
  [24, 0],
  [25, 0]
]);
function Rect($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Rect);
  const [$$stores, $$cleanup] = setup_stores();
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const index2 = prop($$props, "index", 7);
  function getPoints() {
    const { x, y, width, height } = $focuspoints()[index2()].__data;
    return [
      [x, y],
      [x + width, y],
      [x + width, y + height],
      [x, y + height]
    ];
  }
  function onHandleDblClick(event2) {
  }
  var fragment = root2();
  var circle = first_child(fragment);
  var circle_1 = sibling(circle);
  var circle_2 = sibling(circle_1);
  var circle_3 = sibling(circle_2);
  var rect = sibling(circle_3);
  template_effect(
    ($0) => {
      set_attribute(circle, "cx", $focuspoints()[index2()].__data.x);
      set_attribute(circle, "cy", $focuspoints()[index2()].__data.y);
      set_attribute(circle_1, "cx", $focuspoints()[index2()].__data.x + $focuspoints()[index2()].__data.width);
      set_attribute(circle_1, "cy", $focuspoints()[index2()].__data.y);
      set_attribute(circle_2, "cx", $focuspoints()[index2()].__data.x + $focuspoints()[index2()].__data.width);
      set_attribute(circle_2, "cy", $focuspoints()[index2()].__data.y + $focuspoints()[index2()].__data.height);
      set_attribute(circle_3, "cx", $focuspoints()[index2()].__data.x);
      set_attribute(circle_3, "cy", $focuspoints()[index2()].__data.y + $focuspoints()[index2()].__data.height);
      set_class(rect, 0, $0);
      set_attribute(rect, "x", $focuspoints()[index2()].__data.x);
      set_attribute(rect, "y", $focuspoints()[index2()].__data.y);
      set_attribute(rect, "width", $focuspoints()[index2()].__data.width);
      set_attribute(rect, "height", $focuspoints()[index2()].__data.height);
      set_attribute(rect, "data-index", index2());
    },
    [
      () => clsx2([
        "draggable",
        "shape",
        strict_equals(index2(), getActiveIndex()) && "active"
      ])
    ]
  );
  append($$anchor, fragment);
  var $$pop = pop({
    get getPoints() {
      return getPoints;
    },
    get onHandleDblClick() {
      return onHandleDblClick;
    },
    get index() {
      return index2();
    },
    set index($$value) {
      index2($$value);
      flushSync();
    },
    ...legacy_api()
  });
  $$cleanup();
  return $$pop;
}
create_custom_element(Rect, { index: {} }, [], ["getPoints", "onHandleDblClick"], true);

// Resources/Private/JavaScript/store.svelte.js
var SHAPES = {
  rect: {
    component: Rect,
    constructor(config) {
      return {
        x: 0,
        y: 0,
        width: parseFloat(config.defaultWidth),
        height: parseFloat(config.defaultHeight)
      };
    }
  },
  polygon: {
    component: Polygon,
    constructor() {
      return {
        points: [
          [10, 10],
          [50, 10],
          [50, 50],
          [10, 50]
        ]
      };
    }
  }
};
var wizardConfigStore = writable(null);
var focuspoints = writable([]);
var activeIndex = state(0);
var initStores = (hiddenInput, wizardConfig) => {
  wizardConfigStore.set(JSON.parse(wizardConfig));
  focuspoints.set(JSON.parse(hiddenInput.value ? hiddenInput.value : "[]"));
};
var fieldMeetsCondition = (fieldName, point) => {
  const condition = get2(wizardConfigStore).fields[fieldName].displayCond;
  if (!condition) {
    return true;
  }
  const parts = condition.split(":");
  if (parts.length < 4 || parts[0] !== "FIELD") {
    return true;
  }
  const [type, field, operator, value] = parts;
  if (!Object.hasOwn(point, field)) {
    return true;
  }
  switch (operator) {
    case "REQ":
      return point[field] !== null && point[field] !== "";
    case "!=":
      return point[field] !== value;
    case "=":
      return point[field] === value;
    case ">": {
      const pointVal = parseInt(point[field], 10);
      const compareVal = parseInt(value, 10);
      return !isNaN(pointVal) && !isNaN(compareVal) && pointVal > compareVal;
    }
    case "<": {
      const pointVal = parseInt(point[field], 10);
      const compareVal = parseInt(value, 10);
      return !isNaN(pointVal) && !isNaN(compareVal) && pointVal < compareVal;
    }
    case ">=": {
      const pointVal = parseInt(point[field], 10);
      const compareVal = parseInt(value, 10);
      return !isNaN(pointVal) && !isNaN(compareVal) && pointVal >= compareVal;
    }
    case "<=": {
      const pointVal = parseInt(point[field], 10);
      const compareVal = parseInt(value, 10);
      return !isNaN(pointVal) && !isNaN(compareVal) && pointVal <= compareVal;
    }
    case "IN":
      return value.split(",").includes(point[field]);
    case "!IN":
      return !value.split(",").includes(point[field]);
    case "-": {
      const range = value.split("-");
      if (range.length !== 2) return false;
      const [min, max] = range;
      const pointVal = parseInt(point[field], 10);
      return !isNaN(pointVal) && pointVal >= parseInt(min, 10) && pointVal <= parseInt(max, 10);
    }
    case "!-": {
      const range = value.split("-");
      if (range.length !== 2) return false;
      const [min, max] = range;
      const pointVal = parseInt(point[field], 10);
      return !isNaN(pointVal) && (pointVal < parseInt(min, 10) || pointVal > parseInt(max, 10));
    }
    default:
      return false;
  }
};
var createNewFocuspoint = (shape) => {
  const config = get2(wizardConfigStore);
  const newFocuspoint = Object.keys(config.fields).reduce(
    (acc, key) => {
      acc[key] = config.fields[key].default ?? null;
      return acc;
    },
    {}
  );
  newFocuspoint.__shape = shape;
  newFocuspoint.__data = SHAPES[shape].constructor(config);
  focuspoints.update((focuspoints2) => [...focuspoints2, newFocuspoint]);
  set(activeIndex, get2(focuspoints).length - 1);
};
var setActiveIndex = (index2) => {
  set(activeIndex, index2, true);
};
var getActiveIndex = () => {
  return get(activeIndex);
};
var focusPointName = (index2) => {
  const config = get2(wizardConfigStore);
  const nameFields = Object.entries(config.fields).filter(([key, value]) => {
    return value["useAsName"] === true || value["useAsName"] === "true" || value["useAsName"] === "1" || value["useAsName"] === 1;
  }).map(([key, value]) => {
    return key;
  });
  const defaultName = "Focus Point " + (index2 + 1);
  if (nameFields.length === 0) {
    return defaultName;
  }
  const store = get2(focuspoints);
  const names = Object.entries(store[index2]).filter(([key, value]) => {
    return nameFields.includes(key) && value !== null && value !== "";
  }).map(([key, value]) => {
    return value;
  });
  if (names.length === 0) {
    return defaultName;
  }
  return names.join(", ");
};

// Resources/Private/JavaScript/components/Image.svelte
Image[FILENAME] = "Resources/Private/JavaScript/components/Image.svelte";
function onSvgDblClick(event2, $focuspoints, findClosestMiddlePointIndex) {
  if (!$focuspoints()[getActiveIndex()] || !(event2.target instanceof SVGSVGElement)) return;
  const rect = event2.target.getBoundingClientRect();
  const viewBox = event2.target.viewBox.baseVal;
  const ratio = viewBox.width / rect.width;
  const point = [event2.layerX * ratio, event2.layerY * ratio];
  const index2 = findClosestMiddlePointIndex(point);
  const points = $focuspoints()[getActiveIndex()].__data.points.slice();
  points.splice(index2 + 1, 0, point);
  store_mutate(focuspoints, untrack($focuspoints)[getActiveIndex()].__data.points = points, untrack($focuspoints));
}
var root_12 = add_locations(ns_template(`<g class="shape-group"><!></g>`), Image[FILENAME], [[207, 16]]);
var root3 = add_locations(template(`<div touch-action="none"><div class="wrapper svelte-ukptgm"><svg class="svelte-ukptgm"></svg> <img alt="Selected" unselectable="on" class="svelte-ukptgm"></div></div>`), Image[FILENAME], [
  [
    203,
    0,
    [[204, 4, [[205, 8], [212, 8]]]]
  ]
]);
var $$css = {
  hash: "svelte-ukptgm",
  code: "\n    img.svelte-ukptgm {\n        pointer-events: none;\n        -moz-user-select: none;\n        -webkit-user-select: none;\n        user-select: none;\n        max-width: 100%;\n        max-height: calc(100vh - 200px);\n    }\n\n    .cropper-bg.svelte-ukptgm {\n        padding: 20px;\n        display: flex;\n        justify-content: center;\n\n        --chess-color: rgba(0, 0, 0, 0.1);\n        opacity: 0.8;\n        background-image: linear-gradient(45deg, var(--chess-color) 25%, transparent 25%), linear-gradient(-45deg, var(--chess-color) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--chess-color) 75%), linear-gradient(-45deg, transparent 75%, var(--chess-color) 75%);\n        background-size: 20px 20px;\n        background-position: 0 0, 0 10px, 10px -10px, -10px 0;\n    }\n\n    .cropper-bg--dark.svelte-ukptgm {\n        --chess-color: rgba(255, 255, 255, 0.1);\n    }\n\n    .wrapper.svelte-ukptgm {\n        position: relative;\n        align-self: center;\n    }\n\n    svg.svelte-ukptgm {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n    }\n"
};
function Image($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Image);
  append_styles($$anchor, $$css);
  const [$$stores, $$cleanup] = setup_stores();
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  let image = prop($$props, "image", 7);
  let canvasHeight = state(0);
  let canvasWidth = state(0);
  let imageWidth = state(0);
  let imageHeight = state(0);
  let initialized = state(false);
  let isDarkMode = state(false);
  let imgElement;
  interact(".draggable").resizable({
    edges: {
      left: true,
      right: true,
      bottom: true,
      top: true
    },
    modifiers: [
      interact.modifiers.restrictEdges({ outer: "parent", endOnly: true })
    ],
    listeners: {
      start: setActiveFocuspoint,
      move(event2) {
        const index2 = parseInt(event2.target.getAttribute("data-index"));
        store_mutate(focuspoints, untrack($focuspoints)[index2].__data.x = $focuspoints()[index2].__data.x / get(imageWidth) * get(canvasWidth) + event2.deltaRect.left, untrack($focuspoints));
        store_mutate(focuspoints, untrack($focuspoints)[index2].__data.y = $focuspoints()[index2].__data.y / get(imageHeight) * get(canvasHeight) + event2.deltaRect.top, untrack($focuspoints));
        store_mutate(focuspoints, untrack($focuspoints)[index2].__data.width = event2.rect.width / get(canvasWidth) * get(imageWidth), untrack($focuspoints));
        store_mutate(focuspoints, untrack($focuspoints)[index2].__data.height = event2.rect.height / get(canvasHeight) * get(imageHeight), untrack($focuspoints));
      },
      end: setActiveFocuspoint
    }
  }).draggable({
    modifiers: [
      interact.modifiers.restrictRect({ restriction: "parent", endOnly: true })
    ],
    autoScroll: true,
    listeners: {
      start: setActiveFocuspoint,
      move(event2) {
        const index2 = parseInt(event2.target.getAttribute("data-index"));
        store_mutate(focuspoints, untrack($focuspoints)[index2].__data.x = $focuspoints()[index2].__data.x + event2.dx / get(canvasWidth) * get(imageWidth), untrack($focuspoints));
        store_mutate(focuspoints, untrack($focuspoints)[index2].__data.y = $focuspoints()[index2].__data.y + event2.dy / get(canvasHeight) * get(imageHeight), untrack($focuspoints));
      },
      end: setActiveFocuspoint
    }
  });
  interact("polygon").draggable({
    autoScroll: true,
    listeners: {
      // call this function on every dragmove event
      start: setActiveFocuspoint,
      move(event2) {
        const index2 = parseInt(event2.target.getAttribute("data-index"));
        store_mutate(focuspoints, untrack($focuspoints)[index2].__data.points = $focuspoints()[index2].__data.points.map(([x, y]) => [x + event2.dx, y + event2.dy]), untrack($focuspoints));
      },
      end: setActiveFocuspoint
    }
  });
  interact("polygon ~ .shape-handle").draggable({
    listeners: {
      start: setActiveFocuspoint,
      move(event2) {
        const index2 = parseInt(event2.target.getAttribute("data-index"));
        const pointIndex = parseInt(event2.target.getAttribute("data-point-index"));
        const [x, y] = $focuspoints()[index2].__data.points[pointIndex];
        store_mutate(focuspoints, untrack($focuspoints)[index2].__data.points[pointIndex] = [x + event2.dx, y + event2.dy], untrack($focuspoints));
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
    const index2 = parseInt(event2.target.getAttribute("data-index"));
    setActiveIndex(index2);
  }
  function onload() {
    set(imageWidth, imgElement.naturalWidth, true);
    set(imageHeight, imgElement.naturalHeight, true);
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
        index2 = i;
      }
    }
    return +index2;
  }
  function distance([x1, y1], [x2, y2]) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
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
    set(initialized, true);
  }
  var div = root3();
  let classes;
  var div_1 = child(div);
  var svg = child(div_1);
  svg.__dblclick = [
    onSvgDblClick,
    $focuspoints,
    findClosestMiddlePointIndex
  ];
  each(svg, 5, $focuspoints, index, ($$anchor2, focuspoint, index2) => {
    var g = root_12();
    var node = child(g);
    component(node, () => SHAPES[get(focuspoint).__shape].component, ($$anchor3, $$component) => {
      $$component($$anchor3, { index: index2 });
    });
    reset(g);
    append($$anchor2, g);
  });
  reset(svg);
  var img = sibling(svg, 2);
  bind_this(img, ($$value) => imgElement = $$value, () => imgElement);
  reset(div_1);
  reset(div);
  template_effect(
    ($0) => {
      classes = set_class(div, 1, "cropper-bg svelte-ukptgm", null, classes, $0);
      set_attribute(svg, "viewBox", `0 0 ${get(imageWidth) ?? ""} ${get(imageHeight) ?? ""}`);
      set_attribute(img, "src", image());
    },
    [
      () => ({ "cropper-bg--dark": get(isDarkMode) })
    ]
  );
  event("load", img, onload);
  replay_events(img);
  append($$anchor, div);
  var $$pop = pop({
    get updateCanvasSizes() {
      return updateCanvasSizes;
    },
    get image() {
      return image();
    },
    set image($$value) {
      image($$value);
      flushSync();
    },
    ...legacy_api()
  });
  $$cleanup();
  return $$pop;
}
delegate(["dblclick"]);
create_custom_element(Image, { image: {} }, [], ["updateCanvasSizes"], true);

// Resources/Private/JavaScript/components/Fields/Select.svelte
Select[FILENAME] = "Resources/Private/JavaScript/components/Fields/Select.svelte";
var root_13 = add_locations(template(`<option> </option>`), Select[FILENAME], [[14, 12]]);
var root4 = add_locations(template(`<div class="form-group"><label class="form-label"> </label> <select class="form-select"></select></div>`), Select[FILENAME], [[8, 0, [[9, 4], [12, 4]]]]);
function Select($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Select);
  const [$$stores, $$cleanup] = setup_stores();
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  let config = prop($$props, "config", 7), index2 = prop($$props, "index", 7), name = prop($$props, "name", 7);
  let options = Object.entries(config().options).map(([value, label]) => ({ value, label }));
  var div = root4();
  var label_1 = child(div);
  var text2 = child(label_1, true);
  reset(label_1);
  var select = sibling(label_1, 2);
  each(select, 21, () => options, index, ($$anchor2, $$item) => {
    let value = () => get($$item).value;
    value();
    let label = () => get($$item).label;
    label();
    var option = root_13();
    var option_value = {};
    var text_1 = child(option, true);
    reset(option);
    template_effect(() => {
      if (option_value !== (option_value = value())) {
        option.value = (option.__value = value()) ?? "";
      }
      set_text(text_1, label());
    });
    append($$anchor2, option);
  });
  reset(select);
  reset(div);
  template_effect(() => {
    set_attribute(label_1, "for", `input-${index2() ?? ""}-${name() ?? ""}`);
    set_text(text2, config().title);
    set_attribute(select, "id", `input-${index2() ?? ""}-${name() ?? ""}`);
  });
  bind_select_value(select, () => $focuspoints()[index2()][name()], ($$value) => store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = $$value, untrack($focuspoints)));
  append($$anchor, div);
  var $$pop = pop({
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
    },
    ...legacy_api()
  });
  $$cleanup();
  return $$pop;
}
create_custom_element(Select, { config: {}, index: {}, name: {} }, [], [], true);

// Resources/Private/JavaScript/components/Fields/Text.svelte
Text2[FILENAME] = "Resources/Private/JavaScript/components/Fields/Text.svelte";
var root5 = add_locations(template(`<div class="form-group"><label class="form-label"> </label> <input type="text" class="form-control"></div>`), Text2[FILENAME], [[7, 0, [[8, 4], [11, 4]]]]);
function Text2($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Text2);
  const [$$stores, $$cleanup] = setup_stores();
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  let config = prop($$props, "config", 7), index2 = prop($$props, "index", 7), name = prop($$props, "name", 7);
  var div = root5();
  var label = child(div);
  var text2 = child(label, true);
  reset(label);
  var input = sibling(label, 2);
  remove_input_defaults(input);
  reset(div);
  template_effect(() => {
    set_attribute(label, "for", `input-${index2() ?? ""}-${name() ?? ""}`);
    set_text(text2, config().title);
    set_attribute(input, "id", `input-${index2() ?? ""}-${name() ?? ""}`);
  });
  bind_value(input, () => $focuspoints()[index2()][name()], ($$value) => store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = $$value, untrack($focuspoints)));
  append($$anchor, div);
  var $$pop = pop({
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
    },
    ...legacy_api()
  });
  $$cleanup();
  return $$pop;
}
create_custom_element(Text2, { config: {}, index: {}, name: {} }, [], [], true);

// Resources/Private/JavaScript/components/Fields/Textarea.svelte
Textarea[FILENAME] = "Resources/Private/JavaScript/components/Fields/Textarea.svelte";
var root6 = add_locations(template(`<div class="form-group"><label class="form-label"> </label> <textarea type="text" class="form-control"></textarea></div>`), Textarea[FILENAME], [[7, 0, [[8, 4], [11, 4]]]]);
function Textarea($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Textarea);
  const [$$stores, $$cleanup] = setup_stores();
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  let config = prop($$props, "config", 7), index2 = prop($$props, "index", 7), name = prop($$props, "name", 7);
  var div = root6();
  var label = child(div);
  var text2 = child(label, true);
  reset(label);
  var textarea = sibling(label, 2);
  remove_textarea_child(textarea);
  reset(div);
  template_effect(() => {
    set_attribute(label, "for", `input-${index2() ?? ""}-${name() ?? ""}`);
    set_text(text2, config().title);
    set_attribute(textarea, "id", `input-${index2() ?? ""}-${name() ?? ""}`);
  });
  bind_value(textarea, () => $focuspoints()[index2()][name()], ($$value) => store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = $$value, untrack($focuspoints)));
  append($$anchor, div);
  var $$pop = pop({
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
    },
    ...legacy_api()
  });
  $$cleanup();
  return $$pop;
}
create_custom_element(Textarea, { config: {}, index: {}, name: {} }, [], [], true);

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
  let innerHtml = state("");
  Icons.getIcon(name(), Icons.sizes.small).then((html2) => {
    set(innerHtml, html2, true);
  });
  var fragment = comment();
  var node = first_child(fragment);
  html(node, () => get(innerHtml), false, false);
  append($$anchor, fragment);
  return pop({
    get name() {
      return name();
    },
    set name($$value) {
      name($$value);
      flushSync();
    },
    ...legacy_api()
  });
}
create_custom_element(Icon, { name: {} }, [], [], true);

// Resources/Private/JavaScript/components/Fields/Link.svelte
Link[FILENAME] = "Resources/Private/JavaScript/components/Fields/Link.svelte";
var root7 = add_locations(template(`<div><label class="form-label"> </label> <div class="form-wizards-wrap svelte-jil9tm"><div class="form-wizards-element svelte-jil9tm"><div class="input-group t3js-form-field-link"><span class="t3js-form-field-link-icon input-group-text svelte-jil9tm"><!></span> <input class="form-control svelte-jil9tm" title="" value="" readonly="" hidden=""> <div class="form-control-clearable-wrapper"><input type="text" readonly=""> <input type="text"> <button type="button" tabindex="-1" title="Clear input" aria-label="Clear input"><!></button></div> <button class="btn btn-default svelte-jil9tm"><!></button></div></div> <div class="form-wizards-item-aside formwizards-item-aside--field-control"><div class="btn-group"><button aria-label="Open link wizard" class="btn btn-default svelte-jil9tm"><!></button></div></div></div></div>`), Link[FILENAME], [
  [
    75,
    0,
    [
      [76, 4],
      [
        79,
        4,
        [
          [
            80,
            8,
            [
              [
                81,
                12,
                [
                  [82, 16],
                  [83, 16],
                  [
                    84,
                    16,
                    [[85, 20], [92, 20], [98, 20]]
                  ],
                  [109, 16]
                ]
              ]
            ]
          ],
          [
            114,
            8,
            [[115, 12, [[116, 16]]]]
          ]
        ]
      ]
    ]
  ]
]);
var $$css2 = {
  hash: "svelte-jil9tm",
  code: "\n    .v12.svelte-jil9tm .form-wizards-wrap:where(.svelte-jil9tm) {\n        display: flex;\n        gap: 5px;\n    }\n\n    .v12.svelte-jil9tm .form-wizards-element:where(.svelte-jil9tm) {\n        width: 100%;\n    }\n\n    .v12.svelte-jil9tm .input-group-text:where(.svelte-jil9tm) {\n        min-width: 42px;\n    }\n\n    .v12.svelte-jil9tm .btn-default:where(.svelte-jil9tm) {\n        height: 32px;\n    }\n\n    .v12.svelte-jil9tm .form-control:where(.svelte-jil9tm) {\n        border-radius: 0;\n    }\n"
};
function Link($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Link);
  append_styles($$anchor, $$css2);
  const [$$stores, $$cleanup] = setup_stores();
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const $wizardConfigStore = () => (validate_store(wizardConfigStore, "wizardConfigStore"), store_get(wizardConfigStore, "$wizardConfigStore", $$stores));
  let config = prop($$props, "config", 7), index2 = prop($$props, "index", 7), name = prop($$props, "name", 7);
  let linkBrowserData = state(null);
  let readOnly = state(true);
  let previewText = user_derived(() => get(linkBrowserData)?.preview?.text ?? "");
  let previewIcon = user_derived(() => get(linkBrowserData)?.preview?.icon ?? "");
  const handleLinkSelection = (event2) => {
    store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = event2.detail.link, untrack($focuspoints));
    updateLinkBrowserInfo();
  };
  async function updateLinkBrowserInfo() {
    let url = TYPO3.settings.ajaxUrls["wizard_focuspoint_linkbrowserurl"];
    url += `&inputName=${$wizardConfigStore().itemFormElName}-hidden-link-field`;
    url += "&inputValue=" + $focuspoints()[index2()][name()] || "";
    url += "&config=" + JSON.stringify(config() || "{}");
    return new AjaxRequest(url).get().then(async (response) => {
      set(linkBrowserData, await response.resolve(), true);
    });
  }
  function openModal() {
    const modal = Modal.advanced({
      type: Modal.types.iframe,
      content: get(linkBrowserData).url,
      size: Modal.sizes.large
    });
    window.parent.frames.list_frame.document.addEventListener(`${$wizardConfigStore().itemFormElName}-link-selected`, handleLinkSelection);
    modal.addEventListener("typo3-modal-hidden", function() {
      window.parent.frames.list_frame.document.removeEventListener(`${$wizardConfigStore().itemFormElName}-link-selected`, handleLinkSelection);
    });
  }
  function onInputClear() {
    store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = "", untrack($focuspoints));
    get(linkBrowserData).preview = null;
  }
  var div = root7();
  let classes;
  var label = child(div);
  var text2 = child(label, true);
  reset(label);
  var div_1 = sibling(label, 2);
  var div_2 = child(div_1);
  var div_3 = child(div_2);
  var span = child(div_3);
  var node = child(span);
  html(node, () => get(previewIcon), false, false);
  reset(span);
  var input = sibling(span, 2);
  var div_4 = sibling(input, 2);
  var input_1 = child(div_4);
  remove_input_defaults(input_1);
  let classes_1;
  var input_2 = sibling(input_1, 2);
  remove_input_defaults(input_2);
  let classes_2;
  var button = sibling(input_2, 2);
  let classes_3;
  var node_1 = child(button);
  Icon(node_1, { name: "actions-close" });
  reset(button);
  reset(div_4);
  var button_1 = sibling(div_4, 2);
  var node_2 = child(button_1);
  Icon(node_2, {
    name: "actions-version-workspaces-preview-link"
  });
  reset(button_1);
  reset(div_3);
  reset(div_2);
  var div_5 = sibling(div_2, 2);
  var div_6 = child(div_5);
  var button_2 = child(div_6);
  var node_3 = child(button_2);
  Icon(node_3, { name: "actions-wizard-link" });
  reset(button_2);
  reset(div_6);
  reset(div_5);
  reset(div_1);
  reset(div);
  template_effect(
    ($0, $1, $2, $3) => {
      classes = set_class(div, 1, "form-group svelte-jil9tm", null, classes, $0);
      set_attribute(label, "for", `input-${index2() ?? ""}-${name() ?? ""}`);
      set_text(text2, config().title);
      set_attribute(input_1, "id", `input-${index2() ?? ""}-${name() ?? ""}`);
      classes_1 = set_class(input_1, 1, "form-control form-control-clearable svelte-jil9tm", null, classes_1, $1);
      set_value(input_1, get(previewText));
      classes_2 = set_class(input_2, 1, "form-control form-control-clearable svelte-jil9tm", null, classes_2, $2);
      set_attribute(input_2, "id", `input-${index2() ?? ""}-${name() ?? ""}`);
      classes_3 = set_class(button, 1, "close text-black", null, classes_3, $3);
    },
    [
      () => ({
        v12: $wizardConfigStore() && $wizardConfigStore().typo3Version < 13
      }),
      () => ({ hidden: !get(readOnly) }),
      () => ({ hidden: get(readOnly) }),
      () => ({
        hidden: strict_equals($focuspoints()[index2()][name()], "")
      })
    ]
  );
  bind_value(input_2, () => $focuspoints()[index2()][name()], ($$value) => store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = $$value, untrack($focuspoints)));
  event("click", button, preventDefault(onInputClear));
  event("click", button_1, preventDefault(() => set(readOnly, !get(readOnly))));
  event("click", button_2, preventDefault(openModal));
  append($$anchor, div);
  var $$pop = pop({
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
    },
    ...legacy_api()
  });
  $$cleanup();
  return $$pop;
}
create_custom_element(Link, { config: {}, index: {}, name: {} }, [], [], true);

// Resources/Private/JavaScript/components/Fields/Checkbox.svelte
Checkbox[FILENAME] = "Resources/Private/JavaScript/components/Fields/Checkbox.svelte";
var root_14 = add_locations(template(`<span class="form-check-label-icon"><span class="form-check-label-icon-checked"><!></span> <span class="form-check-label-icon-unchecked"><!></span></span>`), Checkbox[FILENAME], [[25, 16, [[26, 20], [29, 20]]]]);
var root8 = add_locations(template(`<div class="form-group"><label class="form-label"> </label> <div><input type="checkbox" class="form-check-input me-1"> <label class="form-check-label"><!> </label></div></div>`), Checkbox[FILENAME], [
  [
    11,
    0,
    [
      [12, 4],
      [15, 4, [[17, 8], [23, 8]]]
    ]
  ]
]);
function Checkbox($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Checkbox);
  const [$$stores, $$cleanup] = setup_stores();
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  let config = prop($$props, "config", 7), index2 = prop($$props, "index", 7), name = prop($$props, "name", 7);
  let isCheckbox = strict_equals(config()?.renderType, "check") || !Object.hasOwn(config(), "renderType");
  let isToggle = strict_equals(config()?.renderType, "checkboxToggle");
  var div = root8();
  var label = child(div);
  var text2 = child(label, true);
  reset(label);
  var div_1 = sibling(label, 2);
  set_class(div_1, 1, "form-check", null, {}, {
    "form-check-type-icon-toggle": isCheckbox,
    "form-switch": isToggle
  });
  var input = child(div_1);
  remove_input_defaults(input);
  var label_1 = sibling(input, 2);
  var node = child(label_1);
  {
    var consequent = ($$anchor2) => {
      var span = root_14();
      var span_1 = child(span);
      var node_1 = child(span_1);
      Icon(node_1, { name: "actions-check" });
      reset(span_1);
      var span_2 = sibling(span_1, 2);
      var node_2 = child(span_2);
      Icon(node_2, { name: "empty-empty" });
      reset(span_2);
      reset(span);
      append($$anchor2, span);
    };
    if_block(node, ($$render) => {
      if (isCheckbox) $$render(consequent);
    });
  }
  var text_1 = sibling(node);
  reset(label_1);
  reset(div_1);
  reset(div);
  template_effect(() => {
    set_attribute(label, "for", `input-${index2() ?? ""}-${name() ?? ""}`);
    set_attribute(label, "id", `label-${index2() ?? ""}-${name() ?? ""}`);
    set_text(text2, config()?.title ?? config().title);
    set_attribute(input, "id", `input-${index2() ?? ""}-${name() ?? ""}`);
    set_attribute(input, "aria-labelledby", `label-${index2() ?? ""}-${name() ?? ""}`);
    set_attribute(label_1, "for", `input-${index2() ?? ""}-${name() ?? ""}`);
    set_text(text_1, ` ${config()?.label ?? "" ?? ""}`);
  });
  bind_checked(input, () => $focuspoints()[index2()][name()], ($$value) => store_mutate(focuspoints, untrack($focuspoints)[index2()][name()] = $$value, untrack($focuspoints)));
  append($$anchor, div);
  var $$pop = pop({
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
    },
    ...legacy_api()
  });
  $$cleanup();
  return $$pop;
}
create_custom_element(Checkbox, { config: {}, index: {}, name: {} }, [], [], true);

// Resources/Private/JavaScript/components/Sidebar.svelte
Sidebar[FILENAME] = "Resources/Private/JavaScript/components/Sidebar.svelte";
var root_15 = add_locations(template(`<div class="panel panel-default" data-crop-variant-container="default"><div class="panel-heading" role="tab"><h4 class="panel-title"><button data-bs-toggle="collapse" aria-controls="cropper-collapse-1" data-crop-variant-id="default" data-crop-variant=""><span class="caret svelte-1o07nn1"></span> <span class="panel-title"> </span></button></h4></div> <div role="tabpanel"><div class="panel-body"><!> <button class="btn btn-danger" name="reset" title="Reset"><!> </button></div></div></div>`), Sidebar[FILENAME], [
  [
    71,
    12,
    [
      [
        72,
        16,
        [
          [
            73,
            20,
            [[74, 24, [[83, 28], [84, 28]]]]
          ]
        ]
      ],
      [
        90,
        16,
        [[97, 20, [[104, 24]]]]
      ]
    ]
  ]
]);
var root_4 = add_locations(template(`<button class="btn btn-success w-100 mt-3"><!> </button>`), Sidebar[FILENAME], [[115, 8]]);
var root9 = add_locations(template(`<div><div class="panel-group svelte-1o07nn1" role="tablist" aria-multiselectable="false"></div> <!></div>`), Sidebar[FILENAME], [[68, 0, [[69, 4]]]]);
var $$css3 = {
  hash: "svelte-1o07nn1",
  code: '\n    .modal-panel-sidebar.svelte-1o07nn1 {\n        padding-top: 0;\n        width: 100%;\n        --typo3-state-primary-bg: #ff8700;\n        --typo3-component-border-radius: 0;\n        --panel-border-radius: 0;\n    }\n\n    .panel-group.svelte-1o07nn1 {\n        margin-top: 0;\n        margin-bottom: 0;\n    }\n\n    .v12.svelte-1o07nn1 .panel-button:where(.svelte-1o07nn1) {\n        border: 0;\n        color: #FFF;\n        background: none;\n        gap: 10px;\n        align-items: center;\n        justify-content: start !important;\n        width: 100%;\n    }\n\n    .v12.svelte-1o07nn1 .panel-button[aria-expanded="true"]:where(.svelte-1o07nn1) {\n        border-left: 2px solid #ff8700;\n    }\n\n    .v12.svelte-1o07nn1 .caret:where(.svelte-1o07nn1) {\n        border-top-color: #FFF;\n    }\n\n'
};
function Sidebar($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Sidebar);
  append_styles($$anchor, $$css3);
  const [$$stores, $$cleanup] = setup_stores();
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const $wizardConfigStore = () => (validate_store(wizardConfigStore, "wizardConfigStore"), store_get(wizardConfigStore, "$wizardConfigStore", $$stores));
  let focuspointName = user_derived(() => (focuspoint, index2) => focusPointName(index2));
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
  var div = root9();
  let classes;
  var div_1 = child(div);
  each(div_1, 5, $focuspoints, index, ($$anchor2, focuspoint, index2) => {
    var div_2 = root_15();
    var div_3 = child(div_2);
    var h4 = child(div_3);
    set_attribute(h4, "id", `cropper-accordion-heading-${index2 ?? ""}`);
    var button = child(h4);
    let classes_1;
    var span = sibling(child(button), 2);
    var text2 = child(span, true);
    reset(span);
    reset(button);
    reset(h4);
    reset(div_3);
    var div_4 = sibling(div_3, 2);
    set_attribute(div_4, "id", `cropper-collapse-${index2 ?? ""}`);
    let classes_2;
    set_attribute(div_4, "aria-labelledby", `cropper-accordion-heading-${index2 ?? ""}`);
    var div_5 = child(div_4);
    var node = child(div_5);
    each(node, 1, () => Object.entries($wizardConfigStore().fields), index, ($$anchor3, $$item) => {
      let key = () => get($$item)[0];
      key();
      let field = () => get($$item)[1];
      field();
      var fragment = comment();
      var node_1 = first_child(fragment);
      {
        var consequent = ($$anchor4) => {
          var fragment_1 = comment();
          var node_2 = first_child(fragment_1);
          const expression = user_derived(() => field() ?? {});
          component(node_2, () => components[field().type], ($$anchor5, $$component) => {
            $$component($$anchor5, {
              index: index2,
              get name() {
                return key();
              },
              get config() {
                return get(expression);
              }
            });
          });
          append($$anchor4, fragment_1);
        };
        if_block(node_1, ($$render) => {
          if (fieldMeetsCondition(key(), get(focuspoint))) $$render(consequent);
        });
      }
      append($$anchor3, fragment);
    });
    var button_1 = sibling(node, 2);
    var node_3 = child(button_1);
    Icon(node_3, { name: "actions-delete" });
    var text_1 = sibling(node_3);
    text_1.nodeValue = ` ${window.parent.frames.list_frame.TYPO3.lang["wizard.single_point.button.delete"] ?? ""}`;
    reset(button_1);
    reset(div_5);
    reset(div_4);
    reset(div_2);
    template_effect(
      ($0, $1, $2, $3) => {
        set_attribute(button, "aria-expanded", $0);
        classes_1 = set_class(button, 1, "panel-button svelte-1o07nn1", null, classes_1, $1);
        set_text(text2, $2);
        classes_2 = set_class(div_4, 1, "panel-collapse", null, classes_2, $3);
      },
      [
        () => strict_equals(index2, getActiveIndex()),
        () => ({
          collapsed: strict_equals(index2, getActiveIndex(), false)
        }),
        () => get(focuspointName)(get(focuspoint), index2),
        () => ({
          collapse: strict_equals(index2, getActiveIndex(), false),
          show: strict_equals(index2, getActiveIndex())
        })
      ]
    );
    event("click", button, () => setActiveIndex(index2));
    event("click", button_1, preventDefault(() => deleteFocuspoint(index2)));
    append($$anchor2, div_2);
  });
  reset(div_1);
  var node_4 = sibling(div_1, 2);
  each(node_4, 17, () => Object.entries(SHAPES), index, ($$anchor2, $$item) => {
    let key = () => get($$item)[0];
    key();
    var button_2 = root_4();
    var node_5 = child(button_2);
    Icon(node_5, { name: "actions-add" });
    var text_2 = sibling(node_5);
    reset(button_2);
    template_effect(() => set_text(text_2, ` ${window.parent.frames.list_frame.TYPO3.lang[`wizard.single_point.button.new.${key()}`] ?? ""}`));
    event("click", button_2, preventDefault(() => createNewFocuspoint(key())));
    append($$anchor2, button_2);
  });
  reset(div);
  template_effect(($0) => classes = set_class(div, 1, "modal-panel-sidebar svelte-1o07nn1", null, classes, $0), [
    () => ({
      v12: $wizardConfigStore() && $wizardConfigStore().typo3Version < 13
    })
  ]);
  append($$anchor, div);
  var $$pop = pop({ ...legacy_api() });
  $$cleanup();
  return $$pop;
}
create_custom_element(Sidebar, {}, [], [], true);

// Resources/Private/JavaScript/FocuspointWizard.svelte
import interact2 from "interactjs";

// Resources/Private/JavaScript/components/Settings.svelte
import Notification from "@typo3/backend/notification.js";
Settings[FILENAME] = "Resources/Private/JavaScript/components/Settings.svelte";
function onPasteButtonClick(_, jsonPoints) {
  navigator.clipboard.readText().then((text2) => {
    set(jsonPoints, text2, true);
  });
}
function onUndoButtonClick(__1, jsonPoints, $focuspoints) {
  set(jsonPoints, JSON.stringify($focuspoints()), true);
}
function onSaveButtonClick(__2, $focuspoints, jsonPoints, itemFormElName) {
  try {
    store_set(focuspoints, JSON.parse(get(jsonPoints)));
    window.parent.frames.list_frame.document.dispatchEvent(new CustomEvent(`${itemFormElName()}-settings`, {}));
  } catch (e) {
    Notification.error("Error", "Invalid JSON", 5);
  }
}
var on_click = (__3, isSettingsOpenValue) => isSettingsOpenValue(false);
var root10 = add_locations(template(`<div><fieldset class="form-section svelte-12frn6g"><div class="d-flex justify-content-between"><h3 class="form-section-headline"></h3> <button aria-label="Close settings" class="btn-close svelte-12frn6g"><!> <span class="visually-hidden"></span></button></div> <div class="row"><label for="points">Import / Export</label> <div class="form-group"><textarea id="points" rows="10" cols="50"></textarea> <div class="d-flex justify-content-between"><div><button class="btn btn-default"><!> </button> <button class="btn btn-default"><!> </button></div> <div><button class="btn btn-default"><!> </button> <button class="btn btn-primary"><!> </button></div></div></div></div></fieldset></div>`), Settings[FILENAME], [
  [
    70,
    0,
    [
      [
        72,
        4,
        [
          [
            73,
            8,
            [
              [74, 12],
              [75, 12, [[77, 16]]]
            ]
          ],
          [
            80,
            8,
            [
              [81, 12],
              [
                82,
                12,
                [
                  [83, 20],
                  [
                    92,
                    16,
                    [
                      [93, 20, [[94, 24], [97, 24]]],
                      [101, 20, [[102, 24], [105, 24]]]
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
var $$css4 = {
  hash: "svelte-12frn6g",
  code: "\n    .wrapper.svelte-12frn6g {\n        grid-column: 1 / 4;\n    }\n\n    .btn-close.svelte-12frn6g {\n        background: transparent;\n        border: none;\n        height: fit-content;\n        padding-top: 0;\n        color: var(--icon-color-primary, currentColor)\n    }\n\n    .v12.svelte-12frn6g fieldset:where(.svelte-12frn6g) {\n        color: #333;\n    }\n"
};
function Settings($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, Settings);
  append_styles($$anchor, $$css4);
  const [$$stores, $$cleanup] = setup_stores();
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  const $wizardConfigStore = () => (validate_store(wizardConfigStore, "wizardConfigStore"), store_get(wizardConfigStore, "$wizardConfigStore", $$stores));
  let itemFormElName = prop($$props, "itemFormElName", 7), isSettingsOpenValue = prop($$props, "isSettingsOpenValue", 15);
  let focuspointArea;
  let jsonPoints = state(proxy(JSON.stringify($focuspoints(), null, "	")));
  let hasError = state(false);
  let hasChange = state(false);
  user_effect(() => {
    try {
      JSON.parse(get(jsonPoints));
      set(hasError, false);
    } catch (e) {
      set(hasError, true);
    }
    set(hasChange, strict_equals(get(jsonPoints), JSON.stringify($focuspoints()), false));
  });
  function onCopyButtonClick() {
    navigator.clipboard.writeText(focuspointArea.value);
    Notification.success(window.parent.frames.list_frame.TYPO3.lang["wizard.settings.copied"], window.parent.frames.list_frame.TYPO3.lang["wizard.settings.copied.message"], 3);
  }
  var div = root10();
  let classes;
  var fieldset = child(div);
  var div_1 = child(fieldset);
  var h3 = child(div_1);
  h3.textContent = window.parent.frames.list_frame.TYPO3.lang["wizard.button.settings"];
  var button = sibling(h3, 2);
  button.__click = [on_click, isSettingsOpenValue];
  var node = child(button);
  Icon(node, { name: "actions-close" });
  var span = sibling(node, 2);
  span.textContent = window.parent.frames.list_frame.TYPO3.lang["wizard.button.cancel"];
  reset(button);
  reset(div_1);
  var div_2 = sibling(div_1, 2);
  var label = child(div_2);
  let classes_1;
  var div_3 = sibling(label, 2);
  var textarea = child(div_3);
  remove_textarea_child(textarea);
  let classes_2;
  bind_this(textarea, ($$value) => focuspointArea = $$value, () => focuspointArea);
  var div_4 = sibling(textarea, 2);
  var div_5 = child(div_4);
  var button_1 = child(div_5);
  button_1.__click = onCopyButtonClick;
  var node_1 = child(button_1);
  Icon(node_1, { name: "actions-clipboard" });
  var text_1 = sibling(node_1);
  text_1.nodeValue = ` ${window.parent.frames.list_frame.TYPO3.lang["wizard.button.copy"] ?? ""}`;
  reset(button_1);
  var button_2 = sibling(button_1, 2);
  button_2.__click = [onPasteButtonClick, jsonPoints];
  var node_2 = child(button_2);
  Icon(node_2, { name: "actions-clipboard-paste" });
  var text_2 = sibling(node_2);
  text_2.nodeValue = ` ${window.parent.frames.list_frame.TYPO3.lang["wizard.button.paste"] ?? ""}`;
  reset(button_2);
  reset(div_5);
  var div_6 = sibling(div_5, 2);
  var button_3 = child(div_6);
  button_3.__click = [onUndoButtonClick, jsonPoints, $focuspoints];
  var node_3 = child(button_3);
  Icon(node_3, { name: "actions-undo" });
  var text_3 = sibling(node_3);
  text_3.nodeValue = ` ${window.parent.frames.list_frame.TYPO3.lang["wizard.button.undo"] ?? ""}`;
  reset(button_3);
  var button_4 = sibling(button_3, 2);
  button_4.__click = [
    onSaveButtonClick,
    $focuspoints,
    jsonPoints,
    itemFormElName
  ];
  var node_4 = child(button_4);
  Icon(node_4, { name: "actions-check" });
  var text_4 = sibling(node_4);
  text_4.nodeValue = ` ${window.parent.frames.list_frame.TYPO3.lang["wizard.button.accept"] ?? ""}`;
  reset(button_4);
  reset(div_6);
  reset(div_4);
  reset(div_3);
  reset(div_2);
  reset(fieldset);
  reset(div);
  template_effect(
    ($0, $1, $2) => {
      classes = set_class(div, 1, "d-flex justify-content-center align-items-center wrapper svelte-12frn6g", null, classes, $0);
      classes_1 = set_class(label, 1, "form-label", null, classes_1, $1);
      classes_2 = set_class(textarea, 1, "form-control t3js-formengine-textarea formengine-textarea mb-3", null, classes_2, $2);
      button_3.disabled = !get(hasChange);
      button_4.disabled = !get(hasChange) || get(hasError);
    },
    [
      () => ({
        v12: $wizardConfigStore() && $wizardConfigStore().typo3Version < 13
      }),
      () => ({
        "has-error": get(hasError),
        "has-change": get(hasChange)
      }),
      () => ({
        "has-error": get(hasError),
        "has-change": get(hasChange)
      })
    ]
  );
  bind_value(textarea, () => get(jsonPoints), ($$value) => set(jsonPoints, $$value));
  append($$anchor, div);
  var $$pop = pop({
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
    },
    ...legacy_api()
  });
  $$cleanup();
  return $$pop;
}
delegate(["click"]);
create_custom_element(Settings, { itemFormElName: {}, isSettingsOpenValue: {} }, [], [], true);

// Resources/Private/JavaScript/FocuspointWizard.svelte
FocuspointWizard[FILENAME] = "Resources/Private/JavaScript/FocuspointWizard.svelte";
var root_2 = add_locations(template(`<!> <div class="resize-handle svelte-2ek5u1" aria-label="Resize sidebar"></div> <!>`, 1), FocuspointWizard[FILENAME], [[95, 8]]);
var root11 = add_locations(template(`<div class="wizard svelte-2ek5u1"><!></div>`), FocuspointWizard[FILENAME], [[90, 0]]);
var $$css5 = {
  hash: "svelte-2ek5u1",
  code: "\n    .wizard.svelte-2ek5u1 {\n        display: grid;\n        max-height: 100%;\n        grid-template-columns: 1fr 1px var(--sidebar-width, 300px);\n        grid-template-rows: 100%;\n    }\n\n    .resize-handle.svelte-2ek5u1 {\n        cursor: ew-resize !important;\n        user-select: none;\n        position: relative;\n    }\n\n    .resize-handle.svelte-2ek5u1:after {\n        content: '';\n        position: absolute;\n        z-index: 1;\n        top: 0;\n        right: -4px;\n        width: 4px;\n        height: 100%;\n        background: rgba(255, 255, 255, 0);\n    }\n\n    .resize-handle.svelte-2ek5u1:hover:after {\n        background: var(--scaffold-content-navigation-drag-bg-hover, #bbb);\n    }\n"
};
function FocuspointWizard($$anchor, $$props) {
  check_target(new.target);
  push($$props, true, FocuspointWizard);
  append_styles($$anchor, $$css5);
  const [$$stores, $$cleanup] = setup_stores();
  const $focuspoints = () => (validate_store(focuspoints, "focuspoints"), store_get(focuspoints, "$focuspoints", $$stores));
  let itemFormElName = prop($$props, "itemFormElName", 7), wizardConfig = prop($$props, "wizardConfig", 7), image = prop($$props, "image", 7);
  let isSettingsOpen = state(false);
  let sidebarWidth = state(300);
  const minSidebarWidth = 200;
  const hiddenInput = window.parent.frames.list_frame.document.querySelector(`[name="${itemFormElName()}"]`);
  onMount(() => {
    initStores(hiddenInput, wizardConfig());
    window.parent.frames.list_frame.document.addEventListener(`${itemFormElName()}-modal-save`, onModalSave);
    window.parent.frames.list_frame.document.addEventListener(`${itemFormElName()}-settings`, handleSettings);
    const savedWidth = localStorage.getItem("focuspoint-sidebar-width");
    if (savedWidth && parseInt(savedWidth) >= minSidebarWidth) {
      set(sidebarWidth, parseInt(savedWidth), true);
    }
    interact2(".resize-handle").draggable({
      axis: "x",
      listeners: {
        move(event2) {
          const newWidth = get(sidebarWidth) + event2.dx * -1;
          if (newWidth >= minSidebarWidth) {
            set(sidebarWidth, newWidth);
            localStorage.setItem("focuspoint-sidebar-width", get(sidebarWidth).toString());
          }
        }
      }
    });
  });
  onDestroy(() => {
    window.parent.frames.list_frame.document.removeEventListener(`${itemFormElName()}-modal-save`, onModalSave);
    window.parent.frames.list_frame.document.removeEventListener(`${itemFormElName()}-settings`, handleSettings);
    store_set(focuspoints, []);
    interact2(".resize-handle").unset();
  });
  const onModalSave = () => {
    window.parent.frames.list_frame.document.dispatchEvent(new CustomEvent(`${itemFormElName()}-wizard-update`, { detail: { focuspoints: $focuspoints() } }));
  };
  const handleSettings = () => {
    set(isSettingsOpen, !get(isSettingsOpen));
  };
  var div = root11();
  var node = child(div);
  {
    var consequent = ($$anchor2) => {
      Settings($$anchor2, {
        get itemFormElName() {
          return itemFormElName();
        },
        get isSettingsOpenValue() {
          return get(isSettingsOpen);
        },
        set isSettingsOpenValue($$value) {
          set(isSettingsOpen, $$value, true);
        }
      });
    };
    var alternate = ($$anchor2) => {
      var fragment_1 = root_2();
      var node_1 = first_child(fragment_1);
      Image(node_1, {
        get image() {
          return image();
        }
      });
      var node_2 = sibling(node_1, 4);
      Sidebar(node_2, {});
      append($$anchor2, fragment_1);
    };
    if_block(node, ($$render) => {
      if (get(isSettingsOpen)) $$render(consequent);
      else $$render(alternate, false);
    });
  }
  reset(div);
  template_effect(() => set_style(div, `--sidebar-width: ${get(sidebarWidth) ?? ""}px;`));
  append($$anchor, div);
  var $$pop = pop({
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
    ...legacy_api()
  });
  $$cleanup();
  return $$pop;
}
customElements.define("focuspoint-wizard", create_custom_element(
  FocuspointWizard,
  {
    itemFormElName: {},
    wizardConfig: {},
    image: {}
  },
  [],
  [],
  false
));
export {
  FocuspointWizard as default
};
//# sourceMappingURL=FocuspointWizard.js.map
