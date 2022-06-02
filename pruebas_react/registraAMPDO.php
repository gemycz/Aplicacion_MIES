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

    $json = file_get_contents('php://input');

    //Decodificando lo recibido en JSON y guardar en variable $obj.
    $obj = json_decode($json, true);

    //Las respuestas que se reciben se guardan en la variable $
    require("connect.php");
    $conn=connect();

    $nombres = $obj['nombres'];
    $apellidos = $obj['apellidos'];
    $cedula = $obj['cedula'];
    $fecha_nac = $obj['fecha_nacimiento'];
    $genero = $obj['genero'];
    $etnia = $obj['etnia'];
    $domicilio = $obj['domicilio'];
    $origen = $obj['pais_origen'];
    $fecha_reg = $obj['fecha_registro'];
    echo $genero;

    if(($obj['nombres'] != "") ||($obj['apellidos'] != "") || ($obj['cedula'] != "") || ($obj['fecha_nacimiento'] != "") || ($obj['domicilio'] != "") || ($obj['genero'] != "") || ($obj['pais_origen'] != "") || ($obj['etnia'] != "") || ($obj['fecha_registro'] != "")){

        $consulta = "SELECT * FROM adulto_mayor WHERE am_cedula='$cedula'";
        $rows = $conn->query($consulta);

        if($rows->columnCount() > 0){
            echo json_encode('Ya existe un registro con ese número de cédula');
        }else{

            $sql = 'INSERT INTO adulto_mayor (am_nombres, am_apellidos, am_cedula, am_fechNac, am_genero, am_etnia, am_domicilio, am_origen, am_fechReg) 
            VALUE (:nombres, :apellidos, :cedula, :fecha_nac, :genero, :etnia, :domicilio, :origen, :fecha_reg)';
            $sqlp = $conn->prepare($sql);
            $respuesta = $sqlp ->execute(array(':nombres'=>$nombres, ':apellidos'=>$apellidos, ':cedula'=>$cedula, ':fecha_nac'=>$fecha_nac,
                                  ':genero'=>$genero, ':etnia'=>$etnia, ':domicilio'=>$domicilio, ':origen'=>$origen, 
                                  ':fecha_reg'=>$fecha_reg)); 
        
            if($respuesta){
                    echo json_encode('Usuario registrado correctamente');
                }else{
                    echo json_encode($respuesta);
                    echo json_encode('Error al realizar el registro');
                }
        }

        //$result = $conn->query("SELECT * FROM adulto_mayor WHERE am_cedula='$cedula'");

        /*if($result->num_rows>0){
            echo json_encode('Ya existe un registro con ese número de cédula');
        }else{
            $add = $conn->query("INSERT INTO adulto_mayor (am_nombres, am_apellidos, am_cedula, am_fechNac, am_genero, am_etnia, am_domicilio, am_origen, am_fechReg) 
            VALUE ('$nombres','$apellidos','$cedula','$fecha_nac','$genero', '$etnia', '$domicilio','$origen','$fecha_reg')");

            if($add){
                echo json_encode('Usuario registrado correctamente');
            }else{
                echo json_encode('Error al realizar el registro');
            }
        }*/
    }else{
        echo json_encode('Todos los campos son obligatorios');
    }
  
?>