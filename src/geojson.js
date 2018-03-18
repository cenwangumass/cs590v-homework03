import * as d3 from "d3";
import * as d3tip from "d3-tip";
d3.tip = d3tip;

import "./geojson.css";

// SVG width and height
let svgWidth = 1600;
let svgHeight = 1200;

// D3 margin convention
let margin = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10
};

// Inner width and height
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Tooltip to show details
let tip = d3
  .tip()
  .attr("class", "d3-tip")
  .html(d => {
    return `
    <div>
      <div>Crime Type: ${d.Type}</div>
      <div>Year: ${d.Year}</div>
      <div>Longitude: ${d.Location[0]}</div>
      <div>Latitude: ${d.Location[1]}</div>
    </div>
  `;
  });

async function main() {
  // Load map GeoJSON and crime CSV file
  let [data, map] = await Promise.all([
    d3.csv("data.csv"),
    d3.json("map.geojson")
  ]);

  // Convert data to a desired format
  data = data.map(d => {
    return {
      Type: d.Type,
      Year: +d.Year,
      Location: [+d.Long, +d.Lat]
    };
  });

  // Create SVG element
  const svg = d3
    .select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    // Define zoom callback
    .call(d3.zoom().on("zoom", zoomed))
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  // Create the tooltip
  svg.call(tip);

  // Define map projection
  const projection = d3
    .geoMercator()
    .scale(190000)
    .rotate([71.057, 0])
    .center([0, 42.313])
    .translate([width / 2, height / 2]);

  // Define geographic path
  const path = d3.geoPath().projection(projection);

  // Draw Boston map
  svg
    .selectAll("path")
    .data(map.features)
    .enter()
    .append("path")
    .attr("fill", "#ccc")
    .attr("stroke", "#333")
    .attr("d", path);

  // Draw crime incidents
  const circles = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 4)
    .attr("cx", d => projection(d.Location)[0])
    .attr("cy", d => projection(d.Location)[1])
    .attr("class", "data-point")
    .attr("fill", "#fc8d59")
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  // Show and hide incidents depending on the selected crime type
  d3.select("select").on("change", function() {
    d3
      .selectAll(".data-point")
      .style("opacity", 0)
      .filter(d => this.value == "All" || d.Type == this.value)
      .style("opacity", 1);
  });

  // Sementic zoom
  function zoomed() {
    circles.attr("r", () => {
      return 4 / d3.event.transform.k;
    });
    svg.attr("transform", d3.event.transform);
  }
}

main();
