<?php

namespace Blueways\BwFocuspointImages\Form\Element;

use Blueways\BwFocuspointImages\Utility\HelperUtility;
use Exception;
use TYPO3\CMS\Backend\Form\Element\AbstractFormElement;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Core\Page\JavaScriptModuleInstruction;
use TYPO3\CMS\Core\Resource\Exception\FileDoesNotExistException;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\MathUtility;
use TYPO3\CMS\Core\Utility\VersionNumberUtility;
use TYPO3\CMS\Fluid\View\StandaloneView;

class InputFocuspointElement extends AbstractFormElement
{
    /**
     * This will render an imageManipulation field
     *
     * @return array As defined in initializeResultArray() of AbstractNode
     * @throws Exception
     */
    public function render(): array
    {
        $version = VersionNumberUtility::convertVersionStringToArray(VersionNumberUtility::getNumericTypo3Version());
        $resultArray = $this->initializeResultArray();

        $file = $this->getFile($this->data['databaseRow'], 'uid_local');
        if (!$file instanceof File) {
            return $resultArray;
        }

        if ($file->isMissing()) {
            return $this->createErrorMessage($resultArray, 'tca.missing-file-message');
        }

        if (!$file->isImage()) {
            return $this->createErrorMessage($resultArray, 'tca.supported-types-message');
        }

        if (!$file->getProperty('width')) {
            return $this->createErrorMessage($resultArray, 'tca.no-image-dimensions');
        }

        $elementType = $this->getElementType() ?? '';
        $helperUtility = GeneralUtility::makeInstance(HelperUtility::class);
        $wizardConfig = $helperUtility->getConfigForWizardAction($this->data['effectivePid'], $elementType);

        if (empty($wizardConfig)) {
            return $this->createErrorMessage($resultArray, 'tca.no-wizard-config');
        }

        $fieldInformationResult = $this->renderFieldInformation();
        $fieldInformationHtml = $fieldInformationResult['html'];
        $resultArray = $this->mergeChildReturnIntoExistingResult($resultArray, $fieldInformationResult, false);

        $fieldControlResult = $this->renderFieldControl();
        $fieldControlHtml = $fieldControlResult['html'];
        $resultArray = $this->mergeChildReturnIntoExistingResult($resultArray, $fieldControlResult, false);

        $fieldWizardResult = $this->renderFieldWizard();
        $fieldWizardHtml = $fieldWizardResult['html'];
        $resultArray = $this->mergeChildReturnIntoExistingResult($resultArray, $fieldWizardResult, false);

        foreach ($wizardConfig['fields'] ?? [] as $fieldName => $fieldConfig) {
            $wizardConfig['fields'][$fieldName]['title'] = $this->getLanguageService()->sL($fieldConfig['title']);
            if (isset($fieldConfig['options'])) {
                foreach ($fieldConfig['options'] as $optionKey => $option) {
                    $wizardConfig['fields'][$fieldName]['options'][$optionKey] = $this->getLanguageService()->sL($option);
                }
            }
        }
        $parameterArray = $this->data['parameterArray'];
        $wizardConfig['itemFormElName'] = $parameterArray['itemFormElName'];
        $wizardConfig['typo3Version'] = $version['version_main'];

        $resultArray['additionalInlineLanguageLabelFiles'][] = 'EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf';
        $resultArray['javaScriptModules'][] = JavaScriptModuleInstruction::create('@blueways/bw-focuspoint-images/FocuspointElement.js');

        $arguments = [
            'itemFormElName' => $parameterArray['itemFormElName'],
            'itemFormElValue' => $parameterArray['itemFormElValue'],
            'wizardConfig' => $wizardConfig,
            'fieldInformation' => $fieldInformationHtml,
            'fieldControl' => $fieldControlHtml,
            'fieldWizard' => $fieldWizardHtml,
            'image' => $file,
        ];

        // Build html
        $templateView = GeneralUtility::makeInstance(StandaloneView::class);
        $templateView->setTemplatePathAndFilename('EXT:bw_focuspoint_images/Resources/Private/Templates/FocuspointElement.html');
        $templateView->assignMultiple($arguments);

        $resultArray['html'] = $templateView->render();

        return $resultArray;
    }

    /**
     * Get file object
     */
    protected function getFile(array $row, string $fieldName): ?File
    {
        $file = null;
        $fileUid = empty($row[$fieldName]) ? null : $row[$fieldName];

        if (is_array($fileUid) && isset($fileUid[0]['uid'])) {
            $fileUid = $fileUid[0]['uid'];
        }

        if (MathUtility::canBeInterpretedAsInteger($fileUid)) {
            try {
                /** @var ResourceFactory $resourceFactory */
                $resourceFactory = GeneralUtility::makeInstance(ResourceFactory::class);
                $file = $resourceFactory->getFileObject($fileUid);
            } catch (FileDoesNotExistException|\InvalidArgumentException $e) {
            }
        }

        return $file;
    }

    protected function createErrorMessage(array $resultArray, string $messageLanguageKey): array
    {
        $resultArray['html'] = '<div class="callout callout-warning">';
        $resultArray['html'] .= $this->getLanguageService()->sL('LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:' . $messageLanguageKey);
        $resultArray['html'] .= '</div>';
        return $resultArray;
    }

    /**
     * This should typically be CType of tt_content.
     */
    public function getElementType(): ?string
    {
        $currentRecord = $this->data['databaseRow'];

        // Check if this file reference is related to a tt_content element
        $tableName = $currentRecord['tablenames'];
        if ($tableName !== 'tt_content') {
            return $tableName;
        }

        $parentUid = $currentRecord['uid_foreign'];
        if (!$parentUid || !MathUtility::canBeInterpretedAsInteger($parentUid)) {
            return null;
        }

        $parentRecord = BackendUtility::getRecord($tableName, $parentUid);
        if ($parentRecord && isset($parentRecord['CType'])) {
            return $parentRecord['CType'];
        }

        return null;
    }
}
