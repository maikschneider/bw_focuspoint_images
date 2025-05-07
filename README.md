# Overview

With this TYPO3 extension you can create responsive image maps in the
backend. This extension ships an image editor that can be used to add
interactive clickable areas and information to an image.

![Backend Editor](/Documentation/Images/example_backend.png)

## Example

Frontend output with configuration of example PageTS

![Example](/Documentation/Images/example_frontend.png)

The image with all defined areas gets rendered. The default behavior of the areas is to redirect the user to the specified link. It can be an external link, a page inside TYPO3 or a link to a specific component on a page.

For administrators
==================

### Installation

1.  Install via composer

    ``` {.bash}
    composer require blueways/bw-focuspoint-images
    ```

2.  Include TypoScript

    Enable the extension in the Extension Manager and include the
    **static TypoScript template** or manually include setup and
    constants.

3.  Define your own wizard fields

    There are **no default fields** defined! An example with working
    frontend output can be found in the PageTS section.

### Usage

Add the new content element "Image with Focuspoints" to any page, link a new
image and start adding your focus areas.

![](/Documentation/Images/backend_select.png)

The next actions are available in the editor:
- Moving areas around with the mouse
- Double-click outside any area to create a new point for an active area
- Double-click on any point to delete the point

### Configuration

To configure the fields in the focus point wizard, use the following **PageTS** settings. You can choose between **text**, **textarea**, **select**, **link** and **checkbox** inputs in the wizard.

This example configuration is used to generate the output shown in the example ([`/Tests/Fixtures/example1.tsconfig`](/Tests/Fixtures/example1.tsconfig))

```typoscript
mod.tx_bwfocuspointimages.settings.fields {
    link {
        title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.link
        type = link
    }
    title {
        title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.title
        type = text
    }
}
```

#### Field Display Conditions

You can use `displayCond` in your wizard field configuration to control when a field should be visible, similar to [TYPO3's TCA displayCond feature](https://docs.typo3.org/m/typo3/reference-tca/main/en-us/Columns/DisplayConditions.html).

```typoscript
mod.tx_bwfocuspointimages.settings.fields {
    description {
        title = Description
        type = textarea
        displayCond = FIELD:name:REQ:true  # Show only if name field has a value
    }
}
```

#### Field Overrides

You can override the default configuration of the fields on a per-element basis, similar to the TYPO3 TCEFORM configuration: `mod.tx_bwfocuspointimages.settings.fields.[fieldName].types.[typeName].[propertyName]`.

```
mod.tx_bwfocuspointimages.settings.fields {
    description {
        title = Description
        type = textarea
        types.my_custom_ctype.disabled = 1
    }

    title {
        title = Default Title
        types.tx_myextension_domain_model_mytype.title {
            title = Custom Title
            default = Custom Default
        }
    }
}
```

##### Adjusting the link wizard

You can customize the display of the link wizard. Use the additional ```linkPopup``` to change the list of allowed file extensions, the displayed link fields or link options. The configuration is done like for [link inputs](https://docs.typo3.org/m/typo3/reference-tca/11.5/en-us/ColumnsConfig/Type/Input/Properties/LinkPopup.html#linkpopup).

```typoscript
mod.tx_bwfocuspointimages.settings.fields {

    email {
        title = Hide all wizard tabs but email
        type = link
        linkPopup {
            blindLinkOptions = file, folder, page, spec, telephone, url
        }
    }

    pdf {
        title = Only files of .pdf or .docx extension
        type = link
        linkPopup {
            blindLinkFields = pdf, docx
            blindLinkOptions = email, folder, page, spec, telephone, url
            blindLinkFields = class, params, target, title
        }
    }

}
```

#### Constants

To override templates set your own paths via constants:

```typoscript
plugin.tx_bwfocuspointimages {
    view {
        templateRootPath =
        partialRootPath =
        layoutRootPath =
    }
}
```

For developers
==============

The table `sys_file_references` becomes
extended for the field `focus_points`. This field is used to save the settings made in the backend editor in json format.

To use the editor in other content elements with FAL images, use the
following TCA to activate the palette:

```php
$GLOBALS['TCA']['tt_content']['types']['your_list_type']['columnsOverrides'] = [
    'assets' => [
        'config' => [
            'overrideChildTca' => [
                'types' => [
                    \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
                        'showitem' => 'focus_points,--palette--;;filePalette'
                    ],
                ],
                'columns' => [
                    'uid_local' => [
                        'config' => [
                            'appearance' => [
                                'elementBrowserAllowed' => $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext']
                            ],
                        ],
                    ],
                ],
            ]
        ]
    ]
];
```

This snippet assumes that references are done via `assets` column. Change this to your needs.

To decode the JSON data and use the information in your template, use the `FocuspointProcessor`:

```typoscript
tt_content.your_list_type {
    dataProcessing {
        15 = Blueways\BwFocuspointImages\DataProcessing\FocuspointProcessor
        15 {
            references.fieldName = assets
            as = image
        }
    }
}
```

For contributors
================

Let's say you want to create a new shape - triangle. In order to define a new shape, you need to:
1. Create a class `TriangleShapeRenderer` that implements the `ShapeRendererInterface` interface with the method `render()` that should return a corresponding SVG-shape. It's to render previews in the backend and to render shapes through the `<focuspoint:shape>` view helper (see examples for rects and polygons)
2. Extend the `ShapeRendererFactory::MAPPING` array with a new keyword that maps to the previously created shape renderer: `'triangle' => TriangleShapeRenderer::class`
3. Add a new Svelte component that should render the triangle:
```svelte
<!-- shapes/Triangle.svelte -->
<script lang="ts">
    import {focuspoints} from "../store.svelte";

    const {index} = $props();

    export function getHandles(): [number, number][] {...} // Returns an array of handles (points). Required

    export function onDrag(event: InteractjsDragEvent): void {...} // How the triangle data gets transformed when the figure is being dragged. Required.

    export function onHandleDrag(event: InteractjsDragEvent): void {...} // How the triangle's individual handle gets transformed when the handle is being dragged. Optional.

    export function onHandleDoubleClick(event: MouseEvent & {currentTarget: EventTarget & SVGCircleElement}) {...} // What happens when double-click on a handle is performed. Optional.
</script>

<!-- Render implementation -->
```

4. Extend the `SHAPES` constant in the `store.svelte.ts` with a new creation logic:
```ts
import Triangle from "./shapes/Triangle.svelte";

export const SHAPES: {[K in ShapeType]: ShapeConfig} = {
  // ...
  triangle: {
    component: Triangle,
    constructor(config: WizardConfig): object {
      // Let's suppose the next six variables are defined. The return type can be any
      return [
        [x1, y1],
        [x2, y2],
        [x3, y3],
      ];
    }
  },
  // ...
};
```
5. Add a new translation for buttons (see `wizard.single_point.button.new.polygon` translation entry)

License
=======

This project is licensed under [GNU General Public License 2.0 (or later)](LICENSE.md).

Contribute
==========

This extension was made by Maik Schneider: Feel free to contribute!

Please have a look at [`CONTRIBUTING.md`](CONTRIBUTING.md).

Thanks to [blueways](https://www.blueways.de/) and [XIMA](https://www.xima.de/)!
