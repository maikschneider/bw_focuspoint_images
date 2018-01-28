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
  private cropImageSelector: string = '#t3js-crop-image';


  private init(): void {
    alert('yes!');
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
  }


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
              btnClass: 'btn-default pull-left',
              dataAttributes: {
                  method: 'preview',
              },
              icon: 'actions-view',
              text: buttonPreviewText,
          },
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
              .addClass('cropper');
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
