import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    { name: "Work", href: "/projects" },
    { name: "Writing", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const path = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-(--surface)/95 backdrop-blur-md border-b border-(--border)' : 'bg-(--surface) border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        <a href="/" className="font-display text-2xl text-(--text-primary) hover:text-(--accent) transition-colors duration-300">
          Salman Kabir
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 relative group ${
                path === link.href
                  ? 'text-(--accent)'
                  : 'text-(--text-muted) hover:text-(--text-primary)'
              }`}
            >
              {link.name}
              <span className={`absolute left-0 -bottom-1 h-px bg-(--accent) transition-all duration-300 ${
                path === link.href ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
          ))}
          <button
            onClick={() => {
              const root = document.documentElement;
              const isLight = root.classList.toggle('light');
              root.classList.remove('light');
              if (!isLight) root.classList.add('light');
              localStorage.setItem('theme', isLight ? 'light' : 'dark');
            }}
            className="w-5 h-5 rounded-full border border-(--border) hover:border-(--accent) transition-colors duration-300 relative overflow-hidden group"
            aria-label="Toggle theme"
          >
            <span className="absolute inset-0 bg-(--text-primary) scale-[0.6] rounded-full group-hover:scale-[0.8] transition-transform duration-300"></span>
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-(--text-primary) transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}></span>
          <span className={`block w-6 h-px bg-(--text-primary) transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}></span>
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64 border-t border-(--border)' : 'max-h-0'}`}>
        <div className="bg-(--surface) px-6 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                path === link.href
                  ? 'text-(--accent)'
                  : 'text-(--text-muted) hover:text-(--text-primary)'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
