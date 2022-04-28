<?php
require_once "../modelo/Respuestas.php";
require_once "c_Usuario.php";

$c_Usario = new C_Usuario();
$_respuestas = new Respuestas;

if($_SERVER['REQUEST_METHOD'] =="GET"){

    //recibir datos
    $postBody = file_get_contents("php://input");

    //enviar datos al manejador
    $datosArray = $c_Usario ->login($postBody);

    //devolvemos una respuesta
    header('Content-Type: application/json');
    if(isset($datosArray["result"]['error_id'])){
        $responseCode = $datosArray["result"]['error_id'];
    }else{
        http_response_code(200);

    }
    echo json_encode($datosArray);
}else{
    header('Content-Type: application/json');
    $datosArray = $_respuestas->error_405();
    echo json_encode($datosArray);
}
?>