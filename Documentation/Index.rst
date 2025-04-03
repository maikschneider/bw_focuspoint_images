===============================
TYPO3 Extension: Focus Point Images
===============================

:Extension key:
   bw_focuspoint_images

:Package name:
   blueways/bw-focuspoint-images

:Version:
   |release|

:Language:
   en

:Author:
   Maik Schneider, blueways

:License:
   This document is published under the
   `GNU General Public License v2.0 or later <https://www.gnu.org/licenses/gpl-2.0.html>`__.

:Rendered:
   |today|

----

Create responsive image maps with focus points in the TYPO3 backend. This extension provides an image editor
that allows you to add areas and information to images.

----

**Table of Contents:**

.. contents::
   :backlinks: top
   :depth: 2

Introduction
===========

What does it do?
---------------

The extension "Focus Point Images" allows you to create responsive image maps directly in the TYPO3 backend.
It provides a custom image editor to add interactive areas with additional information to images. These focus points
can be animated and displayed in various ways in the frontend.

Screenshots
----------

Backend Editor
^^^^^^^^^^^^^

.. figure:: Images/example_backend.png
   :alt: Backend Editor
   :class: with-shadow

   The backend editor for adding focus points to images

Frontend Examples
^^^^^^^^^^^^^^^^

Example 1: Default Output
""""""""""""""""""""""""

.. figure:: Images/example_frontend.jpg
   :alt: Default Frontend Output
   :class: with-shadow

   Frontend output with default configuration

Example 2: SVG Animation
"""""""""""""""""""""""

.. figure:: Images/example_animation.gif
   :alt: SVG Animation Example
   :class: with-shadow

   Focus areas animated via SVG with delayed information display

Installation
===========

Requirements
-----------

* TYPO3 v9 LTS or higher
* Composer installation recommended

Installation Steps
----------------

1. **Install via Composer**

   .. code-block:: bash

      composer require blueways/bw-focuspoint-images

2. **Include TypoScript**

   Enable the extension in the Extension Manager and include the static TypoScript template or manually include setup and constants.

3. **Define Wizard Fields**

   Important: There are **no default fields** defined! You must configure your own fields using PageTS (see Configuration section).

Configuration
===========

PageTS Configuration
------------------

To configure the fields in the focus point wizard, use the following PageTS settings. You can choose between **text**, **textarea**, **select**, and **link** input types.

Example configuration:

.. code-block:: typoscript

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
   }

Field Display Conditions
^^^^^^^^^^^^^^^^^^^^^^^

You can use ``displayCond`` in your wizard field configuration to control when a field should be visible, similar to `TYPO3's TCA displayCond feature <https://docs.typo3.org/m/typo3/reference-tca/main/en-us/Columns/DisplayConditions.html>`__.

.. code-block:: typoscript

   mod.tx_bwfocuspointimages.settings.fields {
       description {
           title = Description
           type = textarea
           displayCond = FIELD:name:REQ:true  # Show only if name field has a value
       }
   }

Customizing the Link Wizard
^^^^^^^^^^^^^^^^^^^^^^^^^

You can customize the display of the link wizard using the additional ``linkPopup`` property:

.. code-block:: typoscript

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

TypoScript Constants
------------------

To override templates, set your own paths via constants:

.. code-block:: typoscript

   plugin.tx_bwfocuspointimages {
       view {
           templateRootPath =
           partialRootPath =
           layoutRootPath =
       }
   }

Usage
=====

Adding Focus Points to Images
---------------------------

1. Add the new content element "Image with Focuspoints" to any page
2. Select an image
3. Use the editor to add focus areas to your image

.. figure:: Images/backend-collage.jpg
   :alt: Backend view
   :class: with-shadow

   Backend view of the focus point editor

For Developers
=============

Database Structure
----------------

The table ``sys_file_references`` is extended with the field ``focus_points``. This field stores the settings made in the backend editor in JSON format.

Integrating with Custom Content Elements
--------------------------------------

To use the editor in other content elements with FAL images, use the following TCA to activate the palette:

.. code-block:: php

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

This snippet assumes that references are done via the ``assets`` column. Adjust this to your specific needs.

Using Focus Point Data in Templates
--------------------------------

To decode the JSON data and use the information in your template, use the ``FocuspointProcessor``:

.. code-block:: typoscript

   tt_content.your_list_type {
       dataProcessing {
           15 = Blueways\BwFocuspointImages\DataProcessing\FocuspointProcessor
           15 {
               references.fieldName = assets
               as = image
           }
       }
   }

Contributing
===========

This extension was created by Maik Schneider. Contributions are welcome!

Thanks to `blueways <https://www.blueways.de/>`__ and `XIMA <https://www.xima.de/>`__ for supporting this project.

Issues and Pull Requests can be submitted at the extension's repository.