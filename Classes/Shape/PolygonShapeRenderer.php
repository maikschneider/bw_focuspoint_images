<?php

namespace Blueways\BwFocuspointImages\Shape;

final readonly class PolygonShapeRenderer implements ShapeRendererInterface
{
    public function render(array $data): string
    {
        $points = join(
            ' ',
            array_map(
                fn (array $xy): string => join(',', $xy),
                $data['points']
            )
        );
        return "<polygon points=\"{$points}\" />";
    }
}
