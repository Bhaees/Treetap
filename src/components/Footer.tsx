export default function Footer() {
    return (
        <footer style={{ borderTop: '1px solid var(--accent)', padding: '60px 0 20px', marginTop: '100px', background: 'var(--secondary)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>
                    <div>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '20px' }}>TreeTap</h3>
                        <p style={{ fontSize: '0.9rem' }}>
                            Innovating the future of enterprise software and automation.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Services</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-secondary)' }}>
                            <li>Custom Software</li>
                            <li>Embedded Systems</li>
                            <li>Cloud Solutions</li>
                            <li>Consulting</li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Company</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-secondary)' }}>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Contact</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>

                <div style={{ textAlign: 'center', borderTop: '1px solid var(--accent)', paddingTop: '20px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    © {new Date().getFullYear()} Treetap LLC. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
