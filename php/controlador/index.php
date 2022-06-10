<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");


require_once "../modelo/Respuestas.php";
require_once "c_Usuario.php";
require_once "c_Categoria.php";
require_once "c_Ubicacion.php";
require_once "c_Evento.php";


$c_Usuario = new C_Usuario;
$_respuestas = new Respuestas;
$c_Categoria = new C_Categoria;
$c_Ubicacion = new C_Ubicacion;
$c_Evento = new C_Evento;

//recibir datos
$datos=file_get_contents("php://input");
$datos=json_decode($datos, true);
switch($datos['tipo']){
  //Relacionadas con Usuarios
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
    $datosArray = $c_Usuario->modificarPerfilUsuario($datos);

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

  case 'cambiarPermisosUsuarios':
    $datosArray = $c_Usuario->cambiarPermisosUsuarios($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'listarUsuariosByNombre':
    $datosArray = $c_Usuario->listarUsuariosByNombre($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  //Relacionadas con Categorias
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

  case 'eliminarCategoria':
    $datosArray = $c_Categoria->eliminarCategoria($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'modificarCategoria':
    $datosArray = $c_Categoria->modificarCategoria($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

    case 'sacarCategoriaId':
    $datosArray = $c_Categoria->sacarCategoriaId($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  //Relacionadas con Subcategorias
  case 'listarSubcategoria':
    $datosArray = $c_Categoria->listarSubcategoria();

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'listarSubcategoriaId':
    $datosArray = $c_Categoria->listarSubcategoriaId($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'crearSubcategoria':
    $datosArray = $c_Categoria->crearSubcategoria($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'eliminarSubcategoria':
    $datosArray = $c_Categoria->eliminarSubcategoria($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'modificarSubcategoria':
    $datosArray = $c_Categoria->modificarSubcategoria($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'sacarSubcategoriaId':
    $datosArray = $c_Categoria->sacarSubcategoriaId($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  //Relacionadas con Ubicaciones
  case 'listarUbicaciones':
    $datosArray = $c_Ubicacion->listarUbicaciones();

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'listarUbicacionesPorNombre':
    $datosArray = $c_Ubicacion->listarUbicacionesPorNombre($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'crearUbicacion':
    $datosArray = $c_Ubicacion->crearUbicacion($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'eliminarUbicacion':
    $datosArray = $c_Ubicacion->eliminarUbicacion($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'modificarUbicacion':
    $datosArray = $c_Ubicacion->modificarUbicacion($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'sacarUbicacionId':
    $datosArray = $c_Ubicacion->sacarUbicacionId($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  //Relacionadas con Eventos
  case 'listarEventos':
    $datosArray = $c_Evento->listarEventos();

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'listarEventosbyCreador':
    $datosArray = $c_Evento->listarEventosbyCreador($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'listarEventosbyParticipante':
    $datosArray = $c_Evento->listarEventosbyParticipante($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'eliminarEvento':
    $datosArray = $c_Evento->eliminarEvento($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'crearEvento':
    $datosArray = $c_Evento->crearEvento($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'listarEventosbyParticipanteSoloId':
    $datosArray = $c_Evento->listarEventosbyParticipanteSoloId($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'anadirParticipante':
    $datosArray = $c_Evento->anadirParticipante($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'eliminarParticipante':
    $datosArray = $c_Evento->eliminarParticipante($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;

  case 'contarParticipanteByEvento':
    $datosArray = $c_Evento->contarParticipanteByEvento($datos);

    if(isset($datosArray["result"]['error_id'])){
      $responseCode = $datosArray["result"]['error_id'];
    }else{
      http_response_code(200);
    }
    echo json_encode($datosArray);
    break;
  //Por defecto
  default:
    $datosArray = $_respuestas->error_405();
    echo  json_encode($datosArray);
    break;
}

?>
