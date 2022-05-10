
<?php

require_once "../modelo/Respuestas.php";
require_once "../modelo/modelo.php";


class C_Usuario extends modelo {


    public function login($datos) {

      //print_r($datos);
        if(!isset($datos['email']) || !isset($datos['password']) ){
            //error con los campos
            return $this->_respuestas->error_400();
        }else{
            //todo esta bien
            $email = $datos['email'];
            $password = $datos['password'];
            $password =parent::encriptar($password);
            $datos = $this->obtenerDatosUsuarioLogin($email);
            if($datos){
                //verificar si la contraseña es correcta
                if($password==$datos[0]['password']){
                    return $datos;

                }else{
                    //La contraseña no es igual
                    return $this->_respuestas->error_200("El correo y/o contraseña son incorrectos.");
                }


            }else{
                //no existe el usuario
                return $this->_respuestas->error_200("El correo y/o contraseña son incorrectos.");
            }
        }
    }
    private function obtenerDatosUsuarioLogin($email){
        $query = "SELECT nombre,email,password FROM Usuario WHERE email ='$email';";
        $datos = parent::obtenerDatos($query);
        if(isset($datos[0]["email"])){

            return $datos;
        }else{

            return 0;
        }
    }


}

