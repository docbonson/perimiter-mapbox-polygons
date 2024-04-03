import React from 'react'
import { GeoJsonProperties } from 'geojson'

interface DrawingFormProps {
  id: string
  properties: GeoJsonProperties
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    drawingId: string,
    feature: any, // Adjust the type according to your feature type
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
