import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

export default function LoadingScreen() {
  const controls = useAnimation();
  const { theme } = useTheme();
  
  useEffect(() => {
    controls.start({
      opacity: [1, 0],
      transition: { duration: 0.5, delay: 3.5 }
    });
  }, [controls]);

  return (
    <motion.div 
      className={`fixed inset-0 flex items-center justify-center ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-amber-950 via-yellow-950 to-amber-900' 
          : 'bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-50'
      } z-50`}
      animate={controls}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* ...removed animated circles... */}

          {/* Text Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-24"
          >
            <motion.h1
              className={`text-3xl font-bold font-serif mb-2 ${
                theme === 'dark' ? 'text-amber-200' : 'text-amber-900'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              Kenya Luxury Villas
            </motion.h1>
            <motion.p
              className={`text-lg ${
                theme === 'dark' ? 'text-amber-300/70' : 'text-amber-800/70'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              Experience Luxury Living
            </motion.p>
          </motion.div>

          {/* Loading Progress */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <div className={`text-lg ${
              theme === 'dark' ? 'text-amber-400/60' : 'text-amber-700/60'
            }`}>
              Loading your stay...
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
