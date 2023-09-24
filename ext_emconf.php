<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'Bw Focuspoint Images',
    'description' => 'Image Editor for adding focus points to images',
    'category' => 'plugin',
    'constraints' => [
        'depends' => [
            'typo3' => '12.0.0-12.9.99',
        ],
        'conflicts' => [
        ],
    ],
    'autoload' => [
        'psr-4' => [
            'Blueways\\BwFocuspointImages\\' => 'Classes',
        ],
    ],
    'state' => 'stable',
    'author' => 'Maik Schneider',
    'author_email' => 'maik.schneider@xima.de',
    'author_company' => 'XIMA Media GmbH',
    'version' => '4.0.0',
];
