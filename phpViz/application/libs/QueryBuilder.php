<?php

/**
 * Created by PhpStorm.
 * User: L
 * version: 1.0
 */
class QueryBuilder
{

    //We have different kind of parameters. Nationality, Age, Sexe.
    //Because they won't have the same size all the time, we use array so we take into account what is in the array.
    //idname will be the id in the html so we can recognize what parameter we studied in the frontend.
    private function From($tab, $lineID)
    {
        switch ($tab) {
            case '1':
                return ' FROM line' . $lineID;
            case '2':
                return ' FROM line' . $lineID;
            case '3':
                return ' FROM line' . $lineID;
        }
    }

    private function DataWhere($tab)
    {
        switch ($tab) {
            case '1':
                return '';
            case '2':
                return ' origin IN ("tripadvisor", "flickr") AND';
            case '3':
                return ' origin = "tripadvisor" AND';
        }
    }

    public function SIDWhere($array)
    {
        return ' stationID="' . $array . '"';
    }

    public function YWhere($array)
    {
        $date = explode(',', $array);
        return " SUBSTRING_INDEX(date, '-', 1) BETWEEN " . $date[0] . " AND " . $date[1];
    }

    public function NWhere($array)
    {
        $NWhereQuery = ' country IN(';
        if (count($array)) {
            foreach ($array as $value) {
                $NWhereQuery .= '"' . $value . '",';
            }
            $NWhereQuery = substr($NWhereQuery, 0, strlen($NWhereQuery) - 1) . ")";
            return $NWhereQuery;
        } else {
            return null;
        }
    }

    public function SWhere($array)
    {
        $SWhereQuery = ' sex IN(';
        if (count($array)) {
            foreach ($array as $value) {
                $SWhereQuery .= '"' . $value . '",';
            }
            $SWhereQuery = substr($SWhereQuery, 0, strlen($SWhereQuery) - 1) . ")";
            return $SWhereQuery;
        } else {
            return null;
        }
    }

    public function AWhere($array)
    {
        $AWhereQuery = ' age IN(';
        if (count($array)) {
            foreach ($array as $value) {
                if ($value == "-12") {
                    $AWhereQuery .= '"2-10",';
                } else {
                    $AWhereQuery .= '"' . $value . '",';
                }
            }
            $AWhereQuery = substr($AWhereQuery, 0, strlen($AWhereQuery) - 1) . ")";
            return $AWhereQuery;
        } else {
            return null;
        }
    }

    public function LatLng($lat, $lng)
    {
        $distance = ' (6371000 * acos ( cos ( radians(' . $lat . ') )
            * cos( radians(latitude) )
            * cos( radians(longitude) - radians(' . $lng . ') )
            + sin ( radians(' . $lat . ') )
            * sin( radians(latitude) ) ) ) <=300';
        return $distance;
    }

    public function QueryBuild($tab, $date, $lineID, $countries, $sexe, $age, $lat, $long)
    {
        $from = $this->From($tab, $lineID);
        $year = $this->YWhere($date);
        $center = $this->LatLng($lat, $long);
        $source = $this->DataWhere($tab);
        if ($tab == "3") {
            $country = $this->NWhere($countries);
            $sexe = $this->SWhere($sexe);
            $age = $this->AWhere($age);
            if ($country != null) {
                if ($sexe != null) {
                    if ($age != null) {
                        return 'SELECT *' . $from . ' WHERE' . $source . $year . ' AND' . $country . ' AND' . $age . ' AND' . $sexe . ' AND' . $center . ' LIMIT 4000;';
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else if ($tab == "2") {
            $country = $this->NWhere($countries);
            if ($country != null) {
                return 'SELECT *' . $from . ' WHERE' . $source . $year . ' AND' . $country . ' AND' . $center . ' LIMIT 4000;';
            } else {
                return null;
            }
        } else {
            return 'SELECT *' . $from . ' WHERE' . $source . $year . ' AND' . $center . ' LIMIT 4000;';
        }
    }

    public function QueryBuildCount($tab, $stationID, $lineID, $date, $countries, $sexe, $age)
    {
        $station = $this->SIDWhere($stationID);
        $from = $this->From($tab, $lineID);
        $year = $this->YWhere($date);
        $source = $this->DataWhere($tab);
        if ($tab == "3") {
            $country = $this->NWhere($countries);
            $sexe = $this->SWhere($sexe);
            $age = $this->AWhere($age);
            if ($country != null) {
                if ($sexe != null) {
                    if ($age != null) {
                        return 'SELECT sex, age, country, count(*) AS num' . $from . ' WHERE' . $source . $year . ' AND' . $country . ' AND' . $age . ' AND' . $sexe . ' AND' . $station . " GROUP BY age,sex,country LIMIT 4000";
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } else if ($tab == "2") {
            $country = $this->NWhere($countries);
            if ($country != null) {
                return "SELECT country, count(*) AS total,
                        sum(case when SUBSTRING_INDEX(SUBSTRING_INDEX(date, '-', 2),'-',-1) IN('03','04','05') then 1 else 0 end) AS Spring,
                        sum(case when SUBSTRING_INDEX(SUBSTRING_INDEX(date, '-', 2),'-',-1) IN('06','07','08') then 1 else 0 end) AS Summer,
                        sum(case when SUBSTRING_INDEX(SUBSTRING_INDEX(date, '-', 2),'-',-1) IN('09','10','11') then 1 else 0 end) AS Autumn,
                        sum(case when SUBSTRING_INDEX(SUBSTRING_INDEX(date, '-', 2),'-',-1) IN('12','01','02') then 1 else 0 end) AS Winter" . $from . ' WHERE' . $source . $year . ' AND' . $country . ' AND' . $station . ' GROUP BY country ORDER BY total desc LIMIT 10';
            } else {
                return null;
            }
        } else {
            return "SELECT
            SUBSTRING_INDEX(SUBSTRING_INDEX(date, '-', 2), '-', - 1) AS month,
            SUBSTRING_INDEX(date,'-',1) AS annee,
            COUNT(*) / t2.total AS percent
            " . $from . " AS tn
            JOIN
                (SELECT
                SUBSTRING_INDEX(date,'-',1) AS annee, COUNT(*) AS total
                " . $from . " AS tn WHERE"  . $source . $year . "
                GROUP BY annee) AS t2 ON t2.annee = SUBSTRING_INDEX(tn.date,'-',1)
            WHERE
                SUBSTRING_INDEX(SUBSTRING_INDEX(date, '-', 2), '-', - 1) <> 00 AND" . $source . $year . "
                GROUP BY annee , SUBSTRING_INDEX(SUBSTRING_INDEX(date, '-', 2), '-', - 1)";
        }
    }
}