import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { projects, services, skills, socials } from './data';
import './styles.css';

function MagneticCard({ children, className = '', active = false }) {
  const ref = useRef(null);
  const raf = useRef(0);

  function move(event) {
    const el = ref.current;
    if (!active || !el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
      el.style.setProperty('--rx', `${y}deg`);
      el.style.setProperty('--ry', `${x}deg`);
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  }

  function leave() {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }

  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`${active ? 'tilt' : ''} ${className}`}>{children}</div>;
}

function App() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.16 }
    );
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function onMove(event) {
      root.style.setProperty('--cursor-x', `${event.clientX}px`);
      root.style.setProperty('--cursor-y', `${event.clientY}px`);
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <>
      <div className="noise" />
      <div className="spotlight" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <nav className="nav">
        <div className="shell navInner">
          <a className="brand" href="#top" aria-label="Back to top"><span>RG</span><b>Raihan Guntur</b></a>
          <div className="navLinks">
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="btn ghost" href="mailto:raihan7913@gmail.com">Email me</a>
        </div>
      </nav>

      <main id="top" className="shell">
        <section className="hero">
          <div className="heroCopy" data-reveal>
            <div className="eyebrow"><i /> Looking for junior full-stack, backend, or automation roles</div>
            <h1>Full-stack developer focused on <span>web apps, automation, and AI workflows.</span></h1>
            <p className="lead">I help turn operational problems into usable web tools — from academic admin systems to AI-assisted job workflows.</p>
            <div className="actions">
              <a className="btn primary" href="/Raihan-Guntur-Ramadhan-CV.pdf">Download CV</a>
              <a className="btn ghost" href="#projects">View projects</a>
              <a className="btn ghost" href="mailto:raihan7913@gmail.com">Contact me</a>
            </div>
            <div className="proofLine">
              <span>Live deployed apps</span><span>Ex-Safran Intern</span><span>GitHub active</span>
            </div>
          </div>

          <div className="heroVisual" data-reveal>
            <MagneticCard className="portraitCard" active>
              <div className="photoWrap">
                <img src="/assets/profile-main.jpg" alt="Raihan Guntur Ramadhan" />
                <div className="shine" />
              </div>
              <div className="statusCard"><b>Raihan Guntur Ramadhan</b><span>React · FastAPI · automation-minded engineer.</span></div>
            </MagneticCard>
          </div>
        </section>

        <section className="stats" aria-label="Proof points">
          {[
            ['Telkom', 'Computer Engineering graduate'],
            ['Safran', 'Aerospace internship exposure'],
            ['Full-stack', 'Frontend, backend, deployment basics'],
            ['Automation', 'Scripts, scraping, AI workflows'],
          ].map(([title, desc]) => <MagneticCard key={title} className="stat" data-reveal><b>{title}</b><span>{desc}</span></MagneticCard>)}
        </section>

        <section id="projects" className="section">
          <header className="sectionHead" data-reveal>
            <div><small>Selected Work</small><h2>Projects with role, build, and outcome.</h2></div>
            <p>Each project is framed as practical evidence: what I owned, what I built, and why it matters.</p>
          </header>

          <div className="projects">
            {projects.map(project => (
              <MagneticCard key={project.title} active={project.featured} className={`project ${project.featured ? 'featured' : ''}`}>
                {project.image && <img className="projectImage" src={project.image} alt="" aria-hidden="true" />}
                <div className="projectBody">
                  <small>{project.eyebrow}</small>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="proofList">{project.proof.map(item => <li key={item}>{item}</li>)}</ul>
                  <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                </div>
                <a className="arrowLink" href={project.href} target={project.href.startsWith('#') ? undefined : '_blank'} rel="noreferrer">{project.cta} →</a>
              </MagneticCard>
            ))}
          </div>
        </section>

        <section className="section">
          <header className="sectionHead" data-reveal>
            <div><small>What I can do</small><h2>Useful engineering for messy workflows.</h2></div>
          </header>
          <div className="services">
            {services.map(([title, desc]) => <div key={title} className="service"><h3>{title}</h3><p>{desc}</p></div>)}
          </div>
        </section>

        <section id="experience" className="section split">
          <header className="sectionHead compact" data-reveal>
            <div><small>Background</small><h2>Technical foundation with real-world exposure.</h2></div>
          </header>
          <div className="timeline">
            <MagneticCard className="time"><b>Internship</b><div><h3>Safran — Aerospace environment</h3><p>Worked around engineering-grade workflows where documentation, reliability, and precise technical communication matter.</p></div></MagneticCard>
            <MagneticCard className="time"><b>Education</b><div><h3>Telkom University — S1 Teknik Komputer</h3><p>Computer Engineering background covering software, systems, networking fundamentals, and project-based development.</p></div></MagneticCard>
          </div>
        </section>

        <section id="skills" className="section">
          <header className="sectionHead" data-reveal>
            <div><small>Capabilities</small><h2>Stack I use to ship practical tools.</h2></div>
          </header>
          <div className="skills">
            {skills.map(([title, ...items]) => <MagneticCard key={title} className="skill"><h3>{title}</h3>{items.map(item => <span key={item}>{item}</span>)}</MagneticCard>)}
          </div>
        </section>

        <section id="contact" className="section contact" data-reveal>
          <small>Contact</small>
          <h2>Need someone who can turn requirements into working tools?</h2>
          <p>I’m open to junior full-stack, backend, automation, software engineering roles, and freelance builds.</p>
          <div className="actions center">
            <a className="btn primary" href="mailto:raihan7913@gmail.com">Email Raihan</a>
            <a className="btn ghost" href="https://wa.me/6281290668329" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </section>
      </main>

      <footer className="shell footer">© 2026 Raihan Guntur Ramadhan. Built lean, fast, and intentionally.</footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
