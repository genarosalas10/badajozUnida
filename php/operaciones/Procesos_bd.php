<?php
include "../config/configuracionBD.php";
mysqli_report(MYSQLI_REPORT_STRICT); //Desactivar reportes de mysqli

class Procesos_bd{


    function __construct() {

        $this->mysqli = new mysqli(SERVIDOR,USUARIO,PASSWORD,DB);
    }
    public function consulta($consulta){
      try {
        return  $this->resultado=$this->mysqli->query($consulta);
    } catch (mysqli_sql_exception $e){
      return $e->__toString();
      }
    }
    public function extraerFila($resultado){
        return $this->fila =$resultado->fetch_array();
    }
    public function prepareConsulta($consulta){

        return $this->sentencia=$this->mysqli->prepare($consulta);

    }
    /*
  public function vincularValoresConsulta($valores,$tipo){
    for (j=0;j< sizeof($valores);j+1){
      $this->sentencia>bind_param("i", $id);
    }
    return $this->sentencia>bind_param("i", $id);

  }
    */
  public function realizarConsulta($consulta){

    return $this->sentencia=$this->mysqli->prepare($consulta);

  }
    public function filasAfectadas(){
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
