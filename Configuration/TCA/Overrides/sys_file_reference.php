<?php
defined('TYPO3_MODE') || die('Access denied');

$_EXTKEY = 'bw_focuspoint_images';

$additionalColumns = [
    'focus_points' => [
        'exclude' => 0,
        'l10n_mode' => 'exclude',
        'l10n_display' => 'defaultAsReadonly',
        'label' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:sys_file_metadata.focus_points',
        'config' => [
            'type' => 'input',
            'renderType' => 'focuspoint_wizard'
        ],
    ],
];

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_reference', $additionalColumns);

//$GLOBALS['TCA']['sys_file_reference']['palettes']['imageoverlayPalette']['showitem'] = 'focus_points';
