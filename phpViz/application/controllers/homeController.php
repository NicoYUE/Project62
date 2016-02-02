<?php

/**
 * Created by PhpStorm.
 * User: L
 * version: 1.0
 */
class homeController extends Controller
{
    public function indexAction()
    {
        require 'application/view/home.html';
    }
}