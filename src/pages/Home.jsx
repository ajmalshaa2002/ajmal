import React, { useEffect, useState } from 'react';
import Scene from '../canvas/Scene';
import Hero3D from '../components/Hero3D';
import Navbar from '../components/Navbar';
import Projects3D from '../components/Projects3D';
import Section from '../components/Section';
import Loader from '../components/Loader';
import '../App.css';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHover, setCursorHover] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setCursorHover(true);
    const handleMouseLeave = () => setCursorHover(false);

    window.addEventListener('mousemove', handleMouseMove);
    
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="home">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-progress"
        style={{
          width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
        }}
      ></div>

      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${cursorHover ? 'hover' : ''}`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      >
        <div className="cursor-dot"></div>
        <div className="cursor-outline"></div>
      </div>

      {/* Background 3D Scene */}
      <div 
        className="scene-background"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        <Scene />
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <Navbar />
        
        {/* Hero Section */}
        <section className="hero-section" id="home">
          <div 
            className="hero-content"
            style={{
              transform: `translateY(${scrollY * -0.3}px)`
            }}
          >
            <div className="hero-3d">
              <Hero3D />
            </div>
            <div className="hero-text">
              <h1 className="glitch-text" data-text="AJMAL SHA">
                AJMAL SHA
              </h1>
              <div className="code-line">
                <span className="bracket">{'{'}</span>
                <span className="key">developer</span>
                <span className="colon">:</span>
                <span className="value">"creative coder"</span>
                <span className="bracket">{'}'}</span>
              </div>
              <p className="hero-description">
                Crafting digital experiences through code, design, and innovation.
                Specializing in immersive 3D web applications and interactive interfaces.
              </p>
              <div className="cta-buttons">
                <button className="btn-primary interactive" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                  <span>View Projects</span>
                  <span className="btn-arrow">→</span>
                </button>
                <button className="btn-secondary interactive" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                  <span>Contact</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Animated binary code stream */}
          <div className="binary-stream">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="binary-column" style={{ animationDelay: `${i * 0.1}s` }}>
                {Array.from({ length: 30 }).map((_, j) => (
                  <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <Section id="about">
          <div className="section-grid">
            <div className="section-content">
              <h2 className="section-title">
                <span className="title-number">01</span>
                <span className="title-text">About</span>
              </h2>
              <div className="about-text">
                <p className="code-block">
                  <span className="comment">// Building the future, one line at a time</span>
                </p>
                <p>
                  I'm a creative developer passionate about pushing the boundaries of web technology.
                  My expertise lies in creating immersive 3D experiences, interactive animations, and
                  performance-optimized applications that blend aesthetics with functionality.
                </p>
                <div className="skills-grid">
                  <div className="skill-item">
                    <div className="skill-icon">{'</>'}</div>
                    <div className="skill-name">Three.js / WebGL</div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-icon">{'{ }'}</div>
                    <div className="skill-name">React / Next.js</div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-icon">{'[]'}</div>
                    <div className="skill-name">TypeScript</div>
                  </div>
                  <div className="skill-item">
                    <div className="skill-icon">{'( )'}</div>
                    <div className="skill-name">Node.js</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-visual">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-buttons">
                    <span className="btn-close"></span>
                    <span className="btn-minimize"></span>
                    <span className="btn-maximize"></span>
                  </div>
                  <div className="terminal-title">~/developer</div>
                </div>
                <div className="terminal-body">
                  <p><span className="prompt">$</span> cat skills.json</p>
                  <p className="terminal-output">
                    {`{
  "frontend": ["React", "Three.js", "WebGL"],
  "backend": ["Node.js", "Python", "GraphQL"],
  "tools": ["Git", "Docker", "AWS"],
  "focus": "Creative Coding"
}`}
                  </p>
                  <p><span className="prompt">$</span> <span className="cursor-blink">_</span></p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects">
          <h2 className="section-title">
            <span className="title-number">02</span>
            <span className="title-text">Projects</span>
          </h2>
          <Projects3D />
        </Section>

        {/* Contact Section */}
        <Section id="contact">
          <div className="contact-container">
            <h2 className="section-title">
              <span className="title-number">03</span>
              <span className="title-text">Get In Touch</span>
            </h2>
            <div className="contact-content">
              <div className="contact-info">
                <p className="code-block">
                  <span className="comment">// Let's build something amazing together</span>
                </p>
                <p>
                  I'm always interested in hearing about new projects and opportunities.
                  Whether you have a question or just want to say hi, feel free to reach out!
                </p>
                <div className="contact-links">
                  <a href="mailto:ajmalsha0105@gmail.com" className="contact-link interactive">
                    <span className="link-icon">@</span>
                    <span>ajmalsha0105@gmail.com</span>
                  </a>
                  <a href="https://www.linkedin.com/in/ajmal-sha-n-s-7422bb396" className="contact-link interactive">
                    <span className="link-icon">in</span>
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://github.com/ajmalshaa2002" className="contact-link interactive">
                    <span className="link-icon">{'</>'}</span>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
              <form className="contact-form">
                <div className="form-group">
                  <input type="text" placeholder="Name" className="form-input interactive" />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" className="form-input interactive" />
                </div>
                <div className="form-group">
                  <textarea placeholder="Message" rows="5" className="form-input interactive"></textarea>
                </div>
                <button type="submit" className="btn-primary interactive">
                  <span>Send Message</span>
                  <span className="btn-arrow">→</span>
                </button>
              </form>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p className="code-block">
              <span className="comment">:^.^ Built with React & Three.js</span>
            </p>
            <p>© 2026 . All rights Ajmal sha</p>
          </div>
        </footer>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-to-top interactive ${scrollY > 500 ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
}