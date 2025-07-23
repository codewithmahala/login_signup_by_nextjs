'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link'; // ✅ Add this import

export default function NavbarPage() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path ? 'active' : '';

  return (
    <header>
      <div className="container navbar-container">
        <div className="logo">
          <Image
            src="/assets/logo/Untitled.png"
            alt="Eco Farm Logo"
            width={100}
            height={50}
          />
        </div>
        <nav>
          <ul className="menu">
            <li>
              <Link href="/" className={isActive('/')}>Home</Link>
            </li>
            <li>
              <Link href="/about" className={isActive('/about')}>About</Link>
            </li>
            <li>
              <Link href="/blog" className={isActive('/blog')}>Blog</Link>
            </li>
            <li>
              <Link href="/contact" className={isActive('/contact')}>Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="search-cart">
          <a href="#" className="search" aria-label="Search">
            <i className="fas fa-search" aria-hidden="true"></i>
          </a>
          <input
            type="text"
            id="searchInput"
            className="search-box active"
            placeholder="Search..."
          />
          <button className="mobile-menu-btn" aria-label="Toggle mobile menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
