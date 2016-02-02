<?php

class tripadvisor
{

    protected $rating;
    protected $latitude;
    protected $longitude;
    protected $typeR;
    protected $date;
    protected $user;
    protected $country;
    protected $age;
    protected $sexe;
    protected $stationid;
    protected $distance;

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

    /**
     * @return mixed
     */
    public function getStationid()
    {
        return $this->stationid;
    }

    /**
     * @param mixed $stationid
     */
    public function setStationid($stationid)
    {
        $this->stationid = $stationid;
    }

    /**
     * @return mixed
     */
    public function getSexe()
    {
        return $this->sexe;
    }

    /**
     * @param mixed $sexe
     */
    public function setSexe($sexe)
    {
        $this->sexe = $sexe;
    }

    /**
     * @return mixed
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * @param mixed $age
     */
    public function setAge($age)
    {
        $this->age = $age;
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
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
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
    public function getTypeR()
    {
        return $this->typeR;
    }

    /**
     * @param mixed $typeR
     */
    public function setTypeR($typeR)
    {
        $this->typeR = $typeR;
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
    public function getRating()
    {
        return $this->rating;
    }

    /**
     * @param mixed $rating
     */
    public function setRating($rating)
    {
        $this->rating = $rating;
    }


    public function __construct($nom, $rating, $latitude, $longitude, $date, $typeR, $user, $country, $age, $sexe)
    {
        $this->nom = $nom;
        $this->rating = $rating;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->date = $date;
        $this->typeR = $typeR;
        $this->user = $user;
        $this->country = $country;
        $this->age = $age;
        $this->sexe = $sexe;
    }

}

?>
