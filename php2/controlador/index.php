<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: *");

    $datos=file_get_contents("php://input");
    $datos=json_decode($datos);

    switch($datos->tipo){
        case 'login':
            $response=new stdClass();
            $response->respuesta='OK';
            echo json_encode($response);
            break;
        default:
            $response=new stdClass();
            $response->respuesta='NOK';
            echo json_encode($response);
            break;
    }

    //class Controlador{

        // function __construct(){

        //     require ("../modelo/modelo.php");
        //     $this->modelo = new Modelo();

        // }
        // public function altaFlashCard($descripcion, $audio, $imagen, $tipo){
        //    $this->modelo->alta($descripcion, $audio, $imagen, $tipo);
        // }
        // public function actualizarFlashCard($id,$descripcion, $audio, $imagen, $tipo){
        //     $this->modelo->modificar($id,$descripcion, $audio, $imagen, $tipo);
        // }
        // public function eliminarFlashCard($id){
        //     $this->modelo->borrado($id);
        // }
        // public function listarFlashCard(){
        //    return $this->modelo->listar();
        // }
        // public function idFlashCard($id){
        //    return $this->modelo->obtenerId($id);
        // }
    //}