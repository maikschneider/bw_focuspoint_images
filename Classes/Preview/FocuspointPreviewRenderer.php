<?php

namespace Blueways\BwFocuspointImages\Preview;

use Blueways\BwFocuspointImages\Renderer\ShapeRendererFactory;
use Symfony\Component\DependencyInjection\Attribute\Autoconfigure;
use TYPO3\CMS\Backend\Preview\StandardContentPreviewRenderer;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Backend\View\BackendLayout\Grid\GridColumnItem;
use TYPO3\CMS\Core\Domain\RecordInterface;
use TYPO3\CMS\Core\Information\Typo3Version;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Resource\Collection\LazyFileReferenceCollection;
use TYPO3\CMS\Core\Resource\FileReference;
use TYPO3\CMS\Core\Resource\ProcessedFile;
use TYPO3\CMS\Core\Utility\GeneralUtility;

#[Autoconfigure(public: true)]
class FocuspointPreviewRenderer extends StandardContentPreviewRenderer
{
    public function __construct(private readonly PageRenderer $pageRenderer, private readonly ShapeRendererFactory $shapeRendererFactory)
    {
        $version = GeneralUtility::makeInstance(Typo3Version::class);
        if ($version->getMajorVersion() > 13) {
            parent::__construct();
        }
    }

    public function renderPageModulePreviewContent(GridColumnItem $item): string
    {
        $record = $item->getRecord();

        // typo3 13
       if (\is_array($record)) {
           return $this->renderFromRow($record);
       }

       return $this->renderFromRecord($record);

    }

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

        $content = $this->buildHtml($fileReferences);

        // @phpstan-ignore argument.type
        return $this->linkEditContent($content, $row);

    }

    private function renderFromRecord(RecordInterface $record): string
    {
        $content = '';
        if (!$record->has('assets')) {
            return $content;
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

        $content = $this->buildHtml($fileReferences);
        return $this->linkEditContent($content, $record);
    }

    /**
     * @param iterable<FileReference> $fileReferences
     */
    private function buildHtml(iterable $fileReferences): string
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

        $focuspoints = json_decode((string)$focuspoints, true) ?: [];
        if (empty($focuspoints)) {
            return '';
        }

        $width = $fileReference->getProperty('width');
        $height = $fileReference->getProperty('height');
        $uid = $fileReference->getUid();
        $viewBox = "0 0 {$width} {$height}";
        $shapes = implode(
            '',
            array_map(
                fn (array $focuspoint): string => $this->shapeRendererFactory->getRenderer(@$focuspoint['__shape'] ?? '')?->render($focuspoint['__data']),
                $focuspoints
            )
        );

        return <<<HTML
        <svg viewBox="{$viewBox}">
            <mask id="mask-{$uid}">
                <rect x="0" y="0" width="{$width}" height="{$height}" style="fill:white" />
                {$shapes}
            </mask>
            <rect x="0" y="0" width="{$width}" height="{$height}" fill="rgba(0, 0, 0, .7)" mask="url(#mask-{$uid})" />
        </svg>
        HTML;
    }
}
