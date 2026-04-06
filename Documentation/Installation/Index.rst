Installation
============

Requirements
------------

- TYPO3 `13.4 LTS` or `14.2+`
- Composer-based installation

Install with Composer
---------------------

..  code-block:: bash

    composer require blueways/bw-focuspoint-images

Recommended setup via site sets
-------------------------------

For TYPO3 projects that use site sets, this is the preferred setup:

1. Add the site set `blueways/bw-focuspoint-images` to your site configuration.
2. Optionally add `blueways/bw-focuspoint-images-example` if you want a ready-
   made field configuration for evaluation or demos.
3. Clear caches.

The base set provides the frontend TypoScript and the PageTS needed to show the
content element in the new content element wizard. The example set adds a
complete field definition on top.

Manual setup
------------

If you do not use site sets, include the extension manually:

1. Include the static TypoScript template **Bw Focuspoint Images**.
2. Import the PageTS that enables the content element in the wizard:

   ..  code-block:: typoscript

       @import 'EXT:bw_focuspoint_images/Configuration/TsConfig/Page/newContentElement.tsconfig'

3. Add your own PageTS field configuration for the wizard.
4. Clear caches.

After installation
------------------

Once the extension is installed and configured, editors can create the content
element **Image with Focuspoints** and open the focuspoint editor on the image
reference.

..  note::

    If no PageTS fields are configured, the widget deliberately shows a warning.
    This is expected behavior and protects editors from opening an empty wizard.
