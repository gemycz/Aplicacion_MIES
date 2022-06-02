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
    $nombres = $obj['nombres'];
    $apellidos = $obj['apellidos'];
    $cedula = $obj['cedula'];
    $fecha_nac = $obj['fecha_nacimiento'];
    $genero = $obj['genero'];
    $etnia = $obj['etnia'];
    $domicilio = $obj['domicilio'];
    $origen = $obj['pais_origen'];
    $fecha_reg = $obj['fecha_registro'];
    $img_path='./fotos_AM/' . $_FILES['photo']['name'];
    echo $genero;
    move_uploaded_file($_FILES['photo']['tmp_name'], './photos/' . $_FILES['photo']['name']);
    if(($obj['nombres'] != "") ||($obj['apellidos'] != "") || ($obj['cedula'] != "") || ($obj['fecha_nacimiento'] != "") || ($obj['domicilio'] != "") || ($obj['genero'] != "") || ($obj['pais_origen'] != "") || ($obj['etnia'] != "") || ($obj['fecha_registro'] != "")){
        $result = $conn->query("SELECT * FROM adulto_mayor WHERE am_cedula='$cedula'");

        if($result->num_rows>0){
            echo json_encode('Ya existe un registro con ese número de cédula');
        }else{
            $add = $conn->query("INSERT INTO adulto_mayor (am_nombres, am_apellidos, am_cedula, am_fechNac, am_genero, am_etnia, am_domicilio, am_origen, am_foto, am_fechReg) 
            VALUE ('$nombres','$apellidos','$cedula','$fecha_nac','$genero', '$etnia', '$domicilio','$origen', '$imgpath','$fecha_reg')");
            $img_pathComplete='http://192.168.1.5/pruebas_react/fotos_AM/'.$_FILES['photo']['name'];
            $query=$conn->prepare($add);
            $res=$query->execute([
                "imgpath" => $img_pathComplete,
        
            ]);

            if($res){
                $response["status"]=1;
                //echo json_encode('Usuario registrado correctamente');
            }else{
                //echo json_encode('Error al realizar el registro');
            }
        }
    }else{
        //echo json_encode('Todos los campos son obligatorios');
    }
  
?>