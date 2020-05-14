<?php

namespace Blueways\BwFocuspointImages\Utility;

use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManager;
use TYPO3\CMS\Extbase\Object\ObjectManager;
use TYPO3\CMS\Extbase\Service\TypoScriptService;

class HelperUtility
{

    /**
     * @return array
     * @throws \TYPO3\CMS\Extbase\Configuration\Exception\InvalidConfigurationTypeException
     */
    public static function getTypoScript(): array
    {
        $objectManager = GeneralUtility::makeInstance(ObjectManager::class);
        $configurationManager = $objectManager->get(ConfigurationManager::class);
        $typoScript = $configurationManager->getConfiguration(ConfigurationManager::CONFIGURATION_TYPE_FULL_TYPOSCRIPT);
        $typoScriptService = $objectManager->get(TypoScriptService::class);
        $extTypoScript = $typoScript['plugin.']['tx_bwfocuspointimages.'] ?: [];
        return $typoScriptService->convertTypoScriptArrayToPlainArray($extTypoScript);
    }
}
