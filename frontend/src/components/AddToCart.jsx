import React, { useState } from 'react';
import RouteMap from './RouteMap';

const AddToCart = () => {
  // Mock route data (replace with real data from your API)
  const mockRouteData = {
    routes: [
      {
        overview_polyline: {
          points:
            '_p~iF~ps|U_ulLnnqC_mqNvxq`@',
        },
      },
    ],
    start_location: {
      lat: 37.772,
      lng: -122.214,
    },
    end_location: {
      lat: 37.774,
      lng: -122.419,
    },
  };

  const [routeData, setRouteData] = useState(null);

  const handleShowRoute = () => {
    // Simulate fetching data from an API
    setRouteData(mockRouteData);
  };

  return (
    <div>
      <h1>Route Map Example</h1>
      <button onClick={handleShowRoute}>Show Route</button>
      {routeData ? (
        <RouteMap routeData={routeData} />
      ) : (
        <p>Click the button to display the route on the map.</p>
      )}
    </div>
  );
};

export default AddToCart;
