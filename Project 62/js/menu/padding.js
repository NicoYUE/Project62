$.getJSON('./json/catalog.json', function(data) {
        var output = $(".jGM_box").html();
        output += '<ul id="tile_001" class="jGlide_001_tiles" title="Lignes" alt="Sélectionnez une ligne">';
        $.each(data, function(key,val) {
               output += '<li rel="tile_'+
               data[key].PROPERTIES.ID +
               ',cl_' + data[key].PROPERTIES.ID +
               '">' +
               '<img src="./img/metro/L_M.png" width="15px" height="15px"/>' +
               '<img src="./img/metro/M_' + data[key].PROPERTIES.ID +'.png" width="15px" height="15px"/>' +
               data[key].PROPERTIES.NOM +
               '</li>' ;
         });
        output += '</ul>';
        $.each(data, function(key,val) {
               var station_data = data[key].STATIONS;
               output +='<ul id="tile_'+data[key].PROPERTIES.ID+'" class="jGlide_001_tiles" alt="Sélectionnez une station" title="'+data[key].PROPERTIES.NOM+ '">';
               $.each(station_data, function(key,val) {
                      output += '<li rel="geo'+ station_data[key].COORDINATES[1] +',' + station_data[key].COORDINATES[0]+'">' +
                      station_data[key].STATION +
                      '</li>';
              });
              output += '</ul>';
        });
        $(".jGM_box").html(output);
      // Initialize Menu
      $('#jGlide_001').jGlideMenu({
              tileSource	: '.jGlide_001_tiles' ,
              demoMode      : true
      }).show();
});

// Connect "Toggle" Link
$('#switch').click(function(){$(this).jGlideMenuToggle();});
