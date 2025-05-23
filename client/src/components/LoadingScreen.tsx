import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-32 h-32">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-4 border-primary rounded-lg"
                initial={{ rotate: i * 90 }}
                animate={{ rotate: [i * 90, (i + 1) * 90] }}
                transition={{
                  duration: 0.3,
                  repeat: 1,
                  ease: "linear",
                  delay: i * 0.1,
                }}
              />
            ))}
            <motion.div
              className="absolute inset-0 border-4 border-primary/30 rounded-lg"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 0.3,
                repeat: 1,
                ease: "easeInOut"
              }}
            />
          </div>

          <motion.h2
            className="mt-8 font-space-grotesk text-4xl font-bold text-primary mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Kenya Stays
          </motion.h2>

          <motion.p
            className="text-slate-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Loading your perfect stay...
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}