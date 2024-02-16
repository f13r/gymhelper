'use client';

import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

export const ComponentMotion = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      {children}
    </motion.div>
  );
};
