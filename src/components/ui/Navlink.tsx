'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface IProps {
  href: string,
  children: ReactNode
}

export default function NavLink({ href, children }: IProps) {
  const pathname = usePathname();
  const isActive = href === '/'
    ? pathname === '/'
    : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`capitalize text-sm ${isActive ? 'border-b pb-0.5' : ''}`}
    >
      {children}
    </Link>
  );
}