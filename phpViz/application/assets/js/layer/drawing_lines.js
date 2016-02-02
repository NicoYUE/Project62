const MAX_RANGE = 1000;
const INIT_RADIUES = 2;
// Initialize the map on the "map" div with a given center and zoom
var stamen = new L.StamenTileLayer("toner-lite");

var myLayer = L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20
});

var map = new L.Map("map", {
    center: new L.LatLng(48.850705, 2.357168),
    zoom: 12,
    layers: [stamen, myLayer]
});

var progress = document.getElementById('progress');
var progressBar = document.getElementById('progress-bar');
function updateProgressBar(processed, total, elapsed, layersArray) {
    if (elapsed > 1000) {
        // if it takes more than a second to load, display the progress bar:
        progress.style.display = 'block';
        progressBar.style.width = Math.round(processed / total * 100) + '%';
    }
    if (processed === total) {
        // all markers processed - hide the progress bar:
        progress.style.display = 'none';
    }
}

// Add an SVG element to Leaflet’s overlay pane
var svg = d3.select(map.getPanes().overlayPane).append("svg");
var linesGroup = svg.append("g").attr("class", "leaflet-zoom-hide");
var stationsGroup = svg.append("g").attr("class", "leaflet-zoom-hide");
var featureStation, featureLine;

// Use Leaflet to implement a D3 geometric transformation.
function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
}
//  Create a d3.geo.path to convert GeoJSON to SVG
var transform = d3.geo.transform({point: projectPoint});
var path = d3.geo.path().projection(transform);
var rootWidth, previousWidth;

queue()
    .defer(d3.json, "../application/assets/json/stations.json")
    .defer(d3.json, "../application/assets/json/lines.json")
    .await(ready);

//Loading and Projecting GeoJSON
function ready(error, stations, lines) {
    var radius = d3.scale.linear()
        .domain([0, MAX_RANGE])
        .range([2, 50]);

    featureStation = stationsGroup.selectAll(".station")
        .data(stations.features)
        .enter().append("path")
        .attr("class", "station")
        .attr("id", function (d) {
            return "s" + d.properties.LINES;
        })
        .attr("d", path.pointRadius(function (d) {
            return radius(INIT_RADIUES)
        }))
        .style("stroke", function (d) {
            return "#ffffff"
        })
        .style("opacity", 0)
        .style("z-index", function (d) {
            return Math.floor(50 - (MAX_RANGE / 1000000));
        })
        .on("mouseout", function (d) {

        })
        .on("click", function (d) {
            var currentId = $('.line.active').attr("id").substr(2);
            var currentTab = $("#tab_value").val();
            onClickPoint(currentTab, d.properties.ID, currentId, d.properties.STATION);
        });

    // create path elements for each of the features
    featureLine = linesGroup.selectAll("lines")
        .data(lines.features)
        .enter()
        .append("path")
        .attr("class", "line")
        .attr("id", function (d) {
            return 'l_' + d.properties.LINE;
        })
        .attr("d", path)
        .style("opacity", 0)
        .style("stroke", function (d) {
            return d.properties.COLOR;
        });

    map.on("viewreset", reset);
    map.on('moveend', function (e) {
        // request the marker info with AJAX for the current bounds
        if (($('.line.active').attr("id") != undefined)) {
            $.ajax({
                type: "POST",
                url: "?controller=graphs&action=cluster",
                //Relative or absolute path to response.php file
                data: getAllDControllers(),
                success: function (photo_points) {
                    if (photo_points != "") {
                        if (photo_points == "condition") {
                            markers_layer.clearLayers();
                            $("#wrongInfo").html(
                                '<div class="alert alert-warning">'
                                + '<a href="#" class="close" data-dismiss = "alert" aria-label="close">&times;</a>'
                                + '<strong>Warning!</strong> Please make sure you choose the correct filter conditions!'
                                + '</div>');
                        } else {
                            $("#wrongInfo").html('');
                            addClusters(JSON.parse(photo_points));
                            var dt = new Date();
                            var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                            $("#clusterStatus").html("Clusters Update at: " + time);
                        }
                    } else {
                        $("#wrongInfo").html('');
                        markers_layer.clearLayers();
                    }
                },
                error: function () {
                    alert('There is no table for this line in the database now!');
                }
            });
        }
    });
    reset();

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    // Reposition the SVG to cover the features.
    function reset() {
        var bounds = path.bounds(stations),
            topLeft = bounds[0],
            bottomRight = bounds[1];

        svg.attr("width", bottomRight[0] - topLeft[0])
            .attr("height", bottomRight[1] - topLeft[1])
            .style("left", topLeft[0] + "px")
            .style("top", topLeft[1] + "px");

        linesGroup.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
        stationsGroup.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

        featureLine.attr("d", path);

        if (rootWidth === undefined) { // rootWidth means max range for stations radius = 50
            rootWidth = bottomRight[0] - topLeft[0];
            previousWidth = rootWidth;
        }

        var newWidth = bottomRight[0] - topLeft[0];
        if (previousWidth != newWidth) {
            radius.range([2, 50 * (newWidth / rootWidth)]);
        }
        featureStation.attr("d", path.pointRadius(function (d) {
            return radius(INIT_RADIUES)
        }));
        previousWidth = newWidth;
    }
}

function onClickPoint(currentTab, stationID, lineID, stationNom) {
    var selectedCountries = [];
    $('select option:selected').each(function () {
        selectedCountries.push($(this).text());
    });
    if (currentTab == "3") {
        var selectedSexs = [];
        $("#controller_2 input[type='checkbox']:checked").each(function () {
            selectedSexs.push($(this).val());
        });
        var selectedAges = [];
        $('input[name="ages"]:checked').each(function () {
            selectedAges.push($(this).attr("data-label-text"));
        });
        $.ajax({
            type: "POST",
            data: {
                'tab': currentTab,
                'stationID': stationID,
                'lineID': lineID,
                'date': $("#controller_0").val(),
                'countries': selectedCountries,
                'sexe': selectedSexs,
                'age': selectedAges
            },
            url: "?controller=graphs&action=tourists",
            cache: false,
            success: function (record) {
                if (!record) {
                    $("#wrongInfo").html(
                        '<div class="alert alert-warning">'
                        + '<a href="#" class="close" data-dismiss = "alert" aria-label="close">&times;</a>'
                        + '<strong>Warning!</strong> No record about this stationNom!'
                        + '</div>');
                } else {
                    $("#wrongInfo").html('');
                    $("#modal-body-dashbord").html('');
                    $("#sequence").html('');
                    $("#chart").html('');
                    $("#radarChart").html('');
                    $("#percentage").html('');
                    createVisualization(JSON.parse(record), stationNom);
                    $('#example').modal({
                        keyboard: false
                    });
                }
            },
            error: function () {
                alert('There is no table for this line in the database now!');
            }
        });
    } else if (currentTab == "2") {
        $.ajax({
            type: "POST",
            data: {
                'tab': currentTab,
                'stationID': stationID,
                'lineID': lineID,
                'date': $("#controller_0").val(),
                'countries': selectedCountries
            },
            url: "?controller=graphs&action=nationality",
            cache: false,
            success: function (record) {
                if (!record) {
                    $("#wrongInfo").html(
                        '<div class="alert alert-warning">'
                        + '<a href="#" class="close" data-dismiss = "alert" aria-label="close">&times;</a>'
                        + '<strong>Warning!</strong> No records about this name of station!'
                        + '</div>');
                } else {
                    $("#wrongInfo").html('');
                    $("#modal-body-dashbord").html('');
                    $("#sequence").html('');
                    $("#chart").html('');
                    $("#radarChart").html('');
                    $("#percentage").html('');
                    dashboard('#modal-body-dashbord', JSON.parse(record));
                    $('#example').modal({
                        keyboard: false
                    });
                }
            },
            error: function () {
                alert('There is no table for this line in the database now!');
            }
        });
    } else {
        $.ajax({
            type: "POST",
            data: {
                'tab': currentTab,
                'stationID': stationID,
                'lineID': lineID,
                'date': $("#controller_0").val()
            },
            url: "?controller=graphs&action=general",
            cache: false,
            success: function (record) {
                if (!record) {
                    $("#wrongInfo").html(
                        '<div class="alert alert-warning">'
                        + '<a href="#" class="close" data-dismiss = "alert" aria-label="close">&times;</a>'
                        + '<strong>Warning!</strong> No records about this name of station!'
                        + '</div>');
                } else {
                    $("#wrongInfo").html('');
                    $("#modal-body-dashbord").html('');
                    $("#sequence").html('');
                    $("#chart").html('');
                    $("#radarChart").html('');
                    $("#percentage").html('');
                    //draw spider -- start
                    var w = 500,
                        h = 500;
                    var colorscale = d3.scale.category10();
                    //Legend titles
                    var LegendOptions = JSON.parse(record)["ref"];
                    //Options for the Radar chart, other than default
                    var mycfg = {
                        w: w,
                        h: h,
                        maxValue: 0.6,
                        levels: 6,
                        ExtraWidthX: 300
                    }
                    //Call function to draw the Radar chart
                    //Will expect that data is in %'s
                    var d = JSON.parse(record)["data"];
                    RadarChart.draw("#radarChart", d, mycfg);
                    var svg = d3.select('.modal-body')
                        .selectAll('svg')
                        .append('svg')
                        .attr("width", w + 300)
                        .attr("height", h)

                    //Create the title for the legend
                    var text = svg.append("text")
                        .attr("class", "title")
                        .attr('transform', 'translate(90,0)')
                        .attr("x", w - 70)
                        .attr("y", 10)
                        .attr("font-size", "12px")
                        .attr("fill", "#404040")
                        .text("Percentage of tourists by Month and Year");

                    //Initiate Legend
                    var legend = svg.append("g")
                        .attr("class", "legend")
                        .attr("height", 100)
                        .attr("width", 200)
                        .attr('transform', 'translate(90,20)')
                        ;
                    //Create colour squares
                    legend.selectAll('rect')
                        .data(LegendOptions)
                        .enter()
                        .append("rect")
                        .attr("x", w - 65)
                        .attr("y", function (d, i) {
                            return i * 20;
                        })
                        .attr("width", 10)
                        .attr("height", 10)
                        .style("fill", function (d, i) {
                            return colorscale(i);
                        })
                    ;
                    //Create text next to squares
                    legend.selectAll('text')
                        .data(LegendOptions)
                        .enter()
                        .append("text")
                        .attr("x", w - 52)
                        .attr("y", function (d, i) {
                            return i * 20 + 9;
                        })
                        .attr("font-size", "11px")
                        .attr("fill", "#737373")
                        .text(function (d) {
                            return d;
                        })
                    ;
                    //draw spider -- finish
                    $('#example').modal({
                        keyboard: false
                    });
                }
            },
            error: function () {
                alert('There is no table for this line in the database now!');
            }
        });
    }
}
