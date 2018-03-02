<?php
defined('TYPO3_MODE') || die('Access denied');

$_EXTKEY = 'bw_focuspoint_images';

// @TODO: Move in sysext/core/configuration/tca/sys_file_reference!!!!!

$additionalColumns = [
    'focus_points' => [
        'exclude' => 1,
        // 'l10n_mode' => 'exclude',
        // 'l10n_display' => 'defaultAsReadonly',
        'label' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:sys_file_metadata.focus_points',
        'config' => [
            // 'type' => 'user',
            // 'userFunc' => Blueways\BwFocuspointImages\Userfuncs\Tca::class . '->renderField',
            'type' => 'input',
            'renderType' => 'focuspoint_wizard'
            // 'size' => 50,
            // 'renderType' => 'focuspoint_wizard',
            // 'wizards' => array(
            //   'link' => array(
            //     'type' => 'focuspoint_wizard',
            //     'title' => 'Focus Point Wizard',
            //     'JSopenParams' => 'height=700,width=780,status=0,menubar=0,scrollbars=1',
            //     'icon' => 'EXT:' . $_EXTKEY . '/Resources/Public/img/link_popup.gif',
            //     'module' => array(
            //       'name' => 'focuspoint_wizard_element',
            //       'urlParameters' => array(
            //         'mode' => 'wizard',
            //         'ajax' => '0',
            //         'any' => '... parameters you need'
            //       ),
            //     ),
            //   ),
            //   '_VALIGN' => 'middle',
            //   '_PADDING' => '4',
            // ),
            # Optional
            #'softref'=>'something',
        ],
    ],
];


\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('sys_file_metadata', $additionalColumns);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes(
    'sys_file_metadata',
    'focus_points',
    TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE,
    'after:publisher'
);
