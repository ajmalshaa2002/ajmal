import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-bracket">{'<'}</span>
          <span className="logo-text">DEV</span>
          <span className="logo-bracket">{'/>'}</span>
        </div>

        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <button 
            className="menu-close interactive"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          {navItems.map((item, i) => (
            <a 
              key={i} 
              href={item.href} 
              className="nav-link interactive"
              onClick={() => setMenuOpen(false)}
            >
              <span className="link-number">0{i + 1}</span>
              <span className="link-text">{item.name}</span>
            </a>
          ))}
        </div>

        <button 
          className={`menu-toggle interactive ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="menu-line"></span>
          <span className="menu-line"></span>
          <span className="menu-line"></span>
        </button>
      </div>
    </nav>
  );
}