<?php
	header("Access-Control-Allow-Origin:*");
	
	/* echo 'al menos has llegao';
	$respuesta = new stdClass();
	$respuesta->resultado = 'OK'; */
	/*$respuesta->$datos = new StdClass();*/
	/*$respuesta->$datos->atrib1 = 'El Sentido del Universo';
	/*$respuesta->$datos->atrib2 = 42;*/
	
	header('Content-Type: application/json; charset=utf-8');
	$data = json_decode(file_get_contents('php://input'), true);
	echo json_encode([$data["idEtapa"],$data["duracion"],$data["longitud"]] );
	
?>