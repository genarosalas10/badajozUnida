
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
                    return $this->_respuestas->error_200("El correo y/o contraseña son incorrectos. ");
                }


            }else{
                //no existe el usuario
                return $this->_respuestas->error_200("El correo y/o contraseña son incorrectos.");
            }
        }
    }

    public function registro($datos){
      //comprobar si recibe todos los campos necesarios
      if(!isset($datos['nombre']) || !isset($datos['apellidos']) || !isset($datos['email']) || !isset($datos['password']) ||!isset($datos['fechaNacimiento']) || !isset($datos['password2']) ){
        //error con los campos
        return $this->_respuestas->error_400();
      }else{
        if($datos['password']==$datos['password2'])
        {
          $datos['password'] = parent::encriptar($datos['password']);
          return $this->realizarRegistro($datos);
        }else
          //La contraseña no son iguales
          return $this->_respuestas->error_200("Las contraseñas no son iguales. ");
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

    private function realizarRegistro($datos){
      $query = "INSERT INTO Usuario (nombre, apellidos, email, password, fechaNacimiento)
                VALUES ('".$datos['nombre']."', '".$datos['apellidos']."','".$datos['email']."','".$datos['password']."','".$datos['fechaNacimiento']."');";
      $resul = parent::nonQueryId($query);
      if($resul){

        return 1;
      }else{
        $error=parent::errorId();
        if($error==1062){

          return $this->_respuestas->error_200("El correo ya existe.");
        }else{
          return $this->_respuestas->error_200("No se puedo realizar el registro.");
        }
      }
    }
}

