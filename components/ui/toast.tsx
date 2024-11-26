'use client';

import { useToast } from './use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function Toaster() {
  const { toast } = useToast();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-background border rounded-lg shadow-lg p-4 min-w-[300px]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{toast.title}</h3>
                {toast.description && (
                  <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => {}}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}