<?php

namespace Blueways\BwFocuspointImages\Utility;

use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\LinkHandling\Exception\UnknownLinkHandlerException;
use TYPO3\CMS\Core\LinkHandling\LinkService;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Resource\Exception\FileDoesNotExistException;
use TYPO3\CMS\Core\Resource\Exception\FolderDoesNotExistException;
use TYPO3\CMS\Core\Resource\Exception\InvalidPathException;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\TypoScript\TypoScriptService;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\MathUtility;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManager;
use TYPO3\CMS\Extbase\Object\ObjectManager;
use TYPO3\CMS\Frontend\Service\TypoLinkCodecService;

class HelperUtility
{

    /**
     * @return array
     */
    public static function getTypoScript(): array
    {
        $emptyTypoScript = [
            'settings' => [
                'fields' => []
            ]
        ];
        $typoScript = self::getFullTypoScript();
        return $typoScript['plugin']['tx_bwfocuspointimages'] ?? $emptyTypoScript;
    }

    /**
     * @return array
     */
    public static function getFullTypoScript(): array
    {
        $configurationManager = GeneralUtility::makeInstance(ConfigurationManager::class);
        $typoScript = $configurationManager->getConfiguration(ConfigurationManager::CONFIGURATION_TYPE_FULL_TYPOSCRIPT);
        $typoScriptService = GeneralUtility::makeInstance(TypoScriptService::class);
        return $typoScriptService->convertTypoScriptArrayToPlainArray($typoScript);
    }

    public static function getPagesTSconfig(int $pid): array
    {
        $pageTS = BackendUtility::getPagesTSconfig($pid);
        $typoScriptService = GeneralUtility::makeInstance(TypoScriptService::class);
        return $typoScriptService->convertTypoScriptArrayToPlainArray($pageTS);
    }

    public static function getConfigForWizardAction(int $pid): array
    {
        $pageTs = static::getPagesTSconfig($pid);
        $tsSettings = $pageTs['mod']['tx_bwfocuspointimages']['settings'];

        if (!count($tsSettings['fields'])) {
            $typoScript = static::getTypoScript();
            if (count($typoScript['settings'])) {
                $tsSettings = $typoScript['settings'];
            }
        }

        return $tsSettings;
    }

    public static function getConfigForFormElement(int $pid, array $formElementConfig): array
    {
        $defaultConfig = [
            'file_field' => 'uid_local',
            'focusPoints' => [
                'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.focuspoints.title',
                'singlePoint' => [
                    'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.title',
                ]
            ],
            'missingPageTSWarning' => false
        ];

        // override default config from TCA config
        $config = array_replace_recursive($defaultConfig, $formElementConfig);

        // read pageTS
        $pageTs = static::getPagesTSconfig($pid);
        $tsSettings = $pageTs['mod']['tx_bwfocuspointimages']['settings'];

        // fallback for old configuration: read TypoScript
        if (!count($tsSettings['fields'])) {
            $typoScript = static::getTypoScript();
            if (count($typoScript['settings'])) {
                $tsSettings = $typoScript['settings'];
                $config['missingPageTSWarning'] = true;
            }
        }

        // override single point settings from pageTS / TypoScript
        $config['focusPoints']['singlePoint'] = array_replace_recursive($config['focusPoints']['singlePoint'], $tsSettings);

        return $config;
    }

    public static function getLinkExplanation(string $itemValue): array
    {
        if (empty($itemValue)) {
            return [];
        }
        $data = ['text' => '', 'icon' => ''];
        $typolinkService = GeneralUtility::makeInstance(TypoLinkCodecService::class);
        $linkParts = $typolinkService->decode($itemValue);
        $linkService = GeneralUtility::makeInstance(LinkService::class);
        /** @var IconFactory $iconFactory */
        $iconFactory = GeneralUtility::makeInstance(IconFactory::class);
        $languageService = $GLOBALS['LANG'];

        try {
            $linkData = $linkService->resolve($linkParts['url']);
        } catch (FileDoesNotExistException | FolderDoesNotExistException | UnknownLinkHandlerException | InvalidPathException $e) {
            return $data;
        }

        // Resolving the TypoLink parts (class, title, params)
        $additionalAttributes = [];
        foreach ($linkParts as $key => $value) {
            if ($key === 'url') {
                continue;
            }
            if ($value) {
                switch ($key) {
                    case 'class':
                        $label = $languageService->sL('LLL:EXT:recordlist/Resources/Private/Language/locallang_browse_links.xlf:class');
                        break;
                    case 'title':
                        $label = $languageService->sL('LLL:EXT:recordlist/Resources/Private/Language/locallang_browse_links.xlf:title');
                        break;
                    case 'additionalParams':
                        $label = $languageService->sL('LLL:EXT:recordlist/Resources/Private/Language/locallang_browse_links.xlf:params');
                        break;
                    default:
                        $label = (string)$key;
                }

                $additionalAttributes[] = '<span><strong>' . htmlspecialchars($label) . ': </strong> ' . htmlspecialchars($value) . '</span>';
            }
        }

        // Resolve the actual link
        switch ($linkData['type']) {
            case LinkService::TYPE_PAGE:
                $pageRecord = BackendUtility::readPageAccess($linkData['pageuid'], '1=1');
                // Is this a real page
                if ($pageRecord['uid'] ?? 0) {
                    $fragmentTitle = '';
                    if (isset($linkData['fragment'])) {
                        if (MathUtility::canBeInterpretedAsInteger($linkData['fragment'])) {
                            $contentElement = BackendUtility::getRecord('tt_content', (int)$linkData['fragment'], '*',
                                'pid=' . $pageRecord['uid']);
                            if ($contentElement) {
                                $fragmentTitle = BackendUtility::getRecordTitle('tt_content', $contentElement, false,
                                    false);
                            }
                        }
                        $fragmentTitle = ' #' . ($fragmentTitle ?: $linkData['fragment']);
                    }
                    $data = [
                        'text' => $pageRecord['_thePathFull'] . '[' . $pageRecord['uid'] . ']' . $fragmentTitle,
                        'icon' => $iconFactory->getIconForRecord('pages', $pageRecord, Icon::SIZE_SMALL)->render()
                    ];
                }
                break;
            case LinkService::TYPE_EMAIL:
                $data = [
                    'text' => $linkData['email'],
                    'icon' => $iconFactory->getIcon('content-elements-mailform', Icon::SIZE_SMALL)->render()
                ];
                break;
            case LinkService::TYPE_URL:
                $data = [
                    'text' => $linkData['url'],
                    'icon' => $iconFactory->getIcon('apps-pagetree-page-shortcut-external',
                        Icon::SIZE_SMALL)->render()

                ];
                break;
            case LinkService::TYPE_FILE:
                /** @var File $file */
                $file = $linkData['file'];
                if ($file) {
                    $data = [
                        'text' => $file->getPublicUrl(),
                        'icon' => $iconFactory->getIconForFileExtension($file->getExtension(),
                            Icon::SIZE_SMALL)->render()
                    ];
                }
                break;
            case LinkService::TYPE_FOLDER:
                /** @var Folder $folder */
                $folder = $linkData['folder'];
                if ($folder) {
                    $data = [
                        'text' => $folder->getPublicUrl(),
                        'icon' => $iconFactory->getIcon('apps-filetree-folder-default',
                            Icon::SIZE_SMALL)->render()
                    ];
                }
                break;
            case LinkService::TYPE_RECORD:
                $pageTS = static::getPagesTSconfig(0);
                $table = $pageTS['TCEMAIN.']['linkHandler.'][$linkData['identifier'] . '.']['configuration.']['table'];
                $record = BackendUtility::getRecord($table, $linkData['uid']);
                if ($record) {
                    $recordTitle = BackendUtility::getRecordTitle($table, $record);
                    $tableTitle = $languageService->sL($GLOBALS['TCA'][$table]['ctrl']['title']);
                    $data = [
                        'text' => sprintf('%s [%s:%d]', $recordTitle, $tableTitle, $linkData['uid']),
                        'icon' => $iconFactory->getIconForRecord($table, $record, Icon::SIZE_SMALL)->render(),
                    ];
                } else {
                    $data = [
                        'text' => sprintf('%s', $linkData['uid']),
                        'icon' => $iconFactory->getIcon('tcarecords-' . $table . '-default', Icon::SIZE_SMALL,
                            'overlay-missing')->render(),
                    ];
                }
                break;
            case LinkService::TYPE_TELEPHONE:
                $telephone = $linkData['telephone'];
                if ($telephone) {
                    $data = [
                        'text' => $telephone,
                        'icon' => $iconFactory->getIcon('actions-device-mobile', Icon::SIZE_SMALL)->render()
                    ];
                }
                break;
            default:
                // @TODO: Needs implementation!
                // Please note that this hook is preliminary and might change, as this element could become its own
                // TCA type in the future
                if (isset($GLOBALS['TYPO3_CONF_VARS']['SYS']['formEngine']['linkHandler'][$linkData['type']])) {
//                    $linkBuilder = GeneralUtility::makeInstance($GLOBALS['TYPO3_CONF_VARS']['SYS']['formEngine']['linkHandler'][$linkData['type']]);
//                    $data = $linkBuilder->getFormData($linkData, $linkParts, $this->data, $this);
                } elseif ($linkData['type'] === LinkService::TYPE_UNKNOWN) {
                    $data = [
                        'text' => $linkData['file'],
                        'icon' => $iconFactory->getIcon('actions-link', Icon::SIZE_SMALL)->render()
                    ];
                } else {
                    $data = [
                        'text' => 'not implemented type ' . $linkData['type'],
                        'icon' => ''
                    ];
                }
        }

        $data['additionalAttributes'] = '<div class="help-block">' . implode(' - ', $additionalAttributes) . '</div>';
        return $data;
    }
}
