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

/**
 * Module: TYPO3/CMS/BwFocuspointImages/FocuspointImages
 * Contains all logic for the image crop GUI including setting focusAreas
 * @exports TYPO3/CMS/BwFocuspointImages/FocuspointImages
 */
class FocuspointImages {

  private trigger: JQuery;
  private currentModal: JQuery;
  private focusBoxes: JQuery;
  private inputPanels: JQuery;
  private panelGroupSelector: string = '#accordion-cropper-variants';
  private cropImageSelector: string = '#t3js-crop-image';
  private focusPointContainerSelector: string = '#focuspoint-container';

  private calculateRelativeX(width): number {
    const image: JQuery = this.currentModal.find(this.cropImageSelector);
    const imageWidth: number = $(image).width();
    return (width / imageWidth).toFixed(3);
  }

  private calculateAbsoluteX(width): number {
    const width: number = width ? width : 0.33;
    const image: JQuery = this.currentModal.find(this.cropImageSelector);
    const imageWidth: number = $(image).width();
    return (width * imageWidth).toFixed(0);
  }

  private calculateRelativeY(height): number {
    const image: JQuery = this.currentModal.find(this.cropImageSelector);
    const imageHeight: number = $(image).height();
    return (height / imageHeight).toFixed(3);
  }

  private calculateAbsoluteY(height): number {
    const height: number = height ? height : 0.33;
    const image: JQuery = this.currentModal.find(this.cropImageSelector);
    const imageHeight: number = $(image).height();
    return (height * imageHeight).toFixed(0);
  }

  private onBoxChange(box): void {
    const width: number = $(box).width();
    const height: number = $(box).height();
    const position: object = $(box).position();
    const left: number = position.left;
    const top: number = position.top;
    const focuspointBoxId: number = $(box).attr('data-focuspointBoxId');

    this.data[focuspointBoxId].width = this.calculateRelativeX(width);
    this.data[focuspointBoxId].height = this.calculateRelativeY(height);
    this.data[focuspointBoxId].x = this.calculateRelativeX(left);
    this.data[focuspointBoxId].y = this.calculateRelativeY(top);
  }

  private onInputChange(input): void {
    const focuspointPanelId: number = $(input).attr('data-focuspointPanelId');
    const fieldname = $(input).attr('name');
    this.data[focuspointPanelId][fieldname] = $(input).val();
  }

  private onDeleteButton(button): void {

  }

  private initFocusBox(box): void {

    // register jquery-ui/draggable
    $(box).draggable({
      containment: "parent",
      stop: this.onBoxChange.bind(this, box),
    });

    // register jquery-ui/resizable
    if($(box).hasClass('ui-resizable')){
      $(box).resizable({
        handles: "n, e, w, s, se, sw, nw, ne",
        containment: "parent",
        minWidth: "20",
        minHeight: "20",
        stop: this.onBoxChange.bind(this, box),
      });
    }

    // set onload position and size
    const focuspoint = this.data[$(box).attr('data-focuspointBoxId')];
    $(box).css('width', this.calculateAbsoluteX(focuspoint.width)+'px');
    $(box).css('height', this.calculateAbsoluteY(focuspoint.height)+'px');
    $(box).css('top', this.calculateAbsoluteY(focuspoint.y)+'px');
    $(box).css('left', this.calculateAbsoluteX(focuspoint.x)+'px');

    // show element
    $(box).removeClass('focuspoint-item-hidden');

  }

  private initFocusBoxes(): void {
    this.focusBoxes.each((i, box) => {
      this.initFocusBox(box);
    });
  }

  private addNewFocuspoint(): void {

    const focuspointBoxId: number = this.data.length;

    this.data[focuspointBoxId] = this.emptyFocuspoint;

    // copy dummys
      // 1. box dummy
      const newBox: JQuery = this.currentModal.find('.focuspoint-item.focuspoint-item-dummy')
        .clone()
        .appendTo(this.focusPointContainerSelector)
        .attr('data-focuspointBoxId', focuspointBoxId)
        .addClass('focuspoint-item-hidden')
        .removeClass('focuspoint-item-dummy')
        .find('span')
        .html(focuspointBoxId + 1)
        .parent();

      // 2. panel dummy
      const newPanel: JQuery = this.currentModal.find('.panel.panel-dummy')
        .clone()
        .appendTo(this.panelGroupSelector)
        .addClass('panel-hidden')
        .removeClass('panel-dummy');
        // update all input inside panel: set new id (= offset in this.data)
        $(newPanel).find('[data-focuspointPanelId]').attr('data-focuspointPanelId', focuspointBoxId);
        // update panel elements that need unique id (e.g. for accordion)
        $(newPanel).find('[data-append-id]').each((i, el) => {
          $(el).attr('data-append-id').split(',').forEach((attr) => {
            $(el).attr(attr, $(el).attr(attr)+(focuspointBoxId + 1));
          });
        });

    // init new elements
    this.initFocusBox(newBox);
    this.initInputPanel(newPanel);

    // add elements to the class
    this.focusBoxes.push(newBox);
    this.inputPanels.push(newPanel);
  }

  private initEvents(): void {

    // Add new Focus Box Button
    this.newButton.off('click').on('click', (e: JQueryEventObject) => {
      e.preventDefault();
      this.addNewFocuspoint();
    });

    // Dismiss button
    this.dismissButton.off('click').on('click', (e: JQueryEventObject) => {
      e.preventDefault();
      this.currentModal.modal('hide');
      this.destroy();
    });

    // Dismiss button
    this.saveButton.off('click').on('click', (e: JQueryEventObject) => {
      e.preventDefault();
      this.save();
      this.currentModal.modal('hide');
    });


  }

  private save(): void {

  }

  private initInputPanel(panel): void {

    // for all inputs: set data and eventListener
    $(panel).find('[data-focuspointPanelId]').each((i, input) => {

      const focuspointPanelId = $(input).attr('data-focuspointPanelId');
      const focuspoint: object = this.data[focuspointPanelId] ? this.data[focuspointPanelId] : {};
      const inputValue: string = focuspoint[$(input).attr('name')] ? focuspoint[$(input).attr('name')] : '';

      // set value
      switch($(input).prop('tagName')){
        case 'INPUT':
        case 'TEXTAREA':
          $(input).val(inputValue);
          break;
        case 'SELECT':
          $('option', input).prop('selected', false);
          $('option[value="'+inputValue+'"]', input).prop('selected', true);
        break;
      }

      // bind events
      $(input).off('input').on('input', this.onInputChange.bind(this, input));

    });

    // bind delete button event
    $(panel).find('[data-delete]').off('click').on('click', (e, button) => {
      e.preventDefault();
      this.onDeleteButton(button);
    });

    // show panel
    $(panel).removeClass('panel-hidden');
  }

  private initInputPanels(): void {
    this.inputPanels.each((i, panel) => {
      this.initInputPanel(panel);
    });
  }

  private getEmptyFocuspoint(): object {
    const o = {};
    this.currentModal.find('.panel.panel-dummy [data-focuspointPanelId]').each((i, input) => {
      o[$(input).attr('name')] = '';
    });
    return o;
  }

  /**
   * @method init
   * @desc Initializes the Focus Point UI and sets up all the event indings for the UI
   * @private
   */
  private init(): void {
    const image: JQuery = this.currentModal.find(this.cropImageSelector);
    const imageHeight: number = $(image).height();
    const imageWidth: number = $(image).width();
    const data: string = this.trigger.attr('data-focus-points-value');

    if (!data) {
      data = "[]";
    }

    // If we have data already set we assume an internal reinit eg. after resizing
    this.data = $.isEmptyObject(this.data) ? JSON.parse(data) : this.data;

    // Initialize our class members
    this.currentModal.find(this.focusPointContainerSelector).css({height: imageHeight, width: imageWidth});
    this.newButton = this.currentModal.find('[data-method=new]');
    this.saveButton = this.currentModal.find('[data-method=save]');
    this.dismissButton = this.currentModal.find('[data-method=dismiss]');
    this.emptyFocuspoint = this.getEmptyFocuspoint();
    this.focusBoxes = this.currentModal.find('.focuspoint-item.ui-draggable').not('.focuspoint-item-dummy');
    this.inputPanels = this.currentModal.find('.panel.panel-default').not('.panel-dummy');

    this.initFocusBoxes();
    this.initInputPanels();
    this.initEvents();
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
    const buttonPreviewText: string = this.trigger.data('buttonPreviewText');
    const buttonDismissText: string = this.trigger.data('buttonDismissText');
    const buttonSaveText: string = this.trigger.data('buttonSaveText');
    const imageUri: string = this.trigger.data('url');
    const initFocuspointModal: Function = this.initializeFocuspointModal.bind(this);

    this.currentModal = Modal.advanced({
      type: 'ajax',
      content: imageUri,
      size: Modal.sizes.full,
      style: Modal.styles.dark,
      title: modalTitle,
      ajaxCallback: initFocuspointModal,
      buttons: [
          {
              btnClass: 'btn-default',
              dataAttributes: {
                  method: 'dismiss',
              },
              icon: 'actions-close',
              text: buttonDismissText,
          },
          {
              btnClass: 'btn-primary',
              dataAttributes: {
                  method: 'save',
              },
              icon: 'actions-document-save',
              text: buttonSaveText,
          },
      ],
      callback: function (currentModal) {
          currentModal.find('.t3js-modal-body')
              .addClass('cropper')
              .addClass('modal-body-focuspoints');
      }
    });
    this.currentModal.on('hide.bs.modal', (e: JQueryEventObject): void => {
      this.destroy();
    });
    // Do not dismiss the modal when clicking beside it to avoid data loss
    this.currentModal.data('bs.modal').options.backdrop = 'static';

  }

  /**
   * @method destroy
   * @desc Destroy the FocuspointImage
   * @private
   */
  private destroy(): void {
    if (this.currentModal) {
      this.currentModal = null;
      this.data = null;
    }
  }


  public initializeTrigger(): void {
    const triggerHandler: Function = (e: JQueryEventObject): void => {
      e.preventDefault();
      this.trigger = $(e.currentTarget);
      this.show();
    };
    $('.t3js-focuspoint-trigger').off('click').click(triggerHandler);
  }

}

export = new FocuspointImages();
