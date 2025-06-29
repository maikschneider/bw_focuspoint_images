<?php

use Blueways\BwFocuspointImages\Preview\FocuspointPreviewRenderer;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') || die();

// register CType in TCA
ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:tca.wizard.svg.title',
        'bw_focuspoint_images_svg', // ctype value
        'bw_focuspoint_images_svg', // icon-identifier
        'default', // group
        'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:tca.wizard.svg.description', // description
    ],
    'textmedia', // position in select box (=after textmedia)
    'after'
);

// set palettes and input fields
$GLOBALS['TCA']['tt_content']['types']['bw_focuspoint_images_svg'] = [
    'showitem' => '
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            --palette--;;headers,
            assets,
        --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
            --palette--;;frames,
            --palette--;;appearanceLinks,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:language,
            --palette--;;language,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
            --palette--;;hidden,
            --palette--;;access,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:categories,
            categories,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:notes,
            rowDescription,
        --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:extended,
    ',
    'previewRenderer' => FocuspointPreviewRenderer::class,
];

// set icon for page module
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['bw_focuspoint_images_svg'] = 'bw_focuspoint_images_svg';

// override the imageoverlayPalette to show only the focus_points widget
$GLOBALS['TCA']['tt_content']['types']['bw_focuspoint_images_svg']['columnsOverrides'] = [
    'assets' => [
        'label' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:sys_file_metadata.label',
        'config' => [
            'filter' => [
                [
                    'parameters' => [
                        'allowedFileExtensions' => $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'],
                    ],
                ],
            ],
            'overrideChildTca' => [
                'types' => [
                    File::FILETYPE_IMAGE => [
                        'showitem' => 'focus_points,--palette--;;filePalette',
                    ],
                ],
                'columns' => [
                    'uid_local' => [
                        'config' => [
                            'appearance' => [
                                'elementBrowserAllowed' => $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
];
