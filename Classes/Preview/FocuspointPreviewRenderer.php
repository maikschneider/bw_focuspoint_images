<?php

namespace Blueways\BwFocuspointImages\Preview;

use TYPO3\CMS\Backend\Preview\StandardContentPreviewRenderer;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem;

/**
 * Contains a preview rendering for the page module of CType="textmedia"
 *
 * @internal this is a concrete TYPO3 hook implementation and solely used for EXT:frontend and not part of TYPO3's Core API.
 */
class FocuspointPreviewRenderer extends StandardContentPreviewRenderer
{

    public function renderPageModulePreviewContent(GridColumnItem $item): string
    {
        $content = '';
        $row = $item->getRecord();

        if (!$row['assets']) {
            return $content;
        }

        $content .= BackendUtility::thumbCode($row, 'tt_content', 'assets', '', '', null, 0,
            '', '200px', false);

        $content .= '<style>.focuspoint .preview-thumbnails-element-image {height:auto;}</style>';

        $fileReferences = BackendUtility::resolveFileReferences('tt_content', 'assets', $row);

        if (empty($fileReferences)) {
            return $this->linkEditContent($content, $row);
        }

        $fileReference = $fileReferences[array_key_first($fileReferences)];

        $focuspoints = $fileReference->getReferenceProperty('focus_points');
        if ($focuspoints === null || $focuspoints === '') {
            return $this->linkEditContent($content, $row);
        }

        $svg = '<svg viewBox="0 0 200 200" preserveAspectRatio="none" style="height:100%; width:100%; top:0; left:0; position:absolute;" width="200" class="focuspoint__svg" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask'. array_key_first($fileReferences).'"><rect x="0" y="0" width="200" height="200" fill="#FFF" fill-opacity="0.5" />';
        $points = json_decode($focuspoints, false);

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
        $svg .= '<rect x="0" y="0" width="200" height="200" fill="#000" mask="url(#mask'. array_key_first($fileReferences) .')" />';

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
        $content .= $svg;
        $content = '<div class="focuspoint" style="display:inline-block; position:relative;">' . $content . '</div>';

        return $this->linkEditContent($content, $row);
    }
}
