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
      return $this->_respuestas->error_200("No hay categorias");
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
    if(isset($datos['idCategoria'])){
      $result = $this->realizarEliminacionCategoria($datos['idCategoria']);
      if($result!=0){
        return 'Categoria eliminada con éxito';
      }else{
        return $this->_respuestas->error_200("No hay categoria con ese id.");
      }
    }else{
      return $this->_respuestas->error_400();
    }
  }

  public function sacarCategoriaId($datos)
  {
    if(isset($datos['idCategoria'])){
      $result = $this->obtenerCategoriaId($datos['idCategoria']);
      if($result!=0){
        return $result;
      }else{
        return $this->_respuestas->error_200("No hay categoria con ese id.");
      }
    }else{
      return $this->_respuestas->error_400();
    }
  }

  public function modificarCategoria($datos)
  {
    //comprobar si recibe todos los campos necesarios
    if(!isset($datos['nombre']) || !isset($datos['descripcion']) || !isset($datos['idCategoria']) ){
      //error con los campos
      return $this->_respuestas->error_400();
    }else{

        return $this->realizarmodificacionCategoria($datos);

    }
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
      $error=parent::errorId();
      if($error==1062){

        return $this->_respuestas->error_200("El nombre ya existe en otra categoria.");
      }else{
        return $this->_respuestas->error_200("No se pudo realizar el registro");
      }
    }
  }

  private function realizarEliminacionCategoria($idCategoria){
    $query="DELETE FROM Categoria WHERE idCategoria ='$idCategoria';";
    $datos = parent::nonQuery($query);
    if($datos>0){
      return 1;
    }else{
      return 0;
    }
  }

  private function realizarmodificacionCategoria($datos)
  {
    $query = "UPDATE Categoria SET nombre = '".$datos['nombre']."', descripcion = '".$datos['descripcion']."'
    WHERE idCategoria = '".$datos['idCategoria']."';";
    $datos = parent::nonQuery($query);
    if($datos>0){
      return 1;
    }else{
      return $this->_respuestas->error_200("No se pudo realizar el registro. Ese idCategoria no esta.");
    }
  }

  private function obtenerCategoriaId($idCategoria)
  {
    $query = "SELECT idCategoria,nombre,descripcion FROM Categoria WHERE idCategoria ='$idCategoria';";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idCategoria"])){

      return $datos;
    }else{

      return 0;
    }
  }


  //Subcategorias
  public function listarSubcategoria()
  {
    $result = $this->obtenerListadoSubategoria();
    if ($result != 0) {
      return $result;
    } else {
      return $this->_respuestas->error_200("No hay subcategorias");
    }
  }

  public function listarSubcategoriaId($datos)
  {
    if(isset($datos['idCategoria'])){

    $result = $this->obtenerListadosubcategoriaId($datos['idCategoria']);
    if ($result != 0) {
      return $result;
    } else {
      return $this->_respuestas->error_200("No hay subcategorías en esa categoría");
    }
    }
    else{
      return $this->_respuestas->error_400();
    }
  }

  private function obtenerListadosubcategoriaId($idCategoria)
  {
    $query = "SELECT idSubcategoria,nombre, idCategoria FROM Subcategoria WHERE idCategoria= '$idCategoria';";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idSubcategoria"])){
      return $datos;
    }else{

      return 0;
    }
  }



  private function obtenerListadoSubategoria()
  {
    $query = "SELECT idSubcategoria,idCategoria,nombre,descripcion FROM Subcategoria;";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idSubcategoria"])){
      return $datos;
    }else{

      return 0;
    }
  }


}
