# Bw Focuspoint Images

With this TYPO3 extension, you can create responsive image maps in the backend.

![Example Image](Documentation/preview.png)

## Installation

```bash
composer require blueways/bw-focuspoint-images
```

## Usage

Add the new content element "SVG Focuspoints" to any page, link a new image and start adding your focus areas.

## Configuration

Include the **Bw Focuspoint Images** static TypoScript template or manually include setup and constants.

```typo3_typoscript
<INCLUDE_TYPOSCRIPT: source="FILE:EXT:bw_focuspoint_images/Configuration/TypoScript/constants.txt">
```
```typo3_typoscript
<INCLUDE_TYPOSCRIPT: source="FILE:EXT:bw_focuspoint_images/Configuration/TypoScript/setup.txt">
```

### Constants

To override templates, set your own paths via constants:

```typo3_typoscript
plugin.tx_bwfocuspointimages {
	view {
		templateRootPath =
		partialRootPath =
		layoutRootPath =
	}
}
```

To use the default rendering of **fluid_styled_content**, set Layout and Partial path to your styles.content settings and use the Default-Layout in your FocuspointImage template.

### Setup

To configure the fields in the focus point wizard, use the following TypoScript settings. You can choose between **text**, **textarea** and **select** inputs in the wizard.

```typo3_typoscript
plugin.tx_bwfocuspointimages.settings.fields {

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
```
