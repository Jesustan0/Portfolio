<?php

$host = "localhost";
$db = "u349060536_CASTEELS";
$user = "u349060536_CASTEELS";
$pass = "Lam3rn0ir300#";
$chrs = "utf8mb4";
$attr= "mysql:host=$host;dbname=$db;charset=$chrs";



$opts =[
PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,//pour la gestion d'erreurs
PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,//retourne les données sous forme d'un tableau associatif
PDO::ATTR_EMULATE_PREPARES => false//désactive l'emulation de requete preparer
];
try {
    $pdo = new PDO($attr, $user, $pass, $opts);
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
    // Arrête l'exécution du script si la connexion échoue
}


?>