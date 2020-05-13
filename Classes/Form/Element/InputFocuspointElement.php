<?php

namespace Blueways\BwFocuspointImages\Form\Element;

use TYPO3\CMS\Backend\Form\Element\AbstractFormElement;
use TYPO3\CMS\Backend\Form\NodeFactory;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Resource\Exception\FileDoesNotExistException;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\MathUtility;
use TYPO3\CMS\Core\Utility\StringUtility;
use TYPO3\CMS\Core\Utility\VersionNumberUtility;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManager;
use TYPO3\CMS\Extbase\Object\ObjectManager;
use TYPO3\CMS\Extbase\Service\TypoScriptService;
use TYPO3\CMS\Extbase\Utility\ArrayUtility;
use TYPO3\CMS\Fluid\View\StandaloneView;

class InputFocuspointElement extends AbstractFormElement
{

    /**
     * Default element configuration
     *
     * @var array
     */
    protected static $defaultConfig = [
        'file_field' => 'uid_local',
        'focusPoints' => [
            'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.focuspoints.title',
            'singlePoint' => [
                'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.title',
                'resizable' => '1',
                'defaultWidth' => '0.2',
                'defaultHeight' => '0.2',
                'fields' => []
            ]
        ]
    ];

    /**
     * @var StandaloneView
     */
    protected $templateView;

    /**
     * @var UriBuilder
     */
    protected $uriBuilder;

    /**
     * @param NodeFactory $nodeFactory
     * @param array $data
     */
    public function __construct(NodeFactory $nodeFactory, array $data)
    {
        parent::__construct($nodeFactory, $data);
        // Would be great, if we could inject the view here, but since the constructor is in the interface, we can't
        $this->templateView = GeneralUtility::makeInstance(StandaloneView::class);
        $this->templateView->setLayoutRootPaths([GeneralUtility::getFileAbsFileName('EXT:bw_focuspoint_images/Resources/Private/Layouts/')]);
        $this->templateView->setPartialRootPaths([GeneralUtility::getFileAbsFileName('EXT:bw_focuspoint_images/Resources/Private/Partials/')]);
        $this->templateView->setTemplatePathAndFilename(GeneralUtility::getFileAbsFileName('EXT:bw_focuspoint_images/Resources/Private/Templates/FocuspointElement.html'));
        $this->uriBuilder = GeneralUtility::makeInstance(UriBuilder::class);
    }

    /**
     * This will render an imageManipulation field
     *
     * @return array As defined in initializeResultArray() of AbstractNode
     * @throws \TYPO3\CMS\Core\Imaging\ImageManipulation\InvalidConfigurationException
     */
    public function render()
    {
        $resultArray = $this->initializeResultArray();
        $parameterArray = $this->data['parameterArray'];
        $config = $this->populateConfiguration($parameterArray['fieldConf']['config']);

        $file = $this->getFile($this->data['databaseRow'], $config['file_field']);
        if (!$file) {
            // Early return in case we do not find a file
            return $resultArray;
        }

        $verionNumberUtility = GeneralUtility::makeInstance(VersionNumberUtility::class);
        $version = $verionNumberUtility->convertVersionStringToArray($verionNumberUtility->getNumericTypo3Version());

        if ($version['version_main'] > 7) {
            $fieldInformationResult = $this->renderFieldInformation();
            $fieldInformationHtml = $fieldInformationResult['html'];
            $resultArray = $this->mergeChildReturnIntoExistingResult($resultArray, $fieldInformationResult, false);

            $fieldControlResult = $this->renderFieldControl();
            $fieldControlHtml = $fieldControlResult['html'];
            $resultArray = $this->mergeChildReturnIntoExistingResult($resultArray, $fieldControlResult, false);

            $fieldWizardResult = $this->renderFieldWizard();
            $fieldWizardHtml = $fieldWizardResult['html'];
            $resultArray = $this->mergeChildReturnIntoExistingResult($resultArray, $fieldWizardResult, false);

            $resultArray['requireJsModules'][] = [
                'TYPO3/CMS/BwFocuspointImages/FocuspointImages' => 'function(FocuspointImages){top.require(["jquery-ui/draggable", "jquery-ui/resizable"], function() { FocuspointImages.initializeTrigger(); }); }',
            ];
        }

        if ($version['version_main'] <= 7) {
            $resultArray['requireJsModules'][] = [
                'TYPO3/CMS/BwFocuspointImages/FocuspointImagesV7' => 'function(FocuspointImages){top.require(["jquery-ui/draggable", "jquery-ui/resizable"], function() { FocuspointImages.initializeTrigger(); }); }',
            ];
        }

        $arguments = [
            'fieldInformation' => $fieldInformationHtml,
            'fieldControl' => $fieldControlHtml,
            'fieldWizard' => $fieldWizardHtml,
            'isAllowedFileExtension' => in_array(strtolower($file->getExtension()),
                GeneralUtility::trimExplode(',', strtolower($config['allowedExtensions'])), true),
            'image' => $file,
            'formEngine' => [
                'field' => [
                    'value' => $parameterArray['itemFormElValue'],
                    'name' => $parameterArray['itemFormElName']
                ],
                'validation' => '[]'
            ],
            'config' => $config,
            'wizardUri' => $this->getWizardUri($config['focusPoints'], $file),
        ];

        if ($arguments['isAllowedFileExtension']) {
            $arguments['formEngine']['field']['id'] = StringUtility::getUniqueId('formengine-image-manipulation-');
            if (GeneralUtility::inList($config['eval'], 'required')) {
                $arguments['formEngine']['validation'] = $this->getValidationDataAsJsonString(['required' => true]);
            }
        }
        $this->templateView->assignMultiple($arguments);
        $resultArray['html'] = $this->templateView->render();

        return $resultArray;
    }

    /**
     * @param array $baseConfiguration
     * @return array
     */
    protected function populateConfiguration(array $baseConfiguration)
    {
        // override default config from TCA config
        $defaultConfig = self::$defaultConfig;
        $config = ArrayUtility::arrayMergeRecursiveOverrule($defaultConfig, $baseConfiguration);

        // override single point settings from typoScript
        $tsConfig = $this->getConfigurationFromTypoScript();
        $config['focusPoints']['singlePoint'] = ArrayUtility::arrayMergeRecursiveOverrule($config['focusPoints']['singlePoint'],
            $tsConfig);

        return $config;
    }

    protected function getConfigurationFromTypoScript()
    {
        $objectManager = GeneralUtility::makeInstance(ObjectManager::class);
        $configurationManager = $objectManager->get(ConfigurationManager::class);
        $typoScript = $configurationManager->getConfiguration(ConfigurationManager::CONFIGURATION_TYPE_FULL_TYPOSCRIPT);
        $typoScriptService = $objectManager->get(TypoScriptService::class);
        $settings = $typoScript['plugin.']['tx_bwfocuspointimages.'] ? $typoScript['plugin.']['tx_bwfocuspointimages.']['settings.'] : [];
        return $typoScriptService->convertTypoScriptArrayToPlainArray($settings);
    }

    /**
     * Get file object
     *
     * @param array $row
     * @param string $fieldName
     * @return File|null
     */
    protected function getFile(array $row, $fieldName)
    {
        $file = null;
        $fileUid = !empty($row[$fieldName]) ? $row[$fieldName] : null;
        // v7: get file uid via explode of crazy uid string (e.g. "sys_file_7|myimagename.jpg")
        if ($fileUid && !is_array($fileUid)) {
            $fileUidParts = explode('|', $fileUid);
            $fileUid = strpos($fileUidParts[0], 'sys_file_') === 0 ? str_replace('sys_file_', '',
                $fileUidParts[0]) : $fileUid;
        }
        if (is_array($fileUid) && isset($fileUid[0]['uid'])) {
            $fileUid = $fileUid[0]['uid'];
        }
        if (MathUtility::canBeInterpretedAsInteger($fileUid)) {
            try {
                $file = ResourceFactory::getInstance()->getFileObject($fileUid);
            } catch (FileDoesNotExistException $e) {
            } catch (\InvalidArgumentException $e) {
            }
        }
        return $file;
    }

    /**
     * @param array $focusPoints
     * @param File $image
     * @return string
     */
    protected function getWizardUri(array $focusPoints, File $image): string
    {
        $routeName = 'ajax_wizard_focuspoint';
        $arguments = [
            'focusPoints' => $focusPoints,
            'image' => $image->getUid(),
        ];
        $uriArguments['arguments'] = json_encode($arguments);
        $uriArguments['signature'] = GeneralUtility::hmac($uriArguments['arguments'], $routeName);
        return (string)$this->uriBuilder->buildUriFromRoute($routeName, $uriArguments);
    }
}
