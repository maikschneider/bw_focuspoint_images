<?php
namespace Blueways\BwFocuspointImages\ViewHelperes;

class FocuspointViewHelper extends \TYPO3\CMS\Fluid\Core\ViewHelper\AbstractTagBasedViewHelper {

    /**
    * Arguments Initialization
    */
    public function initializeArguments() {
        $this->tagName = 'svg';
        $this->registerArgument('image', 'string', 'The email address to resolve the gravatar for', TRUE);
    }

    public function render() {

    }

}
