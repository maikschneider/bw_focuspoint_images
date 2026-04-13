<?php

declare(strict_types=1);

namespace Blueways\BwFocuspointImages\Renderer\Trait;

trait StyleTagTrait
{
    public function getStyleTag(?string $color = null, ?float $opacity = null, ?float $opacityOnHover = null): string
    {
        $styles = [];
        if ($color) {
            $styles[] = "--focuspoint-color: $color;";
        }

        if ($opacity !== null) {
            $styles[] = "--focuspoint-opacity: $opacity;";
        }

        if ($opacityOnHover !== null) {
            $styles[] = "--focuspoint-opacity-hover: $opacityOnHover;";
        }

        return !empty($styles) ? ' style="' . implode(' ', $styles) . '"' : '';
    }
}
