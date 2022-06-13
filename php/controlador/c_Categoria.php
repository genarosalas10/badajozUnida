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


  /**
   * Método encargado de eliminar una categoría
   * @param $datos
   * @return array|string Puede devolver diferentes mensajes de error o un mensaje de éxito
   */
  public function eliminarCategoria($datos)
  {
    if(isset($datos['idCategoria'])){
      $result = $this->realizarEliminacionCategoria($datos['idCategoria']);
      if($result==1){
        return 'Categoria eliminada con éxito';
      }else{
        return $result;
      }
    }else{
      return $this->_respuestas->error_400();
    }
  }

  /**
   * Método para sacar una categoría con el id
   * @param $datos
   * @return array|string  Puede devolver diferentes mensajes de error o los datos de la categoría
   */
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

  /**
   * Método para modificar una categoría
   * @param $datos
   * @return array|int  Puede devolver diferentes mensajes de error o un mensaje de éxito
   */
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

  /**
   * Para obtener el listado de categorías de la bd
   * @return array|int  Puede devolver 0 si falla o los datos de las categorías
   */
  private function obtenerListadoCategoria(){
    $query = "SELECT idCategoria,nombre,descripcion FROM Categoria;";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idCategoria"])){
      return $datos;
    }else{

      return 0;
    }
  }

  /**
   * Para registrar una categoría en la bd
   * @param $datos
   * @return array|int  Puede devolver diferentes mensajes de error o 1 si se ha creado con éxito
   */
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

  /**
   * Para eliminar una categoría de la bd
   * @param $idCategoria
   * @return int|array devuelve mensaje de error si ha fallado y 1 si ha realizado con éxito
   */
  private function realizarEliminacionCategoria($idCategoria){
    $query="DELETE FROM Categoria WHERE idCategoria ='$idCategoria';";
    $datos = parent::nonQuery($query);
    if($datos>0){
      return 1;
    }else{
      if(parent::errorId()==1451){
        return $this->_respuestas->error_200("La categoría está asociada a un evento.");
      }else{
        return $this->_respuestas->error_200("No se pudo borrar la categoría.");
      }
    }
  }

  /**
   * Para realizar una modificación de una categoría en la bd
   * @param $datos
   * @return array|int
   */
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

  /**
   * Para obtener los datos de una categoría de la bd
   * @param $idCategoria
   * @return array|int  Puede devuelve 0 si falla o los datos si se ha funcionado
   */
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


  /*
 * Método encargado de devolver la lista con todos las subcategorías

 * @return string|array - Puede devolver diferentes mensajes de error o los datos dependiendo de si hay o no subcategorías
 */
  public function listarSubcategoria()
  {
    $result = $this->obtenerListadoSubategoria();
    if ($result != 0) {
      return $result;
    } else {
      return $this->_respuestas->error_200("No hay subcategorias");
    }
  }

  /**
   * Método para listar las subcategorías de una categoría
   * @param $datos
   * @return array|int Puede devolver diferentes mensajes de error o los datos dependiendo de si hay o no subcategorías
   */
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

  /**
   * Método encargado de eliminar una categoria
   * @param $datos
   * @return array|string Puede devolver diferentes mensajes de error o un mensaje de éxito
   */
  public function eliminarSubcategoria($datos)
  {
    if(isset($datos['idSubcategoria'])){
      $result = $this->realizarEliminacionSubcategoria($datos['idSubcategoria']);
      if($result==1){
        return 'Subcategoria eliminada con éxito';
      }else{
        return $result;
      }
    }else{
      return $this->_respuestas->error_400();
    }
  }

  /**
   * Método para modificar una subcategoría
   * @param $datos
   * @return array|int  Puede devolver diferentes mensajes de error o un mensaje de éxito
   */
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

  /**
   * Método encargado de crear subcategorías
   * @param $datos
   * @return array|int|string -- Puede devolver diferentes mensajes de error o un mensaje de éxito
   */
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

  /**
   * Método para sacar una subcategoría con el id
   * @param $datos
   * @return array|string  Puede devolver diferentes mensajes de error o los datos de la subcategoría
   */
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

  /**
   * Saca las subcategorías que pertenecen a una categoría de la bd
   * @param $idCategoria
   * @return array|int Devuelve 0 si falla o los datos si es correcto
   */
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

  /**
   * Para obtener el listado de subcategorías de la bd
   * @return array|int  Puede devolver 0 si falla o los datos de las subcategorías
   */
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

  /**
   * Para eliminar una subcategoría de la bd
   * @param $idSubcategoria
   * @return int devuelve 0 si ha fallado y 1 si ha realizado con éxito
   */
  private function realizarEliminacionSubcategoria($idSubcategoria){
    $query="DELETE FROM Subcategoria WHERE idSubcategoria ='$idSubcategoria';";
    $datos = parent::nonQuery($query);
    if($datos>0){
      return 1;
    }else{
      if(parent::errorId()==1451){
        return $this->_respuestas->error_200("La subcategoría está asociada a un evento.");
      }else{
        return $this->_respuestas->error_200("No se pudo borrar la subcategoría");
      }
    }
  }

  /**
   * Para realizar una modificación de una subcategoría en la bd
   * @param $datos
   * @return array|int
   */
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


  /**
   * Para registar una subcategoría en la bd
   * @param $datos
   * @return array|int  Puede devolver diferentes mensajes de error o 1 si se ha creado con éxito
   */
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

  /**
   * Para obtener los datos de una subcategoría de la bd
   * @param $idSubcategoria
   * @return array|int  Puede devuelve 0 si falla o los datos si se ha funcionado
   */
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
