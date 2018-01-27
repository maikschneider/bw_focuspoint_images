/**
* Module: TYPO3/CMS/BwFocuspointImages/FocuspointImages
*
* JavaScript to handle data import
* @exports TYPO3/CMS/BwFocuspointImages/FocuspointImages
*/
define(["require", "exports", "TYPO3/CMS/Core/Contrib/imagesloaded.pkgd.min", "TYPO3/CMS/Backend/Modal", "jquery", "jquery-ui/draggable", "jquery-ui/resizable"], function (require, exports, ImagesLoaded, Modal, $) {
   'use strict';

   /**
   * @exports TYPO3/CMS/BwFocuspointImages/FocuspointImages
   */
   var FocuspointImages = {};

   /**
   * @param {int} id
   */
   FocuspointImages.import = function (id) {
      $.ajax({
         type: 'POST',
         url: TYPO3.settings.ajaxUrls['tx_bwfocuspointimages/focuspoint_ajax'],
         data: {
            'id': id
         }
      }).done(function (response) {
         if (response.success) {
            top.TYPO3.Notification.success('Import Done', response.output);
         } else {
            top.TYPO3.Notification.error('Import Error!');
         }
      });
   };

   /**
   * initializes events using deferred bound to document
   * so AJAX reloads are no problem
   */
   FocuspointImages.initializeTrigger = function () {

      $('.t3js-focuspoint-trigger').on('click', function (evt) {
         evt.preventDefault();
         Modal.advanced();
         //FocuspointImages.import($(this).attr('data-id'));
      });
   };

   return FocuspointImages;
});
