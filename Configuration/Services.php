<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use function Symfony\Component\DependencyInjection\Loader\Configurator\closure;

return static function (
    ContainerConfigurator $containerConfigurator,
    ContainerBuilder $containerBuilder
): void {
    $services = $containerConfigurator->services()
        ->defaults()
        ->autowire()
        ->autoconfigure();

    $services->load('Blueways\\BwFocuspointImages\\', '../Classes/');

    $services->set(\Blueways\BwFocuspointImages\Utility\HelperUtility::class)->public();

    // for v12+
    if (!$containerBuilder->hasDefinition(\TYPO3\CMS\Frontend\Service\TypoLinkCodecService::class)) {
        $services->set(\Blueways\BwFocuspointImages\Utility\HelperUtility::class)
            ->public()
            ->arg('$typoLinkCodecService',
                \Symfony\Component\DependencyInjection\Loader\Configurator\service(
                    \TYPO3\CMS\Core\LinkHandling\TypoLinkCodecService::class
                )
            );
    }
};
