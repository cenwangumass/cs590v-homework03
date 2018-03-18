# cs590v-homework03

## Dataset

The dataset has two parts. The first is a GeoJSON file of Boston downloaded from [Boston Neighborhoods](https://data.boston.gov/dataset/boston-neighborhoods). It is used to render the map of Boston. The second is Boston crime data from August 2015 to now, downloaded from [Crime Incident Reports](https://data.boston.gov/dataset/crime-incident-reports-august-2015-to-date-source-new-system). It has been preprocessed to include only two crime types, homicide and robbery. There are four columns: crime type, the year when it happened, longitude and latitude of the incident.

The original crime dataset has 267409 rows of incidents and the preprocessed one has 3844 rows, of which 130 rows are homicides and 3714 rows are robbery.

The visualized dataset can be useful for several purposes. For example, a person who is interested in buying a new house in Boston can look at the visualization and get an idea what neighborhood is safe and make a decision. Also, Boston Police Department could use the visualization to identify dangerous areas in the city and arrange for more police activities there.

## Projection

Mercator projection is used to render the map. It works as follows:

1. The Earth is approximated as a sphere.

2. All features on the Earth is projected to a cylinder tangential to it at the equator.

3. The cylinder is unrolled to give the planar map.

## Extra Credit

1. I investigate using Leaflet and OpenStreetMap to show the dataset better. Now we can see the incidents on a map with much more details like the street.

2. I investigate using ``async`` / ``await`` in ES6 and Webpack to write D3 code. The resulting code doesn't have **callback hell** problem, and is more like code written in normal language like Python.