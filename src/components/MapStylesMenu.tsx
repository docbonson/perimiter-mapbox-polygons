import React, { useState } from 'react'
import { Menu, MenuItem, IconButton, Paper } from '@mui/material'
import MapIcon from '@mui/icons-material/Map'

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

const MapStyleMenu: React.FC<MapStyleMenuProps> = ({ onChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Paper
      elevation={3}
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 999,
        background: '#f0f0f0',
        borderRadius: '10px',
        padding: '5px',
      }}
    >
      <IconButton onClick={handleClick} color="inherit" aria-label="map styles">
        <MapIcon />
      </IconButton>
      <Menu
        id="map-styles-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {mapStyles.map(({ label, value }) => (
          <MenuItem
            key={value}
            onClick={() => {
              onChange(value)
              handleClose()
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  )
}

export default MapStyleMenu
