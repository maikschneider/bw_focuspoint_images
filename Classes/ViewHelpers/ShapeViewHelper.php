<?php

namespace Blueways\BwFocuspointImages\ViewHelpers;

use Blueways\BwFocuspointImages\Shape\ShapeRendererFactory;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

final class ShapeViewHelper extends AbstractViewHelper
{
    protected $escapeOutput = false;

    private readonly ShapeRendererFactory $shapeRendererFactory;

    public function __construct()
    {
        $this->shapeRendererFactory = GeneralUtility::makeInstance(ShapeRendererFactory::class);
    }

    public function initializeArguments(): void
    {
        $this->registerArgument(
            'type',
            'string',
            'The shape type',
            true,
        );
        $this->registerArgument(
            'data',
            'array',
            'Shape data required to render',
            true
        );
    }

    public function render(): string
    {
        $type = $this->arguments['type'];
        $data = $this->arguments['data'];
        return $this->shapeRendererFactory->getRenderer($type)?->render($data) ?? '';
    }
}
