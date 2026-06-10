import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-(--surface-elevated) border-t border-(--border) mt-12 py-6 text-center text-(--text-muted)">
      <div className="max-w-6xl mx-auto px-6 text-sm">
        © {new Date().getFullYear()} Salman kabir. All rights reserved.
      </div>
    </footer>
  );
}
