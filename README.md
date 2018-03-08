# Bw Focuspoint Images

Create image map like elements using SVG.

![Example Image](Documentation/Preview.png)

## Configure Typoscript

The extension uses the default ```fluid_styled_content`` template, partial and layout path. If you want to override it, you just need to include the following in your typoscript setup:

```
tt_content.bw_focuspoint_images_svg.bw_focuspoint_images_svg.templateRootPaths.5 = EXT:bw_focuspoint_images/Resources/Private/Templates/
```

## Copy Template

Put FocuspointSVG.html in your template path and start editing.

## Configure TCA

### Custom CE

To change the TCA of custom CE with CType ```bw_focuspoint_images_svg```, put this in ```Configuration/TCA/Overrides/tt_content.php```:

```
// Configure custom focus point svg element
$GLOBALS['TCA']['tt_content']['types']['bw_focuspoint_images_svg']['columnsOverrides']['assets']['config']['overrideChildTca']['columns']['focus_points']['config']['focusPoints'] = [
        'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.title',
        'resizable' => '1',
        'defaultWidth' => '0.2',
        'defaultHeight' => '0.2',
        'fields' => [
            'name' => [
                'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.name.title',
                'type' => 'text',
            ],
            'description' => [
                'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.description.title',
                'type' => 'textarea',
            ],
            'color' => [
                'title' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.title',
                'type' => 'select',
                'options' => [
                    'green' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.options.green.title',
                    'blue' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.options.blue.title',
                    '0' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.options.0.title',
                    '1' => 'LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.options.1.title'
                ]
            ]
        ]
    ];
```
