<?php

return [
    'wizard_focuspoint' => [
        'path' => '/tx_bwfocuspointimages/focuspoint_ajax',
        'target' => \Blueways\BwFocuspointImages\Form\Wizard\FocusPointWizard::class . '::getWizardAction',
    ],
    'wizard_focuspoint_linkbrowserurl' => [
        'path' => '/tx_bwfocuspointimages/focuspoint_linkbrowserurl',
        'target' => \Blueways\BwFocuspointImages\Form\Wizard\FocusPointWizard::class . '::getLinkWizardUrlAction',
    ],
];
