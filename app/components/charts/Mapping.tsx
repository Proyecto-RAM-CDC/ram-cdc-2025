// "app/components/charts/Mapping.tsx".
// A UI component that renders a map and a file tree.
import React, { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import FileTree from "~/components/charts/filetree";

import Map from "ol/Map.js";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import * as olProj from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

import { State } from "~/utilities/types";

interface IProps {
  stateList: State[];
  geoJson: any;
  setGeoJson: any;
}

const Mapping: React.FC<IProps> = (props) => {
  const [map, setMap] = useState<Map | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fetcher = useFetcher();

  // Initialize the map on mount i.e. this "useEffect" hook runs after the first render.
  useEffect(() => {
    if (props.geoJson) {
      setLoading(true); // Set loading state when fetching starts.
      fetcher.load(`/analyse?estado=${props.geoJson}`);
    }
  }, [props.geoJson]);

  // The 'useEffect' hook listens for changes to 'fetcher.data'.
  useEffect(() => {
    if (fetcher.state === "loading") {
      setLoading(true); // Fetching started or ongoing.
    } else if (fetcher.state === "idle") {
      if (fetcher.state === "idle")
        if (fetcher.data) {
          const vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(fetcher.data, {
              featureProjection: "EPSG:3857",
            }),
          });

          const vectorLayer = new VectorLayer({
            source: vectorSource,
          });

          if (map) {
            // Remove existing vector layers
            map.getLayers().forEach((layer) => {
              if (layer instanceof VectorLayer) {
                map.removeLayer(layer);
              }
            });

            // Add the new vector layer
            map.addLayer(vectorLayer);
          }
          setLoading(false); // Clear loading state.
        }
    }
  }, [fetcher.data, map]);

  useEffect(() => {
    if (props.geoJson === null && map) {
      // Remove all vector layers when geoJson is cleared
      map.getLayers().forEach((layer) => {
        if (layer instanceof VectorLayer) {
          map.removeLayer(layer);
        }
      });
    }
  }, [props.geoJson, map]);

  // Initialize the map on mount i.e. this "useEffect" hook runs after the first render.
  useEffect(() => {
    const initialMap = new Map({
      // We use the 'target' option to specify the element that the map will be rendered in.
      // That is, the map will be rendered into the element with CSS id 'map'.
      target: "map",

      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],

      // A View object represents a simple 2D view of the map.
      // This is the object to act upon to change the center, resolution, and rotation of the map.
      // A View has a projection. The projection determines the coordinate system of the center,
      // and its units determine the units of the resolution (projection units per pixel).
      // The default projection is Web Mercator (EPSG:3857).
      view: new View({
        // 'center' specifies the initial center for the view.
        // Where here, the 'olProj.transform' function is used to transform coordinates from one CRS to another.
        center: olProj.transform(
          [-102.552784, 23.634501],
          // The projection determines the coordinate system of the center and the units for map resolution calculations.
          // Transform coordinates from EPSG:4326 (latitude and longitude) to EPSG:3857 (Web Mercator projection),
          // which is suitable for display on a web map.
          "EPSG:4326", // World Geodetic System 1984 (WGS 84) projection. It uses latitude and longitude coordinates in degrees.
          "EPSG:3857" // Web Mercator projection.
        ),
        // Available zoom levels are determined by 'maxZoom' (default: 28), 'zoomFactor' (default: 2)
        // and 'maxResolution' (default is calculated in such a way that the projection's validity
        // extent fits in a 256x256 pixel tile).
        zoom: 5,
        // Explicitly specify the projection.
        projection: "EPSG:3857",
      }),
    });

    setMap(initialMap);

    return () => {
      // Clean up the map instance on component unmount. Using 'undefined' avoids a TypeScript error.
      initialMap.setTarget(undefined);
    };
  }, []);

  return (
    <>
      <FileTree
        cssClasses="menu menu-xs bg-base-200 border-2 border-secondary rounded-lg w-full col-start-1 col-span-2 h-[50rem]"
        stateList={props.stateList}
        geoJson={props.geoJson}
        setGeoJson={props.setGeoJson}
        loadingState={loading}
      />
      <div
        className="w-full border-2 border-secondary rounded-lg col-start-3 col-span-10 h-[50rem]"
        id="map"
      ></div>
    </>
  );
};

export default Mapping;
