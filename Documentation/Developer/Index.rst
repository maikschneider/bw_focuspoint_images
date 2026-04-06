Developer
=========

Data storage format
-------------------

The extension adds the field `focus_points` to `sys_file_reference`. The data
is stored as a JSON array. Each item contains the rectangle coordinates as
normalized float values between `0` and `1`.

Example:

..  code-block:: json

    [
      {
        "x": 0.15,
        "y": 0.23,
        "width": 0.18,
        "height": 0.12,
        "name": "Example",
        "description": "Optional metadata"
      }
    ]

When you use `FocuspointProcessor`, the processor converts `x`, `y`, `width`,
and `height` to percentages and also adds `textX` and `textY` for convenient
text placement in SVG output.

Use the editor in your own FAL field
------------------------------------

The focuspoint widget is attached to `sys_file_reference.focus_points`. To make
it available for another file relation, add the field to the child TCA of your
FAL relation:

..  code-block:: php

    $GLOBALS['TCA']['tt_content']['types']['your_list_type']['columnsOverrides'] = [
        'assets' => [
            'config' => [
                'overrideChildTca' => [
                    'types' => [
                        \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
                            'showitem' => 'focus_points,--palette--;;filePalette',
                        ],
                    ],
                    'columns' => [
                        'uid_local' => [
                            'config' => [
                                'appearance' => [
                                    'elementBrowserAllowed' => $GLOBALS['TYPO3_CONF_VARS']['GFX']['imagefile_ext'],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ];

..  note::

    The example above assumes that the relation field is called `assets`.
    Adjust the field name to your own TCA.

Render data in the frontend
---------------------------

Use the processor to fetch the referenced images and expose the decoded focus
areas to Fluid:

..  code-block:: typoscript

    tt_content.your_list_type {
      dataProcessing {
        15 = Blueways\BwFocuspointImages\DataProcessing\FocuspointProcessor
        15 {
          references.fieldName = assets
          as = images
        }
      }
    }

In Fluid, the decoded data is available as `points` and grouped by image index.

Minimal Fluid example
---------------------

..  code-block:: html

    <f:for each="{images}" as="image" key="key">
        <f:image image="{image}" />
        <svg class="focuspoint__svg" xmlns="http://www.w3.org/2000/svg">
            <f:for each="{points.{key}}" as="point">
                <rect
                    x="{point.x}%"
                    y="{point.y}%"
                    width="{point.width}%"
                    height="{point.height}%"
                />
            </f:for>
        </svg>
    </f:for>

Notes for custom integrations
-----------------------------

- Link fields are stored as TYPO3 link values and can be rendered with
  `f:uri.typolink`.
- If a link contains a target, the processor exposes it as an additional
  property such as `linkTarget`.
- The bundled content element is optimized for one image, but the processor
  returns arrays so custom implementations can stay flexible.
