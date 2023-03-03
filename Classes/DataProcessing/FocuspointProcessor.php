<?php

namespace Blueways\BwFocuspointImages\DataProcessing;

use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\DataProcessing\FilesProcessor;
use TYPO3\CMS\Frontend\Service\TypoLinkCodecService;

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

        /** @var TypoLinkCodecService $typoLinkCodecService */
        $typoLinkCodecService = GeneralUtility::makeInstance(TypoLinkCodecService::class);

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
                    if (is_string($fieldValue) && strpos($fieldValue, 't3://') === 0) {
                        $linkValues = $typoLinkCodecService->decode($fieldValue);
                        if ($linkValues['target']) {
                            $attributeName = $fieldName . 'Target';
                            $point->$attributeName = $linkValues['target'];
                        }
                    }
                }
                unset($fieldValue);
            }

            $processedData['image'] = $file;
            $processedData['points'] = $points;
        }

        return $processedData;
    }

}
