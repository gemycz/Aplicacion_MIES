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
    $encatest_ubicacion  = $obj['encatest_ubicacion'];

    if(($obj['encatest_ubicacion'] == "")){

        echo json_encode('Todos los campos son obligatorios');

    }else{
        
        $result = $conn->query("SELECT * FROM encabezado_test WHERE encatest_ubicacion='$encatest_ubicacion'");

        if($result->num_rows>0){
            echo json_encode('La Unidad de Atención ya existe');
        }else{
            $add = $conn->query("INSERT INTO unidad_Atencion (ua_zona, ua_servicio, ua_unidadatencion, ua_distrito, ua_modalidad) 
            VALUE ('$ua_zona','$ua_servicio','$ua_unidadatencion','$ua_distrito', '$ua_modalidad')");

            if($add){
                echo json_encode('Unidad de Atención registrada correctamente');
            }else{
                echo json_encode('Error al realizar el registro');
            }
        }
    }



    if(($obj['encatest_ubicacion'] != "")){
        
        $result = $conn->query("SELECT * FROM encabezado_test WHERE encatest_ubicacion='$encatest_ubicacion'");

        if($result->num_rows>0){
            echo json_encode('La Unidad de Atención ya existe');
        }else{
            $add = $conn->query("INSERT INTO unidad_Atencion (ua_zona, ua_servicio, ua_unidadatencion, ua_distrito, ua_modalidad) 
            VALUE ('$ua_zona','$ua_servicio','$ua_unidadatencion','$ua_distrito', '$ua_modalidad')");

            if($add){
                echo json_encode('Unidad de Atención registrada correctamente');
            }else{
                echo json_encode('Error al realizar el registro');
            }
        }
    }else{
        echo json_encode('Todos los campos son obligatorios');
    }
  
?>