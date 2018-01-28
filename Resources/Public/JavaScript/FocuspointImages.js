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
            this.cropImageSelector = '#t3js-crop-image';
        }
        FocuspointImages.prototype.init = function () {
            alert('yes!');
        };
        /**
         * @method initializeFocuspointModal
         * @desc Initialize the focuspoint modal and dispatch the focuspoint init
         * @private
         */
        FocuspointImages.prototype.initializeFocuspointModal = function () {
            var _this = this;
            var image = this.currentModal.find(this.cropImageSelector);
            ImagesLoaded(image, function () {
                setTimeout(function () {
                    _this.init();
                }, 100);
            });
        };
        FocuspointImages.prototype.show = function () {
            var _this = this;
            var modalTitle = this.trigger.data('modalTitle');
            var buttonPreviewText = this.trigger.data('buttonPreviewText');
            var buttonDismissText = this.trigger.data('buttonDismissText');
            var buttonSaveText = this.trigger.data('buttonSaveText');
            var imageUri = this.trigger.data('url');
            var initFocuspointModal = this.initializeFocuspointModal.bind(this);
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
            this.currentModal.on('hide.bs.modal', function (e) {
                _this.destroy();
            });
            // Do not dismiss the modal when clicking beside it to avoid data loss
            this.currentModal.data('bs.modal').options.backdrop = 'static';
        };
        /**
         * @method destroy
         * @desc Destroy the FocuspointImage
         * @private
         */
        FocuspointImages.prototype.destroy = function () {
            if (this.currentModal) {
                this.currentModal = null;
                this.data = null;
            }
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
