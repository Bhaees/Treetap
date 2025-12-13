'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Hero() {
    const { t, language } = useLanguage();
    const [treeCount, setTreeCount] = useState(1234567);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate mouse position relative to center of screen (-1 to 1)
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePosition({ x, y });
        };

        const interval = setInterval(() => {
            setTreeCount(prev => prev + Math.floor(Math.random() * 3));
        }, 3000);

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    const handlePlantTree = () => {
        setIsPaymentModalOpen(true);
        setPaymentSuccess(false);
    };

    const handleApprove = (details: { id?: string }) => {
        setPaymentSuccess(true);
        fireConfetti();
        setTreeCount(prev => prev + 1);

        // Save transaction for Admin Dashboard
        const newTransaction = {
            // eslint-disable-next-line react-hooks/purity
            id: details.id || `txn_${Date.now()}`, // Real PayPal Transaction ID with fallback
            // eslint-disable-next-line react-hooks/purity
            date: new Date().toISOString(),
            amount: 1.00,
            commission: 0.20,
            donation: 0.50,
            status: 'completed'
        };

        const existing = JSON.parse(localStorage.getItem('treetap_transactions') || '[]');
        localStorage.setItem('treetap_transactions', JSON.stringify([newTransaction, ...existing]));

        // Auto-close modal after 3 seconds
        setTimeout(() => {
            setIsPaymentModalOpen(false);
            setPaymentSuccess(false);
        }, 3000);
    };

    const fireConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: ReturnType<typeof setInterval> = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    // Parallax offset for future use
    // const parallaxOffset = scrollY * 0.5;

    return (
        <section style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: '80px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Payment Modal */}
            {isPaymentModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.8)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className="glass-panel" style={{ padding: '40px', maxWidth: '400px', width: '90%', animation: 'float 0.5s ease-out' }}>
                        {paymentSuccess ? (
                            <div style={{ textAlign: 'center' }}>
                                <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🎉</h1>
                                <h2 style={{ color: 'var(--primary)', marginBottom: '15px' }}>{t('payment_success_title')}</h2>
                                <p style={{ marginBottom: '20px' }}>{t('payment_success_msg')}</p>

                                <a
                                    href="/cert-preview.png"
                                    download="TreeTap_Certificate.png"
                                    className="btn btn-primary"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        width: '100%',
                                        justifyContent: 'center',
                                        padding: '15px',
                                        marginBottom: '15px'
                                    }}
                                >
                                    📄 Download Your Certificate
                                </a>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>No sign-up required. Thanks for your impact!</p>
                            </div>
                        ) : (
                            <>
                                <h2 style={{ color: 'var(--primary)', marginBottom: '15px' }}>{t('payment_modal_title')}</h2>
                                <p style={{ marginBottom: '30px' }}>{t('payment_modal_desc')}</p>

                                <div style={{ position: 'relative', zIndex: 10 }}>
                                    <PayPalButtons
                                        style={{ layout: "vertical", shape: "rect", color: "gold" }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                intent: "CAPTURE",
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            currency_code: "USD",
                                                            value: "1.00",
                                                        },
                                                        description: "TreeTap - Plant 1 Tree"
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={async (data, actions) => {
                                            if (actions.order) {
                                                const details = await actions.order.capture();
                                                handleApprove(details);
                                            }
                                        }}
                                    />
                                </div>

                                <button
                                    onClick={() => setIsPaymentModalOpen(false)}
                                    style={{ background: 'transparent', border: 'none', color: '#fff', marginTop: '15px', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Live Video Background "Real Trees" */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -2,
                overflow: 'hidden'
            }}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/forest-canopy.png"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: 'scale(1.1)',
                        zIndex: 10 /* Force video on top */
                    }}
                >
                    {/* Verified Working Source (HTTP 200 OK) */}
                    <source src="https://videos.pexels.com/video-files/2882118/2882118-hd_1920_1080_24fps.mp4" type="video/mp4" />

                    Your browser does not support the video tag.
                </video>


                {/* Fallback Image (Under Video) */}
                <Image
                    src="/forest-canopy.png"
                    alt="Lush forest canopy"
                    fill
                    style={{ objectFit: 'cover', zIndex: 1 }}
                    priority
                />
            </div>

            {/* Gradient Overlay for Legitimacy/Premium Feel */}
            <div className="parallax-overlay" style={{
                background: 'linear-gradient(180deg, rgba(10,31,15,0.6) 0%, rgba(10,31,15,0.4) 50%, rgba(10,31,15,0.8) 100%)'
            }} />

            {/* Falling Leaves Animation */}
            <div className="leaf">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className="container" style={{
                position: 'relative',
                zIndex: 2,
                transform: `perspective(1000px) rotateY(${mousePosition.x * 2}deg) rotateX(${mousePosition.y * -2}deg)`,
                transition: 'transform 0.1s ease-out'
            }}>
                <div className="fade-in-up">
                    <h1 style={{
                        marginBottom: '20px',
                        maxWidth: '900px',
                        margin: '0 auto 20px',
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                        direction: language === 'ar' ? 'rtl' : 'ltr'
                    }}>
                        {t('hero_title_prefix')}<span style={{ color: 'var(--primary)' }}>{t('hero_title_highlight')}</span>{t('hero_title_suffix')}
                    </h1>
                    <p style={{
                        fontSize: '1.3rem',
                        maxWidth: '700px',
                        margin: '0 auto 40px',
                        color: 'var(--text-secondary)',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)'
                    }}>
                        {t('hero_subtitle')}
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            onClick={handlePlantTree}
                            className="btn btn-primary"
                            style={{ fontSize: '1.1rem', padding: '16px 32px' }}
                        >
                            {t('hero_cta_plant')}
                        </button>
                        <a href="#about" className="btn glass-panel" style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            fontSize: '1.1rem',
                            padding: '16px 32px',
                            color: 'var(--text-primary)'
                        }}>
                            {t('hero_cta_story')}
                        </a>
                    </div>
                </div>

                {/* Floating Stats - Live Counter */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '30px',
                    marginTop: '80px',
                    maxWidth: '900px',
                    margin: '80px auto 0'
                }}>
                    <div className="glass-panel floating" style={{
                        padding: '30px 20px',
                        background: 'rgba(46, 204, 113, 0.15)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--primary)'
                    }}>
                        <h2 style={{
                            color: 'var(--primary)',
                            marginBottom: '10px',
                            fontSize: '2.5rem',
                            fontFamily: 'monospace'
                        }}>{treeCount.toLocaleString()}</h2>
                        <p style={{ color: 'var(--text-primary)', margin: 0 }}>{t('hero_live_counter')}</p>
                    </div>

                    {[
                        { number: '200K+', label: t('hero_stat_communities') },
                        { number: '8', label: t('hero_stat_countries') }
                    ].map((stat, index) => (
                        <div key={index} className="glass-panel floating" style={{
                            padding: '30px 20px',
                            animationDelay: `${(index + 1) * 0.2}s`,
                            background: 'rgba(46, 204, 113, 0.1)',
                            backdropFilter: 'blur(20px)'
                        }}>
                            <h2 style={{
                                color: 'var(--primary)',
                                marginBottom: '10px',
                                fontSize: '2.5rem'
                            }}>{stat.number}</h2>
                            <p style={{ color: 'var(--text-primary)', margin: 0 }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 3,
                animation: 'float 3s ease-in-out infinite'
            }}>
                <div style={{
                    width: '30px',
                    height: '50px',
                    border: '2px solid var(--primary)',
                    borderRadius: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '8px'
                }}>
                    <div style={{
                        width: '6px',
                        height: '12px',
                        background: 'var(--primary)',
                        borderRadius: '3px',
                        animation: 'float 2s ease-in-out infinite'
                    }} />
                </div>
            </div>
        </section>
    );
}
