import {writable, get} from 'svelte/store';

export const wizardConfigStore = writable(null);

export const focuspoints = writable([]);

export const initStores = (itemFormElValue, wizardConfig) => {
    wizardConfigStore.set(JSON.parse(wizardConfig));
    focuspoints.set(JSON.parse(JSON.parse(itemFormElValue)));
}

export const createNewFocuspoint = () => {
    const config = get(wizardConfigStore);
    const newFocuspoint = {
        x: 0.333,
        y: 0.333,
        width: parseFloat(config.defaultWidth),
        height: parseFloat(config.defaultHeight),
    };
    focuspoints.update(focuspoints => [...focuspoints, newFocuspoint]);
}
