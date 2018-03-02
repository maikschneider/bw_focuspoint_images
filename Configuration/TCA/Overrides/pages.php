<?php
defined('TYPO3_MODE') || die();

call_user_func(function()
{
    /**
     * Temporary variables
     */
    $extensionKey = 'bw_focuspoint_images';

    /**
     * Default PageTS for BwRundfunkgruppeBase
     */
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::registerPageTSConfigFile(
        $extensionKey,
        'Configuration/PageTS/mod.typoscript',
        'Bw Focuspoint Images'
    );
});
