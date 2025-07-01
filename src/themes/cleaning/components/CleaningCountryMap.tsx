
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2pibG9nczIwMjMiLCJhIjoiY21iM2ZmNDQ4MDZ5djJwc2F4MXdvejRjZSJ9.DM8BhznWkYNPO_ty6UFtkQ';

interface CleaningCountryMapProps {
  locationName?: string;
  lat?: number;
  lng?: number;
  pageType?: string;
}

const CleaningCountryMap: React.FC<CleaningCountryMapProps> = ({
  locationName,
  lat,
  lng,
  pageType = 'country'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Don't render if we don't have coordinates
  if (lat == null || lng == null) {
    return null;
  }

  // Get zoom level based on page type
  const getZoomLevel = (type: string) => {
    switch (type) {
      case 'country':
        return 5;
      case 'state':
        return 7;
      case 'city':
        return 10;
      case 'local_area':
        return 13;
      default:
        return 8;
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxgl.accessToken) return;
    
    // Clean up existing map
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    // Small delay to ensure container is ready
    const initTimeout = setTimeout(() => {
      if (!mapContainer.current) return;

      try {
        // Initialize the map with dynamic zoom based on page type
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: getZoomLevel(pageType),
          scrollZoom: true
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add a marker when the map loads
        map.current.on('load', () => {
          setIsMapReady(true);
          
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

        map.current.on('error', (e) => {
          console.error('Map error:', e);
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 100);

    // Cleanup on component unmount
    return () => {
      clearTimeout(initTimeout);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lat, lng, locationName, pageType]);

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
        {!isMapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
            <div className="text-gray-500">Loading map...</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CleaningCountryMap;
