import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  rotation: number;
  color: string;
  size: number;
  shape: 'rect' | 'circle' | 'heart' | 'star';
}

const COLORS = ['#f8b4c0', '#fee49c', '#b8e0d2', '#ffcad4', '#f07167', '#ffffff', '#e9d8a6'];

export const ScrapbookConfetti: React.FC<{
  triggerKey: number;
}> = ({ triggerKey }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (triggerKey === 0) return;

    const count = 35;
    const newParticles: Particle[] = [];
    const shapes: Array<'rect' | 'circle' | 'heart' | 'star'> = ['rect', 'rect', 'circle', 'heart', 'star'];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const distance = 80 + Math.random() * 260;
      newParticles.push({
        id: Math.random(),
        x: 0,
        y: 0,
        targetX: Math.cos(angle) * distance,
        targetY: Math.sin(angle) * distance - 50,
        rotation: (Math.random() - 0.5) * 720,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 8 + Math.random() * 12,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, 2500);

    return () => clearTimeout(timer);
  }, [triggerKey]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.2, rotate: 0 }}
            animate={{
              x: p.targetX,
              y: p.targetY + 120, // gravity effect
              opacity: [1, 1, 0],
              scale: [0.2, 1, 0.8],
              rotate: p.rotation,
            }}
            transition={{
              duration: 1.8 + Math.random() * 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.shape === 'rect' ? p.size * 0.6 : p.size,
              backgroundColor: p.shape === 'rect' || p.shape === 'circle' ? p.color : 'transparent',
              borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'rect' ? '2px' : '0',
            }}
          >
            {p.shape === 'heart' && (
              <span style={{ color: p.color, fontSize: p.size * 1.2 }}>♡</span>
            )}
            {p.shape === 'star' && (
              <span style={{ color: p.color, fontSize: p.size * 1.2 }}>★</span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
