<?php
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
