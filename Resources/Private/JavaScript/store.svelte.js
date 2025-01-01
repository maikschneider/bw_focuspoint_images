import {writable, get} from 'svelte/store';
import Icons from '@typo3/backend/icons.js'

export const wizardConfigStore = writable(null);

export const focuspoints = writable([]);

export const initStores = (itemFormElValue, wizardConfig) => {
    wizardConfigStore.set(JSON.parse(wizardConfig));
    focuspoints.set(JSON.parse(JSON.parse(itemFormElValue)));
    activateFocuspoint(0);
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
    activateFocuspoint(get(focuspoints).length - 1);
}

export const iconStore = writable({});

export const getIcon = async (iconName) => {
    const store = get(iconStore);
    if (store[iconName]) {
        return;
    }

    Icons.getIcon(iconName, Icons.sizes.small).then((html) => {
        iconStore.update((store) => {
            store[iconName] = html;
            return store
        });
    })
}

export const activateFocuspoint = (index) => {
    focuspoints.update((store) => {
        store.forEach((focuspoint, i) => {
            focuspoint.active = i === index ? !focuspoint.active : false;
        });
        return store;
    })
}
