<?php

    class Operaciones{
        
        public $resultado;
        private $conexion;

        function __construct(){
            require ('../config/configdb.php');
            $this->conexion = new mysqli(DB_SERVER,DB_USERNAME,DB_PASSWROD,DB_NAME);
        }
        public function consulta($consulta){
            $this->resultado=$this->conexion->query($consulta);
        }
        public function error(){
            return $this->conexion->errno.''.$this->conexion->error;
        }
        public function filasAfectadas(){
            return $this->resultado->affected_rows;
        }
        public function fila_array(){
            return $this->resultado->fetch_array();
        }
        public function numeroFilas(){
            return $this->resultado->num_rows;
        }
        public function fila_assoc(){
            return $this->resultado->fetch_assoc();
        }
        public function id_anterior(){
            return $this->conexion->insert_id;
        }
    }   
