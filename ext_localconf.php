<?php

defined('TYPO3') || die();

// Register custom form element
$GLOBALS['TYPO3_CONF_VARS']['SYS']['formEngine']['nodeRegistry'][1516966225] = [
    'nodeName' => 'focuspoint_wizard',
    'priority' => '70',
    'class' => Blueways\BwFocuspointImages\Form\Element\InputFocuspointElement::class,
];

$GLOBALS['TYPO3_CONF_VARS']['BE']['stylesheets']['bw_focuspoint_images'] = 'EXT:bw_focuspoint_images/Resources/Public/Css/BackendModal.css';
