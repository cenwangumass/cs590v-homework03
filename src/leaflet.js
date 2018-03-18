import * as d3 from "d3";
import L from "leaflet";

// Temporary fix for not finding the marker when using Webpack
// https://github.com/Leaflet/Leaflet/issues/4968
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

import "../node_modules/leaflet/dist/leaflet.css";
import "./leaflet.css";

async function main() {
  // Initialize Leaflet
  const map = L.map("map").setView([42.3617641, -71.0589399], 14);

  // Add tile layer
  L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  // Load only homicide data
  let data = await d3.csv("data.csv");
  data = data.filter(d => d.Type == "Homicide").map(d => {
    return {
      Type: d.Type,
      Year: +d.Year,
      Location: [+d.Lat, +d.Long]
    };
  });

  // Add markers on the map
  for (const d of data) {
    const marker = L.marker(d.Location)
      .bindPopup(
        `Year: ${d.Year}<br>
          Latitude: ${d.Location[0]}<br>
          Longitude: ${d.Location[1]}`
      )
      .addTo(map);

    marker.on("mouseover", function(e) {
      this.openPopup();
    });

    marker.on("mouseout", function(e) {
      this.closePopup();
    });
  }
}

main();
