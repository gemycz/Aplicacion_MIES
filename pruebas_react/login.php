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

//Obtener el JSON recibido en la variable $json
$json = file_get_contents('php://input');

//Decodificando lo recibido en JSON y guardar en variable $obj.
$obj = json_decode($json, true);

//Las respuestas que se reciben se guardan en la variable $
$usuario = $obj['usuario'];
$clave = $obj['clave'];

$sql = "SELECT * FROM tecnico where tecn_nomuser='$usuario' && tecn_clave='$clave'";

$result = $conn->query($sql);

if ($obj['usuario'] != "" || $obj['clave'] != "") {
    if ($result->num_rows > 0) {
        while ($row[] = $result->fetch_assoc()) {
            $tem = $row;
        }
        echo json_encode("Ok");
    } else {
        echo json_encode("No");
    }
} else {
    echo json_encode('Intente nuevamente...');
}


