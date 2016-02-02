var markers_layer = new L.MarkerClusterGroup({chunkedLoading: true, chunkProgress: updateProgressBar});

$("#controller_0").jRange({
    from: 2001,
    to: 2015,
    scale: [2001, 2003, 2005, 2007, 2009, 2011, 2013, 2015],
    isRange: true,
    ondragend: function (value) {
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
    },
    onbarclicked: function (value) {
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
    }
});

$('input[name="ages"]').on('switchChange.bootstrapSwitch', function (event, state) {
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

$("#countries").multiselect({
    inheritClass: true,
    maxHeight: 200,
    onChange: function (option, checked, select) {
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
    }
});

$(".btn-group").change(function () {
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

$(document).ready(function () {
    $("#controller_1").hide();
    $("#controller_2").hide();
    $("#controller_3").hide(1000);
    $('#controller_3 [type="checkbox"]').bootstrapSwitch();
    $("#tab_value").val("1");
    $("#tab_1").click(function () {
        $("#controller_1").hide(1000);
        $("#controller_2").hide(1000);
        $("#controller_3").hide(1000);
        $("#controller_3").find(".slider-container").hide(1000);
        $("#tab_value").val("1");
    });
    $("#tab_2").click(function () {
        $("#controller_1").show(1000);
        $("#controller_2").hide(1000);
        $("#controller_3").hide(1000);
        $("#controller_3").find(".slider-container").hide(1000);
        $("#tab_value").val("2");
    });
    $("#tab_3").click(function () {
        $("#controller_1").show(1000);
        $("#controller_2").show(1000);
        $("#controller_3").show(1000);
        $("#controller_3").find(".slider-container").show(1000);
        $("#tab_value").val("3");
    });
});

//progress bar for clusters
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


function addClusters(data) {
    markers_layer.clearLayers();
    var geojson = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup("I was taken at " + feature.properties[0] + "<br> from " +  feature.properties[2] + ",<br>with the distance of " + feature.properties[1] + "m to the nearest station");
        }
    });
    markers_layer.addLayer(geojson);
    map.addLayer(markers_layer);
}

//Get all the data from all the controllers
function getAllDControllers() {

    var selectedAges = [];
    $('input[name="ages"]:checked').each(function () {
        selectedAges.push($(this).attr("data-label-text"));
    });

    var selectedSexs = [];
    $("#controller_2 input[type='checkbox']:checked").each(function () {
        selectedSexs.push($(this).val());
    });

    var selectedCountries = [];
    $('select#countries option:selected').each(function () {
        selectedCountries.push($(this).text());
    });

    var center = map.getCenter();
    var lat = center.lat;
    var long = center.lng;
    var currentId = $('.line.active').attr("id").substr(2);
    var jsonData = {
        "tab": $("#tab_value").val(),
        "lineId": currentId,
        "date": $("#controller_0").val(),
        "countries": selectedCountries,
        "sexe": selectedSexs,
        "age": selectedAges,
        "center_lat": lat,
        "center_long": long
    }
    return jsonData;
}