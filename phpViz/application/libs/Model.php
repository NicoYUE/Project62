<?php

/**
 * Created by PhpStorm.
 * User: L
 * version: 1.0
 */
class Model
{
    static function getSelect($query)
    {
        $db = new Database();
        try {
            $results = $db->query($query);
            return $results;
        } catch (PDOException $err) {
            return null;
        }
    }
}