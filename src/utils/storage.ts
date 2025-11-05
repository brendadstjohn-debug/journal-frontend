// src/utils/storage.ts
// src/utils/storage.ts
import type { Entry } from '../types';


const STORAGE_KEY = 'journal:entries';

/** Return all saved entries (empty array if none / on error) */
export function loadEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Entry[];
  } catch (err) {
    console.error('loadEntries error', err);
    return [];
  }
}

/** Overwrite stored entries */
export function saveEntries(entries: Entry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.error('saveEntries error', err);
  }
}

/** Add one entry to the front (most-recent-first) */
export function addEntry(entry: Entry): void {
  const entries = loadEntries();
  entries.unshift(entry);
  saveEntries(entries);
}

/** Replace an existing entry (matched by id) */
export function updateEntry(updated: Entry): void {
  const entries = loadEntries().map(e => (e.id === updated.id ? updated : e));
  saveEntries(entries);
}

/** Remove an entry by id */
export function deleteEntry(id: string): void {
  const entries = loadEntries().filter(e => e.id !== id);
  saveEntries(entries);
}
