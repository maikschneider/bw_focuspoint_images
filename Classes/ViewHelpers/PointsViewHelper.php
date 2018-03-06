<?php
namespace Blueways\BwFocuspointImages\ViewHelpers;

class PointsViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper
{

    /**
    * Arguments Initialization
    */
    public function initializeArguments() {
        $this->registerArgument('file', 'object', 'FileReference of image with focus_points');
    }

    public function render()
    {
        $fileRef = $this->arguments['file'];

        if(!$fileRef) return null;

        $points = json_decode($fileRef->getProperty('focus_points'));

        foreach ($points as $point) {
            $point->x = $point->x * 100;
            $point->y = $point->y * 100;
            $point->height = $point->height * 100;
            $point->width = $point->width * 100;
        }

        return $points;
    }

}
