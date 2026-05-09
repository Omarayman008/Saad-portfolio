"use client";

import { motion } from "framer-motion";

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0,
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%" 
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            x: [null, (Math.random() - 0.5) * 200 + "%"],
            y: [null, (Math.random() - 0.5) * 200 + "%"],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-64 h-64 bg-gold/5 rounded-full blur-[100px]"
        />
      ))}
      <div className="absolute inset-0 glow-mesh opacity-30" />
    </div>
  );
}
