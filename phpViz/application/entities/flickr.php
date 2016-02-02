<?php

class flickr
{

    protected $latitude;
    protected $longitude;
    protected $date_taken;
    protected $country;
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
    public function getDateTaken()
    {
        return $this->date_taken;
    }

    /**
     * @param mixed $date_taken
     */
    public function setDateTaken($date_taken)
    {
        $this->date_taken = $date_taken;
    }

    /**
     * @return mixed
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * @param mixed $country
     */
    public function setCountry($country)
    {
        $this->country = $country;
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


    public function __construct($latitude, $longitude, $date_taken, $country, $stationID, $distance)
    {
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->date_taken = $date_taken;
        $this->country = $country;
        $this->stationID = $stationID;
        $this->distance = $distance;
    }
}

?>
