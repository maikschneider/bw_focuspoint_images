<?php
defined('TYPO3_MODE') or die();

$_EXTKEY = $GLOBALS['_EXTKEY'] = 'bw_focuspoint_images';

/*

    Custom CE
    =========
    bw_focuspoint_images_svg

 */
// register CType in TCA
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
    'tt_content',
    'CType',
    [
        'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:tca.wizard.svg.title',
        'bw_focuspoint_images_svg', // ctype value
        'bw_focuspoint_images_svg' // icon-identifier
    ],
    'textmedia', // position in select box (=after textmedia)
    'after'
);
// set paletts and input fields
$GLOBALS['TCA']['tt_content']['types']['bw_focuspoint_images_svg'] = array(
   'showitem' => '
         --palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:palette.general;general,
         header;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:header_formlabel,
         assets,
      --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:tabs.access,
         --palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:palette.visibility;visibility,
         --palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:palette.access;access,
      --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:tabs.extended
');

// override the imageoverlayPalette to show only the focus_points widget
$GLOBALS['TCA']['tt_content']['types']['bw_focuspoint_images_svg']['columnsOverrides'] = array(
        'assets' => [
            'config' => [
                'overrideChildTca' => [
                    'types' => [
                        \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
                            'showitem' => 'focus_points,
                                --palette--;;filePalette'
                        ]
                    ]
                ]
            ]
        ]
    );
