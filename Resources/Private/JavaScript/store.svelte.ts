import {writable, get} from 'svelte/store';
import Polygon from "./shapes/Polygon.svelte";
import Rect from "./shapes/Rect.svelte";
import type {Component} from "svelte";

export type ShapeType = "rect" | "polygon";

export const imageMeta = writable<{ w: number; h: number } | null>(null);

export const focuspointChannelName = (itemFormElName: string) => `focuspoint:${itemFormElName}`
export const detectionMode = writable(false);

export type Focuspoint = {[K in string]: string} & {
  __shape: ShapeType;
  __data: any;
  active: boolean;
}

type ShapeConfig = {
  component: Component<any>;
  constructor(config: WizardConfig): object;
}

type WizardConfig = {
  defaultWidth?: string;
  defaultHeight?: string;
  itemFormElName?: string;
  typo3Version?: number;
  pid: number;
  lang: Record<string, string>,
  fields: {
    [K in string]: {
      displayCond?: string;
      default?: string;
      useAsName?: boolean | number | string;
      type?: string;
    }
  }
}

export const SHAPES: {[K in ShapeType]: ShapeConfig} = {
  rect: {
    component: Rect,
    constructor(config: WizardConfig): object {
      const meta = get(imageMeta);
      const wParsed = parseFloat(config.defaultWidth ?? "0");
      const hParsed = parseFloat(config.defaultHeight ?? "0");

      let width  = Number.isFinite(wParsed) && wParsed > 0 ? wParsed : (meta ? Math.round(meta.w * 0.25) : 200);
      let height = Number.isFinite(hParsed) && hParsed > 0 ? hParsed : (meta ? Math.round(meta.h * 0.25) : 150);

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
    constructor(): object {
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

export const wizardConfigStore = writable<WizardConfig>({fields: {}, lang: {}, pid: 0});

export const focuspoints = writable<Focuspoint[]>([]);

let activeIndex = $state(0);

export const initStores = (initialValue: string, wizardConfig: string): void => {
  wizardConfigStore.set(JSON.parse(wizardConfig));
  focuspoints.set(JSON.parse(initialValue && initialValue !== '' ? initialValue : '[]'));
}

/**
* Evaluate a condition, e.g. FIELD:name:REQ:true
*/
export const fieldMeetsCondition = (fieldName: string, point: {[K in string]: string}): boolean => {
    const condition = get(wizardConfigStore).fields[fieldName].displayCond;
    if (!condition) {
        return true;
    }

    const parts = condition.split(':');
    if (parts.length < 4 || parts[0] !== 'FIELD') {
        return true;
    }

    const [, field, operator, value] = parts;
    if (!Object.hasOwn(point, field)) {
        return true;
    }

    const raw = point[field];
    const normalizeRaw = (v: unknown): string => {
      if (v === true) return '1';
      if (v === false) return '0';
      if (v === null || v === undefined) return '';
      return String(v).trim();
    }

    const normalizeCond = (v: string): string => {
      const t = v.trim().toLowerCase();
      if (t === 'true') return '1';
      if (t === 'false') return '0';
      return v.trim();
    }

    const toNumber = (v: unknown): number => Number(v);
    const isFiniteNumber = (v: number): boolean => Number.isFinite(v);

    const pointStr = normalizeRaw(raw);
    const condStr = normalizeCond(value);

  switch (operator) {
    case 'REQ':
      // "required" should be false for empty/false-ish checkbox values
      return pointStr !== '' && pointStr !== '0' && pointStr.toLowerCase() !== 'false';

    case '!=':
      return pointStr !== condStr;

    case '=':
      return pointStr === condStr;

    case '>': {
      const pointVal = toNumber(raw);
      const compareVal = toNumber(value);
      return isFiniteNumber(pointVal) && isFiniteNumber(compareVal) && pointVal > compareVal;
    }

    case '<': {
      const pointVal = toNumber(raw);
      const compareVal = toNumber(value);
      return isFiniteNumber(pointVal) && isFiniteNumber(compareVal) && pointVal < compareVal;
    }

    case '>=': {
      const pointVal = toNumber(raw);
      const compareVal = toNumber(value);
      return isFiniteNumber(pointVal) && isFiniteNumber(compareVal) && pointVal >= compareVal;
    }

    case '<=': {
      const pointVal = toNumber(raw);
      const compareVal = toNumber(value);
      return isFiniteNumber(pointVal) && isFiniteNumber(compareVal) && pointVal <= compareVal;
    }

    case 'IN': {
      const list = value.split(',').map((v) => normalizeCond(v));
      return list.includes(pointStr);
    }

    case '!IN': {
      const list = value.split(',').map((v) => normalizeCond(v));
      return !list.includes(pointStr);
    }

    case '-': {
      const range = value.split('-');
      if (range.length !== 2) return false;
      const pointVal = toNumber(raw);
      const min = toNumber(range[0]);
      const max = toNumber(range[1]);
      return isFiniteNumber(pointVal) && isFiniteNumber(min) && isFiniteNumber(max) && pointVal >= min && pointVal <= max;
    }

    case '!-': {
      const range = value.split('-');
      if (range.length !== 2) return false;
      const pointVal = toNumber(raw);
      const min = toNumber(range[0]);
      const max = toNumber(range[1]);
      return isFiniteNumber(pointVal) && isFiniteNumber(min) && isFiniteNumber(max) && (pointVal < min || pointVal > max);
    }

    default:
      return false;
  }
}

export const createNewFocuspoint = (shape: ShapeType): void => {
    const config = get(wizardConfigStore);

    // create a new focuspoint with default fields
    const newFocuspoint: any = Object.keys(config.fields).reduce((acc: any, key) => {
      acc[key] = config.fields[key].default ?? null;
      return acc;
    }, {});

    newFocuspoint.__shape = shape;
    newFocuspoint.__data = SHAPES[shape].constructor(config);

    // add the new focuspoint to the store and activate it
    focuspoints.update(focuspoints => [...focuspoints, newFocuspoint]);
    activeIndex = get(focuspoints).length - 1;
    activateFocuspoint(activeIndex);
}

export const setActiveIndex = (index: number) => {
  activeIndex = index;
}

export const getActiveIndex = (): number => {
  return activeIndex;
}

export const activateFocuspoint = (index: number) => {
  focuspoints.update((store) => {
    store.forEach((focuspoint, i) => {
      if (i === index) {
        setActiveIndex(index)
        focuspoint.active = true;
      } else {
        focuspoint.active = false;
      }
    });
    return store;
  })
}

export const deactivateAllFocuspoints = () => {
  focuspoints.update((store) => {
    store.forEach(focuspoint => focuspoint.active = false);
    return store;
  })
}

export const focusPointName = (index: number) => {
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
