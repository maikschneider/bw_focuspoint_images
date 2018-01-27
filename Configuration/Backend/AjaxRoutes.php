<?php

 /**
  * Definitions for routes provided by EXT:bw_focuspoint_images
  * Contains all AJAX-based routes for entry points
  *
  * Currently the "access" property is only used so no token creation + validation is made
  * but will be extended further.
  */
 return [
    'wizard_focuspoint' => [
         'path' => 'tx_bwfocuspointimages/focuspoint_ajax',
         'target' => \Blueways\BwFocuspointImages\Form\Wizard\FocusPointWizard::class .'::getWizardAction'
     ],
 ];
