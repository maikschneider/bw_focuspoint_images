<?php

namespace Blueways\BwFocuspointImages\DataProcessing;

use TYPO3\CMS\Core\LinkHandling\TypoLinkCodecService;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\DataProcessing\FilesProcessor;

class FocuspointProcessor extends FilesProcessor
{
    /**
    * Inject image and decoded focus points into the template
    *
    * @return array
    */
    public function process(
        ContentObjectRenderer $cObj,
        array $contentObjectConfiguration,
        array $processorConfiguration,
        array $processedData
    ) {
        $processedData = parent::process($cObj, $contentObjectConfiguration, $processorConfiguration, $processedData);

        if (!isset($processedData['images']) || !is_array($processedData['images'])) {
            return $processedData;
        }

        $processedData['points'] = [];

        /** @var TypoLinkCodecService $typoLinkCodecService */
        $typoLinkCodecService = GeneralUtility::makeInstance(TypoLinkCodecService::class);

        // the TCA is configured to use max. 1 image, however the file collector returns an array
        foreach ($processedData['images'] as $key => $file) {
            $points = $file->getProperty('focus_points') ?: '[]';
            $points = json_decode((string)$points, true) ?: [];

            foreach ($points as &$point) {

                if (isset($point['x'])) {
                    $point['x'] *= 100;
                    $point['y'] *= 100;
                    $point['height'] *= 100;
                    $point['width'] *= 100;
                }

                foreach ($point as $fieldName => &$fieldValue) {
                    // in case of old typolink syntax (v2.3.3): replace link field with typolink value
                    if (is_object($fieldValue) && property_exists($fieldValue, 'key')) {
                        $newLink = 't3://' . $fieldValue->key . '?uid=' . $fieldValue->uid;
                        if (property_exists($fieldValue, 'target') && $fieldValue->target) {
                            $newLink .= ' ' . $fieldValue->target;
                        }

                        $fieldValue = $newLink;
                    }

                    // in case of typolinks with target, add a new field {$fieldName}Target='_blank'
                    if (!is_string($fieldValue) || strpos($fieldValue, 't3://') !== 0) {
                        continue;
                    }
                    $linkValues = $typoLinkCodecService->decode($fieldValue);
                    if (!$linkValues['target']) {
                        continue;
                    }
                    $attributeName = $fieldName . 'Target';
                    $point[$attributeName] = $linkValues['target'];
                }
                if ($point['points']) {
                    $point['path'] = implode(' ', array_map(fn (array $xy): string => implode(',', $xy), $point['points']));
                }
            }

            $processedData['points'][$key] = [
                'width' => $file->getProperty('width'),
                'height' => $file->getProperty('height'),
                'areas' => $points,
            ];
        }

        return $processedData;
    }
}
