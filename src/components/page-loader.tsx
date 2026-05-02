import { motion } from 'framer-motion'

export function PageLoader() {
  const ripples = [{ delay: 0 }, { delay: 0.5 }, { delay: 1 }]

  return (
    <div className="flex w-full h-full min-h-[50vh] items-center justify-center">
      <div className="relative flex items-center justify-center h-16 w-16">
        {ripples.map((ripple, index) => (
          <motion.div
            key={index}
            className="absolute h-full w-full rounded-full border-4 border-primary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 0.1, 1.5],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: ripple.delay,
              times: [0, 0.05, 1],
            }}
          />
        ))}
      </div>
    </div>
  )
}
