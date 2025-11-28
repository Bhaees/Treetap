export default function Hero() {
    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: '80px',
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 148, 0.05) 0%, transparent 50%)'
        }}>
            <div className="container">
                <h1 style={{ marginBottom: '20px', maxWidth: '800px', margin: '0 auto 20px' }}>
                    Future-Proof Your Enterprise with <span style={{ color: 'var(--primary)' }}>Intelligent Automation</span>
                </h1>
                <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px', color: 'var(--text-secondary)' }}>
                    Treetap delivers cutting-edge software solutions and embedded systems designed to scale with your ambition.
                </p>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <a href="#contact" className="btn btn-primary">
                        Start Your Project
                    </a>
                    <a href="#services" className="btn" style={{ background: 'var(--secondary)', border: '1px solid var(--accent)' }}>
                        Explore Services
                    </a>
                </div>
            </div>
        </section>
    );
}
