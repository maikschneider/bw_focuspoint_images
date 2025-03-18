<?php

namespace Blueways\BwFocuspointImages\Form\Element;

use Blueways\BwFocuspointImages\Utility\HelperUtility;
use Exception;
use TYPO3\CMS\Backend\Form\Element\AbstractFormElement;
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
        $helperUtility = GeneralUtility::makeInstance(HelperUtility::class);
        $resultArray = $this->initializeResultArray();
        $parameterArray = $this->data['parameterArray'];
        $config = $helperUtility->getConfigForFormElement(
            $this->data['databaseRow']['pid'],
            $parameterArray['fieldConf']['config']
        );

        // get image
        $file = $this->getFile($this->data['databaseRow'], $config['file_field']);
        if (!$file instanceof File) {
            return $resultArray;
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

        $wizardConfig = $helperUtility->getConfigForWizardAction($this->data['effectivePid']);
        foreach ($wizardConfig['fields'] ?? [] as $fieldName => $fieldConfig) {
            $wizardConfig['fields'][$fieldName]['title'] = $this->getLanguageService()->sL($fieldConfig['title']);
            if (isset($fieldConfig['options'])) {
                foreach ($fieldConfig['options'] as $optionKey => $option) {
                    $wizardConfig['fields'][$fieldName]['options'][$optionKey] = $this->getLanguageService()->sL($option);
                }
            }
        }
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
            'isAllowedFileExtension' => in_array(
                strtolower($file->getExtension()),
                GeneralUtility::trimExplode(',', strtolower((string)$config['allowedExtensions'])),
                true
            ),
            'image' => $file,
            'config' => $config,
            'pid' => $this->data['databaseRow']['pid'],
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
     *
     * @param string $fieldName
     */
    protected function getFile(array $row, $fieldName): ?File
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
}
