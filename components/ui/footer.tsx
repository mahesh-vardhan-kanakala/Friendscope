'use client';

import { Logo } from './logo';
import { Github } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/yourusername/friendscope"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}