<?php

/**
 * Clase que devuelve respuestas de error personalizados
 */
class Respuestas
{
    public $response = ["status" => "ok", "result" => array()];

  /**
   * Para devolver un error 405
   * @return array - devuelve el número de error y un mensaje de error
   */
    public function error_405(){
        $this->response['status'] = "error";
        $this->response['result'] = array(
            "error_id" => "405",
            "error_msg" => "Método no permitido");
        return $this->response;
    }

  /**
   * Para devolver un error 200
   * @param $valor - Puede recibir un mensaje especifico
   * @return array devuelve el número de error y un mensaje de error
   */
    public function error_200($valor = "Datos incorrectos"){
        $this->response['status'] = "error";
        $this->response['result'] = array(
            "error_id" => "200",
            "error_msg" => $valor);
        return $this->response;
    }

  /**
   * Para devolver un error 400
   * @return array devuelve el número de error y un mensaje de error
   */
    public function error_400(){
        $this->response['status'] = "error";
        $this->response['result'] = array(
            "error_id" => "400",
            "error_msg" => "Datos enviados incompletos o con formato incorrecto");
        return $this->response;
    }

  /**
   * Para devolver un error 500
   * @param $valor -  puede recibir un mensaje especifico
   * @return array devuelve el número de error y un mensaje de error
   */
    public function error_500($valor = "Error interno en el servidor"){
        $this->response['status'] = "error";
        $this->response['result'] = array(
            "error_id" => "500",
            "error_msg" => $valor);
        return $this->response;
    }
}
