<?php

require_once "../modelo/Respuestas.php";
require_once "../modelo/modelo.php";

class C_Categoria extends modelo
{

  public function listadoCategoria()
  {
    $result = $this->obtenerListadoCategoria();
    if ($result != 0) {
      return $result;
    } else {
      return $this->_respuestas->error_200("No categorias");
    }
  }

  public function crearCategoria($datos)
  {
    //comprobar si recibe todos los campos necesarios
    if(!isset($datos['nombre']) || !isset($datos['descripcion'])  ){
      //error con los campos
      return $this->_respuestas->error_400();
    }else{

          return $this->realizarRegistroCategoria($datos);


    }
  }



  public function eliminarCategoria($datos)
  {
  }

  public function modificarCategoria($datos)
  {
  }

  private function obtenerListadoCategoria(){
    $query = "SELECT idCategoria,nombre,descripcion FROM Categoria;";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idCategoria"])){
      return $datos;
    }else{

      return 0;
    }
  }

  private function realizarRegistroCategoria($datos){
    $query = "INSERT INTO Categoria (nombre, descripcion)
                VALUES ('".$datos['nombre']."', '".$datos['descripcion']."');";
    $resul = parent::nonQueryId($query);
    if($resul){
      return 1;
    }else{
        return $this->_respuestas->error_200("No se pudo realizar el registro.");
      }

  }
}
