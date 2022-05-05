<?php

require_once "../operaciones/Procesos_bd.php";
require_once "Respuestas.php";


class modelo
{
    private $conexion;
    public $_respuestas;
    function __construct() {

        $this->conexion = new Procesos_bd;
        $this->_respuestas = new Respuestas;
    }
    private function convertirUTF8($array){
        array_walk_recursive($array, function (&$item, $key){
            if(!mb_detect_encoding($item,'utf-8',true)){
                $item = utf8_encode($item);
            }
        });
        return $array;
    }
    //Sacar informacion de la base de datos
    public function obtenerDatos($query){
        $results = $this->conexion->consulta($query);
        $resultArray = array();
        foreach ($results as $key){
            $resultArray[] = $key;
        }
        return $this->convertirUTF8($resultArray);
    }
    //Borrado y modificado
    public function nonQuery($query){
        $results = $this->conexion->consulta($query);
        return $this->conexion->filasAfectadas();
    }
    //INSERT
    public function nonQueryId($query){
        $results = $this->conexion->consulta($query);
        $filas = $this->conexion->filasAfectadas();
        if( $filas>=1){
            return $this->conexion->ultimoInsert_id();
        }else{
            return 0;
        }
    }
    //encriptar
    protected function encriptar($string){
        return md5($string);
    }

}
