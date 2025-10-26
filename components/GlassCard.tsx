
// components/GlassCard.tsx
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useSettingsStore } from '../store/settingsStore.ts';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
  className?: string;
  disableBorder?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', disableBorder = false, ...props }) => {
  const { theme } = useSettingsStore();
  const glassClass = theme === 'light' ? 'glass-effect-light' : 'glass-effect-dark';
  const borderClass = disableBorder ? '' : 'border';
  const shadowClass = 'shadow-lg'; // Consistent soft shadow

  return (
    <motion.div
      className={`${glassClass} ${borderClass} rounded-2xl ${shadowClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;