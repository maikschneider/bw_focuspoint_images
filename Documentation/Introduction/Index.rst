Introduction
============

The extension is built for projects that need more than a single focal point or
crop variant. Editors can mark multiple rectangular areas inside an image and
attach structured content such as titles, descriptions, links, colors, or rich
text. Integrators decide which fields exist and how the frontend should render
them.

Typical use cases
-----------------

- interactive hotspot images
- annotated screenshots and tutorials
- product detail images with linked areas
- editorial image maps with additional text or calls to action

How it works
------------

The extension uses a simple and transparent data flow:

1. You define the wizard fields in PageTS.
2. TYPO3 renders the custom form element on `sys_file_reference.focus_points`.
3. Editors place and maintain focus areas in the backend wizard.
4. The focus areas are stored as JSON in the file reference.
5. `FocuspointProcessor` decodes the JSON and converts coordinates to
   percentages for Fluid and SVG output.

What ships with the extension
-----------------------------

- the content element **Image with Focuspoints**
- a backend preview with visible focus rectangles
- a default Fluid template and CSS/JavaScript assets
- a reusable processor for custom frontend integrations
- an optional example site set with a complete PageTS field definition

Important concept
-----------------

The extension ships with **no default wizard fields** on purpose. This keeps
the editor flexible and avoids opinionated data structures. Your project can
define exactly the fields it needs in PageTS, from a single text field to a
more elaborate form with conditions, links, and rich text.
