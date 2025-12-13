'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const RECENT_DONORS = [
    { name: 'Alex M.', country: '🇬🇧 UK', trees: 5 },
    { name: 'Sarah J.', country: '🇺🇸 USA', trees: 1 },
    { name: 'David K.', country: '🇨🇦 Canada', trees: 10 },
    { name: 'Maria G.', country: '🇪🇸 Spain', trees: 3 },
    { name: 'Yuki T.', country: '🇯🇵 Japan', trees: 2 },
    { name: 'Ahmed R.', country: '🇦🇪 UAE', trees: 20 },
    { name: 'Sophie L.', country: '🇫🇷 France', trees: 1 },
    { name: 'Chen W.', country: '🇨🇳 China', trees: 8 },
];

export default function SocialProof() {
    const [current, setCurrent] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Start loop
        const loop = setInterval(() => {
            setIsVisible(true);

            // Hide after 4 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);

            // Change person after 8 seconds (wait for hide)
            setTimeout(() => {
                setCurrent(prev => (prev + 1) % RECENT_DONORS.length);
            }, 8000);

        }, 12000); // Trigger every 12 seconds

        // Initial trigger
        setTimeout(() => setIsVisible(true), 2000);

        return () => clearInterval(loop);
    }, []);

    const donor = RECENT_DONORS[current];

    return (
        <AnimatePresence>
            {isVisible && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    zIndex: 100,
                    pointerEvents: 'none' // Let clicks pass through
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="glass-panel"
                        style={{
                            padding: '15px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            background: 'rgba(10, 31, 15, 0.85)',
                            border: '1px solid var(--primary)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            minWidth: '280px'
                        }}
                    >
                        <div style={{
                            fontSize: '2rem',
                            background: 'rgba(46, 204, 113, 0.2)',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            🌿
                        </div>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 'bold' }}>
                                {donor.name} from {donor.country}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>
                                Just planted <span style={{ fontWeight: 'bold' }}>{donor.trees} trees</span>!
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '2px' }}>
                                Verified • Just now
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
