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

/// <amd-dependency path='TYPO3/CMS/Core/Contrib/imagesloaded.pkgd.min' name='ImagesLoaded'>
/// <amd-dependency path='TYPO3/CMS/Backend/Modal' name='Modal'>
/// <amd-dependency path='TYPO3/CMS/Recordlist/LinkBrowser' name='LinkBrowser'>

import $ = require('jquery');
import 'jquery-ui/draggable';
import 'jquery-ui/resizable';

declare const Modal: any;
declare const ImagesLoaded: any;

declare global {
	interface Window {
		TYPO3: any;
	}
}

interface Focuspoint {
	width: number
	height: number
	x: number
	y: number
}

/**
 * Module: TYPO3/CMS/BwFocuspointImages/FocuspointWizard
 * Contains all logic for the image crop GUI including setting focusAreas
 * @exports TYPO3/CMS/BwFocuspointImages/FocuspointWizard
 */
class FocuspointWizard {

	private panelGroupSelector: string = '#accordion-cropper-variants';
	private cropImageSelector: string = '#t3js-crop-image';
	private focusPointContainerSelector: string = '#focuspoint-container';
	private trigger: JQuery;
	private currentModal: JQuery;
	private focusBoxes: Array<JQuery> = [];
	private inputPanels: Array<JQuery> = [];
	private data: Array<Focuspoint>;
	private linkBrowser: JQuery;
	private is7up: boolean;

	private calculateRelativeX(width: number): number {
		const image: JQuery = this.currentModal.find(this.cropImageSelector);
		const imageWidth: number = $(image).width();
		return Math.round((width / imageWidth) * 1e3) / 1e3
	}

	private calculateAbsoluteX(width: number = 0.33): number {
		const image: JQuery = this.currentModal.find(this.cropImageSelector);
		const imageWidth: number = $(image).width();
		return Math.round((width * imageWidth) * 1e3) / 1e3
	}

	private calculateRelativeY(height: number): number {
		const image: JQuery = this.currentModal.find(this.cropImageSelector);
		const imageHeight: number = $(image).height();
		return Math.round((height / imageHeight) * 1e3) / 1e3
	}

	private calculateAbsoluteY(height: number = 0.33): number {
		const image: JQuery = this.currentModal.find(this.cropImageSelector);
		const imageHeight: number = $(image).height();
		return Math.round((height * imageHeight) * 1e3) / 1e3
	}

	private onBoxChange(box: JQuery): void {
		const width: number = $(box).width();
		const height: number = $(box).height();
		const position: JQueryCoordinates = $(box).position();
		const left: number = position.left;
		const top: number = position.top;
		const focuspointBoxId: number = parseInt($(box).attr('data-focuspointBoxId'));

		this.data[focuspointBoxId].width = this.calculateRelativeX(width);
		this.data[focuspointBoxId].height = this.calculateRelativeY(height);
		this.data[focuspointBoxId].x = this.calculateRelativeX(left);
		this.data[focuspointBoxId].y = this.calculateRelativeY(top);
	}

	private onInputChange(input: string): void {
		const focuspointPanelId: number = parseInt($(input).attr('data-focuspointPanelId'));
		const fieldname = $(input).attr('name');
		this.data[focuspointPanelId][fieldname] = $(input).val();
	}

	private deleteFocuspoint(focuspointId: number): void {

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

	}

	private initFocusBox(box: JQuery): void {

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
		const removeEvent: Function = function () {
			$(box).off();
			$(box).remove();
		};
		$(box).bind('delete', removeEvent.bind(null, box));

		// bind click event
		const self = this;
		const clickEvent: Function = function () {
			const id = parseInt($(box).attr('data-focuspointboxid'));
			self.activateFocuspoint(id);
		};
		$(box).bind('click', clickEvent.bind(null, box));
	}

	/**
	 * Toggle panel open close states + active effect for focus box
	 * @TODO: add animation with css class "collapsing" and timeout of .35s
	 * @param id
	 * @private
	 */
	private activateFocuspoint(id: number): void {

		const wasOpen = this.inputPanels[id].find('a').attr('aria-expanded') === 'true';

		// remove all active states
		for (let i = 0; i < this.data.length; i++) {
				this.focusBoxes[i].removeClass('active');
				this.inputPanels[i].find('a').attr('aria-expanded', 'false');
				this.inputPanels[i].find('.panel-collapse').removeClass('show');
		}

		// add new active state (if it was closed)
		if (!wasOpen) {
			this.focusBoxes[id].addClass('active');
			this.inputPanels[id].find('a').attr('aria-expanded', 'true');
			this.inputPanels[id].find('.panel-collapse').addClass('show');
		}
	}

	private addNewFocuspoint(focuspointBoxId: number = -1): number {

		// check if appended or created from data
		if (focuspointBoxId === -1) {
			focuspointBoxId = this.data.length;
			this.data[focuspointBoxId] = this.getEmptyFocuspoint();
		}

		const focuspointBoxIdReadableString: string = (focuspointBoxId + 1).toString();

		// copy dummys
		// 1. box dummy
		const newBox: JQuery = this.currentModal.find('.focuspoint-item.focuspoint-item-dummy').first()
			.clone()
			.appendTo(this.focusPointContainerSelector)
			.attr('data-focuspointBoxId', focuspointBoxId)
			.addClass('focuspoint-item-hidden')
			.removeClass('focuspoint-item-dummy')
			.find('span')
			.html(focuspointBoxIdReadableString)
			.parent();

		// 2. panel dummy
		const newPanel: JQuery = this.currentModal.find('.panel.panel-dummy').first()
			.clone()
			.appendTo(this.panelGroupSelector)
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

	private onCancelButtonClick(e): void {
		e.preventDefault();
		this.currentModal.modal('hide');
		this.destroy();
	}

	private onSaveButtonClick(e): void {
		e.preventDefault();
		this.save(this.data);
		this.currentModal.modal('hide');
	}

	private save(data: Object): void {
		const focusPoints: string = JSON.stringify(data);
		const hiddenField: JQuery = $(`#${this.trigger.attr('data-field')}`);
		hiddenField.val(focusPoints);
	}

	private initInputPanel(panel: JQuery): void {

		const self = this;
		const panelInputs: JQuery = $(panel).find('[data-focuspointPanelId]');
		const focuspointPanelId: number = parseInt(panelInputs.first().attr('data-focuspointPanelId'));
		const focuspoint: object = this.data[focuspointPanelId] ? this.data[focuspointPanelId] : {};

		// for all inputs: set data and eventListener
		panelInputs.each((i, input) => {

			const inputValue: string = focuspoint[$(input).attr('name')] ? focuspoint[$(input).attr('name')] : '';

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
					const label = focuspoint[$(input).attr('data-fieldname')] ? focuspoint[$(input).attr('data-fieldname')].label : '';
					$(input).prev().prev().val(label);
					break;
			}

			// bind events
			$(input).off('input').on('input', this.onInputChange.bind(this, input));

		});

		// bind linkbrowser
		const linkelement = $(panel).find('.linkbrowser');

		if (linkelement.length) {
			const onButtonClick = function (e) {
				e.preventDefault();
				self.linkBrowser.attr('data-current-focuspointPanelId', focuspointPanelId);
				self.linkBrowser.attr('data-current-fieldname', $(linkelement).attr('data-fieldname'));
				self.linkBrowser.addClass('open');
			};
			const onLinkTargetChange = function (e) {
				if (!self.data[focuspointPanelId][$(linkelement).attr('data-fieldname')]) {
					return;
				}
				self.data[focuspointPanelId][$(linkelement).attr('data-fieldname')].target = $(e.currentTarget).val();
			};
			$(linkelement).on('click', onButtonClick.bind(this));
			$(panel).find('.linkbrowser-input').on('click', onButtonClick.bind(this));
			$(panel).find('.linkbrowser-target').on('change', onLinkTargetChange.bind(this));
			$(panel).find('.linkbrowser-remove').on('click', function (e) {
				e.preventDefault();
				$(panel).find('.linkbrowser-input').val('');
				self.data[focuspointPanelId][$(linkelement).attr('data-fieldname')] = null;
			});
		}

		// bind remove event
		const removeEvent = function () {
			$(panel).off();
			$(panel).remove();
		};
		$(panel).bind('remove', removeEvent.bind(null, panel));

		// bind open / close event
		const self = this;
		const clickEvent: Function = function () {
			const id = parseInt($('input:first', panel).attr('data-focuspointpanelid'));
			self.activateFocuspoint(id);
		};
		$(panel).find('a.panel-link').bind('click', clickEvent.bind(null, panel));

		// bind delete button event
		$(panel).find('[data-delete]').off('click').on('click', (e, button) => {
			e.preventDefault();
			this.deleteFocuspoint(focuspointPanelId);
		});

		// show panel
		$(panel).removeClass('panel-hidden');
	}

	private getEmptyFocuspoint(): Focuspoint {
		const o: Focuspoint = {
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
			o.x = (1 - o.width) / 2
			o.y = (1 - o.height) / 2
		}
		return o;
	}

	/**
	 * @method init
	 * @desc Initializes the Focus Point UI and sets up all the event bindings for the UI
	 * @private
	 */
	private init(): void {
		const image: JQuery = this.currentModal.find(this.cropImageSelector);
		const hiddenField: JQuery = $(`#${this.trigger.attr('data-field')}`);
		let data = hiddenField.val();

		if (!data || data == "") {
			data = "[]";
		}

		// If we have data already set we assume an internal reinit eg. after resizing
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
		this.currentModal.find('[data-method=new]').off('click').on('click', (e: JQueryEventObject) => {
			e.preventDefault();
			const newFocuspointId = this.addNewFocuspoint(-1);
			this.activateFocuspoint(newFocuspointId);
		});

		// bind link browser events
		this.initLinkBrowser();

		// Bind resize event
		$(window).resize(this.onWindowResize.bind(this));
	}

	private linkBrowserClick(uid: number, table: string, key: string, label: string) {

		// build data to save
		const focuspointPanelId: number = parseInt(this.linkBrowser.attr('data-current-focuspointPanelId'));
		const target = this.inputPanels[focuspointPanelId].find('.linkbrowser-target').val();
		const browserlinkvalue = {
			label: label,
			uid: uid,
			table: table,
			key: key,
			target: target
		};

		// save selected value to data
		const fieldname = this.linkBrowser.attr('data-current-fieldname');
		this.data[focuspointPanelId][fieldname] = browserlinkvalue;

		// insert label into input and close
		this.inputPanels[focuspointPanelId].find('.linkbrowser-input').val(label);
		this.linkBrowser.trigger('close');
	}

	private initLinkBrowser(): void {
		const self = this;
		this.linkBrowser = this.currentModal.find('.modal-panel-linkbrowser');

		// click on tab item
		this.linkBrowser.find('.nav-tabs a').on('click', function (e) {
			e.preventDefault();
			const tab = $(e.currentTarget).parent();
			const browserKey = $(tab).attr('data-browser-key');
			self.linkBrowser.find('.nav-tabs li').removeClass('active');
			self.linkBrowser.find('.modal-panel-linkbrowser-item').removeClass('active');
			$(tab).addClass('active');
			self.linkBrowser.find('.modal-panel-linkbrowser-item[data-browser-key="' + browserKey + '"]').addClass('active');
		});

		// hide page children
		const rootPid = this.linkBrowser.find('tr.db_list_normal[data-pid="0"]').attr('data-uid');
		this.linkBrowser.find('tr.db_list_normal[data-pid!="0"][data-pid!="' + rootPid + '"]').addClass('is-child');

		// page tree open children
		this.linkBrowser.find('tr .pagetree-opener').on('click', function (e) {
			$(this).parent().toggleClass('active');
			const uid = $(this).parent().attr('data-uid');
			self.linkBrowser.find('.is-child[data-pid="' + uid + '"]').toggleClass('open');
		});

		// page tree link click
		this.linkBrowser.find('tr .pagetree-title').on('click', function (e) {
			e.preventDefault();
			const uid = $(e.currentTarget).parent().attr('data-uid');
			const table = 'pages';
			const key = 'page';
			const label = $(e.currentTarget).text();
			self.linkBrowserClick(uid, table, key, label);
		});

		// record list click
		this.linkBrowser.find('.recordlist tr').on('click', function (e) {
			e.preventDefault();
			const row = $(e.currentTarget);
			const uid = row.attr('data-uid');
			const table = row.closest('.table').attr('data-table');
			const key = row.closest('.modal-panel-linkbrowser-item').attr('data-browser-key');
			const label = row.find('td:nth-child(2)').text();
			self.linkBrowserClick(uid, table, key, label);
		});

		// close button link
		this.linkBrowser.find('#closelinkbrowser').on('click', function (e) {
			e.preventDefault();
			self.linkBrowser.trigger('close');
		});

		// reset function
		this.linkBrowser.bind('close', () => {
			self.linkBrowser.removeClass('open');
			self.linkBrowser.find('.nav-tabs li:first-child a').trigger('click');
			self.linkBrowser.attr('data-current-focuspointPanelId', '');
			self.linkBrowser.attr('data-current-fieldname', '');
		});
	}

	private onWindowResize(): void {
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

	/**
	 * @method initializeFocuspointModal
	 * @desc Initialize the focuspoint modal and dispatch the focuspoint init
	 * @private
	 */
	private initializeFocuspointModal(): void {
		const image: JQuery = this.currentModal.find(this.cropImageSelector);
		ImagesLoaded(image, (): void => {
			setTimeout((): void => {
				this.init();
			}, 100);
		});
	};


	public show(): void {

		const modalTitle: string = this.trigger.data('modalTitle');
		const buttonDismissText: string = this.trigger.data('buttonDismissText');
		const buttonSaveText: string = this.trigger.data('buttonSaveText');
		const imageUri: string = this.trigger.data('url');
		const buttons: array = [
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
		} else {
			this.currentModal = Modal.loadUrl(
				modalTitle,
				-2,
				buttons,
				imageUri,
				this.initializeFocuspointModal.bind(this)
			);
		}

		this.currentModal.addClass('modal-dark');
		this.currentModal.addClass('modal-focuspoints');
		this.currentModal.find('.modal-body')
			.addClass('cropper')
			.addClass('modal-body-focuspoints');

		this.currentModal.on('hide.bs.modal', (e: JQueryEventObject): void => {
			this.destroy();
		});

		// Do not dismiss the modal when clicking beside it to avoid data loss
		//this.currentModal.data('bs.modal').options.backdrop = 'static';

	}

	/**
	 * @method destroy
	 * @desc Destroy the FocuspointWizard
	 * @private
	 */
	private destroy(): void {
		if (this.currentModal) {
			this.currentModal = null;
			this.focusBoxes = [];
			this.inputPanels = [];
			this.data = null;
		}
	}


	public initializeTrigger(is7up: boolean): void {
		const triggerHandler: Function = (e: JQueryEventObject): void => {
			e.preventDefault();
			this.trigger = $(e.currentTarget);
			this.is7up = is7up
			this.show();
		};
		$('.t3js-focuspoint-trigger').off('click').click(triggerHandler);
	}

}

export = new FocuspointWizard();
