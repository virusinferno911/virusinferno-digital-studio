import React from 'react';
import { ArrowRight } from 'lucide-react';

// Small monospace "code-path" style label used to head every major section.
// e.g. [ SERVICES.LIST ] — ties the page's structure to the studio's
// technical identity instead of decorating with generic numbering.
export function Eyebrow({ children, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 mb-4 font-mono ${className}`}>
      <span className="w-6 h-px bg-ember-orange" />
      <span className="text-xs font-semibold tracking-[0.2em] text-ember-orange">
        {children}
      </span>
    </div>
  );
}

export function PrimaryButton({ href, onClick, children, className = '', as }) {
  const Tag = as || (href ? 'a' : 'button');
  const externalProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Tag
      onClick={onClick}
      {...externalProps}
      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-bold text-white bg-flame-gradient shadow-ember hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300 ${className}`}
    >
      {children}
    </Tag>
  );
}

export function SecondaryButton({ href, onClick, children, className = '' }) {
  const Tag = href ? 'a' : 'button';
  const externalProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Tag
      onClick={onClick}
      {...externalProps}
      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-display font-bold text-white border-2 border-line hover:bg-card hover:border-steel-dim transition-colors duration-300 ${className}`}
    >
      {children}
    </Tag>
  );
}

export function ArrowCTA({ children }) {
  return (
    <span className="inline-flex items-center gap-2">
      {children} <ArrowRight className="w-5 h-5" />
    </span>
  );
}

// A "status LED" style chip — reused for the 100% Virtual badge and similar callouts.
export function StatusChip({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.15em] font-mono border border-ember-orange text-ember-orange bg-card ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-ember-orange shadow-[0_0_8px_#FF6A00]" />
      {children}
    </span>
  );
}

// Faint radial dot-grid — reads as a technical texture without competing with content.
export function GridBackdrop({ className = '' }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(circle at 50% 35%, black, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 35%, black, transparent 70%)',
      }}
    />
  );
}

// Soft ambient ember glow, static (never pulses) so it reads as atmosphere, not decoration.
export function GlowBlob({ color = '#FF6A00', className = '', style = {} }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none opacity-25 ${className}`}
      style={{ background: `radial-gradient(circle, ${color}, transparent 70%)`, ...style }}
    />
  );
}
