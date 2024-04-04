import Map from './components/Map'

const App = () => {
  // Check for the presence of the Mapbox access token
  if (!process.env.REACT_APP_API_KEY) {
    return (
      <div>
        <p>Please set REACT_APP_API_KEY to your Mapbox access token.</p>
      </div>
    )
  }

  return (
    <div>
      <Map />
    </div>
  )
}

export default App
