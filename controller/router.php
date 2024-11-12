<?php
define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT'].'/');

if(!isset($_GET['uri'])){
    $_GET['uri'] = "/404/";
}

if($_GET['uri'] == 'router/'){
    $args = json_decode(file_get_contents('php://input'), true);

    $url = str_replace('/', '', $args['uri']);
    $search = true;

    if(($url != '') && 
        ($url != 'ayuda') && 
        ($url != 'comunidad') && 
        ($url != 'contacto') && 
        ($url != 'recursos') && 
        ($url != 'consejos') && 
        ($url != 'inicio')) {
            $search = false;
    }

    if($search){

        if($url == ''){
            $url = 'enterthesite';
        }

        ob_start();
        include ROOT_PATH . 'pages/' . $url . '.html';
        $RENDER_PAGE = ob_get_contents(); 
        ob_end_clean();

        $namePage = $url;
        if($namePage == 'enterthesite'){ $namePage = 'Bienvenido'; }
        $namePage = ucfirst($namePage);

        $response = [
            "success" => true,
            "html" => $RENDER_PAGE,
            "id" => "root",
            "webinfo" => [
                "title" => $namePage . " | Max"
            ]
        ];
    
        $jsonRender = json_encode($response);
        header('Content-Type: application/json');
        echo $jsonRender;
    } else {
        $response = [
            "success" => false,
        ];
    
        $jsonRender = json_encode($response);
        header('Content-Type: application/json');
        echo $jsonRender;
    }
} else {
    $url = str_replace('/', '', $_GET['uri']);
    if(($url != '') && 
        ($url != 'ayuda') && 
        ($url != 'comunidad') && 
        ($url != 'contacto') && 
        ($url != 'recursos') && 
        ($url != 'consejos') && 
        ($url != 'inicio')) {
            $url = "/404/";
    }

    if($url != "/404/"){
        include_once ROOT_PATH . 'index.php';
    } else {
        include_once ROOT_PATH . 'pages/404.html';
    }
}




?>