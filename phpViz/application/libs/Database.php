<?php

/**
 * Created by PhpStorm.
 * User: L
 * version: 1.0
 */
class Database extends PDO
{
    public function __construct()
    {
        parent::__construct(DB_TYPE . ':host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASS);
    }
}