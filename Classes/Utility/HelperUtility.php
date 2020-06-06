<?php

namespace Blueways\BwFocuspointImages\Utility;

use TYPO3\CMS\Backend\Utility\BackendUtility;
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
        $typoScript = self::getFullTypoScript();
        return $typoScript['plugin']['tx_bwfocuspointimages'];
    }

    /**
     * @return array
     * @throws \TYPO3\CMS\Extbase\Configuration\Exception\InvalidConfigurationTypeException
     */
    public static function getFullTypoScript(): array
    {
        $objectManager = GeneralUtility::makeInstance(ObjectManager::class);
        $configurationManager = $objectManager->get(ConfigurationManager::class);
        $typoScript = $configurationManager->getConfiguration(ConfigurationManager::CONFIGURATION_TYPE_FULL_TYPOSCRIPT);
        $typoScriptService = $objectManager->get(TypoScriptService::class);
        return $typoScriptService->convertTypoScriptArrayToPlainArray($typoScript);
    }

    public static function getPagesTSconfig(int $pid): array
    {
        $objectManager = GeneralUtility::makeInstance(ObjectManager::class);
        $pageTS = BackendUtility::getPagesTSconfig($pid);
        $typoScriptService = $objectManager->get(TypoScriptService::class);
        return $typoScriptService->convertTypoScriptArrayToPlainArray($pageTS);
    }
}
