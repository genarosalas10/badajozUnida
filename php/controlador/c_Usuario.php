
<?php

require_once "../modelo/Respuestas.php";
require_once "../modelo/modelo.php";

/**
 * Controlador del usuario.
 */
class C_Usuario extends modelo {

    /**
     * Método encargado de gestionar el inicio de sesión.
     * 
     * @param array $datos - Correo y contraseña introducidos por el usuario
     * @return string|array - Puede devolver diferentes mensajes de error o los datos de la sesión dependiendo de si el login fue correcto o incorrecto
     */
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
                  unset($datos[0]['password']);
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

    /**
     * Método encargado de gestionar el alta de un nuevo usuario.
     *
     * @param array $datos - Nombre, apellidos, correo... introducidos por el usuario
     * @return string|function - Puede devolver diversos mensajes de error o llamar al método para completar el registro en caso de que todo esté correcto
     */
    public function registro($datos){
      //comprobar si recibe todos los campos necesarios
      if(!isset($datos['nombre']) || !isset($datos['apellidos']) || !isset($datos['email']) || !isset($datos['password']) ||!isset($datos['fechaNacimiento']) || !isset($datos['password2']) ){
        //error con los campos
        return $this->_respuestas->error_400();
      }else{
        if($datos['password']!=$datos['password2'])
        {
          //Las contraseñas no son iguales
          return $this->_respuestas->error_200("Las contraseñas no coinciden.");
        }else{
          if($this->validarCampos($datos)){
            $datos['password'] = parent::encriptar($datos['password']);
            return $this->realizarRegistro($datos);
          }else{
            return $this->_respuestas->error_200("Los campos son incorrectos.");
          }
        }
      }
    }

    /**
     * Se encarga de obtener los datos de un usuario.
     *
     * @param array $datos - Datos del usuario
     * @return string|array - Devolverá mensajes de error o los datos del usuario dependiendo de que tenga éxito o no
     */
    public function perfilUsuario($datos){
      if(isset($datos['idUsuario'])){
        $result = $this->obtenerPerfilUsuario($datos['idUsuario']);
        if($result!=0){
          return $result;
        }else{
          return $this->_respuestas->error_200("No hay usuario con ese id.");
        }
      }else{
        return $this->_respuestas->error_400();
      }
    }

    public function listado()
    {
      $result = $this->obtenerListado();
      if ($result != 0) {
        return $result;
      } else {
        return $this->_respuestas->error_200("No hay usuarios");
      }
    }
    /*
    public function modificarPerfilUsuario($datos){
      //comprobar si recibe todos los campos necesarios
      if(!isset($datos['nombre']) || !isset($datos['apellidos']) || !isset($datos['email'])  ||!isset($datos['fechaNacimiento']) ){
        //error con los campos
        return $this->_respuestas->error_400();
      }else{

          if($this->validarCampos($datos)){
            $datos['password'] = parent::encriptar($datos['password']);
            return $this->realizarRegistro($datos);
          }else{
            return $this->_respuestas->error_200("Los campos son incorrectos.");
          }
      }
    }
    */
    public function eliminarUsuario($datos){

      if(isset($datos['idUsuario'])){
        $result = $this->realizarEliminacion($datos['idUsuario']);
        if($result!=0){
          return 'Cuenta eliminada con éxito';
        }else{
          return $this->_respuestas->error_200("No hay usuario con ese id.");
        }
      }else{
        return $this->_respuestas->error_400();
      }
    }
    private function obtenerDatosUsuarioLogin($email){
        $query = "SELECT nombre,email,password,tipo FROM Usuario WHERE email ='$email';";
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
          return $this->_respuestas->error_200("No se pudo realizar el registro. Formato de campos invalidos.");
        }
      }
    }

   private function obtenerListado(){
     $query = "SELECT idUsuario,nombre,email,tipo FROM Usuario;";
     $datos = parent::obtenerDatos($query);
     if(isset($datos[0]["email"])){
       return $datos;
     }else{

       return 0;
     }
   }


  private function obtenerPerfilUsuario($idUsuario){
    $query = "SELECT nombre,apellidos,email,fechaNacimiento FROM Usuario WHERE idUsuario ='$idUsuario';";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["email"])){

      return $datos;
    }else{

      return 0;
    }
  }

  private function realizarEliminacion($idUsuario){
    $query="DELETE FROM Usuario WHERE idUsuario ='$idUsuario';";
    $datos = parent::nonQuery($query);
    if($datos!=0){
      return 1;
    }else{
      return 0;
    }
  }
  private function validarCampos($datos){

    $passRegex='/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,20}$/';
    if(!filter_var($datos['email'], FILTER_VALIDATE_EMAIL)){
      return false;
    }
    if(!preg_match($passRegex, $datos['password'])){
      return false;
    }
    return true;
  }
}

