<?php

namespace Blueways\BwFocuspointImages\EventListener;

use TYPO3\CMS\Core\Http\ApplicationType;
use TYPO3\CMS\Core\Page\Event\BeforeJavaScriptsRenderingEvent;

class BeforeJavaScriptsRenderingEventListener
{
    public function __invoke(BeforeJavaScriptsRenderingEvent $event): void
    {
        if (ApplicationType::fromRequest($GLOBALS['TYPO3_REQUEST'])->isBackend()) {
            $event->getAssetCollector()->addJavaScript(
                'focuspoint-wizard',
                'EXT:bw_focuspoint_images/Resources/Public/JavaScript/FocuspointWizard.js',
                ['type' => 'module']
            );
        }
    }
}
