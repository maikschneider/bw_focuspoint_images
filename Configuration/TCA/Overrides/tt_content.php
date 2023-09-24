<?php

defined('TYPO3') or die();

// register CType in TCA
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:tca.wizard.svg.title',
        'bw_focuspoint_images_svg', // ctype value
        'bw_focuspoint_images_svg', // icon-identifier
    ],
    'textmedia', // position in select box (=after textmedia)
    'after'
);

// set palettes and input fields
$GLOBALS['TCA']['tt_content']['types']['bw_focuspoint_images_svg'] = [
    'showitem' => '
         --palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:palette.general;general,
        --palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.headers;headers,
         assets,
     --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:language,
        --palette--;;language,
      --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:tabs.access,
         --palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:palette.visibility;visibility,
         --palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:palette.access;access,
      --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:tabs.extended
    ',
    'previewRenderer' => Blueways\BwFocuspointImages\Preview\FocuspointPreviewRenderer::class,
];

// set icon for page module
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['bw_focuspoint_images_svg'] = 'bw_focuspoint_images_svg';

// override the imageoverlayPalette to show only the focus_points widget
$GLOBALS['TCA']['tt_content']['types']['bw_focuspoint_images_svg']['columnsOverrides'] = [
    'assets' => [
        'label' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:sys_file_metadata.label',
        'config' => [
            'maxitems' => 1,
            'filter' => [
                [
                    'parameters' => [
                        'allowedFileExtensions' => $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'],
                    ],
                ],
            ],
            'overrideChildTca' => [
                'types' => [
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
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

//$GLOBALS['TCA']['sys_file_reference']['palettes']['imageoverlayPalette']['showitem'] = 'focus_points';
