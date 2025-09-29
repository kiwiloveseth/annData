import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  glow = false,
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-md border border-neutral-grey/10 transition-all duration-300';
  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-xl cursor-pointer' : '';
  const glowClasses = glow ? 'neon-glow' : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${glowClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;