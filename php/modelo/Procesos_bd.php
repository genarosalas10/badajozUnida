<?php

class Procesos_bd{


    function __construct() {
        include "configuracionBD.php";

        $this->mysqli = new mysqli(SERVIDOR,USUARIO,PASSWORD,DB);
    }
    public function consultas($consulta){

        return  $this->resultado=$this->mysqli->query($consulta);
    }

    public function extraerFila($resultado){
        return $this->fila =$resultado->fetch_array();
    }
    public function consultasMultiple($consulta){

        $this->resultado=$this->mysqli->multi_query($consulta);
    }
    public function  filasAfectadas(){
         return $this->mysqli->affected_rows;


    }
    public function  numeroFilas($resultado){
        return $numeroFilas = $resultado->num_rows;


    }
  public function ultimoInsert_id(){
    return $this->mysqli->insert_id;
  }

    public function error(){

        return  $this->mysqli->error;
    }

    public function errno(){

        return  $this->mysqli->errno;
    }

    public function cerrarConexion(){
        $this->mysqli->close();
    }
}
