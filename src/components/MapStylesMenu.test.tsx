import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import MapStyleMenu from './MapStylesMenu'

describe('MapStyleMenu', () => {
  it('renders map styles menu and calls onChange with selected style', () => {
    // Mock onChange function
    const mockOnChange = jest.fn()

    // Render the MapStyleMenu component
    render(<MapStyleMenu onChange={mockOnChange} />)

    // Click on the map styles button
    fireEvent.click(screen.getByLabelText('map styles'))

    // Ensure that the menu is opened
    expect(screen.getByRole('menu')).toBeInTheDocument()

    // Click on a map style
    fireEvent.click(screen.getByText('Streets'))

    // Ensure that the onChange function is called with the selected style
    expect(mockOnChange).toHaveBeenCalledWith('streets-v12')
  })
})
