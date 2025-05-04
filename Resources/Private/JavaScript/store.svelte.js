import {writable, get} from 'svelte/store';
import Polygon from "./shapes/Polygon.svelte";
import Rect from "./shapes/Rect.svelte";

export const SHAPES = {
  rect: {
    component: Rect,
    constructor(config) {
      return {
        x: 0,
        y: 0,
        width: parseFloat(config.defaultWidth),
        height: parseFloat(config.defaultHeight),
      };
    }
  },
  polygon: {
    component: Polygon,
    constructor() {
      return {
        points: [[10, 10], [50, 10], [50, 50], [10, 50]]
      };
    }
  }
};

export const wizardConfigStore = writable(null);

export const focuspoints = writable([]);

let activeIndex = $state(0);

export const initStores = (hiddenInput, wizardConfig) => {
    wizardConfigStore.set(JSON.parse(wizardConfig));
    focuspoints.set(JSON.parse(hiddenInput.value ? hiddenInput.value : '[]'));
}

/**
* Evaluate a condition, e.g. FIELD:name:REQ:true
*
* @param fieldName
* @param point
* @returns {boolean}
*/
export const fieldMeetsCondition = (fieldName, point) => {
    const condition = get(wizardConfigStore).fields[fieldName].displayCond;
    if (!condition) {
        return true;
    }

    const parts = condition.split(':');
    if (parts.length < 4 || parts[0] !== 'FIELD') {
        return true;
    }

    const [type, field, operator, value] = parts;
    if (!Object.hasOwn(point, field)) {
        return true;
    }

    switch (operator) {
        case 'REQ':
            return point[field] !== null && point[field] !== '';
        case '!=':
            return point[field] !== value;
        case '=':
            return point[field] === value;
        case '>': {
            const pointVal = parseInt(point[field], 10);
            const compareVal = parseInt(value, 10);
            return !isNaN(pointVal) && !isNaN(compareVal) && pointVal > compareVal;
        }
        case '<': {
            const pointVal = parseInt(point[field], 10);
            const compareVal = parseInt(value, 10);
            return !isNaN(pointVal) && !isNaN(compareVal) && pointVal < compareVal;
        }
        case '>=': {
            const pointVal = parseInt(point[field], 10);
            const compareVal = parseInt(value, 10);
            return !isNaN(pointVal) && !isNaN(compareVal) && pointVal >= compareVal;
        }
        case '<=': {
            const pointVal = parseInt(point[field], 10);
            const compareVal = parseInt(value, 10);
            return !isNaN(pointVal) && !isNaN(compareVal) && pointVal <= compareVal;
        }
        case 'IN':
            return value.split(',').includes(point[field]);
        case '!IN':
            return !value.split(',').includes(point[field]);
        case '-': {
            const range = value.split('-');
            if (range.length !== 2) return false;
            const [min, max] = range;
            const pointVal = parseInt(point[field], 10);
            return !isNaN(pointVal) && pointVal >= parseInt(min, 10) && pointVal <= parseInt(max, 10);
        }
        case '!-': {
            const range = value.split('-');
            if (range.length !== 2) return false;
            const [min, max] = range;
            const pointVal = parseInt(point[field], 10);
            return !isNaN(pointVal) && (pointVal < parseInt(min, 10) || pointVal > parseInt(max, 10));
        }
        default:
            return false;
    }
}

export const createNewFocuspoint = (shape) => {
    const config = get(wizardConfigStore);

    // create a new focuspoint with default fields
    const newFocuspoint = Object.keys(config.fields).reduce((acc, key) => {
      acc[key] = config.fields[key].default ?? null;
      return acc;
    }, {});

    newFocuspoint.__shape = shape;
    newFocuspoint.__data = SHAPES[shape].constructor(config);

    // add the new focuspoint to the store and activate it
    focuspoints.update(focuspoints => [...focuspoints, newFocuspoint]);
    activeIndex = get(focuspoints).length - 1;
}

export const setActiveIndex = index => {
  activeIndex = index;
}

export const getActiveIndex = () => {
  return activeIndex;
}

export const focusPointName = (index) => {
    const config = get(wizardConfigStore);
    const nameFields = Object.entries(config.fields).filter(([key, value]) => {
        return value['useAsName'] === true || value['useAsName'] === 'true' || value['useAsName'] === '1' || value['useAsName'] === 1;
    }).map(([key, value]) => {
        return key;
    });


    const defaultName = 'Focus Point ' + (index + 1);
    if (nameFields.length === 0) {
        return defaultName;
    }

    const store = get(focuspoints);
    const names = Object.entries(store[index]).filter(([key, value]) => { return nameFields.includes(key) && value !== null && value !== '' }).map(([key, value]) => { return value })
    if (names.length === 0) {
        return defaultName;
    }

    return names.join(', ');
}
