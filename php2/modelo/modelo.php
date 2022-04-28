<?php
class Modelo{
    function __construct(){
        // require ('./config/configdb.php');
        require ('../operaciones/operacionesbd.php');
        //llamar operaciones bd
        $this->operaciones = new Operaciones();
    }
    public function alta($descripcion, $audio, $imagen, $tipo){

        // echo $consulta;
        //Insertamos los datos en la base de datos
        $consulta = "INSERT INTO Flashcards (descripcion, audioUrl, img, tipo) VALUES ($descripcion,$audio, $imagen, $tipo);";
       $this->operaciones->consulta($consulta);   
    }
    public function modificar($id,$descripcion, $audio, $imagen, $tipo){
        //Actualizamos los datos en la bd
        $consulta = "UPDATE Flashcards SET descripcion = $descripcion, audioUrl=$audio, img=$imagen, tipo=$tipo WHERE idFlashcard =$id";
       $this->operaciones->consulta($consulta);
        //echo $consulta;   
    }
    public function borrado($id){
        //Recibimos el id de flashcard para poder borrar los datos de la base de datos
        $consulta = "DELETE FROM Flashcards WHERE idFlashcard = $id";
       $this->operaciones->consulta($consulta);

    }
    public function obtenerId($id){
        //Obtenemos el id para poder listar los datos
        $consulta = 'SELECT * FROM Flashcards WHERE idFlashcard ='.$id;
        $this->operaciones->consulta($consulta);
        return $filas = $this->operaciones->fila_assoc();
    }
    public function listar(){
        $consulta = "SELECT * FROM Flashcards";
        $this->operaciones->consulta($consulta);

        $datos=array();
        while($filas = $this->operaciones->fila_assoc()){
            //Insertamos datos en el array para mostrar posteriormente
            array_push($datos,
            [
                "Flashcard" =>$filas['idFlashcard'],
                "Descripcion" =>$filas['descripcion'],
                "Fonetica" =>$filas['audioUrl'],
                "Imagen" =>$filas['img'],
                "Tipo" =>$filas['tipo']
            ]
            );
        }
        return $datos;
    }   
    function devolverId(){
      return $this->conexion->ultimoInsert_id();
     }
  
}