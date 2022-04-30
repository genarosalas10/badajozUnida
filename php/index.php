<?php
    require_once "modelo/Respuestas.php";
    require_once "controlador/c_Usuario.php";

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

  $c_Usario = new C_Usuario();
  $_respuestas = new Respuestas;

    $datos=file_get_contents("php://input");
    $datos=json_decode($datos);

    switch($datos->tipo){
        case 'login':
           $datosArray = $c_Usario->login($datos);

          //devolvemos una respuesta
          header('Content-Type: application/json');
          if(isset($datosArray["result"]['error_id'])){
            $responseCode = $datosArray["result"]['error_id'];
          }else{
            http_response_code(200);

          }
          echo json_encode($datosArray);
            break;
        default:
          header('Content-Type: application/json');
          $datosArray = $_respuestas->error_405();
          echo json_encode($datosArray);
            break;
    }

