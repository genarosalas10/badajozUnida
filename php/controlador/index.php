<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

require_once "../modelo/Respuestas.php";
require_once "c_Usuario.php";
$c_Usario = new C_Usuario;
$_respuestas = new Respuestas;

//recibir datos
$datos=file_get_contents("php://input");
$datos=json_decode($datos, true);
switch($datos['tipo']){
  case 'login':

    //enviar datos al manejador
    $datosArray = $c_Usario->login($datos);
    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);

    }
    echo json_encode($datosArray);
    break;
  case 'registro':

    break;
  default:
    $datosArray = $_respuestas->error_405();
    echo json_encode($datosArray);
    break;
}
/*
if($_SERVER['REQUEST_METHOD'] =="POST"){

    //recibir datos
    $postBody = file_get_contents("php://input");

    //enviar datos al manejador
    $datosArray = $c_Usario ->login($postBody);

    //devolvemos una respuesta

    if(isset($datosArray["result"]['error_id'])){
        $responseCode = $datosArray["result"]['error_id'];
    }else{
        http_response_code(200);

    }
    echo json_encode($datosArray);
}else{

    $datosArray = $_respuestas->error_405();
    echo json_encode($datosArray);
}
*/
?>
