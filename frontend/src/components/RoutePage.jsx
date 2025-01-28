import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const RoutePage = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [reverseAddress, setReverseAddress] = useState('');
  const [origin, setOrigin] = useState('');
  const [destinations, setDestinations] = useState('');
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [deviceLocation, setDeviceLocation] = useState(null);

  const handleGeocode = async () => {
    try {
      const response = await axios.post('/api/user/customer/geocode', { address });
      setCoordinates(response.data.results[0].geometry.location);
      toast.success('Geocoding successful!');
    } catch (error) {
      toast.error('Failed to geocode address.');
    }
  };

  const handleReverseGeocode = async () => {
    const [lat, lon] = reverseAddress.split(',').map(Number);
    try {
      const response = await axios.post('/api/user/customer/reverse', { lat, lon });
      toast.success('Reverse geocoding successful!');
    } catch (error) {
      toast.error('Failed to reverse geocode coordinates.');
    }
  };

  const handleOptimizeRoute = async () => {
    const destinationsArray = destinations.split(';').map((dest) => {
      const [lat, lon] = dest.split(',');
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    });
    try {
      const response = await axios.post('/api/user/customer/optimize', {
        origin: { lat: 28.7041, lon: 77.1025 }, // Example origin (New Delhi)
        destinations: destinationsArray
      });
      setOptimizedRoute(response.data.routes);
      toast.success('Route optimization successful!');
    } catch (error) {
      toast.error('Failed to optimize routes.');
    }
  };

  const [location, setLocation] = useState(null);
  const GOOGLE_API_KEY = "AIzaSyBp2vxnypb_RIEbySnqcRaGZUMthm5n490";

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          setLocation({ latitude, longitude });

          // Call Google Geocoding API to get the address
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
            );
            const address = response.data.results[0]?.formatted_address;
            alert(`Current Address: ${address}`);
          } catch (error) {
            console.error("Error fetching address", error);
          }

          // Optionally send location to the backend
          await saveLocationToBackend(latitude, longitude);
        },
        (error) => {
          alert(`Error getting location: ${error.message}`);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const saveLocationToBackend = async (latitude, longitude) => {
    try {
      await axios.post("/api/user/customer/getlocation", { latitude, longitude });
      alert("Location saved successfully");
    } catch (error) {
      console.error("Error saving location", error);
    }
  };
  

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-4/5 md:w-3/4 lg:w-1/2">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">Google API Integration</h1>

        {/* Geocoding */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Geocode Address</h2>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Address"
          />
          <button
            onClick={handleGeocode}
            className="mt-4 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Geocode
          </button>
          {coordinates && (
            <div className="mt-4 bg-blue-50 p-4 rounded-md">
              <p className="text-gray-700">Latitude: {coordinates.lat}</p>
              <p className="text-gray-700">Longitude: {coordinates.lng}</p>
            </div>
          )}
        </div>

        {/* Reverse Geocoding */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Reverse Geocode Coordinates</h2>
          <input
            type="text"
            value={reverseAddress}
            onChange={(e) => setReverseAddress(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Lat,Lon (e.g., 28.7041,77.1025)"
          />
          <button
            onClick={handleReverseGeocode}
            className="mt-4 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Reverse Geocode
          </button>
        </div>

        {/* Route Optimization */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Route Optimization</h2>
          <textarea
            value={destinations}
            onChange={(e) => setDestinations(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Destinations (Lat,Lon) separated by ;"
          />
          <button
            onClick={handleOptimizeRoute}
            className="mt-4 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            Optimize Routes
          </button>
          {optimizedRoute && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <pre className="text-gray-700">{JSON.stringify(optimizedRoute, null, 2)}</pre>
            </div>
          )}
        </div>

        {/* Device Location */}
        <div className="p-4">
      <h1>Get User Location with Google API</h1>
      <p>
        {location && `Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
      </p>
      <button onClick={getLocation} className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Get Location
      </button>
    </div>
      </div>
    </div>
  );
};

export default RoutePage;
