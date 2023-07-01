import { ReactNode } from 'react';

export function Navbar({ children }: { children: ReactNode }) {
  return <nav className="nav-bar">{children}</nav>;
}
