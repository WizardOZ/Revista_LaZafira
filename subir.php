<?php
// Configuración de conexión a la base de datos
$host = 'localhost'; // Servidor de MySQL
$dbname = 'lazafira'; // Nombre de la base de datos
$user = 'root'; // Usuario por defecto de XAMPP
$password = ''; // Contraseña vacía en XAMPP

try {
    // Crear conexión con PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error en la conexión a la base de datos: " . $e->getMessage());
}

// Procesar los datos del formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Capturar los datos enviados desde el formulario
    $nombre = $_POST['nombre'] ?? '';
    $apellidos = $_POST['apellidos'] ?? '';
    $correo_electronico = $_POST['correo_electronico'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $titulo = $_POST['titulo'] ?? '';
    $comentarios = $_POST['comentarios'] ?? '';
    $tipoConvocatoria = $_POST['tipoConvocatoria'] ?? '';

    // Procesar archivo subido
    $directorio = 'uploads/'; // Carpeta donde se guardará el archivo
    $archivo_nombre = $_FILES['archivo']['name']; // Nombre original del archivo
    $archivo_tmp = $_FILES['archivo']['tmp_name']; // Ruta temporal del archivo
    $archivo_ruta = $directorio . basename($archivo_nombre); // Ruta completa del archivo

    // Crear el directorio si no existe
    if (!file_exists($directorio)) {
        mkdir($directorio, 0777, true);
    }

    // Mover el archivo subido a la carpeta
    if (move_uploaded_file($archivo_tmp, $archivo_ruta)) {
        try {
            // Preparar la consulta SQL para insertar los datos
            $sql = "INSERT INTO autores (nombre, apellidos, correo_electronico, telefono, titulo, archivo, comentarios, tipoConvocatoria)
                    VALUES (:nombre, :apellidos, :correo_electronico, :telefono, :titulo, :archivo, :comentarios, :tipoConvocatoria)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':nombre' => $nombre,
                ':apellidos' => $apellidos,
                ':correo_electronico' => $correo_electronico,
                ':telefono' => $telefono,
                ':titulo' => $titulo,
                ':archivo' => $archivo_ruta,
                ':comentarios' => $comentarios,
                ':tipoConvocatoria' => $tipoConvocatoria
            ]);

            echo("Datos guardados y archivo subido correctamente.");
            header("Location:http://localhost/LaZafira/index.html");
            exit();
        } catch (PDOException $e) {
            echo("Error al guardar los datos: ") . $e->getMessage();
        }
    } else {
        echo("Error al subir el archivo.");
    }
} else {
    echo("Método de solicitud no válido.");
}
?>