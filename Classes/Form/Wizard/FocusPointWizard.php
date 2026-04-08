<?php

declare(strict_types=1);

namespace Blueways\BwFocuspointImages\Form\Wizard;

use Blueways\BwFocuspointImages\Utility\HelperUtility;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Component\DependencyInjection\Attribute\Autoconfigure;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\MathUtility;

#[Autoconfigure(public: true)]
class FocusPointWizard
{
    public function __construct(protected UriBuilder $uriBuilder)
    {
    }

    public function getLinkWizardUrlAction(ServerRequestInterface $request): JsonResponse
    {
        $queryParams = $request->getQueryParams();
        $pid = $queryParams['pid'] ?? 0;
        $pid = MathUtility::canBeInterpretedAsInteger($pid) ? (int)$pid : 0;
        $inputName = $queryParams['inputName'] ?? '';
        $inputValue = $queryParams['inputValue'] ?? '';
        $configJson = $queryParams['config'] ?? '{}';
        $config = json_decode($configJson, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            $config = [];
        }

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
                'pid' => $pid,
                'formName' => 'editform',
                'field' => $inputName,
                'itemName' => $inputName,
                'currentValue' => $inputValue,
            ],
        ];
        $url = (string)$this->uriBuilder->buildUriFromRoute('wizard_link', $urlParameters);

        $helperUtility = GeneralUtility::makeInstance(HelperUtility::class);
        $preview = $inputValue ? $helperUtility->getLinkExplanation($inputValue, $pid) : [];

        return new JsonResponse([
            'url' => $url,
            'preview' => $preview,
        ]);
    }
}
