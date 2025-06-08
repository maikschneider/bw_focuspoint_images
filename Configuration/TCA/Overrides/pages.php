<?php

defined('TYPO3') || die();

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

ExtensionManagementUtility::registerPageTSConfigFile(
    'bw_focuspoint_images',
    'Configuration/TsConfig/Page/newContentElement.tsconfig',
    'Focuspoint Images: Content Element',
);
