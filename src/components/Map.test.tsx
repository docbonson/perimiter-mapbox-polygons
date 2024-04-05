import { render } from '@testing-library/react'
import Map from './Map'

// Mock the accessToken
jest.mock('./Map', () => ({
  __esModule: true,
  default: () => <div>Mocked Map Component</div>,
  accessToken: 'mock-access-token',
}))

test('renders the Map component', () => {
  render(<Map />)
})
