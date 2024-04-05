import { render, fireEvent, screen } from '@testing-library/react'
import DrawingForm from './DrawingForm'

// Mock functions
const mockOnSubmit = jest.fn()
const mockOnDelete = jest.fn()

describe('DrawingForm', () => {
  it('renders with provided properties and calls onSubmit with new name when form is submitted', () => {
    const mockProperties = { name: 'Polygon 1' }
    const mockId = '1'
    render(
      <DrawingForm
        id={mockId}
        properties={mockProperties}
        onSubmit={mockOnSubmit}
        onDelete={mockOnDelete}
      />,
    )

    // Ensure that the form renders with the provided properties
    expect(screen.getByText('Polygon:')).toBeInTheDocument()
    expect(screen.getByText('Polygon 1')).toBeInTheDocument()

    // Simulate entering edit mode
    fireEvent.click(screen.getByTestId('EditIcon'))

    // Ensure that the input field appears with the correct placeholder text
    expect(screen.getByPlaceholderText('Name this shape')).toBeInTheDocument()

    // Simulate changing the name
    const newName = 'New Polygon Name'
    fireEvent.change(screen.getByPlaceholderText('Name this shape'), {
      target: { value: newName },
    })

    // Simulate submitting the form
    fireEvent.click(screen.getByTestId('SaveIcon'))

    // Ensure that onSubmit is called with the correct parameters
    expect(mockOnSubmit).toHaveBeenCalledWith(mockId, newName)
  })

  it('calls onDelete with ID when delete button is clicked', () => {
    const mockId = '1'
    render(
      <DrawingForm
        id={mockId}
        properties={{ name: 'Polygon 1' }}
        onSubmit={mockOnSubmit}
        onDelete={mockOnDelete}
      />,
    )

    // Simulate clicking the delete button
    fireEvent.click(screen.getByTestId('DeleteIcon'))

    // Ensure that onDelete is called with the correct ID
    expect(mockOnDelete).toHaveBeenCalledWith(mockId)
  })
})
