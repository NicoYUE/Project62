<?php

class instagram
{

    protected $idUser;
    protected $dateCreation;
    protected $latitude;
    protected $longitude;
    protected $stationID;
    protected $distance;

    /**
     * @return mixed
     */
    public function getDateCreation()
    {
        return $this->dateCreation;
    }

    /**
     * @param mixed $dateCreation
     */
    public function setDateCreation($dateCreation)
    {
        $this->dateCreation = $dateCreation;
    }

    /**
     * @return mixed
     */
    public function getLatitude()
    {
        return $this->latitude;
    }

    /**
     * @param mixed $latitude
     */
    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;
    }

    /**
     * @return mixed
     */
    public function getIdUser()
    {
        return $this->idUser;
    }

    /**
     * @param mixed $idUser
     */
    public function setIdUser($idUser)
    {
        $this->idUser = $idUser;
    }

    /**
     * @return mixed
     */
    public function getLongitude()
    {
        return $this->longitude;
    }

    /**
     * @param mixed $longitude
     */
    public function setLongitude($longitude)
    {
        $this->longitude = $longitude;
    }

    /**
     * @return mixed
     */
    public function getStationID()
    {
        return $this->stationID;
    }

    /**
     * @param mixed $stationID
     */
    public function setStationID($stationID)
    {
        $this->stationID = $stationID;
    }

    /**
     * @return mixed
     */
    public function getDistance()
    {
        return $this->distance;
    }

    /**
     * @param mixed $distance
     */
    public function setDistance($distance)
    {
        $this->distance = $distance;
    }

    public function __construct($idUser, $dateCreation, $latitude, $longitude, $stationID, $distance)
    {
        $this->idUser = $idUser;
        $this->dateCreation = $dateCreation;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->stationID = $stationID;
        $this->distance = $distance;
    }
}

?>
