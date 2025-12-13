'use client';

import { useEffect, useState } from 'react';

export default function MyForest() {
    const [myTrees, setMyTrees] = useState(0);
    const [forestLevel, setForestLevel] = useState('Seedling');
    const [nextUnlock, setNextUnlock] = useState(5);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        // Load user's personal planting history
        const transactions = JSON.parse(localStorage.getItem('treetap_transactions') || '[]') as Array<{ amount?: number }>;
        const total = transactions.reduce((acc: number, curr: { amount?: number }) => acc + (curr.amount || 0), 0);
        setMyTrees(total);

        // Determine Level
        if (total >= 50) { setForestLevel('Forest Guardian'); setNextUnlock(100); }
        else if (total >= 20) { setForestLevel('Ranger'); setNextUnlock(50); }
        else if (total >= 5) { setForestLevel('Planter'); setNextUnlock(20); }
        else { setForestLevel('Seedling'); setNextUnlock(5); }
    }, []);

    if (!mounted) return null;

    // Generate Forest Visuals based on count
    const renderForest = () => {
        if (myTrees === 0) return (
            <div style={{ textAlign: 'center', opacity: 0.6 }}>
                <div style={{ fontSize: '4rem', filter: 'grayscale(100%)', marginBottom: '10px' }}>🌱</div>
                <p>No trees planted yet. Start your journey!</p>
            </div>
        );

        const items: React.ReactNode[] = [];
        // Add trees
        for (let i = 0; i < myTrees; i++) {
            const treeType = i % 3 === 0 ? '🌳' : i % 3 === 1 ? '🌲' : '🌴';
            items.push(
                <span key={`tree-${i}`} style={{
                    fontSize: '2.5rem',
                    animation: `popIn 0.5s ease-out backwards`,
                    animationDelay: `${i * 0.1}s`,
                    display: 'inline-block',
                    margin: '5px'
                }} title={`Tree #${i + 1}`}>
                    {treeType}
                </span>
            );
        }

        // Add Animals/Extras based on milestones
        if (myTrees >= 5) items.push(<span key="bird" style={{ fontSize: '2rem', animation: 'float 3s infinite' }}>🐦</span>);
        if (myTrees >= 10) items.push(<span key="fox" style={{ fontSize: '2rem' }}>🦊</span>);
        if (myTrees >= 20) items.push(<span key="butterfly" style={{ fontSize: '2rem', animation: 'float 2s infinite reversed' }}>🦋</span>);

        return items;
    };

    const progressPercent = Math.min((myTrees / nextUnlock) * 100, 100);

    return (
        <section style={{ padding: '80px 0', background: 'var(--forest-dark)' }}>
            <div className="container">
                <div className="glass-panel" style={{ padding: '40px', border: '1px solid var(--primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
                        <div>
                            <h2 style={{ marginBottom: '5px' }}>Your <span style={{ color: 'var(--primary)' }}>Virtual Forest</span></h2>
                            <p style={{ margin: 0, opacity: 0.8 }}>Track your personal impact on this device.</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Current Rank</div>
                            <div style={{ fontSize: '1.5rem', color: 'gold', fontWeight: 'bold' }}>🏆 {forestLevel}</div>
                        </div>
                    </div>

                    {/* Forest Visualization Area */}
                    <div style={{
                        minHeight: '200px',
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '16px',
                        padding: '30px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '30px',
                        borderBottom: '4px solid #4a3728' // Ground
                    }}>
                        {renderForest()}
                    </div>

                    {/* Progress Bar */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                            <span>Total Planted: <strong style={{ color: 'var(--primary)' }}>{myTrees}</strong></span>
                            <span>Next Reward: {nextUnlock} trees</span>
                        </div>
                        <div style={{ height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%',
                                width: `${progressPercent}%`,
                                background: 'linear-gradient(90deg, var(--primary), #27ae60)',
                                borderRadius: '6px',
                                transition: 'width 1s ease-out'
                            }} />
                        </div>
                        {myTrees === 0 && (
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <a href="#donate" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                                    Plant Your First Tree ($1)
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes popIn {
                    0% { transform: scale(0) translateY(20px); opacity: 0; }
                    80% { transform: scale(1.2) translateY(-5px); }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
            `}</style>
        </section>
    );
}
