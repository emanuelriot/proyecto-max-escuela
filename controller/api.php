<?php
define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT'].'/');
$args = json_decode(file_get_contents('php://input'), true);

ob_start();
include ROOT_PATH . 'pages/mail_design.php';
$html = ob_get_contents(); 
ob_end_clean();

$to = $args['email']; 
$title = 'Gracias por contactarnos | Max'; 

$body = $html;

//Encabezado con el remitente 
$headers = "From:Mi nombre<micorreo@midominio.com>\r\n"; 
$headers .= "Content-type:text/html;charset=UTF-8"; 

if(mail($to,$title,$body,$headers)){
    $response = [
        "success" => true
    ];
} else {
    $response = [
        "success" => false
    ];
}

$jsonRender = json_encode($response);
header('Content-Type: application/json');
echo $jsonRender;

?>