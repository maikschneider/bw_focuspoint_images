<?php

namespace Blueways\BwFocuspointImages\Renderer;

use Blueways\BwFocuspointImages\Renderer\Trait\StyleTagTrait;

final readonly class RectShapeRenderer implements ShapeRendererInterface
{
    use StyleTagTrait;
    public function render(array $data, ?string $color = null, ?float $opacity = null, ?float $opacityOnHover = null): string
    {
        $styleTag = $this->getStyleTag($color, $opacity, $opacityOnHover);

        return "<rect" . $styleTag . " x=\"{$data['x']}\" y=\"{$data['y']}\" width=\"{$data['width']}\" height=\"{$data['height']}\"/>";
    }
}
