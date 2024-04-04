import React, { FormEvent, useState } from 'react'
import { GeoJsonProperties } from 'geojson'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import Paper from '@mui/material/Paper'

interface DrawingFormProps {
  /** Unique identifier for the drawing */
  id: string
  /** Properties of the drawing */
  properties: GeoJsonProperties
  /** Function to call when the form is submitted */
  onSubmit: (drawingId: string, newName: string) => void
  /** Function to call when the drawing is deleted */
  onDelete: (id: string) => void
}

const DrawingForm: React.FC<DrawingFormProps> = ({
  id,
  properties,
  onSubmit,
  onDelete,
}: DrawingFormProps) => {
  const [newName, setNewName] = useState(properties?.name || '')
  const [inputValue, setInputValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleFormSubmit = (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault()
    }
    if (inputValue.trim() !== '') {
      setNewName(inputValue.trim())
      onSubmit(id, inputValue.trim())
      setInputValue('')
      setIsEditing(false) // Exit edit mode after submission
    }
  }

  /**
   * Handles input change.
   */
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  /**
   * Handles click on edit button.
   */
  const handleEditClick = () => {
    setIsEditing(true) // Enter edit mode
    setInputValue(newName) // Populate input field with current name
  }

  return (
    <Paper
      elevation={3}
      style={{
        padding: '16px',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '70%',
      }}
    >
      <Typography style={{ marginRight: '16px' }}>Polygon:</Typography>
      {isEditing ? (
        <TextField
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={handleNameChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleFormSubmit()
            }
          }}
          placeholder="Name this shape"
          style={{ flex: 1, marginRight: '8px' }}
        />
      ) : (
        <Typography style={{ flex: 1, opacity: newName ? 1 : 0.5 }}>
          {newName || 'Unnamed Polygon'}
        </Typography>
      )}
      <div style={{ display: 'flex', gap: '8px' }}>
        <IconButton
          color="primary"
          onClick={() => {
            if (isEditing) {
              handleFormSubmit()
            } else {
              handleEditClick()
            }
          }}
        >
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Paper>
  )
}

export default DrawingForm
