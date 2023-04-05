<?php

defined('TYPO3') || die();

// Register custom form element
$GLOBALS['TYPO3_CONF_VARS']['SYS']['formEngine']['nodeRegistry'][1516966225] = [
    'nodeName' => 'focuspoint_wizard',
    'priority' => '70',
    'class' => Blueways\BwFocuspointImages\Form\Element\InputFocuspointElement::class,
];

$versionInformation = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Information\Typo3Version::class);

if ($versionInformation->getMajorVersion() < 11) {
    // Register Icon
    $iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);
    $iconRegistry->registerIcon(
        'bw_focuspoint_images_svg',
        \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        ['source' => 'EXT:bw_focuspoint_images/Resources/Public/Icons/ContentElements/FocuspointSVG.svg']
    );
}

if ($versionInformation->getMajorVersion() < 12) {
    // Register PageTS
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('
        @import \'EXT:bw_focuspoint_images/Configuration/page.tsconfig\'
    ');

    // Register for hook to show preview of tt_content element of CType="bw_focuspoint_images_svg" in page module
    $GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['bw_focuspoint_images_svg'] = \Blueways\BwFocuspointImages\Hooks\BwFocuspointSvgPreviewRenderer::class;
}
