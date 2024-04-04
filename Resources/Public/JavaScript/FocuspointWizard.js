import Modal from '@typo3/backend/modal.js';
import Notification from '@typo3/backend/notification.js';
import ImmediateAction from '@typo3/backend/action-button/immediate-action.js';
import AjaxRequest from '@typo3/core/ajax/ajax-request.js';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import interact from 'interactjs';

class FocuspointWizard {
    calculateRelativeX(width) {
        const image = this.currentModal.querySelector(this.cropImageSelector);
        const imageWidth = image ? image.clientWidth : 0;
        return Math.round((width / imageWidth) * 1e3) / 1e3;
    }
    calculateAbsoluteX(width = 0.33) {
        const image = this.currentModal.querySelector(this.cropImageSelector);
        const imageWidth = image ? image.clientWidth : 0;
        return Math.round((width * imageWidth) * 1e3) / 1e3;
    }
    calculateRelativeY(height) {
        const image = this.currentModal.querySelector(this.cropImageSelector);
        const imageHeight = image ? image.clientHeight : 0;
        return Math.round((height / imageHeight) * 1e3) / 1e3;
    }
    calculateAbsoluteY(height = 0.33) {
        const image = this.currentModal.querySelector(this.cropImageSelector);
        const imageHeight = image ? image.clientHeight : 0;
        return Math.round((height * imageHeight) * 1e3) / 1e3;
    }
    onBoxChange(box) {
        const width = box.offsetWidth;
        const height = box.offsetHeight;
        const position = box.getBoundingClientRect();
        const left = position.left;
        const top = position.top;
        const focuspointBoxId = parseInt(box.getAttribute('data-focuspointBoxId'));
        this.data[focuspointBoxId].width = this.calculateRelativeX(width);
        this.data[focuspointBoxId].height = this.calculateRelativeY(height);
        this.data[focuspointBoxId].x = this.calculateRelativeX(left);
        this.data[focuspointBoxId].y = this.calculateRelativeY(top);
    }
    onInputChange(input) {
        const inputElement = document.querySelector(input);
        const focuspointPanelId = parseInt(inputElement.getAttribute('data-focuspointpanelid'));
        const fieldname = inputElement.getAttribute('name');
        this.data[focuspointPanelId][fieldname] = inputElement.value;
    }
    deleteFocuspoint(focuspointId) {
        // remove html elements
        this.focusBoxes[focuspointId].remove();
        this.inputPanels[focuspointId].remove();
        const inputs = document.querySelectorAll(`form[name="editform"] input[data-formengine-input-name][data-focuspointpanelid="${focuspointId}"]`);
        inputs.forEach((input) => {
            input.remove();
        });
        // remove from class members
        this.focusBoxes.splice(focuspointId, 1);
        this.inputPanels.splice(focuspointId, 1);
        this.data.splice(focuspointId, 1);
        // rename remaining focus points
        this.focusBoxes.forEach((box, i) => {
            const span = box.querySelector('span');
            if (span) {
                span.textContent = (i + 1).toString();
            }
            box.setAttribute('data-focuspointboxid', `${i}`);
        });
        this.inputPanels.forEach((panel, i) => {
            const span = panel.querySelector('span[data-nr]');
            if (span) {
                span.setAttribute('data-nr', `${i + 1}`);
            }
            const panelIdElement = panel.querySelector('*[data-focuspointpanelid]');
            if (panelIdElement) {
                panelIdElement.setAttribute('data-focuspointpanelid', `${i}`);
            }
            this.refreshLinkButtonUrlAndPreview(panel.querySelector('.linkbrowser'));
        });
        // rename hidden link fields
        const linkFields = document.querySelectorAll('form[name="editform"] input[data-formengine-input-name][data-focuspointpanelid]');
        const linksFieldsPerPoint = this.data.length / linkFields.length;
        this.data.forEach((p, i) => {
            for (let j = 0; j < linksFieldsPerPoint; j++) {
                const index = i + j;
                const field = linkFields[index];
                const newFieldName = 'linkfield-' + field.getAttribute('data-fieldname') + '-' + i;
                field.setAttribute('data-focuspointpanelid', `${i}`);
                field.id = newFieldName;
                field.setAttribute('data-formengine-input-name', `${newFieldName}`);
            }
        });
    }
    initFocusBox(box) {
        // Using interact.js for draggable and resizable functionality
        interact(box)
            .draggable({
            autoScroll: true,
            onmove: this.onBoxChange.bind(this, box)
        })
            .resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            onend: this.onBoxChange.bind(this, box)
        });
        // set onload position and size
        const boxId = box.getAttribute('data-focuspointBoxId');
        if (boxId) {
            const focuspoint = this.data[parseInt(boxId)];
            box.style.width = `${this.calculateAbsoluteX(focuspoint.width)}px`;
            box.style.height = `${this.calculateAbsoluteY(focuspoint.height)}px`;
            box.style.top = `${this.calculateAbsoluteY(focuspoint.y)}px`;
            box.style.left = `${this.calculateAbsoluteX(focuspoint.x)}px`;
        }
        //show element
        box.classList.remove('focuspoint-item-hidden');
        // bind delete event
        const removeEvent = () => {
            box.removeEventListener('delete', removeEvent);
            box.remove();
        };
        box.addEventListener('delete', removeEvent);
        // bind click event
        const clickEvent = () => {
            const focuspointBoxId = box.getAttribute('data-focuspointboxid');
            if (focuspointBoxId) {
                this.activateFocuspoint(parseInt(focuspointBoxId));
            }
        };
        box.addEventListener('click', clickEvent);
    }
    activateFocuspoint(id) {
        const alreadyOpen = this.focusBoxes[id].classList.contains('active');
        for (let i = 0; i < this.data.length; i++) {
            this.focusBoxes[i].classList.remove('active');
            const anchors = this.inputPanels[i].querySelectorAll('a.panel-link');
            Array.from(anchors).forEach(anchor => anchor.setAttribute('aria-expanded', 'false'));
            const collapses = this.inputPanels[i].querySelectorAll('.panel-collapse');
            Array.from(collapses).forEach(collapse => collapse.classList.remove('show'));
        }
        if (!alreadyOpen) {
            this.focusBoxes[id].classList.add('active');
            const anchors = this.inputPanels[id].querySelectorAll('a.panel-link');
            Array.from(anchors).forEach(anchor => anchor.setAttribute('aria-expanded', 'true'));
            const collapses = this.inputPanels[id].querySelectorAll('.panel-collapse');
            Array.from(collapses).forEach(collapse => collapse.classList.add('show'));
        }
    }
    addNewFocuspoint(focuspointBoxId = -1) {
        // check if appended or created from data
        if (focuspointBoxId === -1) {
            focuspointBoxId = this.data.length;
            this.data[focuspointBoxId] = this.getEmptyFocuspoint();
        }
        const focuspointBoxIdReadableString = (focuspointBoxId + 1).toString();
        // copy dummys
        // 1. box dummy
        const newBox = this.currentModal.querySelector('.focuspoint-item-dummy');
        const cloneBox = newBox.cloneNode(true);
        cloneBox.classList.remove('focuspoint-item-dummy');
        cloneBox.classList.add('focuspoint-item-hidden');
        cloneBox.setAttribute('data-focuspointBoxId', focuspointBoxId.toString());
        const spanElement = cloneBox.querySelector('span');
        spanElement.innerText = focuspointBoxIdReadableString;
        const focusPointContainer = this.currentModal.querySelector(this.focusPointContainerSelector);
        focusPointContainer.appendChild(cloneBox);
        // 2. panel dummy
        const newPanel = this.currentModal.querySelector('.panel.panel-dummy');
        const clonePanel = newPanel.cloneNode(true);
        clonePanel.classList.remove('panel-dummy');
        clonePanel.classList.add('panel-hidden');
        clonePanel.setAttribute('data-focuspointpanelid', focuspointBoxId.toString());
        const panelGroup = this.currentModal.querySelector(this.panelGroupSelector);
        panelGroup.appendChild(clonePanel);
        // update panel elements that need unique id (e.g. for accordion)
        const dataAppendIdElements = clonePanel.querySelectorAll('[data-append-id]');
        dataAppendIdElements.forEach((el) => {
            const attrs = el.getAttribute('data-append-id').split(',');
            attrs.forEach((attr) => {
                el.setAttribute(attr, el.getAttribute(attr) + (focuspointBoxId + 1));
            });
        });
        // init new elements
        this.initFocusBox(cloneBox);
        this.initInputPanel(clonePanel);
        // add elements to the class
        this.focusBoxes.push(cloneBox);
        this.inputPanels.push(clonePanel);
        return focuspointBoxId;
    }
    onCancelButtonClick(e) {
        e.preventDefault();
        this.currentModal.hideModal();
    }
    onSaveButtonClick(e) {
        e.preventDefault();
        this.save(this.data);
        this.currentModal.hideModal();
    }
    save(data) {
        const focusPoints = JSON.stringify(data);
        const hiddenField = document.getElementById(this.trigger.getAttribute('data-field'));
        if (hiddenField instanceof HTMLInputElement) {
            hiddenField.value = focusPoints;
        }
    }
    onHiddenLinkInputChange(input) {
        // save data
        const focuspointPanelId = parseInt(input.getAttribute('data-focuspointpanelid'));
        const fieldname = input.getAttribute('data-fieldname');
        this.data[focuspointPanelId][fieldname] = input.value;
        // update link and preview
        this.inputPanels[focuspointPanelId].querySelector(`a[data-fieldname="${fieldname}"]`);
        //this.refreshLinkButtonUrlAndPreview(linkButton);
    }
    refreshLinkButtonUrlAndPreview(linkButton) {
        const pid = this.trigger.getAttribute('data-pid');
        const fieldName = linkButton.getAttribute('data-fieldname');
        const focuspointPanelId = parseInt(linkButton.getAttribute('data-focuspointpanelid'));
        const inputValue = this.data[focuspointPanelId][fieldName];
        const inputName = 'linkfield-' + fieldName + '-' + focuspointPanelId;
        // set value in panel input
        const formWizardsWrap = linkButton.closest('.form-wizards-wrap');
        const inputLinkInput = formWizardsWrap.querySelector('.t3js-form-field-inputlink-input');
        if (inputLinkInput) {
            inputLinkInput.value = inputValue;
        }
        // show remove button
        if (inputValue) {
            const removeButton = formWizardsWrap.querySelector('.form-control-clearable button');
            if (removeButton) {
                removeButton.style.visibility = 'visible';
            }
        }
        let url = TYPO3.settings.ajaxUrls.wizard_focuspoint_linkbrowserurl;
        url += "&fieldName=" + encodeURIComponent(fieldName);
        url += "&inputValue=" + encodeURIComponent(inputValue);
        url += "&inputName=" + encodeURIComponent(inputName);
        url += "&pid=" + encodeURIComponent(pid);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            response.json().then((data) => {
                // update link browser url
                linkButton.href = data.url;
                // update link info
                const text = data.preview.text ? data.preview.text : '';
                const icon = data.preview.icon ? data.preview.icon : '';
                const additionalAttributes = data.preview.additionalAttributes ? data.preview.additionalAttributes : '';
                const formWizardsWrap = linkButton.closest('.form-wizards-wrap');
                const inputLinkExplanation = formWizardsWrap.querySelector('.t3js-form-field-inputlink-explanation');
                inputLinkExplanation.value = text;
                inputLinkExplanation.title = text;
                const inputLinkIcon = formWizardsWrap.querySelector('.t3js-form-field-inputlink-icon');
                inputLinkIcon.innerHTML = icon;
                const formWizardsItemsBottom = formWizardsWrap.querySelector('.form-wizards-items-bottom');
                formWizardsItemsBottom.innerHTML = additionalAttributes;
            });
        }).catch((error) => {
            console.error('Error:', error);
        });
        // bind link button event
        linkButton.addEventListener('click', function (e) {
            e.preventDefault();
            const link = e.currentTarget;
            const url = link.getAttribute('href')
                + '&P[currentValue]=' + encodeURIComponent(inputValue)
                + '&P[currentSelectedValues]=' + encodeURIComponent('');
            TYPO3.Modal.advanced({
                type: TYPO3.Modal.types.iframe,
                content: url,
                size: TYPO3.Modal.sizes.large,
            });
        });
    }
    initInputPanel(panel) {
        console.log(panel);
        const panelInputs = panel.querySelectorAll('[data-focuspointpanelid]');
        const focuspointPanelId = parseInt(panel.getAttribute('data-focuspointpanelid'));
        const focuspoint = this.data[focuspointPanelId] || {};
        // for all inputs: set data and eventListener
        panelInputs.forEach((input) => {
            const fieldName = input.name || input.getAttribute('data-fieldname');
            const inputValue = focuspoint[fieldName] || '';
            // set value
            switch (input.tagName) {
                case 'INPUT':
                case 'TEXTAREA':
                    input.value = inputValue;
                    break;
                case 'SELECT':
                    const options = input.querySelectorAll(`option[value="${inputValue}"]`);
                    options.forEach(option => option.selected = true);
                    break;
                case 'A':
                    // create hidden element
                    const inputName = 'linkfield-' + fieldName + '-' + focuspointPanelId;
                    const hiddenElement = document.createElement('input');
                    hiddenElement.setAttribute('type', 'hidden');
                    hiddenElement.setAttribute('value', inputValue);
                    hiddenElement.setAttribute('id', inputName);
                    hiddenElement.setAttribute('data-fieldname', fieldName);
                    hiddenElement.setAttribute('data-formengine-input-name', inputName);
                    hiddenElement.setAttribute('data-focuspointpanelid', `${focuspointPanelId}`);
                    hiddenElement.addEventListener('change', () => this.onHiddenLinkInputChange(hiddenElement));
                    //document.querySelector('form[name="editform"] input[data-formengine-input-name="' + inputName + '"]').remove();
                    document.querySelector('form[name="editform"]').append(hiddenElement);
                    // add button link and preview
                    // @ts-ignore
                    //this.refreshLinkButtonUrlAndPreview(input);
                    // event for toggling link display
                    // decent implementation depends on HTML structure, modify as per actual structure
                    input.closest('.form-wizards-wrap').querySelector('.t3js-form-field-inputlink-explanation-toggle').addEventListener('click', function (e) {
                        e.preventDefault();
                        input.closest('.form-wizards-wrap').querySelector('.t3js-form-field-inputlink-explanation, .t3js-form-field-inputlink-input').classList.toggle('hidden');
                    });
                    // event for deleting link
                    // decent implementation depends on HTML structure, modify as per actual structure
                    input.closest('.form-wizards-wrap').querySelector('.form-control-clearable button').addEventListener('click', function (e) {
                        e.preventDefault();
                        this.style.visibility = 'hidden';
                        hiddenElement.value = '';
                        hiddenElement.dispatchEvent(new Event('change'));
                    });
                    // event for manually changing text
                    // decent implementation depends on HTML structure, modify as per actual structure
                    input.closest('.form-wizards-wrap').querySelector('.t3js-form-field-inputlink-input').addEventListener('blur', function (e) {
                        e.preventDefault();
                        hiddenElement.value = this.value;
                        hiddenElement.dispatchEvent(new Event('change'));
                    });
                    break;
            }
            // bind events
            input.removeEventListener('input', this.onInputChange.bind(this, input.tagName));
            input.addEventListener('input', this.onInputChange.bind(this, input.tagName));
        });
        // bind remove event
        const removeEvent = function () {
            panel.remove();
        };
        panel.addEventListener('remove', removeEvent.bind(null, panel));
        // bind open / close event
        const clickEvent = function () {
            const id = parseInt(panel.querySelector('input:first-child').getAttribute('data-focuspointpanelid'));
            this.activateFocuspoint(id);
        };
        panel.querySelector('a.panel-link').addEventListener('click', clickEvent.bind(this, panel));
        // bind delete button event
        panel.querySelector('[data-delete]').addEventListener('click', e => {
            e.preventDefault();
            this.deleteFocuspoint(focuspointPanelId);
        });
        // show panel
        panel.classList.remove('panel-hidden');
    }
    getEmptyFocuspoint() {
        const o = {
            x: 0.3,
            y: 0.3,
            width: 0.3,
            height: 0.3
        };
        const defaultWidthElement = this.currentModal.querySelector('.panel.panel-dummy [data-focuspointpanelid][name="width"]');
        const defaultHeightElement = this.currentModal.querySelector('.panel.panel-dummy [data-focuspointpanelid][name="height"]');
        const defaultWidth = defaultWidthElement && defaultWidthElement.value ? parseFloat(defaultWidthElement.value) : 0;
        const defaultHeight = defaultHeightElement && defaultHeightElement.value ? parseFloat(defaultHeightElement.value) : 0;
        const defaultSize = Math.max(defaultWidth, defaultHeight);
        o.width = defaultSize;
        o.height = defaultSize;
        if (defaultSize != 0.3) {
            o.x = (1 - o.width) / 2;
            o.y = (1 - o.height) / 2;
        }
        return o;
    }
    /**
     * @method init
     * @desc Initializes the Focus Point UI and sets up all the event bindings for the UI
     * @private
     */
    init() {
        const hiddenField = document.querySelector(`#${this.trigger.getAttribute('data-field')}`);
        let data = hiddenField instanceof HTMLInputElement ? hiddenField.value : '';
        if (!data || data === "") {
            data = "[]";
        }
        // If we have data already set we assume an internal reinit eg. after resizing
        this.data = this.data && Object.keys(this.data).length !== 0 ? this.data : JSON.parse(data);
        if (this.data.length) {
            // create focuspoints from data
            for (let i = 0; i < this.data.length; i++) {
                this.addNewFocuspoint(i);
            }
            // open first focus point
            this.activateFocuspoint(0);
        }
        // Bind New button
        Array.from(this.currentModal.querySelectorAll('[data-method=new]')).forEach((newElement) => {
            newElement.addEventListener('click', (e) => {
                e.preventDefault();
                const newFocuspointId = this.addNewFocuspoint(-1);
                this.activateFocuspoint(newFocuspointId);
            });
        });
        // Bind resize event
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }
    onWindowResize() {
        // update position and size of every focuspoint
        Array.from(this.focusBoxes).forEach((box, i) => {
            const focuspoint = this.data[i];
            box.style.width = this.calculateAbsoluteX(focuspoint.width) + 'px';
            box.style.height = this.calculateAbsoluteY(focuspoint.height) + 'px';
            box.style.top = this.calculateAbsoluteY(focuspoint.y) + 'px';
            box.style.left = this.calculateAbsoluteX(focuspoint.x) + 'px';
        });
    }
    async onModalLoaded() {
        const image = this.currentModal.querySelector(this.cropImageSelector);
        image.addEventListener('load', this.initializeFocuspointModal.bind(this));
        image.src = image.getAttribute('data-src');
    }
    initializeFocuspointModal() {
        this.currentModal.classList.add('modal-focuspoints');
        const modalBody = this.currentModal.querySelector('.modal-body');
        modalBody.classList.add('cropper');
        modalBody.classList.add('modal-body-focuspoints');
        this.init();
    }
    show() {
        const modalTitle = this.trigger.getAttribute('data-modal-title');
        const buttonDismissText = this.trigger.getAttribute('data-button-dismiss-text');
        const buttonSaveText = this.trigger.getAttribute('data-button-save-text');
        const imageUri = this.trigger.getAttribute('data-url');
        const buttons = [
            {
                btnClass: 'btn-default',
                dataAttributes: {
                    method: 'dismiss',
                },
                text: buttonDismissText,
                icon: 'actions-close',
                trigger: this.onCancelButtonClick.bind(this)
            },
            {
                btnClass: 'btn-primary',
                icon: 'actions-document-save',
                dataAttributes: {
                    method: 'save',
                },
                text: buttonSaveText,
                trigger: this.onSaveButtonClick.bind(this)
            },
        ];
        this.currentModal = Modal.advanced({
            content: html `
          <div class="modal-loading">
              <typo3-backend-spinner size="default"></typo3-backend-spinner>
          </div>`,
            size: Modal.sizes.full,
            style: Modal.styles.dark,
            title: modalTitle,
            buttons: buttons,
        });
        this.currentModal.addEventListener('typo3-modal-shown', () => {
            new AjaxRequest(imageUri).get().then(async (response) => {
                const htmlResponse = await response.resolve();
                this.currentModal.templateResultContent = html `${unsafeHTML(htmlResponse)}`;
                this.currentModal.updateComplete.then(() => this.onModalLoaded());
            });
        });
        this.currentModal.addEventListener('typo3-modal-hide', () => {
            this.destroy();
        });
        // delete / reset all hidden inputs
        document.querySelector('form[name="editform"]').querySelectorAll('input[data-formengine-input-name][data-focuspointpanelid]').forEach(element => element.remove());
    }
    destroy() {
        if (this.currentModal) {
            this.currentModal = null;
            this.focusBoxes = [];
            this.inputPanels = [];
            this.data = null;
        }
    }
    constructor() {
        this.panelGroupSelector = '#accordion-cropper-variants';
        this.cropImageSelector = '#t3js-crop-image';
        this.focusPointContainerSelector = '#focuspoint-container';
        this.focusBoxes = [];
        this.inputPanels = [];
        this.data = [];
        const triggerHandler = (e) => {
            e.preventDefault();
            this.show();
        };
        this.trigger = document.querySelector('.t3js-focuspoint-trigger');
        this.trigger.removeEventListener('click', triggerHandler.bind(this));
        this.trigger.addEventListener('click', triggerHandler.bind(this));
        if (this.trigger.getAttribute('data-missing-pagets-warning') === '1') {
            this.displayMissingPageTsWarning();
        }
    }
    displayMissingPageTsWarning() {
        const notificationCallback = new ImmediateAction(() => {
            window.open('https://docs.typo3.org/p/blueways/bw-focuspoint-images/master/en-us/#upgrade', '_blank').focus();
        });
        Notification.warning(TYPO3.lang.wizard_missingPageTs_title, TYPO3.lang.wizard_missingPageTs_message, 0, [{ label: TYPO3.lang.wizard_missingPageTs_button, action: notificationCallback }]);
    }
}

export { FocuspointWizard as default };
