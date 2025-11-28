import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel" style={{ margin: '20px', borderRadius: '16px' }}>
            <div className="container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    TreeTap
                </Link>

                <div style={{ display: 'flex', gap: '30px' }}>
                    <Link href="#features" className="nav-link">Features</Link>
                    <Link href="#services" className="nav-link">Services</Link>
                    <Link href="#about" className="nav-link">About</Link>
                    <Link href="#contact" className="nav-link">Contact</Link>
                </div>

                <Link href="#contact" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                    Get Started
                </Link>
            </div>
        </nav>
    );
}
