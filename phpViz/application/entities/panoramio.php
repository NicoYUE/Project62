<?php

class panoramio
{

    protected $latitude;
    protected $longitude;
    protected $date;
    protected $USER;
    protected $stationID;
    protected $distance;

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
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @param mixed $date
     */
    public function setDate($date)
    {
        $this->date = $date;
    }

    /**
     * @return mixed
     */
    public function getUSER()
    {
        return $this->USER;
    }

    /**
     * @param mixed $USER
     */
    public function setUSER($USER)
    {
        $this->USER = $USER;
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

    public function __construct($latitude, $longitude, $date, $USER, $stationID, $distance)
    {
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->date = $date;
        $this->USER = $USER;
        $this->stationID = $stationID;
        $this->distance = $distance;
    }
}

?>
