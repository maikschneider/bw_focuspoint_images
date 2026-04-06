Quick Start
===========

This section creates a working setup with the bundled content element.

Install the extension and activate the site set
-----------------------------------------------

Follow the steps in :doc:`../Installation/Index`.

Define the wizard fields
------------------------

The fastest option is to use the example set. If you prefer your own setup,
start with this PageTS:

..  code-block:: typoscript

    mod.tx_bwfocuspointimages.settings {
      fields {
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
    }

Create the content element
--------------------------

1. Open the page module.
2. Create a new content element.
3. Choose **Image with Focuspoints**.
4. Add an image in the `assets` field.

Add focus areas
---------------

Open the focuspoint wizard on the image reference and:

1. draw one or more rectangles
2. resize or move them as needed
3. fill in the configured metadata fields
4. save the file reference

..  figure:: ../Images/backend-collage.jpg
    :alt: Backend editing workflow for focus points
    :class: with-shadow

Render the result in the frontend
---------------------------------

The bundled content element already includes frontend rendering. If you use the
example field configuration, the output looks similar to the following:

..  figure:: ../Images/example_frontend.png
    :alt: Example frontend rendering
    :class: with-shadow

Next steps
----------

- Continue with :doc:`../Configuration/Index` to tailor the wizard fields.
- Continue with :doc:`../Developer/Index` if you want to integrate the widget
  into custom content elements.
