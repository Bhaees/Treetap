'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';
import { useEffect, useState } from 'react';

// Custom Tree Icon
const createTreeIcon = () => {
    if (typeof window === 'undefined') return undefined; // SSR check
    return divIcon({
        className: 'custom-icon',
        html: `<div style="font-size: 24px;">🌳</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });
};

export default function PlantingMap() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div style={{ height: '400px', background: 'rgba(0,0,0,0.1)', borderRadius: '16px' }} />;

    const locations = [
        { name: "Madagascar (Mahajanga)", coords: [-15.71, 46.32] as [number, number], trees: "12.5M", type: "Mangroves" },
        { name: "Indonesia (Central Java)", coords: [-7.61, 110.71] as [number, number], trees: "3.2M", type: "Rainforest" },
        { name: "Mozambique (Maputo)", coords: [-25.96, 32.57] as [number, number], trees: "800K", type: "Coastal" },
        { name: "Haiti (South)", coords: [18.53, -72.33] as [number, number], trees: "1.1M", type: "Agroforestry" },
        { name: "Nepal (Chitwan)", coords: [27.52, 84.45] as [number, number], trees: "450K", type: "Mountain" },
    ];

    return (
        <div className="glass-panel" style={{ padding: '20px', height: '100%', overflow: 'hidden' }}>
            <MapContainer
                center={[-10.0, 60.0]}
                zoom={3}
                style={{ height: '500px', width: '100%', borderRadius: '12px', zIndex: 1 }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {locations.map((loc, idx) => (
                    <Marker key={idx} position={loc.coords} icon={createTreeIcon()}>
                        <Popup>
                            <div style={{ textAlign: 'center' }}>
                                <h3 style={{ margin: '0 0 5px 0', color: '#2ecc71' }}>{loc.name}</h3>
                                <p style={{ margin: 0 }}><strong>{loc.trees}</strong> planted</p>
                                <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>{loc.type}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
