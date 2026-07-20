import React from 'react';
import logo from '../assets/logo.png';

// size: 'splash' | 'nav' | 'footer'
export function Logo({ size = 'nav', className = '' }) {
  const sizing =
    size === 'splash'
      ? 'w-64 sm:w-80'
      : size === 'nav'
      ? 'h-9 sm:h-10'
      : 'h-8';

  return (
    <img
      src={logo}
      alt="Virusinferno Digital Studio"
      className={`${sizing} w-auto object-contain select-none ${className}`}
      draggable={false}
    />
  );
}
