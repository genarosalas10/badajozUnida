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

}
