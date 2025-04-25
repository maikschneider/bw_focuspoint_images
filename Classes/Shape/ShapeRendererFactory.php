<?php

namespace Blueways\BwFocuspointImages\Shape;

final class ShapeRendererFactory
{
    private const MAPPING = [
        'rect' => RectShapeRenderer::class,
        'polygon' => PolygonShapeRenderer::class
    ];

    private array $renderers = [];

    public function getRenderer(string $type): ?ShapeRendererInterface
    {
        $type = strtolower($type);
        if (!isset(self::MAPPING[$type]))
            return null;
        if (!isset($this->renderers[$type])) {
            $RendererClass = self::MAPPING[$type];
            $this->renderers[$type] = new $RendererClass();
        }
        return $this->renderers[$type];
    }
}
