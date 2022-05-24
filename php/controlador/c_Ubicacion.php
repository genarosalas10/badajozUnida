<?php

class C_Ubicacion extends modelo
{

  public function listarUbicaciones()
  {
    $result = $this->obtenerListadoUbicaciones();
    if ($result != 0) {
      return $result;
    } else {
      return $this->_respuestas->error_200("No hay Ubicaciones");
    }
  }


  public function listarUbicacionesPorNombre($datos)
  {
    if(isset($datos['nombre'])){

      $result = $this->obtenerlistarUbicacionesPorNombre($datos['nombre']);
      if ($result != 0) {
        return $result;
      } else {
        return $this->_respuestas->error_200("No hay coincidencias con ningún nombre de ubicación");
      }
    }
    else{
      return $this->_respuestas->error_400();
    }

  }

  public function crearUbicacion($datos)
  {
    //comprobar si recibe todos los campos necesarios
    if(!isset($datos['nombre']) || !isset($datos['descripcion'])  ){
      //error con los campos
      return $this->_respuestas->error_400();
    }else{
      $result= $this->realizarRegistroUbicacion($datos);
    }
    if($result == 1)
      return 'Se ha creado con exito';
    else{
      return  $result;
    }
  }

  public function eliminarUbicacion($datos)
  {
    if(isset($datos['idUbicacion'])){
      $result = $this->realizarEliminacionUbicacion($datos['idUbicacion']);
      if($result!=0){
        return 'Ubicación eliminada con éxito';
      }else{
        return $this->_respuestas->error_200("No hay categoria con ese id.");
      }
    }else{
      return $this->_respuestas->error_400();
    }
  }

  public function modificarUbicacion($datos)
  {
    //comprobar si recibe todos los campos necesarios
    if(!isset($datos['nombre']) || !isset($datos['descripcion']) || !isset($datos['idUbicacion']) ){
      //error con los campos
      return $this->_respuestas->error_400();
    }else{

      return $this->realizarmodificacionUbicacion($datos);

    }
  }
  public function sacarUbicacionId($datos)
  {
    if(isset($datos['idUbicacion'])){

      $result = $this->obtenerUbicacionId($datos['idUbicacion']);
      if ($result != 0) {
        return $result;
      } else {
        return $this->_respuestas->error_200("No hay coincidencias con ningún id de ubicación");
      }
    }
    else{
      return $this->_respuestas->error_400();
    }
  }

  private function obtenerListadoUbicaciones(){
    $query = "SELECT idUbicacion,nombre,descripcion FROM Ubicacion;";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idUbicacion"])){
      return $datos;
    }else{

      return $this->_respuestas->error_200("No hay coincidencias con ningún nombre de ubicación");
    }
  }

  private function obtenerlistarUbicacionesPorNombre($nombreUbicacion)
  {
    $query = "SELECT idUbicacion,nombre,descripcion FROM Ubicacion WHERE replace(lower(nombre),' ','') like replace(lower('%$nombreUbicacion%'),' ','');";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idUbicacion"])){
      return $datos;
    }else{

      return 0;
    }
  }


  private function realizarRegistroUbicacion($datos)
  {
    $query = "INSERT INTO Ubicacion (nombre, descripcion)
                VALUES ('".$datos['nombre']."', '".$datos['descripcion']."');";
    $resul = parent::nonQueryId($query);
    if($resul){
      return 1;
    }else{
      $error=parent::errorId();
      if($error==1062){

        return $this->_respuestas->error_200("El nombre ya existe en otra ubicación.");
      }else{
        return $this->_respuestas->error_200("No se pudo realizar el registro");
      }
    }
  }

  private function realizarEliminacionUbicacion($idUbicacion){
    $query="DELETE FROM Ubicacion WHERE idUbicacion ='$idUbicacion';";
    $datos = parent::nonQuery($query);
    if($datos>0){
      return 1;
    }else{
      return 0;
    }
  }

  private function realizarmodificacionUbicacion($datos)
  {
    $query = "UPDATE Ubicacion SET nombre = '".$datos['nombre']."', descripcion = '".$datos['descripcion']."'
    WHERE idUbicacion = '".$datos['idUbicacion']."';";
    $datos = parent::nonQuery($query);
    if($datos>0){
      return 1;
    }else{
      $error=parent::errorId();
      if($error==1062){

        return $this->_respuestas->error_200("El nombre ya existe en otra Ubicacion.");
      }else{
        return $this->_respuestas->error_200("No se pudo realizar la modificación");
      }
    }
  }


  private function obtenerUbicacionId($idUbicacion)
  {
    $query = "SELECT idUbicacion,nombre,descripcion FROM Ubicacion WHERE idUbicacion ='$idUbicacion';";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idUbicacion"])){

      return $datos;
    }else{

      return 0;
    }
  }
}

