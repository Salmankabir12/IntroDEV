import React from 'react';

export default function Navbar() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  const path = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <nav className="sticky top-0 z-50 w-full bg-(--surface-elevated)/80 backdrop-blur border-b border-(--border)">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          Salman kabir
        </a>

        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative group transition-colors duration-300 ${path === link.href ? 'text-(--text-primary) font-medium' : 'text-(--text-muted) hover:text-(--text-primary)'}`}
            >
              {link.name}
              <span className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 ${path === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}

          <button
            onClick={() => {
              const root = document.documentElement;
              const isDark = root.classList.toggle('dark');
              localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }}
            className="ml-2 p-2 rounded-lg bg-(--surface-raised) hover:bg-(--tag) transition-colors text-lg"
            aria-label="Toggle theme"
          >
            <span className="dark:hidden">🌙</span>
            <span className="hidden dark:inline">☀️</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
