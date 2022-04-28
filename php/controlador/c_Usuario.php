
<?php
require_once "../modelo/Respuestas.php";
require_once "../modelo/Procesos.php";

class C_Usuario extends Procesos {


    public function login($json) {
        $_respuestas = new Respuestas;
        $datos = json_decode($json, true);

        if(!isset($datos['email']) || !isset($datos['password']) ){
            //error con los campos
            return $_respuestas->error_400();
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
                    return $_respuestas->error_200("La contraseña es invalida");
                }


            }else{
                //no existe el usuario
                return $_respuestas->error_200("no existe el correo $email");
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

