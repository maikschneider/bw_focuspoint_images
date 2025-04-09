<?php

use Blueways\BwFocuspointImages\Form\Wizard\FocusPointWizard;

return [
    'wizard_focuspoint_linkbrowserurl' => [
        'path' => '/tx_bwfocuspointimages/focuspoint_linkbrowserurl',
        'target' => FocusPointWizard::class . '::getLinkWizardUrlAction',
    ],
];
