import MapboxDraw, {
  DrawCreateEvent,
  DrawDeleteEvent,
  DrawEventType,
  DrawUpdateEvent,
  DrawFeature,
} from "@mapbox/mapbox-gl-draw";
import { useCallback, useEffect, useReducer, useRef } from "react";
import mapboxgl, { Map as MapGL } from "mapbox-gl";

// Mapbox related styles
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

// token from mapbox
const accessToken = process.env.REACT_APP_API_KEY;

// initialize the draw plugin
const Draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
      polygon: true,
      trash: true
  },
  // Set mapbox-gl-draw to draw by default.
  // The user does not have to click the polygon control button first.
  defaultMode: 'draw_polygon'

});

type DrawingState = {
  drawings: DrawFeature[];
};

type DrawingAction = {};

const Map = () => {
  // ref to hold the map reference. Use this to call methods on the map when needed.
  const mapRef = useRef<MapGL | null>(null);
  // ref for the container html. mapbox needs this to initialize correctly
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [drawingState, setDrawingState] = useReducer(
    (state: DrawingState, payload: DrawingAction) => {
      // todo: add more state things
      return state;
    },
    {
      drawings: [],
    }
  );

  /**
   * Called when creating a drawing on the map.
   */
  const onDrawCreate = useCallback((e: DrawCreateEvent) => {
    console.log("calling on draw create", e);
  }, []);

  /**
   * Called when deleting a drawing on the map.
   */
  const onDrawDelete = useCallback((e: DrawDeleteEvent) => {
    console.log("calling on draw delete", e);
  }, []);

  /**
   * Called when updating a drawing on the map.
   */
  const onDrawUpdate = useCallback((e: DrawUpdateEvent) => {
    console.log("calling on draw update", e);
  }, []);

  useEffect(() => {
    // make sure to initialize the map only once
    if (mapRef.current || !mapContainerRef.current) return;

    // initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-91.874, 42.76],
      zoom: 5,
      accessToken,
    });

    // add the draw control to the map
    mapRef.current?.addControl(Draw, "top-left");

    // add event listeners for map drawing actions
    mapRef.current?.on("draw.create" satisfies DrawEventType, onDrawCreate);
    mapRef.current?.on("draw.delete" satisfies DrawEventType, onDrawDelete);
    mapRef.current?.on("draw.update" satisfies DrawEventType, onDrawUpdate);
  }, []);
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="map-container" ref={mapContainerRef} />
      <div className="section" style={{ padding: "1rem" }}>
        <h1>Map Drawings</h1>
      </div>
    </div>
  );
};

export default Map;
