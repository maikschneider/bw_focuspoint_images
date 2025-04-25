<?php

namespace Blueways\BwFocuspointImages\Utility;

use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\LinkHandling\Exception\UnknownLinkHandlerException;
use TYPO3\CMS\Core\LinkHandling\LinkService;
use TYPO3\CMS\Core\LinkHandling\TypoLinkCodecService;
use TYPO3\CMS\Core\Resource\Exception\FileDoesNotExistException;
use TYPO3\CMS\Core\Resource\Exception\FolderDoesNotExistException;
use TYPO3\CMS\Core\Resource\Exception\InvalidPathException;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\Folder;
use TYPO3\CMS\Core\TypoScript\TypoScriptService;
use TYPO3\CMS\Core\Utility\MathUtility;

class HelperUtility
{
    protected TypoScriptService $typoScriptService;

    protected LinkService $linkService;

    protected IconFactory $iconFactory;

    protected TypoLinkCodecService $typoLinkCodecService;

    public function __construct(
        TypoScriptService $typoScriptService,
        LinkService $linkService,
        IconFactory $iconFactory,
        TypoLinkCodecService $typoLinkCodecService
    ) {
        $this->typoScriptService = $typoScriptService;
        $this->linkService = $linkService;
        $this->iconFactory = $iconFactory;
        $this->typoLinkCodecService = $typoLinkCodecService;
    }

    public function getPagesTSconfig(int $pid): array
    {
        $pageTS = BackendUtility::getPagesTSconfig($pid);
        return $this->typoScriptService->convertTypoScriptArrayToPlainArray($pageTS);
    }

    public function getConfigForWizardAction(int $pid, string $type = ''): array
    {
        $pageTs = $this->getPagesTSconfig($pid)['mod']['tx_bwfocuspointimages']['settings'] ?? [];
        if (empty($pageTs['fields'])) {
            return [];
        }

        $pageTs['pid'] = $pid;

        foreach ($pageTs['fields'] as $fieldName => $fieldConfig) {
            $typesOverride = $fieldConfig['types'][$type] ?? [];

            foreach ($typesOverride as $property => $value) {
                $pageTs['fields'][$fieldName][$property] = $value;
            }

            if (filter_var($pageTs['fields'][$fieldName]['disabled'] ?? false, FILTER_VALIDATE_BOOLEAN)) {
                unset($pageTs['fields'][$fieldName]);
            }

            if (!isset($pageTs['fields'][$fieldName]['title'])) {
                unset($pageTs['fields'][$fieldName]);
            }

            unset($pageTs['fields'][$fieldName]['types']);
        }

        return $pageTs;
    }

    public function getLinkExplanation(string $itemValue): array
    {
        if ($itemValue === '') {
            return [];
        }

        $data = ['text' => '', 'icon' => ''];
        $linkParts = $this->typoLinkCodecService->decode($itemValue);
        $languageService = $GLOBALS['LANG'];

        try {
            $linkData = $this->linkService->resolve($linkParts['url']);
        } catch (FileDoesNotExistException | FolderDoesNotExistException | UnknownLinkHandlerException | InvalidPathException $e) {
            return $data;
        }

        // Resolving the TypoLink parts (class, title, params)
        $additionalAttributes = [];
        foreach ($linkParts as $key => $value) {
            if ($key === 'url') {
                continue;
            }

            if ($value !== '' && $value !== '0') {
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
                        $label = $key;
                }

                $additionalAttributes[] = '<span><strong>' . htmlspecialchars((string)$label) . ': </strong> ' . htmlspecialchars($value) . '</span>';
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
                            $contentElement = BackendUtility::getRecord(
                                'tt_content',
                                (int)$linkData['fragment'],
                                '*',
                                'pid=' . $pageRecord['uid']
                            );
                            if ($contentElement) {
                                $fragmentTitle = BackendUtility::getRecordTitle(
                                    'tt_content',
                                    $contentElement,
                                    false,
                                    false
                                );
                            }
                        }

                        $fragmentTitle = ' #' . ($fragmentTitle ?: $linkData['fragment']);
                    }

                    $data = [
                        'text' => $pageRecord['_thePathFull'] . '[' . $pageRecord['uid'] . ']' . $fragmentTitle,
                        'icon' => $this->iconFactory->getIconForRecord('pages', $pageRecord, Icon::SIZE_SMALL)->render(),
                    ];
                }

                break;
            case LinkService::TYPE_EMAIL:
                $data = [
                    'text' => $linkData['email'],
                    'icon' => $this->iconFactory->getIcon('content-elements-mailform', Icon::SIZE_SMALL)->render(),
                ];
                break;
            case LinkService::TYPE_URL:
                $data = [
                    'text' => $linkData['url'],
                    'icon' => $this->iconFactory->getIcon(
                        'apps-pagetree-page-shortcut-external',
                        Icon::SIZE_SMALL
                    )->render(),

                ];
                break;
            case LinkService::TYPE_FILE:
                /** @var File $file */
                $file = $linkData['file'];
                if ($file) {
                    $data = [
                        'text' => $file->getPublicUrl(),
                        'icon' => $this->iconFactory->getIconForFileExtension(
                            $file->getExtension(),
                            Icon::SIZE_SMALL
                        )->render(),
                    ];
                }

                break;
            case LinkService::TYPE_FOLDER:
                /** @var Folder $folder */
                $folder = $linkData['folder'];
                if ($folder) {
                    $data = [
                        'text' => $folder->getPublicUrl(),
                        'icon' => $this->iconFactory->getIcon(
                            'apps-filetree-folder-default',
                            Icon::SIZE_SMALL
                        )->render(),
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
                        'icon' => $this->iconFactory->getIconForRecord($table, $record, Icon::SIZE_SMALL)->render(),
                    ];
                } else {
                    $data = [
                        'text' => sprintf('%s', $linkData['uid']),
                        'icon' => $this->iconFactory->getIcon(
                            'tcarecords-' . $table . '-default',
                            Icon::SIZE_SMALL,
                            'overlay-missing'
                        )->render(),
                    ];
                }

                break;
            case LinkService::TYPE_TELEPHONE:
                $telephone = $linkData['telephone'];
                if ($telephone) {
                    $data = [
                        'text' => $telephone,
                        'icon' => $this->iconFactory->getIcon('actions-device-mobile', Icon::SIZE_SMALL)->render(),
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
                        'icon' => $this->iconFactory->getIcon('actions-link', Icon::SIZE_SMALL)->render(),
                    ];
                } else {
                    $data = [
                        'text' => 'not implemented type ' . $linkData['type'],
                        'icon' => '',
                    ];
                }
        }

        $data['additionalAttributes'] = '<div class="help-block">' . implode(' - ', $additionalAttributes) . '</div>';
        return $data;
    }

    public static function arraySome(array $array, callable $f): bool
    {
        foreach ($array as $item)
            if ($f($item))
                return true;
        return false;
    }
}
