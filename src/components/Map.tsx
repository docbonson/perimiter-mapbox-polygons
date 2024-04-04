import React, { useEffect, useRef, useCallback, useState } from 'react'
import mapboxgl, { Map as MapGL } from 'mapbox-gl'
import MapboxDraw, {
  DrawCreateEvent,
  DrawDeleteEvent,
  DrawUpdateEvent,
} from '@mapbox/mapbox-gl-draw'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import DrawingForm from './DrawingForm'
import { Geometry, GeoJsonProperties, FeatureCollection } from 'geojson'

// Token for Mapbox
const accessToken = process.env.REACT_APP_API_KEY

// Check if Mapbox access token is provided
if (!accessToken) {
  throw new Error('Mapbox access token is not provided.')
}

// Initialize the draw plugin
const Draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: true,
    trash: true,
  },
  // Set mapbox-gl-draw to draw by default.
  // The user does not have to click the polygon control button first.
  defaultMode: 'draw_polygon',
})

const Map = () => {
  // Ref to hold the map reference. Use this to call methods on the map when needed.
  const mapRef = useRef<MapGL | null>(null)
  // Ref for the container HTML. Mapbox needs this to initialize correctly.
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [featureCollection, setFeatureCollection] = useState<
    FeatureCollection<Geometry, GeoJsonProperties>
  >({ type: 'FeatureCollection', features: [] })

  // Sync React state with Mapbox feature state.
  const handleSyncFeatures = useCallback(() => {
    setFeatureCollection(Draw.getAll())
  }, [])

  // Called when creating a drawing on the map.
  const onDrawCreate = useCallback(
    (e: DrawCreateEvent) => {
      handleSyncFeatures()
    },
    [handleSyncFeatures],
  )

  // Called when deleting a drawing on the map.
  const onDrawDelete = useCallback(
    (e: DrawDeleteEvent) => {
      handleSyncFeatures()
    },
    [handleSyncFeatures],
  )

  // Called when updating a drawing on the map.
  const onDrawUpdate = useCallback(
    (e: DrawUpdateEvent) => {
      handleSyncFeatures()
    },
    [handleSyncFeatures],
  )

  useEffect(() => {
    // Make sure we initialize the map only once
    if (mapRef.current || !mapContainerRef.current) return

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-91.874, 42.76],
      zoom: 5,
      accessToken,
    })

    // Add the draw control to the map
    mapRef.current?.addControl(Draw, 'top-left')

    // Add event listeners for map drawing actions
    mapRef.current?.on('draw.create', onDrawCreate)
    mapRef.current?.on('draw.delete', onDrawDelete)
    mapRef.current?.on('draw.update', onDrawUpdate)

    return () => {
      // Clean up event listeners
      mapRef.current?.off('draw.create', onDrawCreate)
      mapRef.current?.off('draw.delete', onDrawDelete)
      mapRef.current?.off('draw.update', onDrawUpdate)
    }
  }, [onDrawCreate, onDrawDelete, onDrawUpdate])

  // Handles deleting a drawing
  const handleDelete = useCallback(
    (id: string) => {
      Draw.delete(id)
      handleSyncFeatures()
    },
    [handleSyncFeatures],
  )

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="map-container" ref={mapContainerRef} />
      <div className="section" style={{ padding: '1rem' }}>
        <h1>Map Drawings</h1>
        {featureCollection?.features.map((feature) => (
          <DrawingForm
            key={feature.id}
            id={feature.id as string}
            properties={feature.properties}
            onSubmit={() => {}} // Replace with actual onSubmit function
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default Map
