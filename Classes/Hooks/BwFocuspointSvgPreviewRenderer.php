<?php

namespace Blueways\BwFocuspointImages\Hooks;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Backend\View\PageLayoutView;
use TYPO3\CMS\Backend\View\PageLayoutViewDrawItemHookInterface;

/**
 * Contains a preview rendering for the page module of CType="textmedia"
 */
class BwFocuspointSvgPreviewRenderer implements PageLayoutViewDrawItemHookInterface
{
    /**
     * Preprocesses the preview rendering of a content element of type "textmedia"
     *
     * @param \TYPO3\CMS\Backend\View\PageLayoutView $parentObject Calling parent object
     * @param bool $drawItem Whether to draw the item using the default functionality
     * @param string $headerContent Header content
     * @param string $itemContent Item content
     * @param array $row Record row of tt_content
     */
    public function preProcess(
        PageLayoutView &$parentObject,
        &$drawItem,
        &$headerContent,
        &$itemContent,
        array &$row
    ): void {
        if ($row['CType'] === 'bw_focuspoint_images_svg') {
            if ($row['assets']) {
                $itemContent .= BackendUtility::thumbCode(
                    $row,
                    'tt_content',
                    'assets',
                    '',
                    '',
                    null,
                    0,
                    '',
                    '200px',
                    false
                );

                $fileReferences = BackendUtility::resolveFileReferences('tt_content', 'assets', $row);

                if ($fileReferences === null || $fileReferences === []) {
                    $itemContent = $parentObject->linkEditContent($itemContent, $row);
                    return;
                }

                $fileReference = $fileReferences[array_key_first($fileReferences)];

                $focuspoints = $fileReference->getReferenceProperty('focus_points');
                if ($focuspoints === null || $focuspoints === '') {
                    $itemContent = $parentObject->linkEditContent($itemContent, $row);
                    return;
                }

                $svg = '<svg viewBox="0 0 200 200" preserveAspectRatio="none" style="height:100%; width:100%; top:0; left:0; position:absolute;" width="200" class="focuspoint__svg" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask' . array_key_first($fileReferences) . '"><rect x="0" y="0" width="200" height="200" fill="#FFF" fill-opacity="0.5" />';
                $points = json_decode((string)$focuspoints, false);

                foreach ($points as $point) {
                    $x = $point->x * 100;
                    $y = $point->y * 100;
                    $height = $point->height * 100;
                    $width = $point->width * 100;

                    $svg .= '<rect x="' . $x . '%"
                  y="' . $y . '%"
                  width="' . $width . '%"
                  height="' . $height . '%"
                  fill="#000"/>';
                }

                $svg .= '</mask>';
                $svg .= '<rect x="0" y="0" width="200" height="200" fill="#000" mask="url(#mask' . array_key_first($fileReferences) . ')" />';

                foreach ($points as $point) {
                    $x = $point->x * 100;
                    $y = $point->y * 100;
                    $height = $point->height * 100;
                    $width = $point->width * 100;

                    $svg .= '<rect x="' . $x . '%"
                  y="' . $y . '%"
                  stroke="#ff8700"
                  stroke-width="1.5px"
                  width="' . $width . '%"
                  height="' . $height . '%"
                  fill="none"/>';
                }

                $svg .= '</svg>';
                $itemContent .= $svg;
                $itemContent = '<div class="focuspoint" style="display:inline-block; position:relative;">' . $itemContent . '</div>';

                $itemContent = $parentObject->linkEditContent($itemContent, $row);
            }

            $drawItem = false;
        }
    }
}
