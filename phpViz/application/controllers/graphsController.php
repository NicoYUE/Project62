<?php

/**
 * Created by PhpStorm.
 * User: L
 * version: 1.0
 */
class graphsController extends Controller
{
    public function touristsAction()
    {
        return $this->model->Touristes();
    }

    public function nationalityAction()
    {
        return $this->model->Nationality();
    }

    public function clusterAction()
    {
        return $this->model->Cluster();
    }

    public function generalAction()
    {
        return $this->model->General();
    }
}