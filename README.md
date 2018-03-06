== Configuration

=== Override TCA

To override the custom bw_focuspoint_images_svg element:

```
$GLOBALS['TCA']['tt_content']['types']['bw_focuspoint_images_svg']['columnsOverrides']['assets']['config']['overrideChildTca']['columns']['focus_points']['config'] = [
        'focusPoints' => [
            'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.focuspoints.title',
            'singlePoint' => [
                'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.title',
                'resizable' => '1',
                'defaultWidth' => '20px',
                'defaultHeight' => '20px',
                'fields' => [
                    'name' => [
                        'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.name.title',
                        'type' => 'text',
                    ],
                    'description' => [
                        'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.description.title',
                        'type' => 'textarea',
                    ]
                ]
            ]
        ]
    ];
```
