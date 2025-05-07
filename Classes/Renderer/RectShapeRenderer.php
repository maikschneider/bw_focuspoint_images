<?php

namespace Blueways\BwFocuspointImages\Renderer;

final readonly class RectShapeRenderer implements ShapeRendererInterface
{
    public function render(array $data): string
    {
        return "<rect x=\"{$data['x']}\" y=\"{$data['y']}\" width=\"{$data['width']}\" height=\"{$data['height']}\" />";
    }
}
