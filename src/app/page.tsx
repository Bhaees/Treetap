import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" style={{ padding: '100px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>Why Choose Treetap?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              { title: "Innovation First", desc: "We leverage the latest technologies to keep you ahead of the curve." },
              { title: "Scalable Solutions", desc: "Architecture designed to grow seamlessly with your business needs." },
              { title: "Expert Team", desc: "Seasoned developers and engineers dedicated to your success." }
            ].map((feature, index) => (
              <div key={index} className="glass-panel" style={{ padding: '40px' }}>
                <h3 style={{ marginBottom: '15px', color: 'var(--primary)' }}>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
