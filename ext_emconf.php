<?php

/**
 * Extension Manager/Repository config file for ext "bw_focuspoint_images".
 */
$EM_CONF[$_EXTKEY] = [
    'title' => 'Bw Focuspoint Images',
    'description' => 'Image Editor for adding focuspoints to images',
    'category' => 'templates',
    'constraints' => [
        'depends' => [
            'typo3' => '8.7.0-9.5.99',
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
    'createDirs' => '',
    'clearCacheOnLoad' => 1,
    'author' => 'Maik Schneider',
    'author_email' => 'm.schneider@blueways.de',
    'author_company' => 'blueways',
    'version' => '1.0.1',
];
