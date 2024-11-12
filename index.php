<?php 
    $uri = str_replace('/', '', $_GET['uri']);
    $name = $uri;
    $name == '' ? $name = 'Bienvenido' : $name = ucfirst($name);
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=$name;?> | MAX</title>
    <link rel="shortcut icon" href="/assets/images/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="/assets/css/reset.css">
    <link rel="stylesheet" href="/assets/css/page.css">
    <script src="/assets/js/router.js"></script>
    <script src="/assets/js/page.js"></script>
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Bienvenido a MAX">
    <meta property="og:description" content="Bienvenido a MAX">
    <meta property="og:image" content="/assets/images/imagepage.jpeg">
</head>

<body>
    <?php include_once ROOT_PATH . 'pages/loader.html'; ?>
    <?php include_once ROOT_PATH . 'pages/menu.html'; ?>   

    <div id="root">
        <?php
            if($uri == ""){ $uri = 'enterthesite';}
            include_once ROOT_PATH . 'pages/' . $uri . '.html';
        ?>    
    </div>
</body>

</html>