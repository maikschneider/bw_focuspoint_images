<?php

namespace Blueways\BwFocuspointImages\Renderer;

interface ShapeRendererInterface
{
    public function render(array $data, ?string $color = null, ?float $opacity = null, ?float $opacityOnHover=  null): string;
}
