<?php

namespace Blueways\BwFocuspointImages\Utility;

use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManager;
use TYPO3\CMS\Extbase\Object\ObjectManager;

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
        if (class_exists('TYPO3\CMS\Extbase\Service\TypoScriptService')) {
            $typoScriptService = $objectManager->get(\TYPO3\CMS\Extbase\Service\TypoScriptService::class);
        } else {
            $typoScriptService = $objectManager->get(\TYPO3\CMS\Core\TypoScript\TypoScriptService::class);
        }
        return $typoScriptService->convertTypoScriptArrayToPlainArray($typoScript);
    }

    public static function getPagesTSconfig(int $pid): array
    {
        $objectManager = GeneralUtility::makeInstance(ObjectManager::class);
        $pageTS = BackendUtility::getPagesTSconfig($pid);
        if (class_exists('TYPO3\CMS\Extbase\Service\TypoScriptService')) {
            $typoScriptService = $objectManager->get(\TYPO3\CMS\Extbase\Service\TypoScriptService::class);
        } else {
            $typoScriptService = $objectManager->get(\TYPO3\CMS\Core\TypoScript\TypoScriptService::class);
        }
        return $typoScriptService->convertTypoScriptArrayToPlainArray($pageTS);
    }
}
