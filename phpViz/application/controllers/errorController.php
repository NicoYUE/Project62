<?php

/**
 * Created by PhpStorm.
 * User: L
 * version: 1.0
 */
class errorController extends Controller
{
    public function errorAction()
    {
        require 'application/view/error.html';
    }
}