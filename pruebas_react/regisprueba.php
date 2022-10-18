<?php
//Evitar error de cords (Se presenta al usar https en el servidor)
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Accept-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
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

if ($conn->connect_error) {
    die("Conexión fallida:" . $conn->connect_error);
}


$json = file_get_contents('php://input');

//Decodificando lo recibido en JSON y guardar en variable $obj.
$obj = json_decode($json, true);

//Las respuestas que se reciben se guardan en la variable $
$checked = $obj['checked'];
$checked1 = $obj['checked1'];
$checked2 = $obj['checked2'];
$checked3 = $obj['checked3'];
$checked4 = $obj['checked4'];
$checked5 = $obj['checked5'];
$checked6 = $obj['checked6'];
$checked7 = $obj['checked7'];
$checked8 = $obj['checked8'];
$checked9 = $obj['checked9'];
$checked10 = $obj['checked10'];
$checked11 = $obj['checked11'];
$checked12 = $obj['checked12'];
$checked13 = $obj['checked13'];
$checked14 = $obj['checked14'];
$fechaInicial = $obj['fechaInicial'];
$fechaFinal = $obj['fechaFinal'];
$time = $obj['time'];
$estado = $obj['estado'];

if (($obj['checked'] != "") && ($obj['checked1'] != "") && ($obj['checked2'] != "") && ($obj['checked3'] != "") && ($obj['checked4'] != "") && ($obj['checked5'] != "") && ($obj['checked6'] != "") && ($obj['checked7'] != "") && ($obj['checked8'] != "") && ($obj['checked9'] != "") && ($obj['checked10'] != "") && ($obj['checked11'] != "") && ($obj['checked12'] != "") && ($obj['checked13'] != "") && ($obj['checked14'] != "")) {

    $add = $conn->query("INSERT INTO escala_yesavage (p1_satisfecho, p2_actividades, p3_vacio, p4_aburrido, p5_animo, p6_preocupado, p7_feliz, p8_desamparado, p9_cosas, p10_memoria, p11_estar_vivo, p12_inutil_despreciable, p13_energia, p14_esperanza_actual, p15_cree_mejor,tiempo_inicial,tiempo_final,tiempo_total,estado) 
            VALUE ('$checked','$checked1','$checked2','$checked3','$checked4','$checked5','$checked6','$checked7','$checked8','$checked9','$checked10','$checked11','$checked12','$checked13','$checked14','$fechaInicial','$fechaFinal','$time','$estado')");
    if ($add) {
        echo json_encode("Ok");
    } else {
        echo json_encode("No");
    }
} else {
    echo json_encode('Todos los campos son obligatorios');
}

