'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { useState } from 'react';

const PlantingMap = dynamic(() => import('@/components/PlantingMap'), { ssr: false });
const MyForest = dynamic(() => import('@/components/MyForest'), { ssr: false });
// SocialProof component - can be dynamically imported when needed
// const SocialProof = dynamic(() => import('@/components/SocialProof'), { ssr: false });

interface Feature {
  icon: string;
  title: string;
  desc: string;
  details: {
    subtitle: string;
    content: string;
    stats: string[];
  };
}

export default function Home() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const features = [
    {
      icon: '🌳',
      title: 'Reforestation',
      desc: 'Planting millions of native trees to restore degraded landscapes.',
      details: {
        subtitle: 'More Than Just Planting',
        content: 'We focus on native species like Mangroves in Madagascar and Dry Deciduous trees in Indonesia. Our "employ-to-plant" methodology ensures an 85% seedling survival rate by giving local communities ownership over the forests.',
        stats: ['Mangroves & Native Species', '85% Survival Rate', 'Protected for 10+ Years']
      }
    },
    {
      icon: '👥',
      title: 'Community Impact',
      desc: 'Creating jobs and sustainable income for local families.',
      details: {
        subtitle: 'Empowering Villages',
        content: 'We hire local villagers to plant and guard the trees. This provides consistent, fair-wage employment in areas of extreme poverty. Notably, over 40% of our workforce are women, empowering them to start micro-enterprises.',
        stats: ['Fair Wage Employment', '40%+ Women Workforce', 'Financial Independence']
      }
    },
    {
      icon: '🌍',
      title: 'Climate Action',
      desc: 'Sequestering carbon and protecting biodiversity.',
      details: {
        subtitle: 'Cooling the Planet',
        content: 'Forests are the most effective carbon capture technology we have. By restoring ecosystems, we also rebuild habitats for endangered species like the Lemur in Madagascar and the Javan Rhinoceros.',
        stats: ['Carbon Sequestration', 'Biodiversity Habitat', 'Soil Restoration']
      }
    }
  ];

  return (
    <main>
      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.85)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setSelectedFeature(null)}>
          <div
            className="glass-panel"
            style={{ maxWidth: '600px', width: '100%', padding: '40px', position: 'relative', animation: 'modalFloat 0.4s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedFeature(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
            >
              &times;
            </button>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{selectedFeature.icon}</div>
            <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>{selectedFeature.title}</h2>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontWeight: 'normal' }}>{selectedFeature.details.subtitle}</h4>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '30px' }}>
              {selectedFeature.details.content}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
              {selectedFeature.details.stats.map((stat: string, idx: number) => (
                <div key={idx} style={{
                  padding: '10px',
                  background: 'rgba(46, 204, 113, 0.1)',
                  borderRadius: '8px',
                  color: 'var(--primary)',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  border: '1px solid rgba(46, 204, 113, 0.2)'
                }}>
                  ✅ {stat}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Navbar />
      <Hero />

      {/* Our Mission Section with Parallax Background */}
      <section id="about" style={{
        position: 'relative',
        padding: '150px 0',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}>
          <Image
            src="/tree-planting.png"
            alt="Tree planting"
            fill
            style={{ objectFit: 'cover', opacity: 0.3 }}
          />
        </div>
        <div className="section-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }} />

        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '30px', fontSize: '3rem' }}>
              Restoring <span style={{ color: 'var(--primary)' }}>Forests</span>, Empowering <span style={{ color: 'var(--primary)' }}>Communities</span>
            </h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '40px' }}>
              We partner with local communities to plant trees, restore ecosystems, and create sustainable livelihoods.
              Every tree planted is a step towards a healthier planet and empowered communities.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '40px',
              marginTop: '60px'
            }}>
              {features.map((item, index) => (
                <div key={index} className="glass-panel" style={{
                  padding: '40px 30px',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  onClick={() => setSelectedFeature(item)}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{item.icon}</div>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>{item.title}</h3>
                  <p>{item.desc}</p>
                  <p style={{ marginTop: '15px', color: 'var(--primary)', fontSize: '0.9rem', textDecoration: 'underline' }}>Read More →</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section with Forest River Background and MAP */}
      <section id="impact" style={{
        position: 'relative',
        padding: '150px 0',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}>
          <Image
            src="/forest-river.png"
            alt="Forest river aerial view"
            fill
            style={{ objectFit: 'cover', opacity: 0.25 }}
          />
        </div>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(10, 31, 15, 0.95) 0%, rgba(10, 31, 15, 0.85) 50%, rgba(10, 31, 15, 0.95) 100%)',
          zIndex: -1
        }} />

        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '80px', fontSize: '3rem' }}>
            Our Global <span style={{ color: 'var(--primary)' }}>Impact</span>
          </h2>

          {/* New Global Map Feature */}
          <div style={{ marginBottom: '80px' }}>
            <PlantingMap />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {[
              {
                title: 'Madagascar',
                trees: '150M+',
                description: 'Restored critical mangrove forests protecting coastal communities',
                impact: '40,000+ jobs created'
              },
              {
                title: 'Haiti',
                trees: '30M+',
                description: 'Rebuilding watersheds and providing sustainable income',
                impact: '5,000+ families supported'
              },
              {
                title: 'Nepal',
                trees: '50M+',
                description: 'Reforesting mountain slopes and protecting biodiversity',
                impact: '15,000+ hectares restored'
              }
            ].map((project, index) => (
              <div key={index} className="glass-panel" style={{
                padding: '40px',
                background: 'rgba(46, 204, 113, 0.08)',
                borderLeft: '4px solid var(--primary)'
              }}>
                <h3 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '15px' }}>
                  {project.title}
                </h3>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: 'var(--leaf-green)',
                  marginBottom: '20px'
                }}>
                  {project.trees}
                </div>
                <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                  {project.description}
                </p>
                <div style={{
                  padding: '15px',
                  background: 'rgba(82, 199, 122, 0.1)',
                  borderRadius: '8px',
                  color: 'var(--primary)',
                  fontWeight: '600'
                }}>
                  {project.impact}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <a href="#donate" className="btn btn-primary" style={{
              fontSize: '1.2rem',
              padding: '20px 40px'
            }}>
              🌱 Join Our Mission
            </a>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section style={{ padding: '100px 0', background: 'var(--secondary)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '2.5rem' }}>
            Trust & <span style={{ color: 'var(--primary)' }}>Transparency</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
            {/* Financial Breakdown */}
            <div className="glass-panel" style={{ padding: '40px' }}>
              <h3 style={{ marginBottom: '30px', borderLeft: '4px solid var(--primary)', paddingLeft: '15px' }}>Where does your $1 go?</h3>
              <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                <Image
                  src="/transparency-chart.png"
                  alt="Financial Breakdown of $1 Donation"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <ul style={{ marginTop: '30px', listStyle: 'none' }}>
                <li style={{ marginBottom: '15px', color: 'var(--leaf-green)', fontWeight: 'bold' }}>50% - Direct Tree Planting (Eden Reforestation)</li>
                <li style={{ marginBottom: '15px', color: '#6ab0de', fontWeight: 'bold' }}>20% - Operations & Development</li>
                <li style={{ marginBottom: '15px', color: '#999' }}>30% - Payment Processing & Fees</li>
              </ul>
            </div>

            {/* Certificate Preview */}
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ marginBottom: '30px' }}>Get Your Impact Certificate</h3>
              <div className="glass-panel" style={{
                padding: '20px',
                transform: 'rotate(2deg)',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => e.currentTarget.style.transform = 'rotate(2deg)'}
              >
                <div style={{ position: 'relative', height: '350px', width: '100%' }}>
                  <Image
                    src="/cert-preview.png"
                    alt="TreeTap Planting Certificate"
                    fill
                    style={{ objectFit: 'contain', borderRadius: '8px' }}
                  />
                </div>
              </div>
              <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>Every donation comes with a verifiable certificate of impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        padding: '100px 0',
        background: 'var(--forest-light)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '30px' }}>
            Every Tree Makes a <span style={{ color: 'var(--primary)' }}>Difference</span>
          </h2>
          <p style={{ fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto 50px' }}>
            Your contribution doesn&apos;t just plant trees—it restores ecosystems, creates jobs, and fights climate change.
          </p>
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#monthly" className="btn btn-primary" style={{ padding: '18px 40px', fontSize: '1.1rem' }}>
              🌍 Monthly Impact
            </a>
            <a href="#onetime" className="btn glass-panel" style={{
              padding: '18px 40px',
              fontSize: '1.1rem',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)'
            }}>
              🌳 One-Time Gift
            </a>
          </div>
        </div>
      </section>

      <MyForest />

      <Footer />
    </main>
  );
}

