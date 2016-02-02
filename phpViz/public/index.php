<?php
/**
 * Created by PhpStorm.
 * User: L
 * version: 1.0
 */
chdir(dirname(__DIR__));
require 'application/libs/Controller.php';
require 'application/libs/Model.php';
require 'application/libs/Database.php';
require 'application/libs/QueryBuilder.php';
require 'application/config/path.php';
require 'application/config/database.php';

if (!isset($_GET['controller'])) {
    $controllerClassName = CONTROLLER_CLASS_PATH . 'homeController.php';
    $controllerName = 'homeController';
    $action = 'indexAction';

} else {
    $controllerClassName = CONTROLLER_CLASS_PATH . $_GET['controller'] . 'Controller.php';
    $controllerName = $_GET['controller'] . 'Controller';
    $action = $_GET['action'] . 'Action';
    $model = $_GET['controller'] . 'Model';
}

if (file_exists($controllerClassName)) {
    require $controllerClassName;
    $controller = new $controllerName();
    $controller->loadModel($model);
    if (method_exists($controller, $action)) {
        $controller->$action();
    }
} else {
    $controllerClassName = CONTROLLER_CLASS_PATH . 'errorController.php';
    $controllerName = 'errorController';
    $action = 'errorAction';
    require $controllerClassName;
    $controller = new $controllerName();
    $controller->$action();
}

