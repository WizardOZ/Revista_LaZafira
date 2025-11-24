<?php
/**
 * Lee el archivo fechas.txt y lo procesa en dos formatos:
 * uno para el calendario y otro para la tabla.
 */
function getFechasData() {
    $filePath = 'fechas.txt';
    $eventos = [];
    $lista = [];
    $today = new DateTime();
    $today->setTime(0, 0, 0); // Establecer la hora a medianoche para comparaciones de solo fecha

    if (!file_exists($filePath)) {
        return ['eventos' => [], 'lista' => []];
    }

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach ($lines as $line) {
        $parts = preg_split('/\s+/', $line, 4); // Divide en 4 partes (D, M, Y, Resto)
        
        if (count($parts) >= 4) {
            $dia = str_pad($parts[0], 2, '0', STR_PAD_LEFT);
            $mes = str_pad($parts[1], 2, '0', STR_PAD_LEFT);
            $ano = $parts[2];
            $descripcion = $parts[3];
            
            // 1. Para el calendario (formato YYYY-MM-DD)
            $fechaISO = "$ano-$mes-$dia";
            $eventos[$fechaISO] = $descripcion;
            
            // 2. Para la tabla
            $dateObj = DateTime::createFromFormat('Y-m-d', $fechaISO);
            if ($dateObj === false) continue; // Si la fecha es inválida, saltar
            
            $dateObj->setTime(0, 0, 0); // Asegurar que la hora es medianoche
            
            $formattedDate = "$dia/$mes/$ano";
            $status = ($dateObj < $today) ? 'Finalizado' : 'Abierta';
            
            $lista[] = [
                'formattedDate' => $formattedDate,
                'text' => $descripcion,
                'status' => $status
            ];
        }
    }
    
    return ['eventos' => $eventos, 'lista' => $lista];
}
?>