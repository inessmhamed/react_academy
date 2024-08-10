import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from "react-i18next";
import styles from './Map.module.css';

const Map = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const map = L.map('map').setView([33.7045505, 8.9735676], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markerPosition: [number, number] = [33.7045505,8.9736122];
    const markerPopupContent: string = t("map.address");

    const marker = L.marker(markerPosition).addTo(map);

    marker.bindPopup(markerPopupContent);

    marker.on('click', () => {
      marker.openPopup();
    });
  }, []);

  return <div id="map" className={styles['mapContainer']}></div>;
};


export default Map;
