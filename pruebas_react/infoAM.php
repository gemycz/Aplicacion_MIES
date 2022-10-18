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

$am_id = $_GET["am_id"];
//Las respuestas que se reciben se guardan en la variable $
//$am_id = $obj['am_id'];

$sql = "SELECT * FROM adulto_mayor WHERE am_id='$am_id'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row[] = $result->fetch_assoc()) {
        $tem = $row;
    }
    echo json_encode($tem);
} else {
    echo json_encode("No");
}

