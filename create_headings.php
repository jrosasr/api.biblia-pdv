<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

function createHeadingsDatabase() {
    $path = database_path('biblias/_headings.sqlite');
    
    // Create empty file
    File::put($path, "");
    
    // Connect to it
    config(['database.connections.headings' => [
        'driver' => 'sqlite',
        'database' => $path,
        'prefix' => '',
    ]]);
    
    $db = DB::connection('headings');
    
    $db->statement("DROP TABLE IF EXISTS headings");
    $db->statement("CREATE TABLE headings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_id INTEGER,
        chapter INTEGER,
        verse INTEGER,
        title TEXT
    )");
    
    // Sample Headings (Genesis)
    $headings = [
        [1, 1, 1, "La creación"],
        [1, 2, 1, "El día de reposo"],
        [1, 2, 4, "La formación del hombre y de la mujer"],
        [1, 3, 1, "La tentación y la caída"],
        [1, 4, 1, "Caín y Abel"],
        [1, 5, 1, "Los descendientes de Adán"],
        [1, 6, 1, "La maldad de los hombres"],
        [1, 6, 9, "Anuncio del diluvio"],
        [1, 7, 1, "El diluvio"],
        [1, 8, 1, "El fin del diluvio"],
        [1, 9, 1, "Pacto de Dios con Noé"],
        [1, 11, 1, "La torre de Babel"],
        [1, 12, 1, "Llamamiento de Abram"],
        // Add Juan 3 for testing
        [43, 3, 1, "Jesús y Nicodemo"],
        [43, 3, 22, "El testimonio de Juan el Bautista"],
    ];
    
    foreach ($headings as $h) {
        $db->table('headings')->insert([
            'book_id' => $h[0],
            'chapter' => $h[1],
            'verse' => $h[2],
            'title' => $h[3]
        ]);
    }
    
    return "Headings database created with " . count($headings) . " entries.";
}

echo createHeadingsDatabase();
