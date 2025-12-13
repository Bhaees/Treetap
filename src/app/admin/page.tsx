'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Transaction = {
    id: string;
    date: string;
    amount: number;
    commission: number;
    donation: number;
    status: string;
};

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Stats
    const [stats, setStats] = useState({
        totalRevenue: 0,
        myProfit: 0,
        donationPool: 0,
        treesPlanted: 0
    });

    useEffect(() => {
        if (isAuthenticated) {
            const data = JSON.parse(localStorage.getItem('treetap_transactions') || '[]') as Transaction[];
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTransactions(data);

            const newStats = data.reduce((acc: typeof stats, curr: Transaction) => ({
                totalRevenue: acc.totalRevenue + curr.amount,
                myProfit: acc.myProfit + curr.commission,
                donationPool: acc.donationPool + curr.donation,
                treesPlanted: acc.treesPlanted + 1
            }), { totalRevenue: 0, myProfit: 0, donationPool: 0, treesPlanted: 0 });

            setStats(newStats);
        }
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/check-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setIsAuthenticated(true);
            } else {
                alert('Invalid Password');
            }
        } catch (error) {
            console.error('Login error', error);
            alert('An error occurred during login');
        }
    };

    const handleInstantTransfer = () => {
        // In a real app, this would trigger a Payout API call
        // For now, we open PayPal's money transfer page
        window.open('https://www.paypal.com/myaccount/money', '_blank');
    };

    const handleExportCSV = () => {
        const headers = ['ID', 'Date', 'Amount', 'My Profit ($0.20)', 'Donation ($0.50)', 'Status'];
        const rows = transactions.map(t => [
            t.id,
            new Date(t.date).toLocaleDateString(),
            `$${t.amount.toFixed(2)}`,
            `$${t.commission.toFixed(2)}`,
            `$${t.donation.toFixed(2)}`,
            t.status
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers, ...rows].map(e => e.join(",")).join("\n");

        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "treetap_earnings.csv");
        document.body.appendChild(link);
        link.click();
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--background)'
            }}>
                <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '400px' }}>
                    <h2 style={{ color: 'var(--primary)', marginBottom: '20px', textAlign: 'center' }}>TreeTap Admin</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginBottom: '20px',
                                background: 'rgba(0,0,0,0.2)',
                                border: '1px solid var(--accent)',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                        />
                        <button className="btn btn-primary" style={{ width: '100%' }}>Login Dashboard</button>
                    </form>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>← Back to Site</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', padding: '40px 20px' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2rem' }}>Commission Dashboard 📊</h1>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <Link href="/" className="btn glass-panel" style={{ padding: '10px 20px', color: '#fff' }}>
                            View Live Site
                        </Link>
                        <button onClick={() => setIsAuthenticated(false)} style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </div>
                </div>

                {/* Instant Transfer Section */}
                <div className="glass-panel" style={{ padding: '30px', marginBottom: '40px', borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <h2 style={{ color: 'var(--primary)', marginBottom: '5px' }}>Instant Payout Available</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>You have <strong>${stats.myProfit.toFixed(2)}</strong> ready for immediate transfer to your bank.</p>
                        </div>
                        <button onClick={handleInstantTransfer} className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>
                            ⚡️ Transfer ${stats.myProfit.toFixed(2)} to Bank
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                    <div className="glass-panel" style={{ padding: '25px' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Taps ($1.00)</p>
                        <h3 style={{ fontSize: '2rem', marginTop: '10px' }}>{stats.treesPlanted}</h3>
                    </div>
                    <div className="glass-panel" style={{ padding: '25px', background: 'rgba(46, 204, 113, 0.1)' }}>
                        <p style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>My Profit ($0.20/tap)</p>
                        <h3 style={{ fontSize: '2rem', marginTop: '10px', color: 'var(--primary)' }}>${stats.myProfit.toFixed(2)}</h3>
                    </div>
                    <div className="glass-panel" style={{ padding: '25px', background: 'rgba(255, 255, 255, 0.05)' }}>
                        <p style={{ color: '#fff', fontSize: '0.9rem' }}>Eden Donation Pool ($0.50/tap)</p>
                        <h3 style={{ fontSize: '2rem', marginTop: '10px' }}>${stats.donationPool.toFixed(2)}</h3>
                    </div>
                    <div className="glass-panel" style={{ padding: '25px' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>PayPal Fees (Est.)</p>
                        <h3 style={{ fontSize: '2rem', marginTop: '10px', color: '#e74c3c' }}>-${(stats.treesPlanted * 0.30).toFixed(2)}</h3>
                    </div>
                </div>

                {/* Transaction Log */}
                <div className="glass-panel" style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3>Recent Transactions</h3>
                        <button onClick={handleExportCSV} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                            Download CSV
                        </button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                    <th style={{ padding: '15px' }}>Date</th>
                                    <th style={{ padding: '15px' }}>Transaction ID</th>
                                    <th style={{ padding: '15px' }}>Amount</th>
                                    <th style={{ padding: '15px', color: 'var(--primary)' }}>Your Cut</th>
                                    <th style={{ padding: '15px' }}>Donation</th>
                                    <th style={{ padding: '15px' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} style={{ padding: '30px', textAlign: 'center' }}>No transactions yet. Go plant some trees!</td>
                                    </tr>
                                ) : (
                                    transactions.map(t => (
                                        <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                            <td style={{ padding: '15px' }}>{new Date(t.date).toLocaleTimeString()}</td>
                                            <td style={{ padding: '15px', fontFamily: 'monospace' }}>#{t.id}</td>
                                            <td style={{ padding: '15px' }}>${t.amount.toFixed(2)}</td>
                                            <td style={{ padding: '15px', color: 'var(--primary)', fontWeight: 'bold' }}>+${t.commission.toFixed(2)}</td>
                                            <td style={{ padding: '15px' }}>${t.donation.toFixed(2)}</td>
                                            <td style={{ padding: '15px' }}>
                                                <span style={{
                                                    background: 'rgba(46, 204, 113, 0.2)',
                                                    color: 'var(--primary)',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.8rem'
                                                }}>
                                                    {t.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
