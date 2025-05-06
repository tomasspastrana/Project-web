<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "portfolio");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$telefono = $_POST['telefono'];
$email = $_POST['email'];
$mensaje = $_POST['mensaje'];

// Insertar en la base de datos
$sql = "INSERT INTO formulario (namee, surname, email, phone, smalltext)
        VALUES ('$nombre', '$apellido', '$email', '$telefono', '$mensaje')";

if ($conexion->query($sql) === TRUE) {
    echo "Formulario enviado con éxito. ¡Gracias por contactarte!";
} else {
    echo "Error: " . $conexion->error;
}

$conexion->close();
?>
