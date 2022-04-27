
<?php



class C_Etapas{
    public function __construct()
    {
      require_once "../modelo/m_Etapas.php";
      $this->conexion = new M_Etapas();


    }
  function altaEtapas($idEtapa, $duracion, $kilometros, $poblacionInicio,$poblacionFinal){

        $insercion = "INSERT INTO `etapas`(`idEtapa`, `duracion`, `kilometros`, `imgEtapa`, `idPoblacionInicio`, `idPoblacionFin`) VALUES ($idEtapa,$duracion, $kilometros, 'null'  , $poblacionInicio, $poblacionFinal)";
        if($this->conexion->consultas($insercion)){
          return json_encode(true);
        }else{
          return json_encode(false);
        }


    }
  function validar($idEtapa, $duracion, $kilometros){
    $error=[];
    if(!isset($idEtapa)){
      $error[]="idEtapa no puede estar vacio";
    }else{
      if(strlen($idEtapa)<1 || strlen($idEtapa)>2){
        $error[]="El formato de idEtapa es inválido";
      }
    }
    if(!isset($duracion)){
      $error[]="el campo duracion no puede estar vacio";
    }else{
      if(preg_match('/^[0-9]?[0-9]?[0-9]:[0-5][0-9]$/',$duracion)==0){
        $error[]="El formato del campo duracion es inválido";
      }
    }
    if(!isset($kilometros)){
      $error[]="el campo longitud no puede estar vacio";
    }else{
      if(preg_match('/^[0-9]{1,3}(,[0-9]{1,3})?$/',$kilometros)==0){
        $error[]="El formato del campo longitud es inválido";
      }
    }
    return $error;
  }


  //cogemos las poblaciones de la base de datos y se las mandamos al fronted
  function poblaciones(){
    $consulta = "SELECT idPoblacion, nombrePoblacion FROM poblaciones WHERE 1";
    $resultado=  $this->conexion->consultas($consulta);
    $poblacion = array();
    while ($fila = $this->conexion->extraerFila($resultado)){
      array_push($poblacion,
        [
          "idPoblacion" => $fila["idPoblacion"],
          "nombrePoblacion"=> $fila["nombrePoblacion"]
        ]
      );
    }
    return json_encode($poblacion);

  }
  function etapas(){
    $consulta = "SELECT idEtapa,duracion,kilometros FROM etapas ";
    $resultado=  $this->conexion->consultas($consulta);
    $etapas = array();
    while ($fila = $this->conexion->extraerFila($resultado)){
      array_push($etapas,
        [
          "idEtapa" => $fila["idEtapa"],
          "duracion" =>$fila["duracion"],
          "kilometros" =>$fila["kilometros"],
        ]
      );
    }
    return json_encode($etapas);

  }
  function borrar($idEtapa){
    $consulta ="DELETE FROM etapas where idEtapa= ".$idEtapa;
    $resultado=  $this->conexion->consultas($consulta);

    if($this->conexion->filasAfectadas()!=0){
      return json_encode('todo ok');
    }else{
      return json_encode('error al borrar');
    }

  }
  function decofificacionImagenes($imagen64){
    $consulta = "SELECT idEtapa FROM etapas ORDER by idEtapa DESC LIMIT 1";
    $resultado=  $this->conexion->consultas($consulta);

    $fila = $this->conexion->extraerFila($resultado);
      $nombreImagen= $fila['idEtapa'];

    $rutaGuardado ="src/app/imagenes_etapas/$nombreImagen.png";
    $ruta = "../../src/app/imagenes_etapas/$nombreImagen.png";
    $file = fopen($ruta, "w+");
    //Actualizamos la fila de nuestro cuaderno con la nueva ruta
    $data = explode(',', $imagen64);
    //Crear imagen
    fwrite($file, base64_decode($data[1]));
    fclose($file);

    $consultaImagen = "UPDATE `etapas` SET imgEtapa='$rutaGuardado' WHERE idEtapa='$nombreImagen' ";
    if($this->conexion->consultas($consultaImagen)){
      return json_encode("La imagen se inserto correctamente");
    }else{
      return json_encode($consultaImagen);
    }



  }
  function listarPoblaciones(){
    $consulta="
      SELECT idEtapa,duracion,kilometros,poblacioninicio.nombrePoblacion as 'nombreInicio',poblacionfinal.nombrePoblacion as 'poblacionFinal'
      FROM etapas
      INNER JOIN poblaciones as poblacioninicio
      ON idPoblacionInicio=poblacioninicio.idPoblacion
      INNER JOIN poblaciones as poblacionfinal
      ON idPoblacionFin=poblacionfinal.idPoblacion;
    ";
    $resultado=  $this->conexion->consultas($consulta);
    $resultados = array();
    while ($fila = $this->conexion->extraerFila($resultado)){
      array_push($resultados,
        [
          "idEtapa" => $fila["idEtapa"],
          "duracion" =>$fila["duracion"],
          "kilometros" =>$fila["kilometros"],
          "poblacionInicio"=>$fila["nombreInicio"],
          "poblacionfinal"=>$fila["poblacionFinal"]
        ]
      );
    }
    return json_encode($resultados);
  }
}

