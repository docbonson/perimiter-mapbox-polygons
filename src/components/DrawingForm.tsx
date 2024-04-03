import React from 'react'
import { GeoJsonProperties } from 'geojson'

/**
 * Props for the DrawingForm component.
 * @typedef {object} DrawingFormProps
 * @property {string} id - The ID of the drawing.
 * @property {GeoJsonProperties} properties - The properties of the drawing.
 * @property {function} onSubmit - Function called when the form is submitted.
 * @property {React.FormEvent<HTMLFormElement>} onSubmit.event - The form submission event.
 * @property {string} onSubmit.drawingId - The ID of the drawing.
 * @property {any} onSubmit.feature - The feature representing the drawing.
 * @property {function} onDelete - Function called when the drawing is deleted.
 * @property {string} onDelete.id - The ID of the drawing to be deleted.
 */

interface DrawingFormProps {
  id: string
  properties: GeoJsonProperties
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    drawingId: string,
    feature: any,
  ) => void
  onDelete: (id: string) => void
}

const DrawingForm: React.FC<DrawingFormProps> = ({
  id,
  properties,
  onSubmit,
  onDelete,
}) => {
  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
      onSubmit={(event) => onSubmit(event, id, properties)}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            opacity: properties?.name ? 1 : 0.5,
            margin: 0,
            padding: 0,
          }}
        >
          {properties?.name ?? 'No Name'}
        </p>
        <small style={{ width: 'fit-content', margin: 0, padding: 0 }}>
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
      <button
        style={{ flex: 0, margin: 0 }}
        type="button"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </form>
  )
}

export default DrawingForm
