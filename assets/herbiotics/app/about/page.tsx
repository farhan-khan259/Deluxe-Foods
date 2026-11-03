'use client'

import { useEffect, useState } from 'react'

const story = [
  { year: '01', title: 'A better way to nourish', text: 'Deluxe Food was created around a simple belief: better nutrition should be made with better thinking, careful ingredients, and a responsibility to the people who trust it.', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=88' },
  { year: '02', title: 'Made for first beginnings', text: 'Our dedicated infant nutrition capability brings together pediatric insight, controlled environments, and precision manufacturing for products made for life’s earliest chapters.', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1400&q=88' },
  { year: '03', title: 'Science that serves people', text: 'From food and functional nutrition to nutraceuticals, we turn research and natural ingredients into dependable products for everyday wellbeing.', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=88' },
]

const values = [
  ['01', 'Care before scale', 'We design around the person who will use the product, from a baby taking a first feed to a family making an everyday choice.'],
  ['02', 'Precision by default', 'Controlled processes, dedicated laboratories, and continuous checks help make quality visible at every stage.'],
  ['03', 'Progress with purpose', 'We use technology and research to make nutrition more useful, more accessible, and more relevant to real life.'],
]

function Logo() { return <a className="about-brand" href="/"><img src="/deluxe-foods-logo.png" alt="Deluxe Food" /><span /></a> }

export default function AboutPage() {
  const [active, setActive] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setActive((value) => (value + 1) % story.length), 6500); return () => window.clearInterval(timer) }, [])
  const item = story[active]
  return <main className="about-page">
    <header className="about-nav"><Logo /><nav><a href="/">Home</a><a className="current" href="/about">About us</a><a href="/#products">Products</a><a href="/#contact">Contact</a></nav><a className="about-nav-cta" href="/#contact">Start a conversation <span>↗</span></a></header>

    <section className="about-hero"><div className="about-hero-copy"><p className="eyebrow">About Deluxe Food</p><h1>Food that begins with <em>responsibility.</em></h1><p>We are a food and nutraceutical company building thoughtful nutrition through nature, science, and uncompromising quality.</p><a className="button button-accent" href="#story">Explore our story <span>↓</span></a></div><div className="about-hero-visual" style={{ backgroundImage: `url(${item.image})` }}><div className="about-hero-caption"><span>Our story / 0{active + 1}</span><strong>{item.title}</strong></div><div className="about-dots">{story.map((entry, index) => <button key={entry.year} aria-label={`Show story ${index + 1}`} className={index === active ? 'active' : ''} onClick={() => setActive(index)} />)}</div></div></section>

    <section className="about-manifesto"><p className="eyebrow">Our point of view</p><h2>Nature gives us the ingredients. <em>Science gives them direction.</em></h2><p>Deluxe Food develops and manufactures food, infant nutrition, and nutraceutical products that help people live healthier, fuller lives. We believe the best work happens where human care and technical discipline meet.</p></section>

    <section id="story" className="about-story"><div className="about-story-heading"><p className="eyebrow">The journey so far</p><h2>Small details. <em>Meaningful impact.</em></h2></div><div className="story-timeline">{story.map((entry, index) => <article className={`story-card ${index === active ? 'selected' : ''}`} key={entry.year} onClick={() => setActive(index)}><div className="story-card-image" style={{ backgroundImage: `url(${entry.image})` }} /><div className="story-card-body"><span>{entry.year}</span><h3>{entry.title}</h3><p>{entry.text}</p></div></article>)}</div></section>

    <section className="about-facility"><div className="facility-photo" /><div className="facility-copy"><p className="eyebrow">Built for confidence</p><h2>Precision starts with the <em>place we make.</em></h2><p>Our 95,200 sq. ft. dedicated infant nutrition facility is designed for controlled, consistent production. It includes HEPA-filtered Class I cleanroom specifications, a controlled HVAC environment, no-human-touch automation, and the country’s largest soft-pack and tin-filling coupled lines.</p><div className="facility-metrics"><div><strong>95,200</strong><span>sq. ft. dedicated facility</span></div><div><strong>153 ft</strong><span>horizontal production line</span></div><div><strong>24/7</strong><span>quality mindset</span></div></div><a className="text-link" href="/#capability">See our capability <span>↗</span></a></div></section>

    <section className="about-values"><div className="values-intro"><p className="eyebrow">What guides us</p><h2>Our values are not <em>wallpaper.</em></h2><p>They shape how we formulate, operate, collaborate, and improve.</p></div><div className="values-list">{values.map(([number, title, text]) => <div className="value-row" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

    <section className="about-quality"><div className="quality-image" /><div className="quality-copy"><p className="eyebrow">Quality in action</p><h2>Nothing left to <em>chance.</em></h2><p>Dedicated Chemical, Instrumentation, and Microbiology Laboratories support testing and vigilance. Rounded edges, coved wall-to-floor joints, stainless steel doors, housekeeping, audits, and Food Safety Management surveillance are continuously implemented and strictly enforced.</p><div className="quality-tags"><span>Research-backed</span><span>Clinically tested</span><span>Traceable systems</span></div></div></section>

    <section className="about-cta"><p className="eyebrow">The next chapter</p><h2>Let’s make better nutrition <em>more possible.</em></h2><p>Whether you are developing a new product or looking for a trusted manufacturing partner, we would like to hear what you are building.</p><a className="button button-light" href="/#contact">Talk to Deluxe Food <span>↗</span></a></section>

    <footer className="about-footer"><Logo /><p>Food & nutraceutical solutions<br />made with nature and science.</p><div><a href="/">Home</a><a href="/about">About us</a><a href="/#products">Products</a><a href="/#contact">Contact</a></div><small>© 2026 Deluxe Food. All rights reserved.</small></footer>
  </main>
}
