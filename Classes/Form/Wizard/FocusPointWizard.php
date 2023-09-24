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
use TYPO3\CMS\Fluid\View\StandaloneView;

class FocusPointWizard
{
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
                'pid' => $pid,
                'field' => $inputName,
                'formName' => 'editform',
                'itemName' => $inputName,
                'hmac' => GeneralUtility::hmac('focusPointForm' . $inputName, 'wizard_js'),
            ],
        ];

        $uriBuilder = GeneralUtility::makeInstance(UriBuilder::class);
        $url = (string)$uriBuilder->buildUriFromRoute('wizard_link', $urlParameters);

        $preview = [];
        if ($inputValue) {
            $preview = $helperUtility->getLinkExplanation($queryParams['inputValue']);
        }

        return new JsonResponse([
            'url' => $url,
            'preview' => $preview,
        ]);
    }

    public function getWizardAction(ServerRequestInterface $request): Response
    {
        $response = new Response();

        if (!$this->isSignatureValid($request)) {
            return $response->withStatus(403);
        }

        $templateView = GeneralUtility::makeInstance(StandaloneView::class);
        $templateView->setLayoutRootPaths(['EXT:bw_focuspoint_images/Resources/Private/Layouts']);
        $templateView->setPartialRootPaths(['EXT:bw_focuspoint_images/Resources/Private/Partials']);
        $templateView->setTemplateRootPaths(['EXT:bw_focuspoint_images/Resources/Private/Templates']);
        $templateView->setTemplate('FocuspointWizard');

        $queryParams = json_decode((string)$request->getQueryParams()['arguments'], true);
        $fileUid = $queryParams['image'];
        $image = null;
        if (MathUtility::canBeInterpretedAsInteger($fileUid)) {
            try {
                /** @var ResourceFactory $resourceFactory */
                $resourceFactory = GeneralUtility::makeInstance(ResourceFactory::class);
                $image = $resourceFactory->getFileObject($fileUid);
            } catch (FileDoesNotExistException $e) {
                return $response->withStatus(404);
            }
        }

        $viewData = [
            'image' => $image,
            'focusPoints' => $queryParams['focusPoints'],
        ];
        $templateView->assignMultiple($viewData);
        $content = $templateView->render();
        $response->getBody()->write($content);

        return $response;
    }

    /**
     * Check if hmac signature is correct
     *
     * @param ServerRequestInterface $request the request with the GET parameters
     */
    protected function isSignatureValid(ServerRequestInterface $request): bool
    {
        $token = GeneralUtility::hmac($request->getQueryParams()['arguments'], 'ajax_wizard_focuspoint');
        return $token === $request->getQueryParams()['signature'];
    }
}
