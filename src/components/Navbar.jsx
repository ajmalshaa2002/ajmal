import React, { useState, useEffect, useRef } from 'react';
import { isMobile, isTouchEnabled } from '../utils/responsive';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    // Detect device type
    const checkMobile = () => {
      setIsMobileDevice(isMobile() || isTouchEnabled());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && 
          menuRef.current && 
          !menuRef.current.contains(e.target) && 
          !menuToggleRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    // Only add listener if menu is open and device is mobile
    if (menuOpen && isMobileDevice) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.body.style.overflow = 'unset';
      };
    }
  }, [menuOpen, isMobileDevice]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleMenuItemClick = (e) => {
    // Close menu after clicking on a nav item
    setMenuOpen(false);
    // Allow default link behavior
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-bracket">{'<'}</span>
          <span className="logo-text">DEV</span>
          <span className="logo-bracket">{'/>'}</span>
        </div>

        <div 
          className={`nav-menu ${menuOpen ? 'open' : ''}`}
          ref={menuRef}
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item, i) => (
            <a 
              key={i} 
              href={item.href} 
              className="nav-link interactive"
              onClick={handleMenuItemClick}
              tabIndex={menuOpen && isMobileDevice ? 0 : -1}
            >
              <span className="link-number">0{i + 1}</span>
              <span className="link-text">{item.name}</span>
            </a>
          ))}
        </div>

        <button 
          ref={menuToggleRef}
          className={`menu-toggle interactive ${menuOpen ? 'open' : ''}`}
          onClick={handleMenuToggle}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          id="menu-button"
        >
          <span className="menu-line" aria-hidden="true"></span>
          <span className="menu-line" aria-hidden="true"></span>
          <span className="menu-line" aria-hidden="true"></span>
        </button>
      </div>
    </nav>
  );
}