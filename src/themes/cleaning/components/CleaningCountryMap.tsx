import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2pibG9nczIwMjMiLCJhIjoiY21iM2ZmNDQ4MDZ5djJwc2F4MXdvejRjZSJ9.DM8BhznWkYNPO_ty6UFtkQ';

interface CleaningCountryMapProps {
  locationName?: string;
  lat?: number;
  lng?: number;
}

const CleaningCountryMap: React.FC<CleaningCountryMapProps> = ({
  locationName,
  lat,
  lng
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Don't render if we don't have coordinates
  if (lat == null || lng == null) {
    return null;
  }

  useEffect(() => {
    if (map.current) {
      // Recenter the map when lat/lng change
      map.current.setCenter([lng, lat]);
    } else {
      if (!mapboxgl.accessToken) return;

      // Initialize the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,  // map container reference
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],  // Initial center based on lat and lng
        zoom: 3,
        scrollZoom: true
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add a marker when the map loads
      map.current.on('load', () => {
        const el = document.createElement('div');
        el.className = 'country-marker';
        Object.assign(el.style, {
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#10B981',
          border: '4px solid white',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        });
        el.innerHTML = '🏠';

        const popup = new mapboxgl.Popup({ offset: 25, closeButton: true })
          .setHTML(`
            <div style="padding:15px; min-width:200px;">
              <h4 style="margin:0 0 10px 0; color:#10B981; font-size:18px;">
                ${locationName || 'Location'}
              </h4>
              <p style="margin:0;color:#666;">Professional services available</p>
            </div>
          `);

        new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map.current!);
      });
    }

    // Cleanup on component unmount
    return () => {
      map.current?.remove();
    };
  }, [lat, lng, locationName]);  // Re-run effect if lat, lng, or locationName changes

  return (
    <section className="py-20 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Our Service Coverage in {locationName}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive service coverage around {locationName}.
          </p>
        </div>
        <div
          ref={mapContainer}
          className="map-container h-[500px] rounded-2xl shadow-2xl border border-gray-200"
          style={{ width: '100%' }}
        />
      </div>
    </section>
  );
};

export default CleaningCountryMap;
