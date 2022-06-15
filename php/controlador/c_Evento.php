<?php
/**
 * Controlador de eventos
 */
class C_Evento extends modelo
{
  /** Método encargado de devolver la lista con todos los eventos
   *
   * @return array - Puede devolver diferentes mensajes de error o los datos dependiendo de si hay o no hay eventos
   */
  public function listarEventos()
  {
    $result = $this->obtenerListadoEventos();
    if ($result != 0) {
      return $result;
    } else {
      return $this->_respuestas->error_200("No hay eventos.");
    }
  }


  /** Método encargado de devolver la lista de los eventos creados por un usuario
   *
   * @return array - Puede devolver diferentes mensajes de error o los datos dependiendo de si hay o no hay eventos
   */
  public function listarEventosbyCreador($datos)
  {
    if (isset($datos['idCreador'])) {
      $result = $this->obtenerListadoEventosByCreador($datos['idCreador']);
      if ($result != 0) {
        return $result;
      } else {
        return $this->_respuestas->error_200("No has creado ningún evento.");
      }
    } else {
      return $this->_respuestas->error_400();
    }
  }

  /** Método encargado de devolver la lista de los eventos a los que participa un usuario
   *
   * @return array - Puede devolver diferentes mensajes de error o los datos dependiendo de si hay o no hay eventos
   */
  public function listarEventosbyParticipante($datos)
  {
    if (isset($datos['idParticipante'])) {
      $result = $this->obtenerListadoEventosByParticipante($datos['idParticipante']);
      if ($result != 0) {
        return $result;
      } else {
        return $this->_respuestas->error_200("No te has has apuntado ningún evento.");
      }
    } else {
      return $this->_respuestas->error_400();
    }
  }

  /**
   * Método encargado de crear eventos
   * @param $datos
   * @return array|string -- Puede devolver diferentes mensajes de error o un mensaje de éxito
   */
  public function crearEvento($datos)
  {
    //comprobar si recibe todos los campos necesarios
    if (!isset($datos['titulo']) || !isset($datos['descripcion']) || !isset($datos['fechaHora']) ||
      !isset($datos['imagen']) || !isset($datos['idUsuario']) || !isset($datos['idSubcategoria'])
      || !isset($datos['idUbicacion'])) {
      //error con los campos
      return $this->_respuestas->error_400();
    } else {
      $datos['imagen']=$this->procesarImage($datos['imagen']);

        $result = $this->realizarRegistroEvento($datos);

    }
    if ($result == 1){
      return 'Se ha creado con exito';
    }
    else {
      return $this->_respuestas->error_200("No se pudo realizar el registro");
    }
  }


  /**
   * Para obtener el listado de eventos de la bd
   * @return array|int  Puede devolver 0 si falla o los datos de las eventos
   */
  private function obtenerListadoEventos()
  {
    $query = "SELECT e.idEvento, e.titulo, e.imagen, e.descripcion, e.fechaHora ,
              u.nombre as 'nombreUbicacion', s.nombre as 'nombreSubcateogria', concat(u2.nombre,' ', u2.apellidos) as 'nombreCreador',
              (SELECT count(Participante.idEvento) FROM Participante INNER JOIN Evento ON Participante.idEvento= Evento.idEvento) as 'numParticipantes'
              FROM Evento e
              INNER JOIN Ubicacion u
              ON e.idUbicacion = u.idUbicacion
              INNER JOIN Subcategoria s
              ON e.idSubcategoria = s.idSubcategoria
              INNER JOIN Usuario u2
              ON e.idUsuario = u2.idUsuario
              ORDER BY e.fechaHora;";
    $datos = parent::obtenerDatos($query);
    if (isset($datos[0]["idEvento"])) {
      return $datos;
    } else {
      return 0;
    }
  }

  /**
   * Para obtener el listado de eventos creado por idUsuario de la bd
   * @return array|int  Puede devolver 0 si falla o los datos de los eventos
   */
  private function obtenerListadoEventosByCreador($idCreador)
  {
    $query = "select e.idEvento, e.titulo, e.imagen, e.descripcion, e.fechaHora ,
              u.nombre as 'nombreUbicacion', s.nombre as 'nombreSubcateogria', concat(u2.nombre,' ', u2.apellidos) as 'nombreCreador',
              (SELECT count(Participante.idEvento) FROM Participante INNER JOIN Evento ON Participante.idEvento= Evento.idEvento) as 'numParticipantes'
              from  Evento e
              inner join Usuario u2
              ON e.idUsuario = u2.idUsuario
              INNER JOIN Ubicacion u
              ON e.idUbicacion = u.idUbicacion
              INNER JOIN Subcategoria s
              ON e.idSubcategoria = s.idSubcategoria
              WHERE e.idUsuario ='$idCreador'
              ORDER BY e.fechaHora;";
    $datos = parent::obtenerDatos($query);
    if (isset($datos[0]["idEvento"])) {
      return $datos;
    } else {
      return 0;
    }
  }

  /**
   * Para obtener el listado de eventos en los que participa un idUsuario de la bd
   * @return array|int  Puede devolver 0 si falla o los datos de los eventos
   */
  private function obtenerListadoEventosByParticipante($idParticipante)
  {
    $query = "select e.idEvento, e.titulo, e.imagen, e.descripcion, e.fechaHora ,
              u.nombre as 'nombreUbicacion', s.nombre as 'nombreSubcateogria', concat(u2.nombre,' ', u2.apellidos) as 'nombreCreador',
              (SELECT count(Participante.idEvento) FROM Participante INNER JOIN Evento ON Participante.idEvento= Evento.idEvento) as 'numParticipantes'
              from Evento e
              inner join Usuario u2
              ON e.idUsuario = u2.idUsuario
              INNER JOIN Ubicacion u
              ON e.idUbicacion = u.idUbicacion
              INNER JOIN Subcategoria s
              ON e.idSubcategoria = s.idSubcategoria
              INNER JOIN Participante p
              ON e.idEvento = p.idEvento
              where p.idUsuario = '$idParticipante'
              order by e.fechaHora;";
    $datos = parent::obtenerDatos($query);
    if (isset($datos[0]["idEvento"])) {
      return $datos;
    } else {
      return 0;
    }
  }

  /**
   * Para realizar un registro en la bd
   * @param $datos
   * @return int Devuelve 1 si es correcto o 0 si ha fallado
   */
  function realizarRegistroEvento($datos)
  {
    $query = "INSERT INTO Evento (titulo, imagen, descripcion, fechaHora, idUbicacion,idUsuario, idSubcategoria)
                VALUES ('" . $datos['titulo'] . "', '" . $datos['imagen'] . "', '" . $datos['descripcion'] . "', '" . $datos['fechaHora'] . "'
                , '" . $datos['idUbicacion'] . "', '" . $datos['idUsuario'] . "', '" . $datos['idSubcategoria'] . "');";
    $resul = parent::nonQueryId($query);
    if ($resul) {
      return 1;
    } else {

      return 0;
    }
  }


  //Participantes

  /**
   * Método encargado de añadir un participante a un evento
   * @param $datos
   * @return array|string Devuelve un mensaje de éxito o un mensaje de error
   */
  public function anadirParticipante($datos)
  {
    //comprobar si recibe todos los campos necesarios
    if (!isset($datos['idUsuario']) || !isset($datos['idEvento'])) {
      //error con los campos
      return $this->_respuestas->error_400();
    } else {
      $result = $this->realizarAnadirParticipante($datos);
    }
    if ($result == 1)
      return 'Te has apuntado con éxito';
    else {
      return $result;
    }
  }

  /**
   * Método encargado de eliminar un participante a un evento
   * @param $datos
   * @return array|string Devuelve un mensaje de éxito o un mensaje de error
   */
  public function eliminarParticipante($datos)
  {
    if (isset($datos['idUsuario']) && isset($datos['idEvento'])) {
      $result = $this->realizarEliminacionParticipante($datos['idUsuario'], $datos['idEvento']);
      if ($result == 1) {
        return 'Te has desapuntado con éxito.';
      } else {
        return $result;
      }
    } else {
      return $this->_respuestas->error_400();
    }
  }

  /**
   * Método encargado de eliminar un evento
   * @param $datos
   * @return array|string Devuelve un mensaje de éxito o un mensaje de error
   */
  public function eliminarEvento($datos)
  {
    if (isset($datos['idUsuario']) && isset($datos['idEvento']) && isset($datos['imagen'])) {
      if($this->eliminarImagen($datos['imagen'])){
        $result = $this->realizarEliminacionEvento($datos['idUsuario'], $datos['idEvento']);
        if ($result == 1) {
          return 'Te has desapuntado con éxito.';
        } else {
          return $result;
        }
      } else{
        $this->_respuestas->error_200("No se ha podido borrar la iamgen");
      }

    } else {
      return $this->_respuestas->error_400();
    }
  }


  /**
   * Método encargado de sacar los eventos a los que se ha apuntado un usuario.
   * @param $datos
   * @return array Devuelve el resultado o el mensaje de error
   */
  public function listarEventosbyParticipanteSoloId($datos)
  {
    if(isset($datos['idUsuario'])){
      $result = $this->obtenerListarEventosbyParticipanteSoloId($datos['idUsuario']);
      if($result!=0){
        return $result;
      }else{
        return $this->_respuestas->error_200("No participas en ningun evento.");
      }
    }else{
      return $this->_respuestas->error_400();
    }
}



  /**
   * Para añadir un participante a un evento en la bd
   * @param $datos
   * @return array|int Devuelve un 1 si es correcto o un mensaje de error
   */
  function realizarAnadirParticipante($datos)
  {
    $query = "INSERT INTO Participante (idUsuario, idEvento)
                VALUES ('" . $datos['idUsuario'] . "', '" . $datos['idEvento'] . "');";
    $resul = parent::nonQueryId($query);
    if ($resul) {
      return 1;
    } else {
      $error = parent::errorId();
      if ($error == 1062) {
        return $this->_respuestas->error_200("Ya estás apuntado a este evento.");
      } else {
        return $this->_respuestas->error_200("No te has podido desapuntar. Inténtelo de nuevo.");
      }
    }
  }

  /**
   * Para añadir un participante a un evento en la bd
   * @param $idUsuario
   * @param $idEvento
   * @return array|int Devuelve un 1 si es correcto o un mensaje de error
   */
  private function realizarEliminacionParticipante($idUsuario, $idEvento)
  {
    $query = "DELETE FROM Participante WHERE idUsuario ='$idUsuario' AND idEvento ='$idEvento';";
    $datos = parent::nonQuery($query);
    if ($datos > 0) {
      return 1;
    } else {
      $error = parent::errorId();
      if ($error == 0) {
        return $this->_respuestas->error_200("No estás apuntado a este evento.");
      } else {
        return $this->_respuestas->error_200("No te has podido apuntar. Inténtelo de nuevo.");
      }
    }
  }

    private function realizarEliminacionEvento($idUsuario, $idEvento)
  {
    $query = "DELETE FROM Evento WHERE idUsuario ='$idUsuario' AND idEvento ='$idEvento';";
    $datos = parent::nonQuery($query);
    if ($datos > 0) {
      return 1;
    } else {
      $error = parent::errorId();
      if ($error == 0) {
        return $this->_respuestas->error_200("No has creado este evento.");
      } else {
        return $this->_respuestas->error_200("Fallo. Inténtelo de nuevo.");
      }
    }
  }

  /**
   * Para obtener los eventos a los que está apuntado un usuario
   * @param $idUsuario
   * @return array|int Devuelve el resultado si es correcto o 0 si no hay
   */
  private function obtenerListarEventosbyParticipanteSoloId($idUsuario)
  {
    $query = "select idEvento, idUsuario from Participante where idUsuario ='$idUsuario';";
    $datos = parent::obtenerDatos($query);
    if(isset($datos[0]["idUsuario"])){
      return $datos;
    }else{
      return 0;
    }
  }


  /**
   * Para guardar la imagen en el servidor
   * @param $img
   * @return string|0 Devuelve el nombre del archivo o 0 si no es una imagen
   */
  private function procesarImage($img)
  {
    $direccion = dirname(__DIR__)."/eventos/imagenes/";
    $partes = explode(";base64",$img);
    $extension = explode('/',mime_content_type($img))[1];
      $imagen_base64 = base64_decode($partes[1]);
      $nombre= uniqid().".".$extension;
      $file = $direccion.$nombre;
      file_put_contents($file,$imagen_base64);
      return $nombre;
  }

  /**
   * Elimina la imagen
   * @param $img
   * @return bool Devuelve true si se ha borrado correctamente o false si ha fallado
   */
  private function eliminarImagen($img){
    $direccion = dirname(__DIR__)."/eventos/imagenes/";
    $file=$direccion.$img;
    if(unlink($file))
    {
      return true;
    }else{
      return false;
    }
  }

}



