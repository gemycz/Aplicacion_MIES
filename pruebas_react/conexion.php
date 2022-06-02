<?php
	//Servidor
function connect(){
	$servidor = "localhost";

	//Nombre de la Base de datos
	$db = "miesdb";

	//Usuario DB.
	$usuario = "root";

	//Clave DB.
	$clave = "";

	//
	try{
        $result= new PDO("mysql:host=$servidor;dbname=$db;charset=utf8",$usuario,$clave);
        $result->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e){

        throw new \Exception("ERROR: " . $e->getMessage());
    }
    return $result;
    }
?>