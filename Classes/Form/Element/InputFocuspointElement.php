<?php

namespace Blueways\BwFocuspointImages\Form\Element;

use Blueways\BwFocuspointImages\Utility\HelperUtility;
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
     * @var array
     */
    protected $typoScript;

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

        // @TODO: do not read TypoScript, use PageTS
        $this->typoScript = HelperUtility::getTypoScript();

        $this->templateView = GeneralUtility::makeInstance(StandaloneView::class);
        $this->templateView->setLayoutRootPaths(['EXT:bw_focuspoint_images/Resources/Private/Layouts']);
        $this->templateView->setPartialRootPaths(['EXT:bw_focuspoint_images/Resources/Private/Partials']);
        $this->templateView->setTemplateRootPaths(['EXT:bw_focuspoint_images/Resources/Private/Templates']);
        $this->templateView->setTemplate('FocuspointElement');

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
        $is7up = $version['version_main'] > 7 ? 'true' : 'false';

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
        }

        $resultArray['requireJsModules'][] = [
            'TYPO3/CMS/BwFocuspointImages/FocuspointWizard' => 'function(FocuspointWizard){top.require(["jquery-ui/draggable", "jquery-ui/resizable"], function() { FocuspointWizard.initializeTrigger(' . $is7up . '); }); }',
        ];

        $arguments = [
            'fieldInformation' => $fieldInformationHtml,
            'fieldControl' => $fieldControlHtml,
            'fieldWizard' => $fieldWizardHtml,
            'isAllowedFileExtension' => in_array(strtolower($file->getExtension()),
                GeneralUtility::trimExplode(',', strtolower($config['allowedExtensions'])), true),
            'image' => $file,
            'formEngine' => [
                'field' => [
                    'id' => 'bwfocuspointwizard' . random_int(1, 9999),
                    'value' => $parameterArray['itemFormElValue'],
                    'name' => $parameterArray['itemFormElName']
                ],
                'validation' => '[]'
            ],
            'config' => $config,
            'wizardUri' => $this->getWizardUri($config['focusPoints'], $file, $this->data['databaseRow']['pid']),
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
     * @throws \TYPO3\CMS\Extbase\Configuration\Exception\InvalidConfigurationTypeException
     */
    protected function populateConfiguration(array $baseConfiguration)
    {
        // override default config from TCA config
        $defaultConfig = self::$defaultConfig;
        $config = array_replace_recursive($defaultConfig, $baseConfiguration);

        // override single point settings from typoScript
        $config['focusPoints']['singlePoint'] = array_replace_recursive($config['focusPoints']['singlePoint'],
            $this->typoScript['settings']);

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
     * @param \TYPO3\CMS\Core\Resource\File $image
     * @param int $pid
     * @return string
     * @throws \TYPO3\CMS\Backend\Routing\Exception\RouteNotFoundException
     */
    protected function getWizardUri(array $focusPoints, File $image, int $pid): string
    {
        $routeName = 'ajax_wizard_focuspoint';
        $arguments = [
            'focusPoints' => $focusPoints,
            'image' => $image->getUid(),
            'pid' => $pid,
        ];
        $uriArguments['arguments'] = json_encode($arguments);
        $uriArguments['signature'] = GeneralUtility::hmac($uriArguments['arguments'], $routeName);
        return (string)$this->uriBuilder->buildUriFromRoute($routeName, $uriArguments);
    }
}
