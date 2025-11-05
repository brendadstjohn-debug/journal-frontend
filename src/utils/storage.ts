// src/utils/storage.ts
import type { Entry } from '../types';

const STORAGE_KEY = 'journal-entries';

export function loadEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Entry[]) : [];
  } catch {
    return [];
  }
}

export function addEntry(entry: Entry) {
  const current = loadEntries();
  current.unshift(entry); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}
