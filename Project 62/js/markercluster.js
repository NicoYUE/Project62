$.getJSON("./stations.json", function(data) {
    var geojson = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
      }
    });
  var markers = new L.MarkerClusterGroup();


  markers.addLayer(geojson);
    map.addLayer(markers);

  });
