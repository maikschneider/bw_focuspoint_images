<?php

declare(strict_types=1);

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

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
};
