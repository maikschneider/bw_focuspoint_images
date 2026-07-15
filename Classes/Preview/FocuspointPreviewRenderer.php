<?php

namespace Blueways\BwFocuspointImages\Preview;

use Symfony\Component\DependencyInjection\Attribute\Autoconfigure;
use TYPO3\CMS\Backend\Preview\StandardContentPreviewRenderer;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem;
use TYPO3\CMS\Core\Domain\RecordInterface;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Resource\Collection\LazyFileReferenceCollection;
use TYPO3\CMS\Core\Resource\FileReference;
use TYPO3\CMS\Core\Resource\ProcessedFile;
use TYPO3\CMS\Core\Utility\GeneralUtility;

#[Autoconfigure(public: true)]
class FocuspointPreviewRenderer extends StandardContentPreviewRenderer
{
    public function __construct(private readonly PageRenderer $pageRenderer)
    {
    }

    public function renderPageModulePreviewContent(GridColumnItem $item): string
    {
        $record = $item->getRecord();

        // TYPO3 v13: getRecord() returns array; v14+: returns RecordInterface
        // @phpstan-ignore-next-line
        if (is_array($record)) {
            return $this->renderFromRow($record);
        }

        /** @var RecordInterface $record */
        return $this->renderFromRecord($record);
    }

    /**
     * TYPO3 v13 rendering path.
     *
     * @param array<string, mixed> $row
     */
    private function renderFromRow(array $row): string
    {
        $content = '';

        if (!$row['assets']) {
            return '';
        }

        $fileReferences = BackendUtility::resolveFileReferences('tt_content', 'assets', $row);
        if ($fileReferences === null || $fileReferences === []) {
            return '';
        }

        $firstReference = $fileReferences[array_key_first($fileReferences)];
        $focuspoints = $firstReference->getReferenceProperty('focus_points');
        if ($focuspoints === null || $focuspoints === '') {
            // @phpstan-ignore argument.type
            return $this->linkEditContent($content, $row);
        }

        $content = $this->buildPreviewHtml($fileReferences);

        // @phpstan-ignore argument.type
        return $this->linkEditContent($content, $row);
    }

    /**
     * TYPO3 v14+ rendering path.
     */
    private function renderFromRecord(RecordInterface $record): string
    {
        $content = '';

        if (!$record->has('assets')) {
            return '';
        }

        /** @var LazyFileReferenceCollection|null $fileReferences */
        $fileReferences = $record->get('assets');
        if ($fileReferences === null || $fileReferences->count() === 0) {
            return '';
        }

        $firstReference = $fileReferences->offsetGet(0);
        $focuspoints = $firstReference->getReferenceProperty('focus_points');
        if ($focuspoints === null || $focuspoints === '') {
            return $this->linkEditContent($content, $record);
        }

        $content = $this->buildPreviewHtml($fileReferences);

        return $this->linkEditContent($content, $record);
    }

    /**
     * Builds the preview thumbnail HTML for a set of file references.
     * Shared between v13 and v14 rendering paths.
     *
     * @param iterable<FileReference> $fileReferences
     */
    private function buildPreviewHtml(iterable $fileReferences): string
    {
        $content = '<div class="preview-thumbnails" style="--preview-thumbnails-size: 200px">';

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

        $this->pageRenderer->addCssFile('EXT:bw_focuspoint_images/Resources/Public/Css/BackendPreview.css');

        return $content;
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
            $svg .= $this->renderMaskShape($point);
        }

        $svg .= '</mask>';
        $svg .= '<rect x="0" y="0" width="200" height="200" fill="#000" mask="url(#mask' . $fileReference->getUid() . ')" />';

        foreach ($points as $point) {
            $svg .= $this->renderOutlineShape($point);
        }

        $svg .= '</svg>';
        return $svg;
    }

    private function renderMaskShape(object $point): string
    {
        $shape = $point->shape ?? 'rectangle';

        return match ($shape) {
            'circle', 'ellipse' => $this->renderEllipse($point, 'fill="#000"'),
            'line' => $this->renderLine($point, 'stroke="#000" stroke-width="4" stroke-linecap="round"'),
            'crosshair' => $this->renderCrosshair($point, 'stroke="#000" stroke-width="4" stroke-linecap="round"'),
            default => $this->renderRectangle($point, 'fill="#000"'),
        };
    }

    private function renderOutlineShape(object $point): string
    {
        $shape = $point->shape ?? 'rectangle';

        return match ($shape) {
            'circle', 'ellipse' => $this->renderEllipse($point, 'stroke="#ff8700" stroke-width="1.5px" fill="none"'),
            'line' => $this->renderLine($point, 'stroke="#ff8700" stroke-width="2" stroke-linecap="round" fill="none"'),
            'crosshair' => $this->renderCrosshair($point, 'stroke="#ff8700" stroke-width="2" stroke-linecap="round" fill="none"'),
            default => $this->renderRectangle($point, 'stroke="#ff8700" stroke-width="1.5px" fill="none"'),
        };
    }

    private function renderRectangle(object $point, string $attributes): string
    {
        $x = ($point->x ?? 0) * 100;
        $y = ($point->y ?? 0) * 100;
        $width = ($point->width ?? 0) * 100;
        $height = ($point->height ?? 0) * 100;

        return '<rect x="' . $x . '%"
        y="' . $y . '%"
        width="' . $width . '%"
        height="' . $height . '%"
        ' . $attributes . '/>';
    }

    private function renderEllipse(object $point, string $attributes): string
    {
        $x = ($point->x ?? 0) * 100;
        $y = ($point->y ?? 0) * 100;
        $width = ($point->width ?? 0) * 100;
        $height = ($point->height ?? 0) * 100;

        $cx = $x + ($width / 2);
        $cy = $y + ($height / 2);
        $rx = $width / 2;
        $ry = $height / 2;

        return '<ellipse cx="' . $cx . '%"
        cy="' . $cy . '%"
        rx="' . $rx . '%"
        ry="' . $ry . '%"
        ' . $attributes . '/>';
    }

    private function renderLine(object $point, string $attributes): string
    {
        $x1 = ($point->x ?? 0) * 100;
        $y1 = ($point->y ?? 0) * 100;

        $x2 = isset($point->x2)
            ? $point->x2 * 100
            : $x1 + (($point->width ?? 0.2) * 100);

        $y2 = isset($point->y2)
            ? $point->y2 * 100
            : $y1 + (($point->height ?? 0.2) * 100);

        return '<line x1="' . $x1 . '%"
        y1="' . $y1 . '%"
        x2="' . $x2 . '%"
        y2="' . $y2 . '%"
        ' . $attributes . '/>';
    }

    private function renderCrosshair(object $point, string $attributes): string
    {
        $x = ($point->x ?? 0) * 100;
        $y = ($point->y ?? 0) * 100;

        $size = 5;

        return '<line x1="' . ($x - $size) . '%"
            y1="' . $y . '%"
            x2="' . ($x + $size) . '%"
            y2="' . $y . '%"
            ' . $attributes . '/>
        <line x1="' . $x . '%"
            y1="' . ($y - $size) . '%"
            x2="' . $x . '%"
            y2="' . ($y + $size) . '%"
            ' . $attributes . '/>';
    }
}
