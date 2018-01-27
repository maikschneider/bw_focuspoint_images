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


  public show(): void {

    const modalTitle: string = this.trigger.data('modalTitle');
    const buttonPreviewText: string = this.trigger.data('buttonPreviewText');
    const buttonDismissText: string = this.trigger.data('buttonDismissText');
    const buttonSaveText: string = this.trigger.data('buttonSaveText');
    const imageUri: string = this.trigger.data('url');
    //const initCropperModal: Function = this.initializeCropperModal.bind(this);

    this.currentModal = Modal.advanced({
      content: imageUri,
      size: Modal.sizes.full,
      style: Modal.styles.dark,
      title: 'test',
    });

  }


  public initializeTrigger(): void {
    const triggerHandler: Function = (e: JQueryEventObject): void => {
      e.preventDefault();
      this.trigger = $(e.currentTarget);
      this.show();
    };
    $('.t3js-image-focuspoint-trigger').off('click').click(triggerHandler);
  }

}

export = new FocuspointImages();
