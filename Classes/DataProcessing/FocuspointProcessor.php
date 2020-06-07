<?php

namespace Blueways\BwFocuspointImages\DataProcessing;

use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\DataProcessing\FilesProcessor;

class FocuspointProcessor extends FilesProcessor
{

    /**
     * Inject image and decoded focus points into the template
     *
     * @param \TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer $cObj
     * @param array $contentObjectConfiguration
     * @param array $processorConfiguration
     * @param array $processedData
     * @return array
     */
    public function process(
        ContentObjectRenderer $cObj,
        array $contentObjectConfiguration,
        array $processorConfiguration,
        array $processedData
    ) {
        $processedData = parent::process($cObj, $contentObjectConfiguration, $processorConfiguration, $processedData);

        if (!isset($processedData['image']) || !is_array($processedData['image'])) {
            return $processedData;
        }

        // the TCA is configured to use max. 1 image, however the file collector returns an array
        foreach ($processedData['image'] as $key => $file) {

            $points = $file->getProperty('focus_points') ?: '[]';
            $points = json_decode($points, false);

            foreach ($points as $point) {
                $point->x *= 100;
                $point->y *= 100;
                $point->height *= 100;
                $point->width *= 100;
                // calculate center of each point for text positioning
                $point->textX = $point->x + ($point->width / 2);
                $point->textY = $point->y + ($point->height / 2);

                // replace link field with typolink value
                foreach ($point as $fieldname => &$fieldvalue) {
                    if(is_object($fieldvalue) && $fieldvalue->typolink) {
                        $fieldvalue = $fieldvalue->typolink;
                    }
                }
                unset($fieldvalue);
            }

            $processedData['image'] = $file;
            $processedData['points'] = $points;
        }

        return $processedData;
    }

}
