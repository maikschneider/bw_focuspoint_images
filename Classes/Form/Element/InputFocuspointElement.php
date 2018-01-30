<?php
namespace Blueways\BwFocuspointImages\Form\Element;

use TYPO3\CMS\Backend\Form\NodeFactory;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Imaging\ImageManipulation\Area;
use TYPO3\CMS\Core\Imaging\ImageManipulation\InvalidConfigurationException;
use TYPO3\CMS\Core\Resource\Exception\FileDoesNotExistException;
use TYPO3\CMS\Core\Resource\File;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\MathUtility;
use TYPO3\CMS\Core\Utility\StringUtility;
use TYPO3\CMS\Fluid\View\StandaloneView;
use TYPO3\CMS\Backend\Form\Element\AbstractFormElement;

class InputFocuspointElement extends AbstractFormElement
{
    /**
     * @var StandaloneView
     */
    protected $templateView;

    /**
     * @var UriBuilder
     */
    protected $uriBuilder;

    /**
     * Default element configuration
     *
     * @var array
     */
    protected static $defaultConfig = [
        'file_field' => 'uid_local',
        'allowedExtensions' => null, // default: $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext']
        'focusPoints' => [
            'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.focuspoints.title',
            'singlePoint' => [
                'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.title',
                'fields' => [
                    'name' => [
                        'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.name.title',
                        'type' => 'text',
                    ],
                    'description' => [
                        'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.description.title',
                        'type' => 'textarea',
                    ],
                    'color' => [
                        'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.title',
                        'type' => 'select',
                        'options' => [
                            'green' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.options.green.title',
                            'blue' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.options.blue.title',
                            '0' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.options.0.title',
                            '1' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.options.1.title'
                        ]
                    ]
                ]
            ]
        ]
    ];


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

        $file = $this->getFile($this->data['databaseRow'], 'file');
        if (!$file) {
            // Early return in case we do not find a file
            return $resultArray;
        }

        $config = $this->processConfiguration($config, $parameterArray['itemFormElValue'], $file);

        $fieldInformationResult = $this->renderFieldInformation();
        $fieldInformationHtml = $fieldInformationResult['html'];
        $resultArray = $this->mergeChildReturnIntoExistingResult($resultArray, $fieldInformationResult, false);

        $fieldControlResult = $this->renderFieldControl();
        $fieldControlHtml = $fieldControlResult['html'];
        $resultArray = $this->mergeChildReturnIntoExistingResult($resultArray, $fieldControlResult, false);

        $fieldWizardResult = $this->renderFieldWizard();
        $fieldWizardHtml = $fieldWizardResult['html'];
        $resultArray = $this->mergeChildReturnIntoExistingResult($resultArray, $fieldWizardResult, false);


        // just for testing purposes
        $focusPointsExampleData = [
            [
                'name' => 'headline text',
                'description' => 'here a longer description text',
                'color' => 'green',
                'x' => '0.1',
                'y' => '0.2',
                'width' => '0.3',
                'height' => '0.1'
            ],
            [
                'name' => 'another headlinetext',
                'description' => 'lorem ipsum dolor si almet onmet',
                'color' => 'blue',
                'x' => '0.6',
                'y' => '0',
                'width' => '0.1',
                'height' => '1'
            ]
        ];
        $parameterArray['itemFormElValue'] = json_encode($focusPointsExampleData);

        $arguments = [
            'fieldInformation' => $fieldInformationHtml,
            'fieldControl' => $fieldControlHtml,
            'fieldWizard' => $fieldWizardHtml,
            'isAllowedFileExtension' => in_array(strtolower($file->getExtension()), GeneralUtility::trimExplode(',', strtolower($config['allowedExtensions'])), true),
            'image' => $file,
            'formEngine' => [
                'field' => [
                    'value' => $parameterArray['itemFormElValue'],
                    'name' => $parameterArray['itemFormElName']
                ],
                'validation' => '[]'
            ],
            'config' => $config,
            'wizardUri' => $this->getWizardUri($config['focusPoints'], $file, $parameterArray['itemFormElValue']),
            'previewUrl' => $this->getPreviewUrl($this->data['databaseRow'], $file),
        ];

        if ($arguments['isAllowedFileExtension']) {
            $resultArray['requireJsModules'][] = [
                'TYPO3/CMS/BwFocuspointImages/FocuspointImages' => 'function (FocuspointImages) {top.require(["cropper"], function() { FocuspointImages.initializeTrigger(); }); }'
            ];
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
     * @param array $config
     * @param string $elementValue
     * @param File $file
     * @return array
     * @throws \TYPO3\CMS\Core\Imaging\ImageManipulation\InvalidConfigurationException
     */
    protected function processConfiguration(array $config, string &$elementValue, File $file)
    {
        // $cropVariantCollection = CropVariantCollection::create($elementValue, $config['cropVariants']);
        // if (empty($config['readOnly']) && !empty($file->getProperty('width'))) {
        //     $cropVariantCollection = $cropVariantCollection->applyRatioRestrictionToSelectedCropArea($file);
        //     $elementValue = (string)$cropVariantCollection;
        // }
        // $config['cropVariants'] = $cropVariantCollection->asArray();
        $config['allowedExtensions'] = implode(', ', GeneralUtility::trimExplode(',', $config['allowedExtensions'], true));

        return $config;
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
        if (is_array($fileUid) && isset($fileUid[0])) {
            $fileUid = $fileUid[0];
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
    protected function getWizardUri(array $focusPoints, File $image, string $itemFormElValue): string
    {
        $routeName = 'ajax_wizard_focuspoint';
        $arguments = [
            'focusPoints' => $focusPoints,
            'focusPointsCount' => range(1, count(json_decode($itemFormElValue))+1),
            'image' => $image->getUid(),
        ];
        $uriArguments['arguments'] = json_encode($arguments);
        $uriArguments['signature'] = GeneralUtility::hmac($uriArguments['arguments'], $routeName);
        return (string)$this->uriBuilder->buildUriFromRoute($routeName, $uriArguments);
    }

    /**
     * @param array $databaseRow
     * @param File $file
     * @return string
     */
    protected function getPreviewUrl(array $databaseRow, File $file): string
    {
        $previewUrl = '';
        // Hook to generate a preview URL
        if (isset($GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['Backend/Form/Element/ImageManipulationElement']['previewUrl']) && is_array($GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['Backend/Form/Element/ImageManipulationElement']['previewUrl'])) {
            $hookParameters = [
                'databaseRow' => $databaseRow,
                'file' => $file,
                'previewUrl' => $previewUrl,
            ];
            foreach ($GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['Backend/Form/Element/ImageManipulationElement']['previewUrl'] as $listener) {
                $previewUrl = GeneralUtility::callUserFunction($listener, $hookParameters, $this);
            }
        }
        return $previewUrl;
    }

    /**
     * @param array $baseConfiguration
     * @return array
     * @throws InvalidConfigurationException
     */
    protected function populateConfiguration(array $baseConfiguration)
    {
        $defaultConfig = self::$defaultConfig;

        // If single point configuration is set do not include deafult ones (not hidden fields!)
        if (isset($baseConfiguration['focusPoints']['singlePoint']['fields'])) {
            unset($defaultConfig['focusPoints']['singlePoint']['fields']['name']);
            unset($defaultConfig['focusPoints']['singlePoint']['fields']['description']);
            unset($defaultConfig['focusPoints']['singlePoint']['fields']['color']);
        }

        $config = array_replace_recursive($defaultConfig, $baseConfiguration);

        if (!is_array($config['focusPoints'])) {
            throw new InvalidConfigurationException('Focus points configuration must be an array', 1517157895);
        }

        // By default we allow all image extensions that can be handled by the GFX functionality
        if ($config['allowedExtensions'] === null) {
            $config['allowedExtensions'] = $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'];
        }
        return $config;
    }
}
