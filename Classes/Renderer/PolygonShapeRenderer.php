<?php

namespace Blueways\BwFocuspointImages\Renderer;

use Blueways\BwFocuspointImages\Renderer\Trait\StyleTagTrait;

final readonly class PolygonShapeRenderer implements ShapeRendererInterface
{
    use StyleTagTrait;

    public function render(array $data, ?string $color = null, ?float $opacity = null, ?float $opacityOnHover = null): string
    {
        $points = implode(
            ' ',
            array_map(
                fn (array $xy): string => implode(',', $xy),
                $data['points']
            )
        );

        $styleTag = $this->getStyleTag($color, $opacity, $opacityOnHover);

        return "<polygon" . $styleTag . " points=\"{$points}\" />";
    }
}
