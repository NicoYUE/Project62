<?php

class flickr
{

    protected $latitude;
    protected $longitude;
    protected $date_taken;
    protected $country;
    protected $stationID;
    protected $distance;

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
