# Bw Focuspoint Images

Create image map like elements using SVG.

![Example Image](Documentation/preview.png)

## Configure TypoScript

### Constants

To override temnplates, set your own paths via constants:

```typo3_typoscript
plugin.tx_bwfocuspointimages {
	view {
		templateRootPath =
		partialRootPath =
		layoutRootPath =
	}
}
```

### Setup

To configure the fields in the focus point wizard, use TypoScript settings:

```typo3_typoscript
plugin.tx_bwfocuspointimages.settings {
    resizable = 1
    defaultWidth = 0.2
    defaultHeight = 0.2
    fields {

        name {
            title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.name.title
            type = text
        }

        description {
            title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.description.title
            type = textarea
        }

        color {
            title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.title
            type = select
            options {
                green = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.options.green.title
                blue = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.options.blue.title
                0 = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.options.0.title
                1 = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.single_point.field.color.options.1.title
            }
        }
    }
}
```
