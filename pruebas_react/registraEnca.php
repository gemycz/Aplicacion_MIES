<?php 
    //Evitar error de cords (Se presenta al usar https en el servidor)
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Accept-Control-Request-Method");
	header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	header("Allow: GET, POST, OPTIONS, PUT, DELETE");
	$method = $_SERVER['REQUEST_METHOD'];
	if($method == "OPTIONS"){
		die();
	}
    //Servidor
    $servidor = "localhost";

    //Nombre de la Base de datos
    $db = "miesdb";

    //Usuario DB.
    $usuario = "root";

    //Clave DB.
    $clave = "";

    //Conexion
    $conn = new mysqli($servidor, $usuario, $clave, $db);

    if($conn->connect_error){
        die("Conexión fallida:" .$conn->connect_error);
    }
    

    $json = file_get_contents('php://input');

    //Decodificando lo recibido en JSON y guardar en variable $obj.
    $obj = json_decode($json, true);

    //Las respuestas que se reciben se guardan en la variable $
    $nombreUsuario = $obj['nombreUsuario'];
    $unidadAtencion = $obj['unidadAtencion'];
    $zona = $obj['zona'];
    $distrito = $obj['distrito'];
    $modalidad = $obj['modalidad'];
    $edad = $obj['edad'];
    $fecha_registro = $obj['fecha_registro'];
    $aplicadoPor = $obj['aplicadoPor'];

 
   if(($obj['nombreUsuario'] != "") && ($obj['unidadAtencion'] != "") && ($obj['zona'] != "") && ($obj['distrito'] != "") && ($obj['modalidad'] != "") && ($obj['edad'] != "") && ($obj['fecha_registro'] != "") && ($obj['aplicadoPor'] != "")){
            $add = $conn->query("INSERT INTO encabezado_test (enca_nomuser,enca_uniAt, enca_zona, enca_distrito, enca_modalidad, enca_edad, enca_fechaAp, enca_aplicapor) VALUE ('$nombreUsuario','$unidadAtencion','$zona','$distrito','$modalidad', '$edad', '$fecha_registro','$aplicadoPor')");

            if($add){
                echo json_encode("Ok");
            }else{
                echo json_encode("No");
            }
    }else{
        echo json_encode('Los campos son obligatorios');
    }


?>