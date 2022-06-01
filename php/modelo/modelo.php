<?php

require_once "../operaciones/Procesos_bd.php";
require_once "Respuestas.php";

/**
 * La clase modelo
 * Se encarga de llamar a procesos_bd.php para que haga lo relacionado con la base de datos
 */
class modelo
{
    private $conexion;
    public $_respuestas;
    function __construct() {

        $this->conexion = new Procesos_bd;
        $this->_respuestas = new Respuestas;
    }

  /**
   * Devuelve los los valores sacados en la ultima consulta en utf-8
   * @param $array
   * @return array
   */
    private function convertirUTF8($array){
        array_walk_recursive($array, function (&$item, $key){
            if(!mb_detect_encoding($item,'utf-8',true)){
                $item = utf8_encode($item);
            }
        });
        return $array;
    }

  /**
   * Para sacar datos de la base de datos
   * @param $query
   * @return array
   */
    public function obtenerDatos($query){
        $results = $this->conexion->consulta($query);
        $resultArray = array();
        foreach ($results as $key){
            $resultArray[] = $key;
        }
        return $this->convertirUTF8($resultArray);
    }
    //Borrado y modificado

  /**
   * Realiza la consulta y devuelve las filas afectadas
   * Se usará para borra y modificar
   * @param $query
   * @return int
   */
    public function nonQuery($query){
        $results = $this->conexion->consulta($query);
        return $this->conexion->filasAfectadas();
    }
  /**
   * Realiza la consulta y devuelve las filas afectadas
   * Se usará para insertar
   * @param $query
   * @return int
   */
    public function nonQueryId($query){
        $resultado = $this->conexion->consulta($query);
        $filas = $this->conexion->filasAfectadas();

        if($resultado){

            return 1;
        }else{

            return $resultado;
        }
    }

  /**
   * Para realizar consultas preparadas
   * @param $query
   * @param $valor
   * @return array|string Devuelve el resultado o un mensaje de error
   */
    public function nonQueryConsultaPreparada($query, $valor){
      $results=$this->conexion->consultaPreparada($query,"s",$valor);
      if(!$results){
        return 'Fallo la consulta preparada';
      }
      $resultArray = array();
      foreach ($results as $key){
        $resultArray[] = $key;
      }
      return $this->convertirUTF8($resultArray);
    }

  /**
   * Para encriptar
   * @param $string
   * @return string
   */
    protected function encriptar($string){
        return md5($string);
    }

  /**
   *  Devuelve el id del error de la última consulta
   * @return mixed
   */
    public function errorId(){
     return $this->conexion->errno();
    }

  /**
   * Devuelve el mensaje de error de la última consulta
   * @return mixed
   */
    public function errorms(){
      return $this->conexion->error();
    }
}
