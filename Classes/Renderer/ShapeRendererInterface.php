<?php

namespace Blueways\BwFocuspointImages\Renderer;

interface ShapeRendererInterface
{
    public function render(array $data): string;
}
