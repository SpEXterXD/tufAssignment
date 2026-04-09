'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useNotes } from './useNotes';
import styles from '../WallCalendar.module.css';

interface NotesPanelProps {
  year: number;
  month: number;
  accentColor: string;
  onNotesChange?: (notes: string, year: number, month: number) => void;
}

export function NotesPanel({ year, month, accentColor, onNotesChange }: NotesPanelProps): React.JSX.Element {
  const { notes, setNotes } = useNotes(year, month);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    setNotes(value);
    onNotesChange?.(value, year, month);
  };

  return (
    <div className={styles.notesPanel}>
      {/* Toggle header — interactive on mobile, static on desktop */}
      <button
        className="md:pointer-events-none flex items-center justify-between w-full text-left group"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        aria-label="Toggle notes section"
      >
        <h3 className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
          Notes
        </h3>
        <motion.span
          className="md:hidden text-gray-400"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      {/* Desktop: always visible. Mobile: animated expand/collapse */}
      <div className="hidden md:block mt-1">
        <textarea
          className={styles.notesTextarea}
          value={notes}
          onChange={handleChange}
          placeholder="Add notes..."
          aria-label={`Notes for ${new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
        />
      </div>

      {/* Mobile: animated panel */}
      <div className="md:hidden">
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <textarea
                className={styles.notesTextarea}
                value={notes}
                onChange={handleChange}
                placeholder="Add notes..."
                style={{ marginTop: 4 }}
                aria-label={`Notes for ${new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
