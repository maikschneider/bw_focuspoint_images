<?php

use Blueways\BwFocuspointImages\Hooks\BwFocuspointSvgPreviewRenderer;

defined('TYPO3_MODE') || die('Access denied');

$_EXTKEY = 'bw_focuspoint_images';

/**
 * Register new form type
 */
$GLOBALS['TYPO3_CONF_VARS']['SYS']['formEngine']['nodeRegistry'][1516966225] = [
    'nodeName' => 'focuspoint_wizard',
    'priority' => '70',
    'class' => Blueways\BwFocuspointImages\Form\Element\InputFocuspointElement::class,
];

/**
 * Register icon
 */
$iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);
$iconRegistry->registerIcon(
    'bw_focuspoint_images_svg',
    \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
    ['source' => 'EXT:bw_focuspoint_images/Resources/Public/Icons/ContentElements/FocuspointSVG.svg']
);

// Register for hook to show preview of tt_content element of CType="textmedia" in page module
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['bw_focuspoint_images_svg'] = BwFocuspointSvgPreviewRenderer::class;

// Register PageTS
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('
    <INCLUDE_TYPOSCRIPT: source="FILE:EXT:bw_focuspoint_images/Configuration/PageTS/mod.typoscript">
');
