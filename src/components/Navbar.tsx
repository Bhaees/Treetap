'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
    const { t, toggleLanguage, language, dir } = useLanguage();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel" style={{ margin: '20px', borderRadius: '16px' }}>
            <div className="container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    🌳 {t('nav_home')}
                </Link>

                <div style={{ display: 'flex', gap: '30px', flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}>
                    <Link href="#about" className="nav-link">{t('nav_about')}</Link>
                    <Link href="#impact" className="nav-link">{t('nav_impact')}</Link>
                    <Link href="#projects" className="nav-link">{t('nav_projects')}</Link>
                    <Link href="#donate" className="nav-link">{t('nav_get_involved')}</Link>
                </div>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <button
                        onClick={toggleLanguage}
                        className="btn glass-panel"
                        style={{ padding: '8px 16px', fontSize: '0.9rem', cursor: 'pointer', background: 'rgba(255,255,255,0.1)' }}
                    >
                        {language === 'en' ? '🇺🇸 EN' : '🇦🇪 AR'}
                    </button>

                    <Link href="#donate" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                        🌱 {t('nav_donate')}
                    </Link>
                </div>
            </div>
        </nav>
    );
}


