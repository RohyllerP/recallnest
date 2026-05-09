"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function CookiesModal({ open, onClose, text }: { open: boolean; onClose: () => void; text: string }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-surface rounded-xl shadow-xl max-w-md w-full p-8 relative"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              className="absolute top-3 right-3 text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-2xl w-10 h-10 flex items-center justify-center"
              onClick={onClose}
              aria-label="Close"
              style={{ lineHeight: 1 }}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-3 text-primary">Cookies</h2>
            <p className="text-on-surface-variant whitespace-pre-line text-sm">{text}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
