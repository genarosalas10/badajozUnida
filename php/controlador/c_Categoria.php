<?php

require_once "../modelo/Respuestas.php";
require_once "../modelo/modelo.php";

/**
 * Controlador de categorías
 */
class C_Categoria extends modelo
{
/*
 * Método encargado de devolver la lista con todos las categorías
 *
 * @return string|array - Puede devolver diferentes mensajes de error o los datos dependiendo de si hay o no categorías
 */
  public function listadoCategoria()
  {
    $result = $this->obtenerListadoCategoria();
    if ($result != 0) {
      return $result;
    } else {
      return $this->_respuestas->error_200("No hay categorias");
    }
  }

  /**
   * Método encargado de crear categorías
   * @param $datos
   * @return array|int|string -- Puede devolver diferentes mensajes de error o un mensaje de éxito
   */
  public function crearCategoria($datos)
  {
    //comprobar si recibe todos los campos necesarios
    if(!isset($datos['nombre']) || !isset($datos['descripcion'])  ){
      //error con los campos
      return $this->_respuestas->error_400();
    }else{
      $result= $this->realizarRegistroCategoria($datos);
    }
      if($result == 1)
        return 'Se ha creado con exito';
      else{
        return  $result;
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
      $error=parent::errorId();
      if($error==1062){

        return $this->_respuestas->error_200("El nombre ya existe en otra categoria.");
      }else{
        return $this->_respuestas->error_200("No se pudo realizar la modificación");
      }
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

  public function eliminarSubcategoria($datos)
  {
    if(isset($datos['idSubcategoria'])){
      $result = $this->realizarEliminacionSubcategoria($datos['idSubcategoria']);
      if($result!=0){
        return 'Subcategoria eliminada con éxito';
      }else{
        return $this->_respuestas->error_200("No hay subcategoria con ese id.");
      }
    }else{
      return $this->_respuestas->error_400();
    }
  }

  public function modificarSubcategoria($datos)
  {
    //comprobar si recibe todos los campos necesarios
    if(!isset($datos['nombre']) || !isset($datos['descripcion']) || !isset($datos['idSubcategoria']) ){
      //error con los campos
      return $this->_respuestas->error_400();
    }else{

      return $this->realizarmodificacionSubcategoria($datos);

    }
  }

  public function crearSubcategoria($datos)
  {
    //comprobar si recibe todos los campos necesarios
    if(!isset($datos['nombre']) || !isset($datos['descripcion']) || !isset($datos['idCategoria'])){
      //error con los campos

      return $this->_respuestas->error_400();
    }else{
      $result= $this->realizarRegistroSubcategoria($datos);
      if($result == 1)
      return 'Se ha creado con exito';
      else{
        return $result;
      }


    }
  }

  public function sacarSubcategoriaId($datos)
  {
    if(isset($datos['idSubcategoria'])){
      $result = $this->obtenerSubcategoriaId($datos['idSubcategoria']);
      if($result!=0){
        return $result;
      }else{
        return $this->_respuestas->error_200("No hay subcategoria con ese id.");
      }
    }else{
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

  private function realizarEliminacionSubcategoria($idSubcategoria){
    $query="DELETE FROM Subcategoria WHERE idSubcategoria ='$idSubcategoria';";
    $datos = parent::nonQuery($query);
    if($datos>0){
      return 1;
    }else{
      return 0;
    }
  }

  private function realizarmodificacionSubcategoria($datos)
  {
    $query = "UPDATE Subcategoria SET nombre = '".$datos['nombre']."', descripcion = '".$datos['descripcion']."'
    WHERE idSubcategoria = '".$datos['idSubcategoria']."';";
    $datos = parent::nonQuery($query);
    if($datos>0){
      return 1;
    }else{
      $error=parent::errorId();
      if($error==1062){

        return $this->_respuestas->error_200("El nombre ya existe en otra Subcategoria.");
      }else{
        return $this->_respuestas->error_200("No se pudo realizar la modificación.");
      }
    }
  }


  private function realizarRegistroSubcategoria($datos){
    $query = "INSERT INTO Subcategoria (nombre, descripcion, idCategoria)
                VALUES ('".$datos['nombre']."', '".$datos['descripcion']."', '".$datos['idCategoria']."');";
    $resul = parent::nonQueryId($query);
    if($resul){
      return 1;
    }else{
      $error=parent::errorId();
      if($error==1062){

        return $this->_respuestas->error_200("El nombre ya existe en otra Subcategoria.");
      }else{
        return $this->_respuestas->error_200("No se pudo realizar el registro");
      }
    }
  }

  private function obtenerSubcategoriaId($idSubcategoria)
  {
    $query = "SELECT idSubcategoria,nombre,descripcion FROM Subcategoria WHERE idSubcategoria ='$idSubcategoria';";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idSubcategoria"])){

      return $datos;
    }else{

      return 0;
    }
  }

}
