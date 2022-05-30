<?php
include "../config/configuracionBD.php";
mysqli_report(MYSQLI_REPORT_STRICT); //Desactivar reportes de mysqli

class Procesos_bd{

    function __construct() {

        $this->mysqli = new mysqli(SERVIDOR,USUARIO,PASSWORD,DB);
        $this->sentencia="";
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
    public function consultaPreparada($consulta,$tipo,$email){


      if(!$sentencia=$this->mysqli->prepare($consulta)){
        return 0;
      }
      if(!$sentencia->bind_param("$tipo", $email)){
        return 0;
      }

      $result=$sentencia->execute();
      if($result){
        return  $sentencia->get_result();
      }
      return 0;

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
