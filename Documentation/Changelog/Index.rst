Upgrade Notes
=============

Current extension version
-------------------------

This manual targets version `6.0.0` of `bw_focuspoint_images`.

Upgrade to 4.x
--------------

TypoScript file names changed:

- Old: `EXT:bw_focuspoint_images/Configuration/setup.txt`
- New: `EXT:bw_focuspoint_images/Configuration/setup.typoscript`

Upgrade to 3.x
--------------

Starting with version `3.0.0`, the wizard field configuration moved from
TypoScript to PageTS so projects can use different configurations in different
branches of the page tree.

- Old prefix: `plugin.tx_bwfocuspointimages.settings.fields`
- New prefix: `mod.tx_bwfocuspointimages.settings.fields`

Action required:

1. Move your existing field configuration from TypoScript to PageTS.
2. Change the prefix from `plugin` to `mod`.

General recommendation
----------------------

For current TYPO3 projects, prefer site sets over legacy static-template setup.
This keeps frontend TypoScript and PageTS integration predictable and closer to
modern TYPO3 project structure.
