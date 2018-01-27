<?php
namespace Blueways\BwFocuspointImages\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class AjaxController
{
   /**
   * @param ServerRequestInterface $request
   * @param ResponseInterface $response
   * @return ResponseInterface
   */
   public function importDataAction(ServerRequestInterface $request, ResponseInterface $response)
   {
      $queryParameters = $request->getParsedBody();
      $id = (int)$queryParameters['id'];

      if (empty($id)) {
         $response->getBody()->write(json_encode(['success' => false]));
         return $response;
      }
      $param = ' -id=' . $id;

      // trigger data import (simplified as example)
      //$output = shell_exec('.' . DIRECTORY_SEPARATOR . 'import.sh' . $param);
      $output = 'HELLO WORLD';

      $response->getBody()->write(json_encode(['success' => true, 'output' => $output]));
      return $response;
   }
}
