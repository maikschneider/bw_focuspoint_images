Overview
====================

With this TYPO3 extension you can create responsive image maps in the
backend. This extension ships an image editor that can be used to add areas and information to an image.

.. figure:: ./preview.png
   :alt: Example Image
   :class: with-shadow

Installation
============

.. rst-class:: bignums-xxl

1. Install via composer

   .. code:: bash

      composer require blueways/bw-focuspoint-images

2. Include TypoScript

   See :ref:`typoscript`

3. Define your wizard fields

   There are no default fields defined. An example can be found here :ref:`typoscript_fields`

Usage
=====

Add the new content element “SVG Focuspoints” to any page, link a new
image and start adding your focus areas.

.. _typoscript:

Configuration
=============

Include the Bw Focuspoint Images **static TypoScript** template or
manually include setup and constants.

.. code:: typoscript

   <INCLUDE_TYPOSCRIPT: source="FILE:EXT:bw_focuspoint_images/Configuration/TypoScript/constants.txt">

.. code:: typoscript

   <INCLUDE_TYPOSCRIPT: source="FILE:EXT:bw_focuspoint_images/Configuration/TypoScript/setup.txt">

Constants
---------

To override templates, set your own paths via constants:

.. code:: typoscript

   plugin.tx_bwfocuspointimages {
       view {
           templateRootPath =
           partialRootPath =
           layoutRootPath =
       }
   }

.. tip::

   To use the default rendering of **fluid_styled_content**, set Layout and
Partial path to your styles.content settings and use the Default-Layout
in your FocuspointImage template.


.. _typoscript_fields:

Setup
-----

To configure the fields in the focus point wizard, use the following
TypoScript settings. You can choose between **text**, **textarea** and
**select** inputs in the wizard.

.. code:: typoscript

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

Todos
=====

Possible improvements:

* More frontend examples (e.g. svg animation, use of canvas element,..)
* New field types for the wizard (e.g. PageTree)
* DataProcessor for injecting data into the wizard
* Better configuration of the custom tt_content element (e.g. template selection, further display configuration)
* ...

Contribute
==========

Feel free to contribute!

* `Bitbucket-Repository <https://bitbucket.org/blueways/bw_focuspoint_images/>`__
