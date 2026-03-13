<?php

namespace Blueways\BwFocuspointImages\Renderer;

final readonly class PolygonShapeRenderer implements ShapeRendererInterface
{
    public function render(array $data): string
    {
        $points = implode(
            ' ',
            array_map(
                fn (array $xy): string => implode(',', $xy),
                $data['points']
            )
        );
        return "<polygon points=\"{$points}\" />";
    }
}
