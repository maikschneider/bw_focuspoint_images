<?php

declare(strict_types=1);

namespace Blueways\BwFocuspointImages\Form\Wizard;

use Blueways\BwFocuspointImages\Utility\HelperUtility;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Routing\Exception\RouteNotFoundException;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Http\Response;
use TYPO3\CMS\Core\Resource\Exception\FileDoesNotExistException;
use TYPO3\CMS\Core\Resource\ResourceFactory;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\MathUtility;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManager;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManagerInterface;
use TYPO3\CMS\Fluid\View\StandaloneView;

class FocusPointWizard
{
    protected ConfigurationManager $configurationManager;

    public function __construct(ConfigurationManager $configurationManager)
    {
        $this->configurationManager = $configurationManager;
    }

    /**
     * @throws RouteNotFoundException
     */
    public function getLinkWizardUrlAction(ServerRequestInterface $request): JsonResponse
    {
        $queryParams = $request->getQueryParams();
        $fieldName = $queryParams['fieldName'];
        $inputName = $queryParams['inputName'];
        $inputValue = $queryParams['inputValue'];
        $pid = MathUtility::canBeInterpretedAsInteger($queryParams['pid']) ? (int)$queryParams['pid'] : 0;
        $helperUtility = GeneralUtility::makeInstance(HelperUtility::class);
        $config = $helperUtility->getConfigForWizardAction($pid);

        $linkBrowserArguments = [];
        if (isset($config['fields'][$fieldName]['linkPopup']['blindLinkOptions'])) {
            $linkBrowserArguments['blindLinkOptions'] = $config['fields'][$fieldName]['linkPopup']['blindLinkOptions'];
        }

        if (isset($config['fields'][$fieldName]['linkPopup']['blindLinkFields'])) {
            $linkBrowserArguments['blindLinkFields'] = $config['fields'][$fieldName]['linkPopup']['blindLinkFields'];
        }

        if (isset($config['fields'][$fieldName]['linkPopup']['allowedExtensions'])) {
            $linkBrowserArguments['allowedExtensions'] = $config['fields'][$fieldName]['linkPopup']['allowedExtensions'];
        }

        $urlParameters = [
            'P' => [
                'params' => $linkBrowserArguments,
                'table' => 'sys_file_reference',
                'uid' => '',
                'field' => $inputName,
                'itemName' => $inputName,
            ],
        ];
        $url = (string)$this->uriBuilder->buildUriFromRoute('wizard_link', $urlParameters);

        $helperUtility = GeneralUtility::makeInstance(HelperUtility::class);
        $preview = $inputValue ? $helperUtility->getLinkExplanation($inputValue) : [];

        return new JsonResponse([
            'url' => $url,
            'preview' => $preview,
        ]);
    }
}
