function createMap(bikeStations) {

  // Create the tile layer that will be the background of our map.
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the streetmap layer.
  var baseMaps = {
    "World Map": worldmap
  };

  // Create an overlayMaps object to hold the earthquake properties magnitude layer.
  var overlayMaps = {
    "Earthquake Properties": properties
  };


  // Create the map object with options.
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 4,
    layers: [worldmap, properties]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

  // Pull the "earthquake" property from response.data.
  var eqrthquakes = response.data.properties;

  // Initialize an array to hold earthquake markers.
  var earthquakeMarkers = [];

  // Loop through the earthquake array.
  for (var index = 0; index < properties.length; index++) {
    var eqrthquakes = properties[index];

    // For each earthquake, create a marker, and bind a popup with the earthquake magnitude and location name.
    var coordinates = L.marker([geomerty.coordinates[0], geomerty.coordinates[1]])
      .bindPopup("<h3>" + properties.mag + "<h3><h3>location: " + properties.place + "</h3>");

    // Add the marker to the bikeMarkers array.
    earthquakeMarkers.push(earthquakeMarkers);
  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(earthquakeMarkers));
}


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson").then(createMarkers);