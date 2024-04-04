import React from 'react'
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
} from '@mui/material'

// Map styles data
const mapStyles = [
  { label: 'Streets', value: 'streets-v12' },
  { label: 'Satellite Streets', value: 'satellite-streets-v12' },
  { label: 'Light', value: 'light-v11' },
  { label: 'Dark', value: 'dark-v11' },
  { label: 'Outdoors', value: 'outdoors-v12' },
]

// MapStyleMenuProps type definition
type MapStyleMenuProps = {
  onChange: (style: string) => void
}

// MapStyleMenu component
const MapStyleMenu: React.FC<MapStyleMenuProps> = ({ onChange }) => (
  <Box
    id="menu"
    sx={{
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 999,
      background: '#ffffff',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '10px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
    }}
  >
    <h3
      style={{
        margin: '0 0 10px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333333',
      }}
    >
      Map Styles
    </h3>
    <FormControl component="fieldset">
      <RadioGroup name="toggle" defaultValue="streets-v12">
        {mapStyles.map(({ label, value }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio color="primary" />}
            label={label}
            onChange={() => onChange(value)}
            sx={{ mb: '5px' }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  </Box>
)

export default MapStyleMenu
