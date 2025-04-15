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

        $focuspoints = json_decode((string)$focuspoints, true) ?: [];
        if (empty($focuspoints)) {
            return '';
        }

		$width = $fileReference->getProperty('width');
		$height = $fileReference->getProperty('height');
		$uid = $fileReference->getUid();
		$viewBox = "0 0 {$width} {$height}";
		$polygons = join(
			'',
			array_map(
				fn (array $point): string => '<polygon points="' . join(
					' ',
					array_map(
					   fn (array $xy): string => join(',', $xy),
					   $point['points'],
				   ),
				) . '" fill="black" />',
				$focuspoints
			)
		);

		return <<<HTML
		<svg viewBox="{$viewBox}">
			<mask id="mask-{$uid}">
				<rect x="0" y="0" width="{$width}" height="{$height}" fill="white" />
				{$polygons}
			</mask>
			<rect x="0" y="0" width="{$width}" height="{$height}" fill="rgba(0, 0, 0, .7)" mask="url(#mask-{$uid})" />
		</svg>
		HTML;
    }
}
