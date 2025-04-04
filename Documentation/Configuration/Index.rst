..  _configuration:

Configuration
===========

TypoScript Setup
-----------

Include the Static TypoScript template or manually import it in your TypoScript template:

.. code-block:: typoscript

   @import "EXT:bw_focuspoint_images/Configuration/TypoScript/setup.typoscript"

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


Define Wizard Fields
-----------------

..  note::

   There are **no default fields** defined! You must configure your own fields using **PageTS**



PageTS Configuration
--------------------

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

You can customize the display of the link wizard using the additional ``linkPopup`` property, similar to the `TCA configuration <https://docs.typo3.org/m/typo3/reference-tca/11.5/en-us/ColumnsConfig/Type/Input/Properties/LinkPopup.html#tca_field_control_link_popup>`__:

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
               allowedExtensions = pdf, docx
               blindLinkOptions = email, folder, page, spec, telephone, url
               blindLinkFields = class, params, target, title
           }
       }
   }