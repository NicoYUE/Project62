$.getJSON('./json/ligne_1_stations.json', function(data) {
          var output ='<li><div id="' +
          "cl_1" +
          '" class="link">' +
          '<img src="./images/metro/L_M.png" width="15px" height="15px"/>' +
          '<img src="./images/metro/M_' + "1" +'.png" width="15px" height="15px"/>' +
          " LIGNE 1" +
          '</div> ' +
          '<ul class="submenu">' ;
          var new_data = data.features;
          $.each(new_data, function(key,val) {
                 output = output +
                 '<li><a>' +
                 new_data[key].properties.STATION +
                 '</a></li>';
                 });
          output += '</ul></li>';
          $("#accordion").html(output);
});

$.getJSON('./json/ligne_2_stations.json', function(data) {
          const old = $("#accordion").html();
          var output ='<li><div id="' +
          "cl_2" +
          '" class="link">' +
          '<img src="./images/metro/L_M.png" width="15px" height="15px"/>' +
          '<img src="./images/metro/M_' + "2" +'.png" width="15px" height="15px"/>' +
          " LIGNE 2" +
          '</div> ' +
          '<ul class="submenu">' ;
          var new_data = data.features;
          $.each(new_data, function(key,val) {
                 output = output +
                 '<li><a>' +
                 new_data[key].properties.STATION +
                 '</a></li>';
                 });
          output += '</ul></li>';
          $("#accordion").html(old + output);
});


