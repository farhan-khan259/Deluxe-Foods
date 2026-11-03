'use client'

import { useEffect, useState } from 'react'

const slides = [
  { kicker: 'Food science, made human', title: 'Nourishment that moves families forward.', text: 'Deluxe Food combines trusted nutrition, advanced manufacturing, and a deep understanding of everyday life.', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1800&q=88' },
  { kicker: 'Built for better beginnings', title: 'Nutrition designed for life’s first chapters.', text: 'Our dedicated infant nutrition capability brings precision, care, and consistency to every pack.', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1800&q=88' },
  { kicker: 'From nature. Through science.', title: 'Pure ingredients. Precise standards.', text: 'From raw material handling through final packing, quality is designed into every step.', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1800&q=88' },
]

const products = [
  { name: 'Infant Nutrition', text: 'Thoughtfully developed pediatric nutrition for growing bodies and brighter tomorrows.', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=900&q=88' },
  { name: 'Functional Foods', text: 'Everyday nutrition that brings more goodness to the table, without compromise.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=88' },
  { name: 'Nutraceuticals', text: 'Purpose-led formulas informed by research, quality systems, and real needs.', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=88' },
]

const standards = ['HEPA-filtered Class I cleanroom', 'No-human-touch automation', 'Air Replacement Technology', 'Dedicated QC and R&D laboratories']

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`brand-logo ${light ? 'brand-logo-light' : ''}`}><span className="logo-orbit" /><img src="/deluxe-foods-logo.png" alt="Deluxe Food" /></div>
}

export default function Page() {
  const [slide, setSlide] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 6000)
    return () => window.clearInterval(timer)
  }, [])

  const current = slides[slide]

  return (
    <main>
      <header className="site-header">
        <a href="#home" aria-label="Deluxe Food home"><Logo /></a>
        <button className="menu-button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary navigation">
          <a className="active" href="#home" onClick={() => setMenuOpen(false)}>Home</a><a href="/about" onClick={() => setMenuOpen(false)}>About us</a><a href="#capability" onClick={() => setMenuOpen(false)}>Our capability</a><a href="#products" onClick={() => setMenuOpen(false)}>Products</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="header-cta" href="#contact">Talk to us <span>↗</span></a>
      </header>

      <section id="home" className="hero deluxe-hero">
        <div className="hero-copy"><p className="eyebrow">{current.kicker}</p><h1 key={current.title}>{current.title}</h1><p className="hero-text">{current.text}</p><div className="hero-actions"><a className="button button-accent" href="#products">Explore our work <span>↗</span></a><a className="hero-link" href="#about">Discover Deluxe Food <span>↓</span></a></div><div className="carousel-controls"><div>{slides.map((item, index) => <button key={item.title} aria-label={`Show slide ${index + 1}`} className={index === slide ? 'active' : ''} onClick={() => setSlide(index)} />)}</div><span>0{slide + 1} / 0{slides.length}</span></div></div>
        <div className="hero-image" style={{ backgroundImage: `linear-gradient(90deg, rgba(12,24,18,.2), rgba(12,24,18,0)), url(${current.image})` }} role="img" aria-label="Fresh ingredients and food science" />
      </section>

      <section id="about" className="intro deluxe-intro"><p className="eyebrow">Deluxe Food · Food & nutraceutical</p><h2>Better nutrition begins with <em>better thinking.</em></h2><p>We develop and manufacture food, infant nutrition, and nutraceutical products that help people live healthier, fuller lives. Our approach brings together nature, technology, and a relentless commitment to quality.</p><a className="text-link" href="#capability">Meet our standards <span>↗</span></a></section>

      <section id="capability" className="capability-section"><div className="capability-image" role="img" aria-label="Modern food manufacturing facility" /><div className="capability-copy"><p className="eyebrow">Our signature facility</p><h2>Pakistan’s first dedicated <em>infant nutrition plant.</em></h2><p>Set across 95,200 sq. ft., our dedicated facility is designed exclusively for infant formula and pediatric diet products, with the country’s largest soft-pack and tin-filling coupled lines.</p><div className="standards-list">{standards.map((standard, index) => <div key={standard}><span>0{index + 1}</span><p>{standard}</p></div>)}</div><a className="button" href="#contact">See our capability <span>↗</span></a></div></section>

      <section className="statement"><p className="eyebrow">Precision at every stage</p><h2>From raw material handling to final packing, <em>there is no human touch.</em></h2><p>Our 153-foot horizontal production line operates in a controlled HVAC environment with HEPA filtration and Class I cleanroom specifications.</p></section>

      <section id="products" className="products deluxe-products"><div className="section-heading"><p className="eyebrow">Built around real needs</p><h2>Nutrition with a <em>clear purpose.</em></h2><p>Explore the categories we are building for families, communities, and a healthier future.</p></div><div className="product-grid">{products.map((product, index) => <article className="product-card" key={product.name}><div className="product-image" style={{ backgroundImage: `url(${product.image})` }}><span>0{index + 1}</span></div><h3>{product.name}</h3><p>{product.text}</p><a className="text-link" href="#contact">Learn more <span>↗</span></a></article>)}</div></section>

      <section className="visual-panels"><a className="visual-panel panel-green" href="#contact"><span className="panel-label">01 / Quality</span><strong>Clean systems.<br />Confident outcomes.</strong><span className="panel-arrow">↗</span></a><a className="visual-panel panel-orange" href="#contact"><span className="panel-label">02 / Innovation</span><strong>Ideas that make<br />nutrition better.</strong><span className="panel-arrow">↗</span></a></section>

      <section className="day-section"><div className="day-image" role="img" aria-label="Family preparing a healthy meal" /><div className="day-copy"><p className="eyebrow">A day in the life</p><h2>Good nutrition belongs in <em>every moment.</em></h2><p>We make products for the first feed, the family table, and every daily ritual in between.</p><div className="day-list"><div><h3>Morning</h3><p>Start with a stronger foundation.</p></div><div><h3>Growing</h3><p>Support healthy development.</p></div><div><h3>Everyday</h3><p>Make better choices easier.</p></div><div><h3>Always</h3><p>Protect what matters most.</p></div></div></div></section>

      <section className="quote-section"><p className="quote">“Quality is not a department. It is the way we think, make, and serve.”</p><p className="quote-by">— The Deluxe Food team</p></section>

      <section className="facility-story"><div><p className="eyebrow">Quality, continuously</p><h2>Designed to protect <em>what matters.</em></h2></div><p>Rounded edges, coved wall-to-floor joints, stainless steel doors, and dedicated Chemical, Instrumentation, and Microbiology Laboratories help us reduce risk and raise the standard. Plant maintenance, housekeeping, QC, vigilance, audits, and Food Safety Management surveillance are continuously implemented and strictly enforced.</p></section>

      <section className="social"><div className="section-heading"><p className="eyebrow">Inside Deluxe Food</p><h2>Food, science, <em>and people.</em></h2></div><div className="social-grid">{['https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=88','https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=88','https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=88','https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=88'].map((image, index) => <a href="#contact" key={image} className="social-image" style={{ backgroundImage: `url(${image})` }} aria-label={`Deluxe Food story ${index + 1}`} />)}</div></section>

      <footer id="contact" className="footer deluxe-footer"><div><Logo light /><p className="footer-note">Food & nutraceutical solutions<br />made with nature and science.</p><div className="footer-links"><a href="#home">Home</a><a href="#about">About us</a><a href="#capability">Capability</a><a href="#products">Products</a><a href="#contact">Contact</a></div><p className="copyright">© 2026 Deluxe Food. All rights reserved.</p></div><div className="newsletter"><p className="eyebrow">Stay close to the work</p><h2>Let’s build a healthier future.</h2>{subscribed ? <p>Thank you. We’ll be in touch.</p> : <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true) }}><label htmlFor="email">Join our newsletter</label><div><input id="email" type="email" placeholder="Your email address" required /><button type="submit">Subscribe ↗</button></div></form>}</div></footer>
    </main>
  )
}
