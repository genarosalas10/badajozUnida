<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


require_once "../modelo/Respuestas.php";
require_once "c_Usuario.php";
require_once "c_Categoria.php";


$c_Usuario = new C_Usuario;
$_respuestas = new Respuestas;
$c_Categoria = new C_Categoria;

//recibir datos
$datos=file_get_contents("php://input");
$datos=json_decode($datos, true);
switch($datos['tipo']){

  case 'login':
    //enviar datos al controlador
    $datosArray = $c_Usuario->login($datos);

    //enviar respuesta
    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'registro':
    $datosArray = $c_Usuario->registro($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'listado':
    $datosArray = $c_Usuario->listado();

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'perfilUsuario':
    $datosArray = $c_Usuario->perfilUsuario($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'modificarPerfilUsuario':
    //$datosArray = $c_Usuario->modificarPerfilUsuario($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;
  case 'eliminarUsuario':
    $datosArray = $c_Usuario->eliminarUsuario($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;
  case 'crearCategoria':
    $datosArray = $c_Categoria->crearCategoria($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'listadoCategoria':
    $datosArray = $c_Categoria->listadoCategoria();

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  default:
    $datosArray = $_respuestas->error_405();
    echo  json_encode($datosArray);
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
