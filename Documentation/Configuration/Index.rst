Configuration
=============

..  _pagets_fields:

PageTS basics
-------------

All wizard fields are configured in PageTS below:

..  code-block:: typoscript

    mod.tx_bwfocuspointimages.settings

The extension does not define editor fields by default. This gives each project
full control over the metadata stored with every focus area.

Global wizard options
---------------------

..  list-table::
    :header-rows: 1

    * - Option
      - Description
    * - `resizable`
      - Enables resizing of focus rectangles in the wizard.
    * - `defaultWidth`
      - Default width for newly created rectangles as a normalized float.
    * - `defaultHeight`
      - Default height for newly created rectangles as a normalized float.
    * - `fields`
      - Container for the field definitions shown in the sidebar form.

Example:

..  code-block:: typoscript

    mod.tx_bwfocuspointimages.settings {
      resizable = 1
      defaultWidth = 0.2
      defaultHeight = 0.2

      fields {
      }
    }

Field definition
----------------

Each field is configured below `mod.tx_bwfocuspointimages.settings.fields`.

..  code-block:: typoscript

    mod.tx_bwfocuspointimages.settings.fields {
      name {
        title = Name
        type = text
      }
    }

Supported field types
---------------------

..  list-table::
    :header-rows: 1

    * - Type
      - Purpose
    * - `text`
      - Single-line text input
    * - `textarea`
      - Multi-line plain text
    * - `rte`
      - Rich text editor based on TYPO3 CKEditor
    * - `select`
      - Single-select field with configured options
    * - `link`
      - TYPO3 link browser field
    * - `checkbox`
      - Boolean field with configurable label

Common field properties
-----------------------

..  list-table::
    :header-rows: 1

    * - Property
      - Description
    * - `title`
      - Required label shown in the wizard
    * - `type`
      - Required field type
    * - `default`
      - Optional default value for new focus areas
    * - `useAsName`
      - Uses the field value as part of the backend item label
    * - `displayCond`
      - Conditional display based on another field value
    * - `types.<typeName>.*`
      - Override field properties for a specific parent record type

Type-specific properties
------------------------

..  list-table::
    :header-rows: 1

    * - Property
      - Used by
      - Description
    * - `options`
      - `select`
      - Select items as `value = label`
    * - `label`
      - `checkbox`
      - Label displayed next to the checkbox
    * - `linkPopup`
      - `link`
      - Customize TYPO3 link browser behavior
    * - `richtextConfiguration`
      - `rte`
      - Use a custom TYPO3 RTE preset for the field

Complete example
----------------

The following setup mirrors the bundled example set in
`Configuration/Sets/BwFocuspointImagesExample/page.tsconfig`:

..  code-block:: typoscript

    mod.tx_bwfocuspointimages.settings.fields {
      name {
        title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.name
        type = text
        useAsName = 1
      }

      description {
        title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.description
        type = textarea
      }

      color {
        title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.color
        type = select
        options {
          red = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.color.red
          green = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.color.green
          blue = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.color.blue
        }
        default = red
      }

      link {
        title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.link
        type = link
        displayCond = FIELD:color:=:red
      }

      notes {
        title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.notes
        type = rte
      }
    }

Display conditions
------------------

`displayCond` follows a lightweight syntax inspired by TYPO3 TCA display
conditions:

..  code-block:: text

    FIELD:<fieldName>:<operator>:<value>

Supported operators:

..  list-table::
    :header-rows: 1

    * - Operator
      - Meaning
    * - `REQ`
      - Field must contain a value
    * - `=`
      - Equals
    * - `!=`
      - Does not equal
    * - `>`
      - Greater than
    * - `<`
      - Less than
    * - `>=`
      - Greater than or equal
    * - `<=`
      - Less than or equal
    * - `IN`
      - Value is in a comma-separated list
    * - `!IN`
      - Value is not in a comma-separated list
    * - `-`
      - Value is inside a numeric range
    * - `!-`
      - Value is outside a numeric range

Examples:

..  code-block:: typoscript

    mod.tx_bwfocuspointimages.settings.fields {
      description {
        title = Description
        type = textarea
        displayCond = FIELD:name:REQ:true
      }

      link {
        title = Link
        type = link
        displayCond = FIELD:color:IN:red,green
      }

      priceHint {
        title = Price hint
        type = text
        displayCond = FIELD:priority:-:1-3
      }
    }

Per-type overrides
------------------

Field definitions can be adjusted per parent record type with:

..  code-block:: typoscript

    mod.tx_bwfocuspointimages.settings.fields.<fieldName>.types.<typeName>.<property>

For `tt_content`, `<typeName>` is the parent `CType`. For custom records, it
falls back to the parent table name.

Examples:

..  code-block:: typoscript

    mod.tx_bwfocuspointimages.settings.fields {
      description {
        title = Description
        type = textarea
        types.my_custom_ctype.disabled = 1
      }

      title {
        title = Default title
        type = text
        types.tx_myext_domain_model_teaser.title = Custom teaser title
        types.tx_myext_domain_model_teaser.default = Read more
      }
    }

Link field customization
------------------------

Use `linkPopup` to limit link browser options or hide fields:

..  code-block:: typoscript

    mod.tx_bwfocuspointimages.settings.fields {
      email {
        title = Email only
        type = link
        linkPopup {
          blindLinkOptions = file,folder,page,spec,telephone,url
        }
      }

      pdf {
        title = PDF download
        type = link
        linkPopup {
          allowedExtensions = pdf,docx
          blindLinkOptions = email,folder,page,spec,telephone,url
          blindLinkFields = class,params,target,title
        }
      }
    }

Rich text configuration
-----------------------

`rte` fields use TYPO3 CKEditor. To use a custom preset, reference it directly
in the field configuration:

..  code-block:: typoscript

    mod.tx_bwfocuspointimages.settings.fields {
      notes {
        title = Notes
        type = rte
        richtextConfiguration = my-custom-preset
      }
    }

You can also override the global preset selection for
`sys_file_reference.focus_points` in TYPO3 PageTS if your project needs a
different default.

Template overrides
------------------

Override the shipped Fluid paths with TypoScript constants:

..  code-block:: typoscript

    plugin.tx_bwfocuspointimages {
      view {
        templateRootPath =
        partialRootPath =
        layoutRootPath =
      }
    }

..  tip::

    If you want to stay close to `fluid_styled_content`, point the layout and
    partial paths to your existing site package configuration and override only
    the template you actually need.
