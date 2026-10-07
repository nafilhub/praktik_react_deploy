import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, ChevronUp, Play, Minimize2 } from 'lucide-react';
import { sound } from '../utils/sound';

export default function CyberTerminal({
  logs,
  isOpen,
  onToggle,
  onRunCommand,
}) {
  const [inputVal, setInputVal] = useState('');
  const logEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sound.playKeypress();
    onRunCommand(inputVal.trim());
    setInputVal('');
  };

  return (
    <div className={`cyber-terminal-drawer ${isOpen ? 'open' : ''}`}>
      {/* Floating Toggle Pill when closed */}
      {!isOpen && (
        <button
          className="terminal-float-btn"
          onClick={() => {
            sound.playClick();
            onToggle();
          }}
          title="Open Cyber Hacker Terminal"
        >
          <Terminal size={15} />
          <span>CYBER_CONSOLE // LIVE_LOGS</span>
          <span className="terminal-badge-pulse">{logs.length}</span>
        </button>
      )}

      {/* Terminal Window when opened */}
      {isOpen && (
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-header-title">
              <Terminal size={14} color="var(--primary)" />
              <span>NEXUS PROTOCOL LOG & INTERACTIVE CLI</span>
              <span className="terminal-tag">STATUS: STREAMING</span>
            </div>
            <div className="terminal-header-actions">
              <button
                className="terminal-ctrl-btn"
                onClick={() => {
                  sound.playClick();
                  onToggle();
                }}
                title="Minimize terminal"
              >
                <Minimize2 size={13} />
              </button>
            </div>
          </div>

          <div className="terminal-body">
            <div className="terminal-welcome">
              <pre className="terminal-ascii">
{`   _  _______  ___  ______
  / |/ / __/ |/ / / / / __/
 /    / _//    / /_/ /\ \  
/_/|_/___/_/|_/\____/___/  v4.2`}
              </pre>
              <p>Type <span className="highlight-cmd">help</span> to view available interactive commands.</p>
            </div>

            {logs.map((log, index) => (
              <div key={index} className={`terminal-log-line ${log.type || 'info'}`}>
                <span className="terminal-timestamp">{log.time}</span>
                <span className="terminal-prefix">[{log.source || 'SYS'}]:</span>
                <span className="terminal-msg">{log.text}</span>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>

          <form className="terminal-input-bar" onSubmit={handleSubmit}>
            <span className="cli-prompt">root@nexus:~#</span>
            <input
              type="text"
              className="cli-input"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                sound.playKeypress();
              }}
              placeholder="type 'help', 'matrix', 'bypass', 'glitch'..."
              autoFocus
            />
            <button type="submit" className="cli-submit-btn">
              <Play size={12} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
