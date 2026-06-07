import React from 'react';
import logoUrl from '../assets/images/keki_kuki_logo_1780048297370.png';

interface LogoProps {
  className?: string;
  size?: number; // width and height in px
}

export default function Logo({ className = '', size }: LogoProps) {
  const style = size ? { width: size, height: 'auto' } : undefined;
  return (
    <img
      src={logoUrl}
      alt="Cakey & Cookie Bakers"
      style={style}
      className={`object-contain select-none max-w-full ${className}`}
      id="cakey-cookie-bakers-logo"
    />
  );
}

