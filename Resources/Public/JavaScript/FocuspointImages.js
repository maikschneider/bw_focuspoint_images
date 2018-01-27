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
define(["require", "exports", "TYPO3/CMS/Core/Contrib/imagesloaded.pkgd.min", "TYPO3/CMS/Backend/Modal", "jquery", "jquery-ui/draggable", "jquery-ui/resizable"], function (require, exports, ImagesLoaded, Modal, $) {
    "use strict";
    /**
     * Module: TYPO3/CMS/BwFocuspointImages/FocuspointImages
     * Contains all logic for the image crop GUI including setting focusAreas
     * @exports TYPO3/CMS/BwFocuspointImages/FocuspointImages
     */
    var FocuspointImages = (function () {
        function FocuspointImages() {
        }
        FocuspointImages.prototype.show = function () {
            var modalTitle = this.trigger.data('modalTitle');
            var buttonPreviewText = this.trigger.data('buttonPreviewText');
            var buttonDismissText = this.trigger.data('buttonDismissText');
            var buttonSaveText = this.trigger.data('buttonSaveText');
            var imageUri = this.trigger.data('url');
            //const initCropperModal: Function = this.initializeCropperModal.bind(this);
            this.currentModal = Modal.advanced({
                content: imageUri,
                size: Modal.sizes.full,
                style: Modal.styles.dark,
                title: 'test',
            });
        };
        FocuspointImages.prototype.initializeTrigger = function () {
            var _this = this;
            var triggerHandler = function (e) {
                e.preventDefault();
                _this.trigger = $(e.currentTarget);
                _this.show();
            };
            $('.t3js-focuspoint-trigger').off('click').click(triggerHandler);
        };
        return FocuspointImages;
    }());
    return new FocuspointImages();
});
