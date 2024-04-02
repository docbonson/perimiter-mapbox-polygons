import MapboxDraw, {
  DrawCreateEvent,
  DrawDeleteEvent,
  DrawEventType,
  DrawUpdateEvent,
} from "@mapbox/mapbox-gl-draw";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapGL } from "mapbox-gl";
import {
  Feature,
  Geometry,
  GeoJsonProperties,
  FeatureCollection,
} from "geojson";

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

})

const Map = () => {
  // ref to hold the map reference. Use this to call methods on the map when needed.
  const mapRef = useRef<MapGL | null>(null);
  // ref for the container html. Mapbox needs this to initialize correctly
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [featureCollection, setFeatureCollection] = useState<
    FeatureCollection<Geometry, GeoJsonProperties>
  >({ type: "FeatureCollection", features: [] });

  /**
   * Sync react state with mapbox feature state
   */
  const handleSyncFeatures = useCallback(() => {
    setFeatureCollection(Draw.getAll());
  }, []);

  /**
   * Called when creating a drawing on the map.
   */
  const onDrawCreate = useCallback(
    (e: DrawCreateEvent) => {
      // actions to be done on draw create
      console.log("calling on draw create", e);
      handleSyncFeatures();
    },
    [handleSyncFeatures]
  );

  /**
   * Called when deleting a drawing on the map.
   */
  const onDrawDelete = useCallback(
    (e: DrawDeleteEvent) => {
      // actions to be done on draw delete
      console.log("calling on draw delete", e);
      handleSyncFeatures();
    },
    [handleSyncFeatures]
  );

  /**
   * Called when updating a drawing on the map.
   */
  const onDrawUpdate = useCallback(
    (e: DrawUpdateEvent) => {
      // actions to be done on draw update
console.log("calling on draw update", e);
      handleSyncFeatures();
    },
    [handleSyncFeatures]
  );

  /**
   * Handles updating the name property when a drawing is updated.
   */
  const handleNameChange = useCallback(
    (
      event: FormEvent<HTMLFormElement>,
      drawingId: string | number | undefined,
      feature: Feature<Geometry, GeoJsonProperties>
    ) => {
      event.preventDefault();

      if (drawingId != null) {
        // get the form information, and the name specifically
        const form = new FormData(event.target as HTMLFormElement);
        const newName = form.get("name");

        // if we have a name to update, update the feature
        if (newName) {
          Draw.setFeatureProperty(`${drawingId}`, "name", newName);
        }
      }
      handleSyncFeatures();
    },
    [handleSyncFeatures]
  );

  useEffect(() => {
    // make sure we initialize the map only once
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
  }, [onDrawCreate, onDrawDelete, onDrawUpdate]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="map-container" ref={mapContainerRef} />
      <div className="section" style={{ padding: "1rem" }}>
        <h1>Map Drawings</h1>
        {featureCollection?.features.map((feature) => {
          const { id, properties } = feature;

          return (
            <form
              key={id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
              onSubmit={(event) => handleNameChange(event, id, feature)}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    opacity: properties?.name ? 1 : 0.5,
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {properties?.name ?? "No Name"}
                </p>
                <small style={{ width: "fit-content", margin: 0, padding: 0 }}>
                  Shape {id}
                </small>
              </div>
              <input
                style={{ flex: 1, margin: 0 }}
                id="name"
                name="name"
                type="text"
                placeholder="Name this shape"
              />
              <button style={{ flex: 0, margin: 0 }} type="submit">
                Update
              </button>
              <button style={{ flex: 0, margin: 0 }} type="button">
                Delete
              </button>
            </form>
          );
        })}
      </div>
    </div>
  );
};

export default Map;