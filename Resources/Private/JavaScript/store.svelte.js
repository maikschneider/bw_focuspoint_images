import {writable, get} from 'svelte/store';
import Icons from '@typo3/backend/icons.js'

export const wizardConfigStore = writable(null);

export const focuspoints = writable([]);

export const initStores = (hiddenInput, wizardConfig, hiddenElement) => {
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

    const [type, field, operator, value] = condition.split(':');
    if (type !== 'FIELD') {
        return false;
    }

    switch (operator) {
        case 'REQ':
            return point[field] !== null && point[field] !== '';
        case '!=':
            return point[field] !== value;
        case '=':
            return point[field] === value;
        case '>':
            return parseInt(point[field]) > parseInt(value);
        case '<':
            return parseInt(point[field]) < parseInt(value);
        case '>=':
            return parseInt(point[field]) >= parseInt(value);
        case '<=':
            return parseInt(point[field]) <= parseInt(value);
        case 'IN':
            return value.split(',').includes(point[field]);
        case '!IN':
            return !value.split(',').includes(point[field]);
        case '-':
            const [min, max] = value.split('-');
            return point[field] >= min && point[field] <= max;
        case '!-':
            const [min2, max2] = value.split('-');
            return point[field] < min2 || point[field] > max2;
        default:
            return false;
    }
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
