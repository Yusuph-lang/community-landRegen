import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  latitude: number | null;
  longitude: number | null;
  status: string;
  project_type: string;
}

interface ProjectMapProps {
  projects: Project[];
}

export function ProjectMap({ projects }: ProjectMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', initMap);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', initMap);
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map) {
      updateMarkers();
    }
  }, [projects, map]);

  const initMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: { lat: 20, lng: 0 },
      zoom: 2,
      styles: [
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#c9e5f5' }],
        },
      ],
    });

    setMap(mapInstance);
  };

  const updateMarkers = () => {
    markers.forEach(marker => marker.setMap(null));

    const newMarkers: google.maps.Marker[] = [];

    projects.forEach(project => {
      if (project.latitude && project.longitude) {
        const marker = new google.maps.Marker({
          position: { lat: project.latitude, lng: project.longitude },
          map: map,
          title: project.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: getStatusColor(project.status),
            fillOpacity: 0.9,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 4px;">${project.title}</h3>
              <p style="font-size: 12px; color: #666; margin-bottom: 4px;">
                ${formatProjectType(project.project_type)}
              </p>
              <p style="font-size: 12px;">
                <span style="display: inline-block; padding: 2px 8px; background: ${getStatusColor(project.status)}; color: white; border-radius: 12px;">
                  ${project.status}
                </span>
              </p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        newMarkers.push(marker);
      }
    });

    setMarkers(newMarkers);

    if (newMarkers.length > 0 && map) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        const position = marker.getPosition();
        if (position) bounds.extend(position);
      });
      map.fitBounds(bounds);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      planning: '#f59e0b',
      active: '#10b981',
      completed: '#3b82f6',
      on_hold: '#6b7280',
    };
    return colors[status] || '#6b7280';
  };

  const formatProjectType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-emerald-600" />
        <h3 className="font-semibold text-gray-900">Project Locations</h3>
        <span className="text-sm text-gray-500 ml-auto">
          {projects.filter(p => p.latitude && p.longitude).length} projects mapped
        </span>
      </div>
      <div ref={mapRef} className="w-full h-96" />
      <div className="p-4 bg-gray-50 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-gray-600">Planning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-gray-600">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-gray-600">On Hold</span>
        </div>
      </div>
    </div>
  );
}
