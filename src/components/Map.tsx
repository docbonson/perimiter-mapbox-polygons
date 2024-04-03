import MapboxDraw, {
  DrawCreateEvent,
  DrawDeleteEvent,
  DrawUpdateEvent,
} from '@mapbox/mapbox-gl-draw'
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import mapboxgl, { Map as MapGL } from 'mapbox-gl'
import {
  Feature,
  Geometry,
  GeoJsonProperties,
  FeatureCollection,
} from 'geojson'
import DrawingForm from './DrawingForm'

// Mapbox related styles
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

// Token from Mapbox
const accessToken = process.env.REACT_APP_API_KEY

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

  const [isDrawing, setIsDrawing] = useState(false)

  /**
   * Sync React state with Mapbox feature state.
   */
  const handleSyncFeatures = useCallback(() => {
    setFeatureCollection(Draw.getAll())
  }, [])

  /**
   * Called when creating a drawing on the map.
   */
  const onDrawCreate = useCallback(
    (e: DrawCreateEvent) => {
      // Actions to be done on draw create
      console.log('calling on draw create', e)
      setIsDrawing(true)
      handleSyncFeatures()
    },
    [handleSyncFeatures],
  )

  /**
   * Called when deleting a drawing on the map.
   */
  const onDrawDelete = useCallback(
    (e: DrawDeleteEvent) => {
      // Actions to be done on draw delete
      console.log('calling on draw delete', e)
      setIsDrawing(false)
      handleSyncFeatures()
    },
    [handleSyncFeatures],
  )

  /**
   * Called when updating a drawing on the map.
   */
  const onDrawUpdate = useCallback(
    (e: DrawUpdateEvent) => {
      // Actions to be done on draw update
      console.log('calling on draw update', e)
      handleSyncFeatures()
    },
    [handleSyncFeatures],
  )

  /**
   * Handles updating the name property when a drawing is updated.
   */
  const handleNameChange = useCallback(
    (
      event: FormEvent<HTMLFormElement>,
      drawingId: string | number | undefined,
      feature: Feature<Geometry, GeoJsonProperties>,
    ) => {
      event.preventDefault()

      if (drawingId != null) {
        // Get the form information, and the name specifically
        const form = new FormData(event.target as HTMLFormElement)
        const newName = form.get('name')

        // If we have a name to update, update the feature
        if (newName) {
          Draw.setFeatureProperty(`${drawingId}`, 'name', newName)
        }
      }
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

  const handleDelete = useCallback(
    (id: string) => {
      Draw.delete(id)
      setIsDrawing(false)
      handleSyncFeatures()
    },
    [handleSyncFeatures],
  )

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="map-container" ref={mapContainerRef} />
      <div className="section" style={{ padding: '1rem' }}>
        <h1>Map Drawings</h1>
        {isDrawing && (
          <DrawingForm
            id="new-drawing"
            properties={{ name: '' }}
            onSubmit={handleNameChange}
            onDelete={() => setIsDrawing(false)}
          />
        )}
        {featureCollection?.features.map((feature) => (
          <DrawingForm
            key={feature.id}
            id={feature.id as string}
            properties={feature.properties}
            onSubmit={handleNameChange}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default Map
