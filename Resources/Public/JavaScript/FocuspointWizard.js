import $ from 'jquery';
import Modal from '@typo3/backend/modal.js';
import Notification from '@typo3/backend/notification.js';
import ImmediateAction from '@typo3/backend/action-button/immediate-action.js';
import AjaxRequest from '@typo3/core/ajax/ajax-request.js';
import 'jquery-ui/draggable.js';
import 'jquery-ui/resizable.js';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

class FocuspointWizard {
    calculateRelativeX(width) {
        const image = $(this.currentModal).find(this.cropImageSelector);
        const imageWidth = $(image).width();
        return Math.round((width / imageWidth) * 1e3) / 1e3;
    }
    calculateAbsoluteX(width = 0.33) {
        const image = $(this.currentModal).find(this.cropImageSelector);
        const imageWidth = $(image).width();
        return Math.round((width * imageWidth) * 1e3) / 1e3;
    }
    calculateRelativeY(height) {
        const image = $(this.currentModal).find(this.cropImageSelector);
        const imageHeight = $(image).height();
        return Math.round((height / imageHeight) * 1e3) / 1e3;
    }
    calculateAbsoluteY(height = 0.33) {
        const image = $(this.currentModal).find(this.cropImageSelector);
        const imageHeight = $(image).height();
        return Math.round((height * imageHeight) * 1e3) / 1e3;
    }
    onBoxChange(box) {
        const width = $(box).width();
        const height = $(box).height();
        const position = $(box).position();
        const left = position.left;
        const top = position.top;
        const focuspointBoxId = parseInt($(box).attr('data-focuspointBoxId'));
        this.data[focuspointBoxId].width = this.calculateRelativeX(width);
        this.data[focuspointBoxId].height = this.calculateRelativeY(height);
        this.data[focuspointBoxId].x = this.calculateRelativeX(left);
        this.data[focuspointBoxId].y = this.calculateRelativeY(top);
    }
    onInputChange(input) {
        const focuspointPanelId = parseInt($(input).attr('data-focuspointPanelId'));
        const fieldname = $(input).attr('name');
        this.data[focuspointPanelId][fieldname] = $(input).val();
    }
    deleteFocuspoint(focuspointId) {
        const self = this;
        // remove html elements
        $(this.focusBoxes[focuspointId]).trigger('remove');
        $(this.inputPanels[focuspointId]).trigger('remove');
        $(document).find('form[name="editform"] input[data-formengine-input-name][data-focuspointPanelId="' + focuspointId + '"]').remove();
        // remove from class members
        this.focusBoxes.splice(focuspointId, 1);
        this.inputPanels.splice(focuspointId, 1);
        this.data.splice(focuspointId, 1);
        // rename remaining focus points
        $(this.focusBoxes).each(function (i, e) {
            $(e).find('span').html((i + 1).toString());
            $(e).attr('data-focuspointboxid', i);
        });
        $(this.inputPanels).each(function (i, e) {
            $(e).find('span[data-nr]').attr('data-nr', i + 1);
            $(e).find('*[data-focuspointpanelid]').attr('data-focuspointpanelid', i);
            self.refreshLinkButtonUrlAndPreview($(e).find('.linkbrowser').get(0));
        });
        // rename hidden link fields
        const linkFields = $(document).find('form[name="editform"] input[data-formengine-input-name][data-focuspointPanelId]');
        const linksFieldsPerPoint = this.data.length / linkFields.length;
        this.data.forEach((p, i) => {
            for (let j = 0; j < linksFieldsPerPoint; j++) {
                const index = i + j;
                const field = linkFields.get(index);
                const newFieldName = 'linkfield-' + $(field).attr('data-fieldname') + '-' + i;
                $(field).attr({
                    'data-focuspointpanelid': i,
                    'id': newFieldName,
                    'data-formengine-input-name': newFieldName
                });
            }
        });
    }
    initFocusBox(box) {
        // register jquery-ui/draggable
        $(box).draggable({
            containment: "parent",
            stop: this.onBoxChange.bind(this, box),
        });
        // register jquery-ui/resizable
        if ($(box).hasClass('ui-resizable')) {
            $(box).resizable({
                handles: "n, e, w, s, se, sw, nw, ne",
                containment: "parent",
                minWidth: 20,
                minHeight: 20,
                stop: this.onBoxChange.bind(this, box),
            });
        }
        // set onload position and size
        const focuspoint = this.data[$(box).attr('data-focuspointBoxId')];
        $(box).css('width', this.calculateAbsoluteX(focuspoint.width) + 'px');
        $(box).css('height', this.calculateAbsoluteY(focuspoint.height) + 'px');
        $(box).css('top', this.calculateAbsoluteY(focuspoint.y) + 'px');
        $(box).css('left', this.calculateAbsoluteX(focuspoint.x) + 'px');
        // show element
        $(box).removeClass('focuspoint-item-hidden');
        // bind delete event
        const removeEvent = function () {
            $(box).off();
            $(box).remove();
        };
        $(box).bind('delete', removeEvent.bind(null, box));
        // bind click event
        const self = this;
        const clickEvent = function () {
            const id = parseInt($(box).attr('data-focuspointboxid'));
            self.activateFocuspoint(id);
        };
        $(box).bind('click', clickEvent.bind(null, box));
    }
    activateFocuspoint(id) {
        const alreadyOpen = this.focusBoxes[id].hasClass('active');
        for (let i = 0; i < this.data.length; i++) {
            this.focusBoxes[i].removeClass('active');
            this.inputPanels[i].find('a.panel-link').attr('aria-expanded', 'false');
            this.inputPanels[i].find('.panel-collapse').removeClass('show');
        }
        if (!alreadyOpen) {
            this.focusBoxes[id].addClass('active');
            this.inputPanels[id].find('a.panel-link').attr('aria-expanded', 'true');
            this.inputPanels[id].find('.panel-collapse').addClass('show');
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
        const newBox = $(this.currentModal).find('.focuspoint-item-dummy')
            .clone()
            .appendTo($(this.currentModal).find(this.focusPointContainerSelector))
            .attr('data-focuspointBoxId', focuspointBoxId)
            .addClass('focuspoint-item-hidden')
            .removeClass('focuspoint-item-dummy')
            .find('span')
            .html(focuspointBoxIdReadableString)
            .parent();
        // 2. panel dummy
        const newPanel = $(this.currentModal).find('.panel.panel-dummy')
            .clone()
            .appendTo($(this.currentModal).find(this.panelGroupSelector))
            .addClass('panel-hidden')
            .removeClass('panel-dummy');
        // update all input inside panel: set new id (= offset in this.data)
        $(newPanel).find('[data-focuspointPanelId]').attr('data-focuspointPanelId', focuspointBoxId);
        // update panel elements that need unique id (e.g. for accordion)
        $(newPanel).find('[data-append-id]').each((i, el) => {
            $(el).attr('data-append-id').split(',').forEach((attr) => {
                $(el).attr(attr, $(el).attr(attr) + (focuspointBoxId + 1));
            });
        });
        // init new elements
        this.initFocusBox(newBox);
        this.initInputPanel(newPanel);
        // add elements to the class
        this.focusBoxes.push(newBox);
        this.inputPanels.push(newPanel);
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
        const hiddenField = $(`#${this.trigger.attr('data-field')}`);
        hiddenField.val(focusPoints);
    }
    onHiddenLinkInputChange(input) {
        // save data
        const focuspointPanelId = parseInt($(input).attr('data-focuspointPanelId'));
        const fieldname = $(input).attr('data-fieldname');
        this.data[focuspointPanelId][fieldname] = $(input).val();
        // update link and preview
        const linkButton = this.inputPanels[focuspointPanelId].find('a[data-fieldname="' + fieldname + '"]').first();
        this.refreshLinkButtonUrlAndPreview(linkButton);
    }
    refreshLinkButtonUrlAndPreview(linkButton) {
        const pid = this.trigger.data('pid');
        const fieldName = $(linkButton).attr('data-fieldname');
        const focuspointPanelId = parseInt($(linkButton).attr('data-focuspointPanelId'));
        const inputValue = this.data[focuspointPanelId][fieldName];
        const inputName = 'linkfield-' + fieldName + '-' + focuspointPanelId;
        // set value in panel input
        $(linkButton).closest('.form-wizards-wrap').find('.t3js-form-field-inputlink-input').val(inputValue);
        // show remove button
        if (inputValue) {
            $(linkButton).closest('.form-wizards-wrap').find('.form-control-clearable button').css('visibility', 'visible');
        }
        let url = TYPO3.settings.ajaxUrls.wizard_focuspoint_linkbrowserurl;
        url += "&fieldName=" + encodeURIComponent(fieldName);
        url += "&inputValue=" + encodeURIComponent(inputValue);
        url += "&inputName=" + encodeURIComponent(inputName);
        url += "&pid=" + encodeURIComponent(pid);
        const request = $.ajax({
            type: 'GET',
            url: url,
            contentType: 'application/json'
        });
        // get link browser url + link info
        request.done(function (response) {
            const data = response;
            // update link browser url
            $(linkButton).attr('href', data.url);
            // update link info
            const text = data.preview.text ? data.preview.text : '';
            const icon = data.preview.icon ? data.preview.icon : '';
            const additionalAttributes = data.preview.additionalAttributes ? data.preview.additionalAttributes : '';
            $(linkButton).closest('.form-wizards-wrap').find('.t3js-form-field-inputlink-explanation').val(text).attr('title', text);
            $(linkButton).closest('.form-wizards-wrap').find('.t3js-form-field-inputlink-icon').html(icon);
            $(linkButton).closest('.form-wizards-wrap').find('.form-wizards-items-bottom').html(additionalAttributes);
        });
        // bind link button event
        $(linkButton).off('click').on('click', function (e) {
            e.preventDefault();
            const url = $(e.currentTarget).attr('href')
                + '&P[currentValue]=' + encodeURIComponent(inputValue)
                + '&P[currentSelectedValues]=' + encodeURIComponent('');
            Modal.advanced({
                type: Modal.types.iframe,
                content: url,
                size: Modal.sizes.large,
            });
        });
    }
    initInputPanel(panel) {
        const self = this;
        const panelInputs = $(panel).find('[data-focuspointPanelId]');
        const focuspointPanelId = parseInt(panelInputs.first().attr('data-focuspointPanelId'));
        const focuspoint = this.data[focuspointPanelId] ? this.data[focuspointPanelId] : {};
        // for all inputs: set data and eventListener
        panelInputs.each((i, input) => {
            const fieldName = $(input).attr('name') ? $(input).attr('name') : $(input).attr('data-fieldname');
            const inputValue = focuspoint[fieldName] ? focuspoint[fieldName] : '';
            // set value
            switch ($(input).prop('tagName')) {
                case 'INPUT':
                case 'TEXTAREA':
                    $(input).val(inputValue);
                    break;
                case 'SELECT':
                    $('option', input).prop('selected', false);
                    $('option[value="' + inputValue + '"]', input).prop('selected', true);
                    break;
                case 'A':
                    // create hidden element
                    const inputName = 'linkfield-' + fieldName + '-' + focuspointPanelId;
                    const $hiddenElement = $('<input>')
                        .attr({
                        'type': 'hidden',
                        'value': inputValue,
                        'id': inputName,
                        'data-fieldname': fieldName,
                        'data-formengine-input-name': inputName,
                        'data-focuspointPanelId': focuspointPanelId,
                        'onchange': 'this.dispatchEvent(new Event(\'v9-v10-change\', {bubbles: true, cancelable: true}));'
                    });
                    $hiddenElement.on('change', this.onHiddenLinkInputChange.bind(this, $hiddenElement));
                    $(document).find('form[name="editform"] input[data-formengine-input-name="' + inputName + '"]').remove();
                    $(document).find('form[name="editform"]').append($hiddenElement);
                    // add button link and preview
                    this.refreshLinkButtonUrlAndPreview(input);
                    // event for toggling link display
                    $(input).closest('.form-wizards-wrap').find('.t3js-form-field-inputlink-explanation-toggle').on('click', function (e) {
                        e.preventDefault();
                        $(input).closest('.form-wizards-wrap').find('.t3js-form-field-inputlink-explanation, .t3js-form-field-inputlink-input').toggleClass('hidden');
                    });
                    // event for deleting link
                    $(input).closest('.form-wizards-wrap').find('.form-control-clearable button').on('click', function (e) {
                        e.preventDefault();
                        $(e.currentTarget).css('visibility', 'hidden');
                        $hiddenElement.val('').trigger('change');
                    });
                    // event for manually changing text
                    $(input).closest('.form-wizards-wrap').find('.t3js-form-field-inputlink-input').on('blur', function (e) {
                        e.preventDefault();
                        $hiddenElement.val($(e.currentTarget).val()).trigger('change');
                    });
                    break;
            }
            // bind events
            $(input).off('input').on('input', this.onInputChange.bind(this, input));
        });
        // bind remove event
        const removeEvent = function () {
            $(panel).off();
            $(panel).remove();
        };
        $(panel).bind('remove', removeEvent.bind(null, panel));
        // bind open / close event
        const clickEvent = function () {
            const id = parseInt($('input:first', panel).attr('data-focuspointpanelid'));
            self.activateFocuspoint(id);
        };
        $(panel).find('a.panel-link').bind('click', clickEvent.bind(this, panel));
        // bind delete button event
        $(panel).find('[data-delete]').off('click').on('click', (e, button) => {
            e.preventDefault();
            this.deleteFocuspoint(focuspointPanelId);
        });
        // show panel
        $(panel).removeClass('panel-hidden');
    }
    getEmptyFocuspoint() {
        const o = {
            x: 0.3,
            y: 0.3,
            width: 0.3,
            height: 0.3
        };
        const defaultWidth = $(this.currentModal).find('.panel.panel-dummy [data-focuspointPanelId][name="width"]').val();
        const defaultHeight = $(this.currentModal).find('.panel.panel-dummy [data-focuspointPanelId][name="height"]').val();
        const defaultSize = defaultWidth > defaultHeight ? defaultWidth : defaultHeight;
        // @ts-ignore
        o.width = defaultSize;
        // @ts-ignore
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
        const hiddenField = $(`#${this.trigger.attr('data-field')}`);
        let data = hiddenField.val();
        if (!data || data == "") {
            data = "[]";
        }
        // If we have data already set we assume an internal reinit eg. after resizing
        // @ts-ignore
        this.data = $.isEmptyObject(this.data) ? JSON.parse(data) : this.data;
        if (this.data.length) {
            // create focuspoints from data
            for (let i = 0; i < this.data.length; i++) {
                this.addNewFocuspoint(i);
            }
            // open first focus point
            this.activateFocuspoint(0);
        }
        // Bind New button
        $(this.currentModal).find('[data-method=new]').off('click').on('click', (e) => {
            e.preventDefault();
            const newFocuspointId = this.addNewFocuspoint(-1);
            this.activateFocuspoint(newFocuspointId);
        });
        // Bind resize event
        $(window).resize(this.onWindowResize.bind(this));
    }
    onWindowResize() {
        const self = this;
        // update position and size of every focuspoint
        $(this.focusBoxes).each(function (i, box) {
            const focuspoint = self.data[i];
            $(box).css('width', self.calculateAbsoluteX(focuspoint.width) + 'px');
            $(box).css('height', self.calculateAbsoluteY(focuspoint.height) + 'px');
            $(box).css('top', self.calculateAbsoluteY(focuspoint.y) + 'px');
            $(box).css('left', self.calculateAbsoluteX(focuspoint.x) + 'px');
        });
    }
    async onModalLoaded() {
        const image = this.currentModal.querySelector(this.cropImageSelector);
        image.addEventListener('load', this.initializeFocuspointModal.bind(this));
        image.src = image.getAttribute('data-src');
    }
    initializeFocuspointModal() {
        $(this.currentModal).addClass('modal-focuspoints');
        $(this.currentModal).find('.modal-body')
            .addClass('cropper')
            .addClass('modal-body-focuspoints');
        this.init();
    }
    show() {
        const modalTitle = this.trigger.data('modalTitle');
        const buttonDismissText = this.trigger.data('buttonDismissText');
        const buttonSaveText = this.trigger.data('buttonSaveText');
        const imageUri = this.trigger.data('url');
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
        $(document).find('form[name="editform"] input[data-formengine-input-name][data-focuspointPanelId]').remove();
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
        const triggerHandler = (e) => {
            e.preventDefault();
            this.show();
        };
        this.trigger = $('.t3js-focuspoint-trigger');
        this.trigger.off('click').on('click', triggerHandler.bind(this));
        if (this.trigger.attr('data-missing-pagets-warning') === '1') {
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
