<?php

require 'connection.php';

function checkNom($a){
    if(isset($a)){
        if(strlen($a) > 1 && strlen($a) < 51){
            return true;
        } else {
            return false;
        }
    }
}

function checkPrenom($a){
    if(isset($a)){
        if(strlen($a) > 1 && strlen($a) < 51){
            return true;
        } else {
            return false;
        }
    }
}

function checkMessage($a){
    if(isset($a)){
        if(strlen($a) > 1){
            return true;
        } else {
            return false;
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_POST['prenom']) && isset($_POST['Nom']) && isset($_POST['mail']) && isset($_POST['message'])){
        $sql= "INSERT INTO portfolio (prenom, nom, mail, message) VALUES (?,?,?,?)";
        $res= $pdo->prepare($sql);
        $prenom = $_POST['prenom'];
        $nom = $_POST['Nom'];
        $mail = $_POST['mail'];
        $message = $_POST['message'];
        if(checkPrenom($prenom) && checkNom($nom) && checkMessage($message)){
            $res->execute([$prenom, $nom, $mail, $message]);
            echo "<p class='mycss'>Le formulaire a été envoyé avec succès!</p>";
        }
    }
}
?>
<style>
    .mycss{
        margin: 50px 50px 50px;
        padding: 10px 20px;
        background: rgba(255, 255, 255, 0.08);
        color: #ffb742;
        border-radius: 12px;
        border: 1px solid #ffb742;
    }
</style>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>hire-me</title>
</head>
<body>
    <form action="hire.php" method="post">
        <label for="prenom">Prénom :</label><br>
        <input type="text" id="prenom" name="prenom" required><br>
        <label for="Nom">Nom :</label><br>
        <input type="text" id="Nom" name="Nom" required><br>
        <label for="mail">Mail :</label><br>
        <input type="text" id="mail" name="mail" required><br>
        <label for="message">Info :</label><br>
        <textarea name="message"></textarea><br>
        <input type="submit">
    </form>
</body>
</html>

