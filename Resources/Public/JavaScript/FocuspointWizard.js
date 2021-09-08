/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "TYPO3/CMS/Core/Contrib/imagesloaded.pkgd.min", "TYPO3/CMS/Backend/Modal", "jquery", "TYPO3/CMS/Core/Ajax/AjaxRequest", "jquery-ui/draggable", "jquery-ui/resizable"], function (require, exports, ImagesLoaded, Modal, $, AjaxRequest) {
    "use strict";
    /**
     * Module: TYPO3/CMS/BwFocuspointImages/FocuspointWizard
     * Contains all logic for the image crop GUI including setting focusAreas
     * @exports TYPO3/CMS/BwFocuspointImages/FocuspointWizard
     */
    var FocuspointWizard = (function () {
        function FocuspointWizard() {
            this.panelGroupSelector = '#accordion-cropper-variants';
            this.cropImageSelector = '#t3js-crop-image';
            this.focusPointContainerSelector = '#focuspoint-container';
            this.focusBoxes = [];
            this.inputPanels = [];
        }
        FocuspointWizard.prototype.calculateRelativeX = function (width) {
            var image = this.currentModal.find(this.cropImageSelector);
            var imageWidth = $(image).width();
            return Math.round((width / imageWidth) * 1e3) / 1e3;
        };
        FocuspointWizard.prototype.calculateAbsoluteX = function (width) {
            if (width === void 0) { width = 0.33; }
            var image = this.currentModal.find(this.cropImageSelector);
            var imageWidth = $(image).width();
            return Math.round((width * imageWidth) * 1e3) / 1e3;
        };
        FocuspointWizard.prototype.calculateRelativeY = function (height) {
            var image = this.currentModal.find(this.cropImageSelector);
            var imageHeight = $(image).height();
            return Math.round((height / imageHeight) * 1e3) / 1e3;
        };
        FocuspointWizard.prototype.calculateAbsoluteY = function (height) {
            if (height === void 0) { height = 0.33; }
            var image = this.currentModal.find(this.cropImageSelector);
            var imageHeight = $(image).height();
            return Math.round((height * imageHeight) * 1e3) / 1e3;
        };
        FocuspointWizard.prototype.onBoxChange = function (box) {
            var width = $(box).width();
            var height = $(box).height();
            var position = $(box).position();
            var left = position.left;
            var top = position.top;
            var focuspointBoxId = parseInt($(box).attr('data-focuspointBoxId'));
            this.data[focuspointBoxId].width = this.calculateRelativeX(width);
            this.data[focuspointBoxId].height = this.calculateRelativeY(height);
            this.data[focuspointBoxId].x = this.calculateRelativeX(left);
            this.data[focuspointBoxId].y = this.calculateRelativeY(top);
        };
        FocuspointWizard.prototype.onInputChange = function (input) {
            var focuspointPanelId = parseInt($(input).attr('data-focuspointPanelId'));
            var fieldname = $(input).attr('name');
            this.data[focuspointPanelId][fieldname] = $(input).val();
        };
        FocuspointWizard.prototype.deleteFocuspoint = function (focuspointId) {
            // remove html elements
            $(this.focusBoxes[focuspointId]).trigger('remove');
            $(this.inputPanels[focuspointId]).trigger('remove');
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
            });
        };
        FocuspointWizard.prototype.initFocusBox = function (box) {
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
            var focuspoint = this.data[$(box).attr('data-focuspointBoxId')];
            $(box).css('width', this.calculateAbsoluteX(focuspoint.width) + 'px');
            $(box).css('height', this.calculateAbsoluteY(focuspoint.height) + 'px');
            $(box).css('top', this.calculateAbsoluteY(focuspoint.y) + 'px');
            $(box).css('left', this.calculateAbsoluteX(focuspoint.x) + 'px');
            // show element
            $(box).removeClass('focuspoint-item-hidden');
            // bind delete event
            var removeEvent = function () {
                $(box).off();
                $(box).remove();
            };
            $(box).bind('delete', removeEvent.bind(null, box));
            // bind click event
            var self = this;
            var clickEvent = function () {
                var id = parseInt($(box).attr('data-focuspointboxid'));
                self.activateFocuspoint(id);
            };
            $(box).bind('click', clickEvent.bind(null, box));
        };
        /**
         * Toggle panel open close states + active effect for focus box
         * @TODO: add animation with css class "collapsing" and timeout of .35s
         * @param id
         * @private
         */
        FocuspointWizard.prototype.activateFocuspoint = function (id) {
            var wasOpen = this.inputPanels[id].find('a.panel-link').attr('aria-expanded') === 'true';
            // remove all active states
            for (var i = 0; i < this.data.length; i++) {
                this.focusBoxes[i].removeClass('active');
                this.inputPanels[i].find('a.panel-link').attr('aria-expanded', 'false');
                this.inputPanels[i].find('.panel-collapse').removeClass('show');
            }
            // add new active state (if it was closed)
            if (!wasOpen) {
                this.focusBoxes[id].addClass('active');
                this.inputPanels[id].find('a.panel-link').attr('aria-expanded', 'true');
                this.inputPanels[id].find('.panel-collapse').addClass('show');
            }
        };
        FocuspointWizard.prototype.addNewFocuspoint = function (focuspointBoxId) {
            if (focuspointBoxId === void 0) { focuspointBoxId = -1; }
            // check if appended or created from data
            if (focuspointBoxId === -1) {
                focuspointBoxId = this.data.length;
                this.data[focuspointBoxId] = this.getEmptyFocuspoint();
            }
            var focuspointBoxIdReadableString = (focuspointBoxId + 1).toString();
            // copy dummys
            // 1. box dummy
            var newBox = this.currentModal.find('.focuspoint-item.focuspoint-item-dummy').first()
                .clone()
                .appendTo(this.focusPointContainerSelector)
                .attr('data-focuspointBoxId', focuspointBoxId)
                .addClass('focuspoint-item-hidden')
                .removeClass('focuspoint-item-dummy')
                .find('span')
                .html(focuspointBoxIdReadableString)
                .parent();
            // 2. panel dummy
            var newPanel = this.currentModal.find('.panel.panel-dummy').first()
                .clone()
                .appendTo(this.panelGroupSelector)
                .addClass('panel-hidden')
                .removeClass('panel-dummy');
            // update all input inside panel: set new id (= offset in this.data)
            $(newPanel).find('[data-focuspointPanelId]').attr('data-focuspointPanelId', focuspointBoxId);
            // update panel elements that need unique id (e.g. for accordion)
            $(newPanel).find('[data-append-id]').each(function (i, el) {
                $(el).attr('data-append-id').split(',').forEach(function (attr) {
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
        };
        FocuspointWizard.prototype.onCancelButtonClick = function (e) {
            e.preventDefault();
            this.currentModal.modal('hide');
            this.destroy();
        };
        FocuspointWizard.prototype.onSaveButtonClick = function (e) {
            e.preventDefault();
            this.save(this.data);
            this.currentModal.modal('hide');
        };
        FocuspointWizard.prototype.save = function (data) {
            var focusPoints = JSON.stringify(data);
            var hiddenField = $("#" + this.trigger.attr('data-field'));
            hiddenField.val(focusPoints);
        };
        FocuspointWizard.prototype.onHiddenLinkInputChange = function (input) {
            // save data
            var focuspointPanelId = parseInt($(input).attr('data-focuspointPanelId'));
            var fieldname = $(input).attr('data-fieldname');
            this.data[focuspointPanelId][fieldname] = $(input).val();
            // update link and preview
            var linkButton = this.inputPanels[focuspointPanelId].find('a[data-fieldname="' + fieldname + '"]').first();
            this.refreshLinkButtonUrlAndPreview(linkButton);
        };
        FocuspointWizard.prototype.refreshLinkButtonUrlAndPreview = function (linkButton) {
            var _this = this;
            var pid = this.trigger.data('pid');
            var fieldName = $(linkButton).attr('data-fieldname');
            var focuspointPanelId = parseInt($(linkButton).attr('data-focuspointPanelId'));
            var inputValue = this.data[focuspointPanelId][fieldName];
            var inputName = 'linkfield-' + fieldName + '-' + focuspointPanelId;
            // set value in panel input
            $(linkButton).closest('.form-wizards-wrap').find('.t3js-form-field-inputlink-input').val(inputValue);
            // show remove button
            if (inputValue) {
                $(linkButton).closest('.form-wizards-wrap').find('.form-control-clearable button').css('visibility', 'visible');
            }
            // get link browser url + link info
            new AjaxRequest(TYPO3.settings.ajaxUrls.wizard_focuspoint_linkbrowserurl)
                .withQueryArguments({
                fieldName: fieldName,
                inputValue: inputValue,
                inputName: inputName,
                pid: pid
            })
                .get().then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                var data, text, icon, additionalAttributes;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, response.resolve()];
                        case 1:
                            data = _a.sent();
                            // update url
                            $(linkButton).attr('href', data.url);
                            text = data.preview.text ? data.preview.text : '';
                            icon = data.preview.icon ? data.preview.icon : '';
                            additionalAttributes = data.preview.additionalAttributes ? data.preview.additionalAttributes : '';
                            $(linkButton).closest('.form-wizards-wrap').find('.t3js-form-field-inputlink-explanation').val(text).attr('title', text);
                            $(linkButton).closest('.form-wizards-wrap').find('.t3js-form-field-inputlink-icon').html(icon);
                            $(linkButton).closest('.form-wizards-wrap').find('.form-wizards-items-bottom').html(additionalAttributes);
                            return [2 /*return*/];
                    }
                });
            }); });
            // bind link button event
            $(linkButton).off('click').on('click', function (e) {
                e.preventDefault();
                var url = $(linkButton).attr('href')
                    + '&P[currentValue]=' + encodeURIComponent(inputValue)
                    + '&P[currentSelectedValues]=' + encodeURIComponent('');
                Modal.advanced({
                    type: Modal.types.iframe,
                    content: url,
                    size: Modal.sizes.large,
                });
            });
        };
        FocuspointWizard.prototype.initInputPanel = function (panel) {
            var _this = this;
            var self = this;
            var panelInputs = $(panel).find('[data-focuspointPanelId]');
            var focuspointPanelId = parseInt(panelInputs.first().attr('data-focuspointPanelId'));
            var focuspoint = this.data[focuspointPanelId] ? this.data[focuspointPanelId] : {};
            // for all inputs: set data and eventListener
            panelInputs.each(function (i, input) {
                var fieldName = $(input).attr('name') ? $(input).attr('name') : $(input).attr('data-fieldname');
                var inputValue = focuspoint[fieldName] ? focuspoint[fieldName] : '';
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
                        var inputName = 'linkfield-' + fieldName + '-' + focuspointPanelId;
                        var $hiddenElement = $('<input>')
                            .attr({
                            'type': 'text',
                            'value': inputValue,
                            'data-fieldname': fieldName,
                            'data-formengine-input-name': inputName,
                            'data-focuspointPanelId': focuspointPanelId
                        });
                        $hiddenElement.on('change', _this.onHiddenLinkInputChange.bind(_this, $hiddenElement));
                        if (!$(document).find('form[name="editform"] input[data-formengine-input-name="' + inputName + '"]').length) {
                            $(document).find('form[name="editform"]').append($hiddenElement);
                        }
                        // add button link and preview
                        _this.refreshLinkButtonUrlAndPreview(input);
                        // event for toggling link display
                        $(input).closest('.form-wizards-wrap').find('.t3js-form-field-inputlink-explanation-toggle').on('click', function (e) {
                            e.preventDefault();
                            $(input).closest('.form-wizards-wrap').find('.t3js-form-field-inputlink-explanation, .t3js-form-field-inputlink-input').toggleClass('hidden');
                        });
                        // event for deleting link
                        $(input).closest('.form-wizards-wrap').find('.form-control-clearable button').on('click', function (e) {
                            e.preventDefault();
                            $(e.currentTarget).css('visibility', 'hidden');
                            var focuspointPanelId = parseInt($(input).attr('data-focuspointpanelid'));
                            var fieldName = $(input).attr('data-fieldname');
                            var inputName = 'linkfield-' + fieldName + '-' + focuspointPanelId;
                            $(document).find('form[name="editform"] input[data-formengine-input-name="' + inputName + '"]').val('').trigger('change');
                        });
                        break;
                }
                // bind events
                $(input).off('input').on('input', _this.onInputChange.bind(_this, input));
            });
            // bind remove event
            var removeEvent = function () {
                $(panel).off();
                $(panel).remove();
            };
            $(panel).bind('remove', removeEvent.bind(null, panel));
            // bind open / close event
            var clickEvent = function () {
                var id = parseInt($('input:first', panel).attr('data-focuspointpanelid'));
                self.activateFocuspoint(id);
            };
            $(panel).find('a.panel-link').bind('click', clickEvent.bind(null, panel));
            // bind delete button event
            $(panel).find('[data-delete]').off('click').on('click', function (e, button) {
                e.preventDefault();
                _this.deleteFocuspoint(focuspointPanelId);
            });
            // show panel
            $(panel).removeClass('panel-hidden');
        };
        FocuspointWizard.prototype.getEmptyFocuspoint = function () {
            var o = {
                x: 0.3,
                y: 0.3,
                width: 0.3,
                height: 0.3
            };
            var defaultWidth = this.currentModal.find('.panel.panel-dummy [data-focuspointPanelId][name="width"]').val();
            var defaultHeight = this.currentModal.find('.panel.panel-dummy [data-focuspointPanelId][name="height"]').val();
            var defaultSize = defaultWidth > defaultHeight ? defaultWidth : defaultHeight;
            o.width = defaultSize;
            o.height = defaultSize;
            if (defaultSize != 0.3) {
                o.x = (1 - o.width) / 2;
                o.y = (1 - o.height) / 2;
            }
            return o;
        };
        /**
         * @method init
         * @desc Initializes the Focus Point UI and sets up all the event bindings for the UI
         * @private
         */
        FocuspointWizard.prototype.init = function () {
            var _this = this;
            var image = this.currentModal.find(this.cropImageSelector);
            var hiddenField = $("#" + this.trigger.attr('data-field'));
            var data = hiddenField.val();
            if (!data || data == "") {
                data = "[]";
            }
            // If we have data already set we assume an internal reinit eg. after resizing
            this.data = $.isEmptyObject(this.data) ? JSON.parse(data) : this.data;
            if (this.data.length) {
                // create focuspoints from data
                for (var i = 0; i < this.data.length; i++) {
                    this.addNewFocuspoint(i);
                }
                // open first focus point
                this.activateFocuspoint(0);
            }
            // Bind New button
            this.currentModal.find('[data-method=new]').off('click').on('click', function (e) {
                e.preventDefault();
                var newFocuspointId = _this.addNewFocuspoint(-1);
                _this.activateFocuspoint(newFocuspointId);
            });
            // bind link browser events
            this.initLinkBrowser();
            // Bind resize event
            $(window).resize(this.onWindowResize.bind(this));
        };
        FocuspointWizard.prototype.linkBrowserClick = function (uid, table, key, label) {
            // build data to save
            var focuspointPanelId = parseInt(this.linkBrowser.attr('data-current-focuspointPanelId'));
            var target = this.inputPanels[focuspointPanelId].find('.linkbrowser-target').val();
            var browserlinkvalue = {
                label: label,
                uid: uid,
                table: table,
                key: key,
                target: target
            };
            // save selected value to data
            var fieldname = this.linkBrowser.attr('data-current-fieldname');
            this.data[focuspointPanelId][fieldname] = browserlinkvalue;
            // insert label into input and close
            this.inputPanels[focuspointPanelId].find('.linkbrowser-input').val(label);
            this.linkBrowser.trigger('close');
        };
        FocuspointWizard.prototype.initLinkBrowser = function () {
            var self = this;
            this.linkBrowser = this.currentModal.find('.modal-panel-linkbrowser');
            // click on tab item
            this.linkBrowser.find('.nav-tabs a').on('click', function (e) {
                e.preventDefault();
                var tab = $(e.currentTarget).parent();
                var browserKey = $(tab).attr('data-browser-key');
                self.linkBrowser.find('.nav-tabs li').removeClass('active');
                self.linkBrowser.find('.modal-panel-linkbrowser-item').removeClass('active');
                $(tab).addClass('active');
                self.linkBrowser.find('.modal-panel-linkbrowser-item[data-browser-key="' + browserKey + '"]').addClass('active');
            });
            // hide page children
            var rootPid = this.linkBrowser.find('tr.db_list_normal[data-pid="0"]').attr('data-uid');
            this.linkBrowser.find('tr.db_list_normal[data-pid!="0"][data-pid!="' + rootPid + '"]').addClass('is-child');
            // page tree open children
            this.linkBrowser.find('tr .pagetree-opener').on('click', function (e) {
                $(this).parent().toggleClass('active');
                var uid = $(this).parent().attr('data-uid');
                self.linkBrowser.find('.is-child[data-pid="' + uid + '"]').toggleClass('open');
            });
            // page tree link click
            this.linkBrowser.find('tr .pagetree-title').on('click', function (e) {
                e.preventDefault();
                var uid = $(e.currentTarget).parent().attr('data-uid');
                var table = 'pages';
                var key = 'page';
                var label = $(e.currentTarget).text();
                self.linkBrowserClick(uid, table, key, label);
            });
            // record list click
            this.linkBrowser.find('.recordlist tr').on('click', function (e) {
                e.preventDefault();
                var row = $(e.currentTarget);
                var uid = row.attr('data-uid');
                var table = row.closest('.table').attr('data-table');
                var key = row.closest('.modal-panel-linkbrowser-item').attr('data-browser-key');
                var label = row.find('td:nth-child(2)').text();
                self.linkBrowserClick(uid, table, key, label);
            });
            // close button link
            this.linkBrowser.find('#closelinkbrowser').on('click', function (e) {
                e.preventDefault();
                self.linkBrowser.trigger('close');
            });
            // reset function
            this.linkBrowser.bind('close', function () {
                self.linkBrowser.removeClass('open');
                self.linkBrowser.find('.nav-tabs li:first-child a').trigger('click');
                self.linkBrowser.attr('data-current-focuspointPanelId', '');
                self.linkBrowser.attr('data-current-fieldname', '');
            });
        };
        FocuspointWizard.prototype.onWindowResize = function () {
            var self = this;
            // update position and size of every focuspoint
            $(this.focusBoxes).each(function (i, box) {
                var focuspoint = self.data[i];
                $(box).css('width', self.calculateAbsoluteX(focuspoint.width) + 'px');
                $(box).css('height', self.calculateAbsoluteY(focuspoint.height) + 'px');
                $(box).css('top', self.calculateAbsoluteY(focuspoint.y) + 'px');
                $(box).css('left', self.calculateAbsoluteX(focuspoint.x) + 'px');
            });
        };
        /**
         * @method initializeFocuspointModal
         * @desc Initialize the focuspoint modal and dispatch the focuspoint init
         * @private
         */
        FocuspointWizard.prototype.initializeFocuspointModal = function () {
            var _this = this;
            var image = this.currentModal.find(this.cropImageSelector);
            ImagesLoaded(image, function () {
                setTimeout(function () {
                    _this.init();
                }, 100);
            });
        };
        ;
        FocuspointWizard.prototype.show = function () {
            var _this = this;
            var modalTitle = this.trigger.data('modalTitle');
            var buttonDismissText = this.trigger.data('buttonDismissText');
            var buttonSaveText = this.trigger.data('buttonSaveText');
            var imageUri = this.trigger.data('url');
            var buttons = [
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
            if (this.is7up) {
                this.currentModal = Modal.advanced({
                    type: 'ajax',
                    content: imageUri,
                    size: Modal.sizes.full,
                    style: Modal.styles.dark,
                    title: modalTitle,
                    ajaxCallback: this.initializeFocuspointModal.bind(this),
                    buttons: buttons,
                });
            }
            else {
                this.currentModal = Modal.loadUrl(modalTitle, -2, buttons, imageUri, this.initializeFocuspointModal.bind(this));
            }
            this.currentModal.addClass('modal-dark');
            this.currentModal.addClass('modal-focuspoints');
            this.currentModal.find('.modal-body')
                .addClass('cropper')
                .addClass('modal-body-focuspoints');
            this.currentModal.on('hide.bs.modal', function (e) {
                _this.destroy();
            });
            // Do not dismiss the modal when clicking beside it to avoid data loss
            //this.currentModal.data('bs.modal').options.backdrop = 'static';
        };
        /**
         * @method destroy
         * @desc Destroy the FocuspointWizard
         * @private
         */
        FocuspointWizard.prototype.destroy = function () {
            if (this.currentModal) {
                this.currentModal = null;
                this.focusBoxes = [];
                this.inputPanels = [];
                this.data = null;
            }
        };
        FocuspointWizard.prototype.initializeTrigger = function (is7up) {
            var _this = this;
            var triggerHandler = function (e) {
                e.preventDefault();
                _this.trigger = $(e.currentTarget);
                _this.is7up = is7up;
                _this.show();
            };
            $('.t3js-focuspoint-trigger').off('click').click(triggerHandler);
        };
        return FocuspointWizard;
    }());
    return new FocuspointWizard();
});
