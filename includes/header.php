<?php
// Usamos una variable para el título que definiremos en cada página
if (!isset($pageTitle)) {
    $pageTitle = "Revista Cultural"; // Título por defecto
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
    <meta name="description" content="La Zafira - Revista cultural con convocatorias abiertas." />
    <title><?php echo htmlspecialchars($pageTitle); ?> - La Zafira</title>
    
    <link rel="shortcut icon" href="img/simbolo_lazafira.png">
    <link rel="stylesheet" href="css/styles.css" />
    <link rel="stylesheet" href="css/styles_convocatorias.css" />
    <link rel="stylesheet" href="css/styles_formulario.css" />
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    
<header class="main-header">
    <a href="index.php" class="header-logo-link">
        <img id="header-logo" src="img/cabecera.png" alt="Logo La Zafira">
    </a>
    
    <nav class="main-nav">
        <ul>
            <li><a href="index.php" class="line">Inicio</a></li>
            <li class="envios-container">
                <a href="#" class="line" aria-haspopup="true">Convocatorias</a>
                <ul class="dropdown-menu">
                    <li><a href="texto.php">Texto</a></li>
                    <li><a href="portada.php">Portada</a></li>
                    <li><a href="obra.php">Obra Gráfica</a></li>
                </ul>
            </li>
            <li><a href="zafira.php" class="line">¿Quiénes Somos?</a></li>
        </ul>
    </nav>
</header>