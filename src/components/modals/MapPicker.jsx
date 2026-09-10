import React, { useState, useEffect } from "react";
import { X, MapPin, Navigation, MapPinned } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with bundlers
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map clicks and moving the marker
function LocationMarker({ position, setPosition }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

// Component to programmatically update the map's center
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);
  return null;
}

const MapPicker = ({ isOpen, onClose, onConfirm }) => {
  // Default to somewhere (e.g. Bangalore center, or 0,0)
  const defaultCenter = { lat: 12.9716, lng: 77.5946 };
  const [position, setPosition] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // When modal opens, try to get user's location if we don't have a position yet
  useEffect(() => {
    if (isOpen && !position) {
      handleGetCurrentLocation();
    }
  }, [isOpen]);

  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (loc) => {
          const latlng = {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          };
          setPosition(latlng);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000 },
      );
    } else {
      setIsLoadingLocation(false);
    }
  };

  const handleConfirm = () => {
    if (!position) return;

    // Generate the Google Maps iframe string using the exact format expected by the backend
    const iframeString = `<iframe src="https://maps.google.com/maps?q=${position.lat},${position.lng}&hl=es;z=14&output=embed" width="100%" height="300" frameborder="0" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"><!-- !3d${position.lat}!4d${position.lng} --></iframe>`;

    onConfirm(iframeString, position);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-surface-primary rounded-2xl overflow-hidden shadow-2xl border border-border-primary flex flex-col"
      >
        <div className="px-4 py-3 border-b border-border-primary flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-text-primary">
              Select Location
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              Tap anywhere on the map to drop a pin.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-secondary rounded-xl transition-colors text-zinc-400 hover:text-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative h-[400px] w-full bg-zinc-900">
          <MapContainer
            center={position || defaultCenter}
            zoom={position ? 15 : 12}
            className="w-full h-full z-10"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker position={position} setPosition={setPosition} />
            <MapUpdater center={position} />
          </MapContainer>

          {/* Custom Controls */}
          <div className="absolute bottom-6 right-6 z-[400]">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleGetCurrentLocation();
              }}
              disabled={isLoadingLocation}
              className="bg-surface-primary p-3 rounded-full shadow-md border border-border-primary hover:bg-surface-secondary transition-all text-text-primary group disabled:opacity-50 active:scale-95"
              title="Use my current location"
            >
              <MapPinned
                className={`w-6 h-6 ${isLoadingLocation ? "animate-pulse" : "group-hover:scale-110 transition-transform"}`}
              />
            </button>
          </div>
        </div>

        <div className="p-5 border-t border-border-primary flex flex-col sm:flex-row items-center justify-between bg-surface-primary gap-4">
          <div className="flex-1 w-full sm:w-auto">
            {position ? (
              <div className="flex flex-col">
                <span className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">
                  Selected Coordinates
                </span>
                <span className="text-sm font-bold text-text-primary bg-surface-secondary px-3 py-1.5 rounded-lg border border-border-secondary inline-flex w-fit">
                  {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
                </span>
              </div>
            ) : (
              <p className="text-sm font-medium text-text-secondary flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Please select a location on the map
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleConfirm}
              disabled={!position}
              className="w-full sm:w-auto px-6 py-3.5 bg-surface-dark text-text-inverted font-bold rounded-xl hover:bg-zinc-800 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed flex-shrink-0"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MapPicker;
