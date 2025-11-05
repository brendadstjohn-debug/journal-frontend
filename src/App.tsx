// src/App.tsx
import { useState, useEffect } from 'react';
import type { Entry } from './types';
import { loadEntries, addEntry } from './utils/storage';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    // load persisted entries from storage on mount
    setEntries(loadEntries());
  }, []);

  function handleAddTestEntry() {
    const e: Entry = {
      id: Date.now().toString(),
      title: 'Test entry',
      body: 'This is a test entry created from the UI.',
      createdAt: new Date().toISOString(),
    };
    addEntry(e);              // persist to storage
    setEntries(prev => [e, ...prev]); // update local UI state
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Journal App</h1>

      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>

        <button style={{ marginLeft: 12 }} onClick={handleAddTestEntry}>
          Add test entry
        </button>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <section style={{ marginTop: 20 }}>
        <h2>Entries ({entries.length})</h2>
        <ul>
          {entries.map((en) => (
            <li key={en.id}>
              <strong>{en.title}</strong> — <small>{new Date(en.createdAt).toLocaleString()}</small>
              <div>{en.body}</div>
            </li>
          ))}
        </ul>
      </section>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
