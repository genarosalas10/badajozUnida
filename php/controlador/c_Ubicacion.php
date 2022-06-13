<?php

/**
 * Controlador de ubicaciones
 */
class C_Ubicacion extends modelo
{
  /** Método encargado de devolver la lista con todos las ubicaciones
  *
  * @return array - Puede devolver diferentes mensajes de error o los datos dependiendo de si hay o no hay ubicaciones
  */
  public function listarUbicaciones()
  {
    $result = $this->obtenerListadoUbicaciones();
    if ($result != 0) {
      return $result;
    } else {
      return $this->_respuestas->error_200("No hay Ubicaciones");
    }
  }


  /**
   * Método encargado de devolver la lista con todos las ubicaciones filtradas por el nombre introducido
   * @param $datos
   * @return array|int Puede devolver diferentes mensajes de error o los datos dependiendo de si hay o no ubicaciones
   */
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

  /**
   * Método encargado de crear ubicaciones
   * @param $datos
   * @return array|string -- Puede devolver diferentes mensajes de error o un mensaje de éxito
   */
  public function crearUbicacion($datos)
  {
    //comprobar si recibe todos los campos necesarios
    if(!isset($datos['nombre']) || !isset($datos['direccion'])  ){
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


  /**
   * Método encargado de eliminar una ubicación
   * @param $datos
   * @return array|string Puede devolver diferentes mensajes de error o un mensaje de éxito
   */
  public function eliminarUbicacion($datos)
  {
    if(isset($datos['idUbicacion'])){
      $result = $this->realizarEliminacionUbicacion($datos['idUbicacion']);
      if($result==1){
        return 'Ubicación eliminada con éxito';
      }else{
        return $result;
      }
    }else{
      return $this->_respuestas->error_400();
    }
  }

  /**
   * Método para modificar una ubicación
   * @param $datos
   * @return array|int  Puede devolver diferentes mensajes de error o un mensaje de éxito
   */
  public function modificarUbicacion($datos)
  {
    //comprobar si recibe todos los campos necesarios
    if(!isset($datos['nombre']) || !isset($datos['direccion']) || !isset($datos['idUbicacion']) ){
      //error con los campos
      return $this->_respuestas->error_400();
    }else{

      return $this->realizarmodificacionUbicacion($datos);

    }
  }

  /**
   * Método para sacar una ubicación con el id
   * @param $datos
   * @return array|string  Puede devolver diferentes mensajes de error o los datos de la ubicación
   */
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

  /**
   * Para obtener el listado de ubicaciones de la bd
   * @return array|int  Puede devolver 0 si falla o los datos de las ubicaciones
   */
  private function obtenerListadoUbicaciones(){
    $query = "SELECT idUbicacion,nombre,direccion FROM Ubicacion;";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idUbicacion"])){
      return $datos;
    }else{

      return $this->_respuestas->error_200("No hay coincidencias con ningún nombre de ubicación");
    }
  }

  /**
   * Para obtener el listado de ubicaciones de la bd filtrados por el nombre introducido
   * @return array|int  Puede devolver 0 si falla o los datos de las ubicaciones
   */
  private function obtenerlistarUbicacionesPorNombre($nombreUbicacion)
  {
    $query = "SELECT idUbicacion,nombre,direccion FROM Ubicacion WHERE replace(lower(nombre),' ','') like replace(lower('%$nombreUbicacion%'),' ','');";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idUbicacion"])){
      return $datos;
    }else{

      return 0;
    }
  }

  /**
   * Para registrar una ubicación en la bd
   * @param $datos
   * @return array|int  Puede devolver diferentes mensajes de error o 1 si se ha creado con éxito
   */
  private function realizarRegistroUbicacion($datos)
  {
    $query = "INSERT INTO Ubicacion (nombre, direccion)
                VALUES ('".$datos['nombre']."', '".$datos['direccion']."');";
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

  /**
   * Para eliminar una ubicación de la bd
   * @param $idUbicacion
   * @return int|array devuelve el mensaje de error si ha fallado y 1 si ha realizado con éxito
   */
  private function realizarEliminacionUbicacion($idUbicacion){
    $query="DELETE FROM Ubicacion WHERE idUbicacion ='$idUbicacion';";
    $datos = parent::nonQuery($query);
    if($datos>0){
      return 1;
    }else{
      if(parent::errorId()==1451){
        return $this->_respuestas->error_200("La ubicacion está asociada a un evento.");
      }else{
        return $this->_respuestas->error_200("No se pudo borrar la ubicación");
      }
    }
  }

  /**
   * Para realizar una modificación de una ubicación en la bd
   * @param $datos
   * @return array|int
   */
  private function realizarmodificacionUbicacion($datos)
  {
    $query = "UPDATE Ubicacion SET nombre = '".$datos['nombre']."', direccion = '".$datos['direccion']."'
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

  /**
   * Para obtener los datos de una ubicación de la bd
   * @param $idUbicacion
   * @return array|int  Puede devuelve 0 si falla o los datos si se ha funcionado
   */
  private function obtenerUbicacionId($idUbicacion)
  {
    $query = "SELECT idUbicacion,nombre,direccion FROM Ubicacion WHERE idUbicacion ='$idUbicacion';";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idUbicacion"])){

      return $datos;
    }else{

      return 0;
    }
  }
}

