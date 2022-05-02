<?php

/**
 * Extension Manager/Repository config file for ext "bw_focuspoint_images".
 */
$EM_CONF[$_EXTKEY] = [
    'title' => 'Bw Focuspoint Images',
    'description' => 'Image Editor for adding focus points to images',
    'category' => 'plugin',
    'constraints' => [
        'depends' => [
            'typo3' => '9.0.0-11.9.99',
        ],
        'conflicts' => [
        ],
    ],
    'autoload' => [
        'psr-4' => [
            'Blueways\\BwFocuspointImages\\' => 'Classes'
        ],
    ],
    'state' => 'stable',
    'uploadfolder' => 0,
    'clearCacheOnLoad' => 1,
    'author' => 'Maik Schneider',
    'author_email' => 'm.schneider@blueways.de',
    'author_company' => 'blueways',
    'version' => '3.0.2',
];
