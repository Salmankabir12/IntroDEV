import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Dhaka', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();

  return (
    <footer className="w-full border-t border-(--border) mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          <div className="md:col-span-1">
            <p className="font-display text-3xl text-(--text-primary) mb-2">Salman Kabir</p>
            <p className="text-sm text-(--text-muted)">Full Stack Developer</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted) mb-4">Directory</p>
            <div className="flex flex-col gap-2">
              <a href="/" className="text-sm text-(--text-secondary) hover:text-(--accent) transition-colors duration-300">Home</a>
              <a href="/projects" className="text-sm text-(--text-secondary) hover:text-(--accent) transition-colors duration-300">Work</a>
              <a href="/blog" className="text-sm text-(--text-secondary) hover:text-(--accent) transition-colors duration-300">Writing</a>
              <a href="/about" className="text-sm text-(--text-secondary) hover:text-(--accent) transition-colors duration-300">About</a>
              <a href="/contact" className="text-sm text-(--text-secondary) hover:text-(--accent) transition-colors duration-300">Contact</a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted) mb-4">Social</p>
            <div className="flex flex-col gap-2">
              <a href="https://github.com/Salmankabir12" target="_blank" rel="noopener noreferrer" className="text-sm text-(--text-secondary) hover:text-(--accent) transition-colors duration-300">
                GitHub <span className="text-(--text-muted)">↗</span>
              </a>
              <a href="https://www.linkedin.com/in/salmaaaankabir" target="_blank" rel="noopener noreferrer" className="text-sm text-(--text-secondary) hover:text-(--accent) transition-colors duration-300">
                LinkedIn <span className="text-(--text-muted)">↗</span>
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted) mb-4">Connect</p>
            <div className="flex flex-col gap-2">
              <a href="/contact" className="text-sm text-(--text-secondary) hover:text-(--accent) transition-colors duration-300">
                Start collaboration <span className="text-(--text-muted)">→</span>
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-(--text-muted)">Available for projects</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-(--border)">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-(--text-muted)">
          <span>&copy; {now.getFullYear()} Salman Kabir</span>
          <span className="font-mono">{time} BST</span>
        </div>
      </div>
    </footer>
  );
}
