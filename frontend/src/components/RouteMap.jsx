import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';

const RouteMap = ({ routeData }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (routeData && mapRef.current) {
      
      const bounds = new window.google.maps.LatLngBounds();
      routeData.routes[0].legs.forEach((leg) => {
        bounds.extend(new window.google.maps.LatLng(leg.start_location.lat, leg.start_location.lng));
        bounds.extend(new window.google.maps.LatLng(leg.end_location.lat, leg.end_location.lng));
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [routeData]);

  // Decode polyline points
  const coordinates = window.google.maps.geometry.encoding.decodePath(routeData.routes[0].overview_polyline.points);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBp2vxnypb_RIEbySnqcRaGZUMthm5n490" libraries={['geometry']}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '500px' }}
        zoom={13}
        center={{
          lat: routeData.start_location.lat,
          lng: routeData.start_location.lng,
        }}
        ref={mapRef}
      >
        <Polyline
          path={coordinates}
          options={{
            strokeColor: '#0000FF',
            strokeOpacity: 1,
            strokeWeight: 4,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default RouteMap;
