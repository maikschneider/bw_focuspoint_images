Overview
====================

With this TYPO3 extension you can create responsive image maps in the
backend. This extension ships an image editor that can be used to add areas and information to an image.

.. figure:: ./Images/example_backend.png
   :alt: Editor in the backend
   :class: with-shadow

Examples
--------

.. _example1:

Example 1: Default output
~~~~~~~~~~~~~~~~~~~~~~~~~

Frontend output with included :ref:`example TypoScript setup <typoscript_fields>`

.. figure:: ./Images/example_frontend.jpg
   :alt: Frontend output example 1
   :class: with-shadow


Example 2: SVG Animation
~~~~~~~~~~~~~~~~~~~~~~~~

In this example the focus areas are animated via SVG. The additional information are displayed next to the image with some delay.

.. figure:: ./Images/example_animation.gif
   :alt: Frontend output example 2
   :class: with-shadow

For administrators
==================

Installation
------------

.. rst-class:: bignums

1. Install via composer

   .. code:: bash

      composer require blueways/bw-focuspoint-images

2. Include TypoScript

   Enable the extension in the Extension Manager and include the **static TypoScript template** or manually include setup and constants.

3. Define your own wizard fields

   There are **no default fields** defined! An example with working frontend output can be found here: :ref:`typoscript_fields`

Usage
-----

Add the new content element “SVG Focuspoints” to any page, link a new
image and start adding your focus areas.


Configuration
-------------

.. _typoscript_fields:

Setup
~~~~~

To configure the fields in the focus point wizard, use the following
TypoScript settings. You can choose between **text**, **textarea** and
**select** inputs in the wizard.

This example setup is used to generate the output shown in :ref:`Example 1 <example1>`.

.. code:: typoscript

   plugin.tx_bwfocuspointimages.settings.fields {

       name {
           title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.name
           type = text
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
       }

       link {
          title = LLL:EXT:bw_focuspoint_images/Resources/Private/Language/locallang_db.xlf:wizard.fields.link
          type = link
       }

   }

Constants
~~~~~~~~~

To override templates set your own paths via constants:

.. code:: typoscript

   plugin.tx_bwfocuspointimages {
       view {
           templateRootPath =
           partialRootPath =
           layoutRootPath =
       }
   }

.. tip::

   To use the default rendering of **fluid_styled_content**, set Layout and Partial path to your styles.content setting and use the **Default** layout in your **FocuspointImage** template file.


For developers
==============

The table :file:`sys_file_references` becomes extended for the field :file:`focus_points`. This field is used to save the settings made in the backend editor in json format.

To use the editor in other content elements with FAL images, use the following TCA to activate the palette:

.. code-block:: php

   $GLOBALS['TCA']['tt_content']['types']['your_list_type']['columnsOverrides'] = [
      'assets' => [
        'config' => [
            'foreign_types' => [
                \TYPO3\CMS\Core\Resource\File::FILETYPE_IMAGE => [
                    'showitem' => 'focus_points'
                ]
            ]
         ]
      ]
   ];

To decode the json format and use relative points in your fluid template, use the :file:`FocuspointProcessor`:

.. code-block:: typoscript

   tt_content.your_custom_element {
      dataProcessing {
         10 = Blueways\BwFocuspointImages\DataProcessing\FocuspointProcessor
         10 {
            references.fieldName = assets
            as = image
         }
      }
   }

.. note::
   These snippets assume that references are done via :file:`assets` column. Change this to your needs.

Todos
=====

Possible improvements:

* More frontend examples (e.g. svg animation, use of canvas element,..)
* Better configuration of the custom tt_content element (e.g. template selection, further display configuration)
* Configuration for link browser


Contribute
==========

Feel free to contribute!

* `Bitbucket-Repository <https://bitbucket.org/blueways/bw_focuspoint_images/>`__

.. versionadded:: 2.2.0
   New link browser for the Focuspoint Wizard

.. versionadded:: 2.3.0
   Support for TYPO3 v10

