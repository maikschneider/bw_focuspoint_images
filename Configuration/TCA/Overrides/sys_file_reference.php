<?php

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') || die();

$additionalColumns = [
    'focus_points' => [
        'exclude' => 0,
        'l10n_display' => 'hideDiff',
        'label' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:sys_file_metadata.focus_points',
        'config' => [
            'type' => 'input',
            'renderType' => 'focuspoint_wizard',
            'allowedExtensions' => $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'],
        ],
    ],
];

ExtensionManagementUtility::addTCAcolumns('sys_file_reference', $additionalColumns);
