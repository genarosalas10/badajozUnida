
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
            $datos = $this->obtenerDatosUsuarioLoginConsultaPreparada($email);
            if($datos){
                //verificar si la contraseña es correcta
                if($password==$datos[0]['password']){
                  unset($datos[0]['password']);
                  unset($datos[0]['email']);
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

  /**
   * Se encarga de listar los usuarios
   *
   * @return string|array Devolverá un mensaje de error o la lista con todos los usuarios
   */

    public function listado()
    {
      $result = $this->obtenerListado();
      if ($result != 0) {
        return $result;
      } else {
        return $this->_respuestas->error_200("No hay usuarios");
      }
    }

  /**
   * Método para modificar los datos del usuario
   * @param $datos
   * @return array|int|string
   */
    public function modificarPerfilUsuario($datos){
      //comprobar si recibe todos los campos necesarios
      if(!isset($datos['nombre']) || !isset($datos['apellidos']) || !isset($datos['email']) || !isset($datos['idUsuario']) ){
        //error con los campos
        return $this->_respuestas->error_400();
      }else{
            return $this->realizarModificacion($datos);

      }
    }

    /**
     * Elimina a un usuario.
     *
     * @param array $datos - Datos del usuario
     * @return string - Mensaje de éxito o error
     */
    public function eliminarUsuario($datos){

      if(isset($datos['idUsuario'])) {
        $result = $this->realizarEliminacion($datos['idUsuario']);
        if ($result == 1) {
          return 'Cuenta eliminada con éxito';
        } else {
          return $result;
        }
      }
    }

  /**
   * Para buscar usuarios por el nombre
   * @param $datos
   * @return array|int
   */
  public function listarUsuariosByNombre($datos)
  {
    if(isset($datos['nombre'])){

      $result = $this->obtenerListadUsuarioByNombre($datos['nombre']);
      if ($result != 0) {
        return $result;
      } else {
        return $this->_respuestas->error_200("No hay coincidencias con ningún nombre de usuario");
      }
    }
    else{
      return $this->_respuestas->error_400();
    }

  }

  /**
   * Da permiso de administrador al usuario.
   *
   * @param array $datos - Datos del usuario
   * @return string - Mensaje de éxito o error
   */
  public function cambiarPermisosUsuarios($datos){

    if(isset($datos['idUsuario']) && isset($datos['tipoUsuario']) ){
      if($datos['tipoUsuario']=='u'){
        $result = $this->modificarTipoUsuario($datos['idUsuario'],'a');
      }elseif ($datos['tipoUsuario']=='a'){
        $result = $this->modificarTipoUsuario($datos['idUsuario'],'u');
      }
      if($result!=0){
        return 'Se han cambiado los permisos con exito';
      }else{
        return $this->_respuestas->error_200("No se ha podido realizar el cambio de tipo de usuario.");
      }
    }else{
      return $this->_respuestas->error_400();
    }
  }

  /**
   * Obtiene un listado con los usuarios que tengan coincidencias en el nombre
   * @param $datos
   * @return array|int
   */
  public function obtenerListadUsuarioByNombre($nombreUsuario)
  {
    $query = "SELECT idUsuario,nombre,email,tipo FROM Usuario WHERE replace(lower(nombre),' ','') like replace(lower('%$nombreUsuario%'),' ','');";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idUsuario"])){
      return $datos;
    }else{
      return 0;
    }
  }


  /**
     * Obtiene los datos de un usuario para gestionar el inicio de sesión.
     *
     * @param string $email
     * @return array|int - Datos del usuario o valor vacío según encuentre o no al usuario
     */
    private function obtenerDatosUsuarioLogin($email){
        $query = "SELECT idUsuario,nombre,email,password,tipo FROM Usuario WHERE email ='$email';";
        $datos = parent::obtenerDatos($query);
        if(isset($datos[0]["email"])){

            return $datos;
        }else{

            return 0;
        }
    }

  /**
   * Obtiene los datos de un usuario para gestionar el inicio de sesión.
   *
   * @param string $email
   * @return array|int - Datos del usuario o valor vacío según encuentre o no al usuario
   */
  private function obtenerDatosUsuarioLoginConsultaPreparada($email){
    $query = "SELECT idUsuario,nombre,email,password,tipo FROM Usuario WHERE email =?";
    $datos = parent::nonQueryConsultaPreparada($query,$email);
    if(isset($datos[0]["email"])){

      return $datos;
    }else{

      return 0;
    }
  }

    /**
     * Completa el proceso de registro.
     *
     * @param array $datos - Datos del usuario
     * @return int|string - Éxito o mensajes de error
     */
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

  /**
   * Saca una lista  con todos los usuarios de la BD.
   *
   * @return array|int - Datos de los usuarios o error
   */
  private function obtenerListado(){
    $query = "SELECT idUsuario,nombre,email,tipo FROM Usuario;";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["email"])){
      return $datos;
    }else{

      return 0;
    }
  }

  /**
   * Obtiene los datos de un usuario específico de la BD.
   *
   * @param int $idUsuario - ID del usuario
   * @return array|int - Datos del usuario o error
   */
  private function obtenerPerfilUsuario($idUsuario){
    $query = "SELECT nombre,apellidos,email,fechaNacimiento FROM Usuario WHERE idUsuario ='$idUsuario';";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["email"])){

      return $datos;
    }else{

      return 0;
    }
  }

  /**
   * Borra un usuario específico de la BD.
   *
   * @param int $idUsuario
   * @return int|array devuelve mensaje de error si ha fallado y 1 si ha realizado con éxito
   */
  private function realizarEliminacion($idUsuario){
    $query="DELETE FROM Usuario WHERE idUsuario ='$idUsuario';";
    $datos = parent::nonQuery($query);
    if($datos>0){
      return 1;
    }else{
      if(parent::errorId()==1451){
        return $this->_respuestas->error_200("El usuario está asociada a un evento.");
      }else{
        return $this->_respuestas->error_200("No se pudo borrar el usuario.");
      }
    }
  }

  /**
   * Para realizar la modificación de un usuario en la bd
   * @param $datos
   * @return array|int Devuelve un mensaje de error si falla y un 1 si es correcto
   */
  private function realizarModificacion($datos)
  {
    $query = "UPDATE Usuario SET nombre = '".$datos['nombre']."', apellidos = '".$datos['apellidos']."', email = '".$datos['email']."'
    WHERE idUsuario = '".$datos['idUsuario']."';";
    $datos = parent::nonQuery($query);
    if($datos>0){
      return "Se han modificado los datos con éxito";
    }else{
      $error=parent::errorId();
      if($error==0){
        return $this->_respuestas->error_200("No has realizado ninguna modificación en tus datos.");
      }
      if($error==1062){

        return $this->_respuestas->error_200("El correo ya existe.");
      }else{
        return $this->_respuestas->error_200("No se pudo realizar la modificación.");
      }
    }
  }

  /**
   * Cambiar el tipo de un usuario en concreto en la BD.
   *
   * @param int $idUsuario
   * @return int - Éxito o error
   */
  private function modificarTipoUsuario($idUsuario,$tipo){
    $query="UPDATE Usuario SET tipo = '$tipo'
    WHERE idUsuario = '$idUsuario';";
    $datos = parent::nonQuery($query);
    if($datos>0){
      return '1';
    }else{
      return 0;
    }
  }

  /**
   * Valida los campos introducidos.
   *
   * @param array $datos
   * @return boolean - Datos validados o no
   */
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

