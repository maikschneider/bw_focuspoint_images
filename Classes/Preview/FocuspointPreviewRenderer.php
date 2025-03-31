<?php

namespace Blueways\BwFocuspointImages\Preview;

use TYPO3\CMS\Backend\Preview\StandardContentPreviewRenderer;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Resource\FileReference;
use TYPO3\CMS\Core\Resource\ProcessedFile;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class FocuspointPreviewRenderer extends StandardContentPreviewRenderer
{
    public function renderPageModulePreviewContent(GridColumnItem $item): string
    {
        $content = '';
        $row = $item->getRecord();

        if (!$row['assets']) {
            return $content;
        }

        $fileReferences = BackendUtility::resolveFileReferences('tt_content', 'assets', $row);
        if ($fileReferences === null || $fileReferences === []) {
            return '';
        }

        $fileReference = $fileReferences[array_key_first($fileReferences)];

        $focuspoints = $fileReference->getReferenceProperty('focus_points');
        if ($focuspoints === null || $focuspoints === '') {
            return $this->linkEditContent($content, $row);
        }

        $content .= '<div class="preview-thumbnails" style="--preview-thumbnails-size: 200px">';

        foreach ($fileReferences as $reference) {
            $image = $reference->getOriginalFile()->process(
                ProcessedFile::CONTEXT_IMAGECROPSCALEMASK,
                [
                    'maxWidth' => 200,
                    'maxHeight' => 200,
                ]
            );

            $attributes = [
                'src' => $image->getPublicUrl() ?? '',
                'width' => $image->getProperty('width'),
                'height' => $image->getProperty('height'),
                'alt' => $reference->getAlternative() ?: $reference->getName(),
                'loading' => 'lazy',
            ];

            $content .= '<div class="preview-thumbnails-element">';
            $content .= '<div class="preview-thumbnails-element-image">';
            $content .= '<div class="bw-focuspoint-image">';
            $content .= '<img ' . GeneralUtility::implodeAttributes($attributes, true) . '/>';
            $content .= $this->getSvgForFileReference($reference);
            $content .= '</div>';
            $content .= '</div>';
            $content .= '</div>';
        }

        $content .= '</div>';

        /** @var PageRenderer $pageRenderer */
        $pageRenderer = GeneralUtility::makeInstance(\TYPO3\CMS\Core\Page\PageRenderer::class);
        $pageRenderer->addCssFile('EXT:bw_focuspoint_images/Resources/Public/Css/BackendPreview.css');

        return $this->linkEditContent($content, $row);
    }

    private function getSvgForFileReference(FileReference $fileReference): string
    {
        $focuspoints = $fileReference->getReferenceProperty('focus_points');
        if ($focuspoints === null || $focuspoints === '') {
            return '';
        }

        $points = json_decode((string)$focuspoints, false) ?: [];
        if (empty($points)) {
            return '';
        }

        $svg = '<svg viewBox="0 0 200 200" preserveAspectRatio="none" class="focuspoint__svg" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask' . $fileReference->getUid() . '"><rect x="0" y="0" width="200" height="200" fill="#FFF" fill-opacity="0.5" />';

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
        $svg .= '<rect x="0" y="0" width="200" height="200" fill="#000" mask="url(#mask' . $fileReference->getUid() . ')" />';

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
        return $svg;
    }
}
