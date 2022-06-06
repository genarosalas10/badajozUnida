<?php

class C_Evento extends modelo
{
  /** Método encargado de devolver la lista con todos los eventos
   *
   * @return array - Puede devolver diferentes mensajes de error o los datos dependiendo de si hay o no hay eventos
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
   * Para obtener el listado de eventos de la bd
   * @return array|int  Puede devolver 0 si falla o los datos de las eventos
   */
  private function obtenerListadoUbicaciones(){
    $query = "SELECT * FROM Evento;";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idEvento"])){
      return $datos;
    }else{

      return $this->_respuestas->error_200("No hay coincidencias con ningún nombre de ubicación");
    }
  }
}
