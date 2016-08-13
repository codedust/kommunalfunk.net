(function() {
  var communities = [];
  var communes = [];
  var markers = [];
  var filteredType = '-';

  var map = L.map('map', {
    zoomControl: false
  }).setView([51.066, 8.470], 7);

  L.control.zoom({
    position:'topright'
  }).addTo(map);

  L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
  	maxZoom: 18,
  	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  $.ajax({
    url: "./communities.yaml",
    dataType: "text"
  }).done(function(data) {
    communities = jsyaml.load(data);
    console.log('Loaded communities.');

    $.ajax({
      url: "./cooperations.yaml",
      dataType: "text"
    }).done(function(data) {
      communes = jsyaml.load(data);
      console.log('Loaded cooperations.');
      showCooperations();
    }).fail(function(){
      console.log("Could not fetch cooperation data.");
    });
  }).fail(function(e) {
    console.log("Could not fetch community data.");
  });

  function deleteAllMarkers() {
    for (var id in markers) {
      map.removeLayer(markers[id]);
    }
  }

  function showCooperations() {
    function getCommunity() {
      return function(ignored, render) {
        if (!communities.hasOwnProperty(this.community)) {
          console.log("Community", this.community, "not found.");
          return render('<i>Unbekannte Community</i>');
        }
        return render(
          '<a href="'+communities[this.community].url+'">' + communities[this.community].name + '</a>');
      };
    }

    for (var id in communes) {
      var commune = communes[id];

      // only show markers for communes with projects of the filtered type
      if (filteredType != "-") {
        var nonFilteredProjectFound = false;
        for (var p in commune.cooperations) {
          if (commune.cooperations[p].type == filteredType) {
            nonFilteredProjectFound = true;
          }
        }
        if (!nonFilteredProjectFound) continue;
      }

      var template = $('#template-commune').html();
      Mustache.parse(template);
      var view = {
        getKeyValue: function() {
          return function(keyvalue, render) {
            for (var key in this) {
              if (this.hasOwnProperty(key)) {
                if (keyvalue === "key") {
                  return render(key);
                } else if (keyvalue === "value"){
                  return render(this[key]);
                } else {
                  return render("missing key/value");
                }
              }
            }
          };
        },
        date: function() {
          return function(ignored, render) {
            return render(
              this.start.getDate() + "." + (this.start.getMonth()+1) + "." +
              this.start.getFullYear());
          };
        },
        getCommunity: getCommunity,
        "data": commune
      };
      var rendered = Mustache.render(template, view);
      var marker = L.marker(commune.geo);
      markers.push(marker);
      marker.addTo(map).bindPopup(rendered).on('click', updateProjects);
    }
  }

  function updateProjects() {
    if (filteredType == '-') {

      $('.cooperation').show();
      return;
    }
    $('.cooperation').hide();
    $('.cooperation.type-'+filteredType).show();
  }

  $('#select-project-type').val('-');
  $('#select-project-type').change(function() {
    filteredType = $('#select-project-type').val();
    deleteAllMarkers();
    showCooperations();
    updateProjects();
  });

  $('.popup').click(function() {
    $(this).hide(200);
  });
})(this);
