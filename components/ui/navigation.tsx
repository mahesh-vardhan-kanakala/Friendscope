'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './button';
import { Logo } from './logo';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/assessment">
            <Button variant={pathname === '/assessment' ? 'default' : 'ghost'}>
              Assessment
            </Button>
          </Link>
          <Link href="/results">
            <Button variant={pathname === '/results' ? 'default' : 'ghost'}>
              Results
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant={pathname === '/contact' ? 'default' : 'ghost'}>
              Contact
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}