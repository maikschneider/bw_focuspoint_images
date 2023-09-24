<?php

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') || die();

call_user_func(static function (): void {
    // Register static TypoScript template
    ExtensionManagementUtility::addStaticFile(
        'bw_focuspoint_images',
        'Configuration/TypoScript',
        'Bw Focuspoint Images'
    );
});
