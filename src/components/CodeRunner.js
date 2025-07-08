import React, { useState, useRef } from 'react';
import Editor from './Editor';
import axios from 'axios';

const languages = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C', value: 'c' },
  { label: 'C++', value: 'cpp' },
];

const CodeRunner = ({ socketRef, roomId }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRun = async () => {
    setLoading(true);
    setError('');
    setOutput('');
    try {
      const res = await axios.post('http://localhost:5001/run-code', { code, language, input });
      if (res.data.compile_output) {
        setOutput(res.data.compile_output);
      } else if (res.data.stderr) {
        setOutput(res.data.stderr);
      } else {
        setOutput(res.data.output);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error running code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          {languages.map(lang => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>
      <Editor socketRef={socketRef} roomId={roomId} onCodeChange={setCode} />
      <div style={{ margin: '8px 0' }}>
        <textarea
          placeholder="Input (stdin)"
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={3}
          style={{ width: '100%' }}
        />
      </div>
      <button onClick={handleRun} disabled={loading} style={{ marginBottom: 8 }}>
        {loading ? 'Running...' : 'Run'}
      </button>
      <div>
        <strong>Output:</strong>
        <pre style={{ background: '#222', color: '#fff', padding: 8, minHeight: 40 }}>{output}</pre>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
};

export default CodeRunner; 