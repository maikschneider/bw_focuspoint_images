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
            this.focusPointContainerSelector = '#focuspoint-container';
        }
        /**
         * @method init
         * @desc Initializes the Focus Point UI and sets up all the event indings for the UI
         * @private
         */
        FocuspointImages.prototype.init = function () {
            var image = this.currentModal.find(this.cropImageSelector);
            var imageHeight = $(image).height();
            var imageWidth = $(image).width();
            var data = this.trigger.attr('data-focus-points-value');
            if (!data) {
                throw new TypeError('FocusPoints: No focuspoint data found for image');
            }
            // If we have data already set we assume an internal reinit eg. after resizing
            this.data = $.isEmptyObject(this.data) ? JSON.parse(data) : this.data;
            // Initialize our class members
            this.currentModal.find(this.focusPointContainerSelector).css({ height: imageHeight, width: imageWidth });
            // this.cropVariantTriggers = this.currentModal.find('.t3js-crop-variant-trigger');
            // this.activeCropVariantTrigger = this.currentModal.find('.t3js-crop-variant-trigger.is-active');
            // this.saveButton = this.currentModal.find('[data-method=save]');
            // this.dismissButton = this.currentModal.find('[data-method=dismiss]');
            // this.resetButton = this.currentModal.find('[data-method=reset]');
            // this.cropperCanvas = this.currentModal.find('#js-crop-canvas');
            // this.aspectRatioTrigger = this.currentModal.find('[data-method=setAspectRatio]');
            // this.currentCropVariant = this.data[this.activeCropVariantTrigger.attr('data-crop-variant-id')];
            var focusboxes = this.currentModal.find('.focuspoint-item.ui-draggable');
            focusboxes.draggable({
                containment: "parent",
                //scroll: false,
                drag: function () {
                    //mapr.updateCoords(this);
                },
                stop: function () {
                    //mapr.writeHTML();
                    //localStorage.setItem('mapHTML',mapr.wrapper.html());
                }
            });
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
        ;
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
