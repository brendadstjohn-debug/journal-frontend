// src/App.tsx
import { useState, useEffect } from 'react';
import type { Entry } from './types';
import { loadEntries, addEntry } from './utils';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  function handleAddEntry() {
    const newEntry: Entry = {
      id: Date.now().toString(),
      title: `Entry ${entries.length + 1}`,
      body: '',
      createdAt: new Date().toISOString(),
    };
    addEntry(newEntry);
    setEntries(prev => [newEntry, ...prev]);
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
        <button onClick={() => setCount(c => c + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <div style={{ margin: '24px 0' }}>
        <button onClick={handleAddEntry}>Add entry</button>
        <h2>Entries ({entries.length})</h2>
        <ul>
          {entries.map(e => (
            <li key={e.id}>
              <strong>{e.title}</strong> — {new Date(e.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
