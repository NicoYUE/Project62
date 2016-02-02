<?php

/**
 * Created by PhpStorm.
 * User: L
 * version: 1.0
 */
class Controller
{
    public function loadModel($name)
    {
        $path = MODELS_CLASS_PATH . $name . '.php';
        if (file_exists($path)) {
            require $path;
            $modelName = $name;
            $this->model = new $modelName();
        }
    }
}