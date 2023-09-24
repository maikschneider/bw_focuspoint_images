<?php

use Blueways\BwFocuspointImages\Form\Wizard\FocusPointWizard;
return [
    'wizard_focuspoint' => [
        'path' => '/tx_bwfocuspointimages/focuspoint_ajax',
        'target' => FocusPointWizard::class . '::getWizardAction',
    ],
    'wizard_focuspoint_linkbrowserurl' => [
        'path' => '/tx_bwfocuspointimages/focuspoint_linkbrowserurl',
        'target' => FocusPointWizard::class . '::getLinkWizardUrlAction',
    ],
];
