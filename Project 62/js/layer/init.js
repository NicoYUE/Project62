const MAX_RANGE = 10;
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
                    center: new L.LatLng(48.853, 2.333),
                    zoom: 13,
                    layers: [stamen, myLayer],
                    });
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
var transform = d3.geo.transform({ point: projectPoint });
var path = d3.geo.path().projection(transform);
var rootWidth, previousWidth;

queue()
.defer(d3.json, "./json/stations.json")
.defer(d3.json, "./json/lines.json")
.await(ready);

//Loading and Projecting GeoJSON
function ready(error, stations, lines) {

    var radius = d3.scale.linear()
    .domain([0, MAX_RANGE])
    .range([2, 50]);
    // create path elements for each of the features
    featureStation = stationsGroup.selectAll(".station")
    .data(stations.features)
    .enter().append("path")
    .attr("class", function(d) {
          return "station-l-" + d.properties.LINES;
     })
    .attr("name", function(d) {
          return "sl_" + d.properties.LINES;
     })
    .attr("d", path.pointRadius(function(d) {
                                return radius(INIT_RADIUES);
     }))
    .style("fill", function(d) {
           return (d.properties.COLORS);
     })
    .style("opacity", function(d) {
           return ("0");
     })
    .on("click", function (d) {
        var latlng = $(this).data().point.split(',');
        var lat = latlng[0];
        var lng = latlng[1];
        var zoom = 10;
        
        // add a marker
        var marker = L.marker([lat, lng],{}).addTo(map);
        // set the view
        map.setView([lat, lng], zoom);
    })
    .on("mouseover", function(d) {
    
     })
    .on("mouseout", function(d) {
    
    });
    
    // create path elements for each of the features
    featureLine = linesGroup.selectAll("lines")
    .data(lines.features)
    .enter()
    .append("path")
    .attr('class', 'line')
    .attr('id', function(d) {
          return 'l_' + d.properties.LINE;
     })
    .attr("d", path)
    .style("opacity", 0)
    .style("stroke", function(d) {
           return d.properties.COLOR;
    });
    map.on("viewreset", reset);
    reset();
    
    // Fit the SVG element to leaflet's map layer
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
        featureStation.attr("d", path.pointRadius(function(d) {
                                                  return radius(INIT_RADIUES);
                                                  }));
        previousWidth = newWidth;
    }
}
