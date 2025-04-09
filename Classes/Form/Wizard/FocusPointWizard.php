<?php

declare(strict_types=1);

namespace Blueways\BwFocuspointImages\Form\Wizard;

use Blueways\BwFocuspointImages\Utility\HelperUtility;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class FocusPointWizard
{
    public function __construct(protected UriBuilder $uriBuilder)
    {
    }

    public function getLinkWizardUrlAction(ServerRequestInterface $request): JsonResponse
    {
        $queryParams = $request->getQueryParams();
        $inputName = $queryParams['inputName'] ?? '';
        $inputValue = $queryParams['inputValue'] ?? '';
        $config = json_decode($queryParams['config'] ?? '{}', true);

        $linkBrowserArguments = [];
        if (isset($config['linkPopup']['blindLinkOptions'])) {
            $linkBrowserArguments['blindLinkOptions'] = $config['linkPopup']['blindLinkOptions'];
        }

        if (isset($config['linkPopup']['blindLinkFields'])) {
            $linkBrowserArguments['blindLinkFields'] = $config['linkPopup']['blindLinkFields'];
        }

        if (isset($config['linkPopup']['allowedExtensions'])) {
            $linkBrowserArguments['allowedExtensions'] = $config['linkPopup']['allowedExtensions'];
        }

        $urlParameters = [
            'P' => [
                'params' => $linkBrowserArguments,
                'table' => 'sys_file_reference',
                'uid' => '',
                'formName' => 'editform',
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
