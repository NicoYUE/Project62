<?php

/**
 * Created by PhpStorm.
 * User: L
 * version: 1.0
 */

include "QueryBuilder.php";

class graphsModel extends Model
{
    public function month_toString($month)
    {
        switch ($month) {
            case "01":
                return "January";
            case "02":
                return "February";
            case "03":
                return "March";
            case "04":
                return "April";
            case "05":
                return "May";
            case "06":
                return "June";
            case "07":
                return "July";
            case "08":
                return "August";
            case "09":
                return "September";
            case "10":
                return "October";
            case "11":
                return "November";
            case "12":
                return "December";
        }
    }

    public function Cluster()
    {
        //Build Query Sentence
        $QB = new QueryBuilder();
        $fullQuery = $QB->QueryBuild($_POST['tab'], $_POST['date'], $_POST['lineId'], $_POST['countries'], $_POST['sexe'], $_POST['age'], $_POST['center_lat'], $_POST['center_long']);
        if ($fullQuery != null) {
            $results = Parent::getSelect($fullQuery)->fetchAll(PDO::FETCH_ASSOC);
            $geojson = array(
                'type' => 'FeatureCollection',
                'features' => array()
            );
            if (!empty($results)) {
                foreach ($results as $row) {
                    $feature = array(
                        'type' => 'Feature',
                        'geometry' => array(
                            'type' => 'Point',
                            'coordinates' => array(
                                $row['longitude'],
                                $row['latitude']
                            )
                        ),
                        'properties' => array(
                            $row['date'],
                            $row['distance'],
                            $row['origin']
                        )
                    );
                    //Add feature arrays to feature collection array
                    array_push($geojson['features'], $feature);
                }
                echo json_encode($geojson);
            } else {
                echo null;
            }
        } else {
            echo "condition";
        }
    }

    public function General()
    {
        //Build Query Sentence
        $ref = 'annee';
        $variables = 'month';
        $nombre = 'percent';
        $QB = new QueryBuilder();
        $fullQuery = $QB->QueryBuildCount($_POST['tab'], $_POST['stationID'], $_POST['lineID'], $_POST['date'], null, null, null);
        if ($fullQuery != null) {
            $results = Parent::getSelect($fullQuery)->fetchAll(PDO::FETCH_ASSOC);
            $radarArr = array();
            $refArr = array();
            $resultArr = array();
            $monArr = array();
            $count_months = 1;
            if (!empty($results)) {
                for ($i = 0; $i < count($results); $i++) {
                    $row = $results[$i];
                    if ((int)$row[$variables] == $count_months) {
                        array_push($monArr, array('axis' => $this->month_toString($row[$variables]), 'value' => $row[$nombre]));
                        $count_months++;
                    } else {
                        for ($k = $count_months; $k < $row[$variables]; $k++) {
                            array_push($monArr, array('axis' => $this->month_toString($k), 'value' => 0));
                            $count_months++;
                        }
                        array_push($monArr, array('axis' => $this->month_toString($row[$variables]), 'value' => $row[$nombre]));
                        $count_months++;
                    }
                    if ($i == count($results) - 1 && $count_months < 13) {
                        for ($j = $count_months; $j < 13; $j++) {
                            array_push($monArr, array('axis' => $this->month_toString($j), 'value' => 0));
                            $count_months++;
                        }
                    }
                    if ($count_months == 13) {
                        array_push($refArr, $row[$ref]);
                        array_push($resultArr, $monArr);
                        $count_months = 1;
                        unset($monArr);
                        $monArr = array();
                    }
                }
                $radarArr["data"] = $resultArr;
                $radarArr["ref"] = $refArr;
                echo json_encode($radarArr);
            } else {
                echo null;
            }
        } else {
            echo "condition";
        }
    }

    public function Nationality()
    {
        //Build Query Sentence
        $QB = new QueryBuilder();
        $fullQuery = $QB->QueryBuildCount($_POST['tab'], $_POST['stationID'], $_POST['lineID'], $_POST['date'], $_POST['countries'], null, null, null);
        if ($fullQuery != null) {
            $results = Parent::getSelect($fullQuery)->fetchAll(PDO::FETCH_ASSOC);
            if (!empty($results)) {
                $dashbordArr = array();
                foreach ($results as $row) {
                    array_push($dashbordArr, array('State' => $row['country'], 'total' => $row['total'], 'freq' => array('Spring' => $row['Spring'], 'Summer' => $row['Summer'], 'Autumn' => $row['Autumn'], 'Winter' => $row['Winter'])));
                }
                echo json_encode($dashbordArr);
            } else {
                echo null;
            }
        } else {
            echo "condition";
        }
    }

    public function Touristes()
    {
        //Build Query Sentence
        $QB = new QueryBuilder();
        $fullQuery = $QB->QueryBuildCount($_POST['tab'], $_POST['stationID'], $_POST['lineID'], $_POST['date'], $_POST['countries'], $_POST['sexe'], $_POST['age']);
        if ($fullQuery != null) {
            $this->generateHeritageJson($fullQuery, $_POST['sexe']);
        } else {
            echo "condition";
        }
    }

    public function generateHeritageJson($query, $sexe)
    {
        $results = Parent::getSelect($query)->fetchAll(PDO::FETCH_ASSOC);
        $sexs = explode(",", $sexe);
        $collection = array();
        foreach ($sexs as $sex) {
            $collection[$sex] = array();
        }
        // $collection = array("man" => array(), "woman" => array());
        if (!empty($results)) {
            foreach ($results as $row) {
                $sex = $row['sex'];
                $age = $row['age'];
                $country = $row['country'];
                $size = $row['num'];

                if (array_key_exists($age, $collection[$sex])) {
                    $collection[$sex][$age][$country] = $size;
                } else {
                    $addCouSize = array($country => $size);
                    $collection[$sex][$age] = $addCouSize;
                }
            }
            // create the heritage Json
            $data = '{"name":"data", "children":[';
            if ($collection) {
                foreach ($collection as $sex => $sex_value) {

                    $data = $data . '{"name":"' . $sex . '","children":[';

                    foreach ($sex_value as $age => $age_value) {
                        $data = $data . '{"name":"' . $age . '","children":[';
                        foreach ($age_value as $country => $country_value) {
                            $data = $data . '{"name":"' . $country . '","size":' . $country_value . '},';
                        }
                        $data = substr($data, 0, -1) . ']},';
                    }
                    $data = substr($data, 0, -1) . ']},';
                }
                $data = substr($data, 0, -1) . ']}';
                echo json_encode($data);
            }
        } else {
            echo null;
        }
    }
}
