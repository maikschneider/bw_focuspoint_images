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
  private cropImageSelector: string = '#t3js-crop-image';
  private focusPointContainerSelector: string = '#focuspoint-container';

  private calculateRelativeX(width): number {
    const image: JQuery = this.currentModal.find(this.cropImageSelector);
    const imageWidth: number = $(image).width();
    return (width / imageWidth).toFixed(3);
  }

  private calculateRelativeY(height): number {
    const image: JQuery = this.currentModal.find(this.cropImageSelector);
    const imageHeight: number = $(image).height();
    return (height / imageHeight).toFixed(3);
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

    this.data[focuspointBoxId] = {};

    // copy dummys
    const newBox: JQuery = this.currentModal.find('.focuspoint-item.focuspoint-item-dummy')
      .clone()
      .appendTo(this.focusPointContainerSelector)
      .attr('data-focuspointBoxId', focuspointBoxId)
      .addClass('focuspoint-item-hidden')
      .removeClass('focuspoint-item-dummy')
      .find('span')
      .html(focuspointBoxId + 1)
      .parent();

    this.initFocusBox(newBox);
  }

  private initEvents(): void {

    // Add new Focus Box Button
    this.newButton.off('click').on('click', (e: JQueryEventObject) => {
      e.preventDefault();
      this.addNewFocuspoint();
    });
  }

  private initInputPanel(panel): void {

    // for all inputs: set data and eventListener
    $(panel).find('[data-focuspointPanelId]').each((i, input) => {

      const focuspointPanelId = $(input).attr('data-focuspointPanelId');
      const focuspoint: object = this.data[focuspointPanelId] ? this.data[focuspointPanelId] : {};
      const inputValue: string = focuspoint[$(input).attr('name')] ? focuspoint[$(input).attr('name')] : '';

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

    });

    $(panel).removeClass('panel-hidden');
  }

  private initInputPanels(): void {
    this.inputPanels.each((i, panel) => {
      this.initInputPanel(panel);
    });
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
      throw new TypeError('FocusPoints: No focuspoint data found for image');
    }

    // If we have data already set we assume an internal reinit eg. after resizing
    this.data = $.isEmptyObject(this.data) ? JSON.parse(data) : this.data;
    // Initialize our class members
    this.currentModal.find(this.focusPointContainerSelector).css({height: imageHeight, width: imageWidth});
    // this.cropVariantTriggers = this.currentModal.find('.t3js-crop-variant-trigger');
    // this.activeCropVariantTrigger = this.currentModal.find('.t3js-crop-variant-trigger.is-active');
    this.newButton = this.currentModal.find('[data-method=new]');
    // this.saveButton = this.currentModal.find('[data-method=save]');
    // this.dismissButton = this.currentModal.find('[data-method=dismiss]');
    // this.resetButton = this.currentModal.find('[data-method=reset]');
    // this.cropperCanvas = this.currentModal.find('#js-crop-canvas');
    // this.aspectRatioTrigger = this.currentModal.find('[data-method=setAspectRatio]');
    // this.currentCropVariant = this.data[this.activeCropVariantTrigger.attr('data-crop-variant-id')];

    this.focusBoxes = this.currentModal.find('.focuspoint-item.ui-draggable').not('.focuspoint-item-dummy');
    this.inputPanels = this.currentModal.find('.panel.panel-default').not('.panel-dummy');

    this.initFocusBoxes();
    this.initInputPanels()

    this.initEvents();




    // /**
    //  * Assign EventListener to cropVariantTriggers
    //  */
    // this.cropVariantTriggers.off('click').on('click', (e: JQueryEventObject): void => {

    //   /**
    //    * Is the current cropVariantTrigger is active, bail out.
    //    * Bootstrap doesn't provide this functionality when collapsing the Collaps panels
    //    */
    //   if ($(e.currentTarget).hasClass('is-active')) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     return;
    //   }

    //   this.activeCropVariantTrigger.removeClass('is-active');
    //   $(e.currentTarget).addClass('is-active');
    //   this.activeCropVariantTrigger = $(e.currentTarget);
    //   let cropVariant: CropVariant = this.data[this.activeCropVariantTrigger.attr('data-crop-variant-id')];
    //   const imageData: CropperImageData = this.cropper.cropper('getImageData');
    //   cropVariant.cropArea = this.convertRelativeToAbsoluteCropArea(cropVariant.cropArea, imageData);
    //   this.currentCropVariant = $.extend(true, {}, cropVariant);
    //   this.update(cropVariant);
    // });

    // /**
    //  * Assign EventListener to aspectRatioTrigger
    //  */
    // this.aspectRatioTrigger.off('click').on('click', (e: JQueryEventObject): void => {
    //   const ratioId: string = $(e.currentTarget).attr('data-option');
    //   const temp: CropVariant = $.extend(true, {}, this.currentCropVariant);
    //   const ratio: Ratio = temp.allowedAspectRatios[ratioId];
    //   this.setAspectRatio(ratio);
    //   // Set data explicitly or setAspectRatio upscales the crop
    //   this.setCropArea(temp.cropArea);
    //   this.currentCropVariant = $.extend(true, {}, temp, {selectedRatio: ratioId});
    //   this.update(this.currentCropVariant);
    // });

    // /**
    //  * Assign EventListener to saveButton
    //  */
    // this.saveButton.off('click').on('click', (): void => {
    //   this.save(this.data);
    // });

    // /**
    //  * Assign EventListener to previewButton if preview url exists
    //  */
    // if (this.trigger.attr('data-preview-url')) {
    //   this.previewButton.off('click').on('click', (): void => {
    //     this.openPreview(this.data);
    //   });
    // } else {
    //   this.previewButton.hide();
    // }

    // /**
    //  * Assign EventListener to dismissButton
    //  */
    // this.dismissButton.off('click').on('click', (): void => {
    //   this.currentModal.modal('hide');
    // });

    // /**
    //  * Assign EventListener to resetButton
    //  */
    // this.resetButton.off('click').on('click', (e: JQueryEventObject): void => {
    //   const imageData: CropperImageData = this.cropper.cropper('getImageData');
    //   const resetCropVariantString: string = $(e.currentTarget).attr('data-crop-variant');
    //   e.preventDefault();
    //   e.stopPropagation();
    //   if (!resetCropVariantString) {
    //     throw new TypeError('TYPO3 Cropper: No cropVariant data attribute found on reset element.');
    //   }
    //   const resetCropVariant: CropVariant = JSON.parse(resetCropVariantString);
    //   const absoluteCropArea: Area = this.convertRelativeToAbsoluteCropArea(resetCropVariant.cropArea, imageData);
    //   this.currentCropVariant = $.extend(true, {}, resetCropVariant, {cropArea: absoluteCropArea});
    //   this.update(this.currentCropVariant);
    // });

    // // If we start without an cropArea, maximize the cropper
    // if (ImageManipulation.isEmptyArea(this.currentCropVariant.cropArea)) {
    //   this.defaultOpts = $.extend({
    //     autoCropArea: 1,
    //   }, this.defaultOpts);
    // }

    // /**
    //  * Initialise the cropper
    //  *
    //  * Note: We use the extraneous jQuery object here, as CropperJS won't work inside the <iframe>
    //  * The top.require is now inlined @see ImageManipulationElemen.php:143
    //  * TODO: Find a better solution for cross iframe communications
    //  */
    // this.cropper = (<any> top.TYPO3.jQuery(image)).cropper($.extend(this.defaultOpts, {
    //   built: this.cropBuiltHandler,
    //   crop: this.cropMoveHandler,
    //   cropend: this.cropEndHandler,
    //   cropstart: this.cropStartHandler,
    //   data: this.currentCropVariant.cropArea,
    // }));
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
