
<?php
  /*
  class Controlador{
    public function __construct()
    {

    }
    function subirEtapa(){

    }
  }
  */
  require_once "c_Etapas.php";
  $procesos = new C_Etapas();
  header("Access-Control-Allow-Origin:*");
  header('Content-Type: application/json; charset=utf-8');

  $data = json_decode(file_get_contents('php://input'), true);

  switch ($data['accion']) {
    case 'etapa.altaEtapa':
      $error=$procesos->validar($data["idEtapa"],$data["duracion"],$data["longitud"]);
      if (empty($error)){
      echo json_encode($procesos->altaEtapas("'".$data["idEtapa"]."'","'".$data["duracion"]."'","'".$data["longitud"]."'","'".$data["idPoblacionInicio"]."'","'".$data["idPoblacionFinal"]."'"));
      }else{
        echo json_encode('algo falla');
      }
      break;
    case 'etapa.select':
      echo json_encode($datos = $procesos->poblaciones());
      break;
    case 'etapa.selectEtapas':
      echo json_encode($procesos->etapas());
      break;
    case 'etapa.borrar':
      echo $procesos->borrar($data['idEtapa']);
      break;
    case 'etapa.imagen':
      echo json_encode($procesos->decofificacionImagenes($data['imagen']));
      break;
    case 'etapa.listado':
      echo json_encode($procesos->listarPoblaciones());
      break;
    default:
      echo json_encode('error');
      break;
    }


