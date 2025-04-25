<?php

namespace Blueways\BwFocuspointImages\Shape;

interface ShapeRendererInterface
{
    public function render(array $data): string;
}
