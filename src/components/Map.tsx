import ReactMapbox from 'react-map-gl'

const TOKEN = process.env.REACT_APP_API_KEY

const Map = () => {
  return (
    <div className="map-container">
      <ReactMapbox
        initialViewState={{
          longitude: -91.874,
          latitude: 42.76,
          zoom: 5,
        }}
        //map styles https://docs.mapbox.com/api/maps/styles/
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={TOKEN}
      ></ReactMapbox>
    </div>
  )
}

export default Map
