import { useState } from 'react';

const API = 'http://localhost:8000';

export default function UploadScreen({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');

  // Check backend on mount
  useState(() => {
    fetch(`${API}/`)
      .then(r => r.json())
      .then(() => setBackendStatus('online'))
      .catch(() => setBackendStatus('offline'));
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError('Please select a CSV file first');
      return;
    }

    // Check file extension
    if (!file.name.endsWith('.csv')) {
      setError('Please upload a .csv file (not ' + file.name.split('.').pop() + ')');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // First check if backend is reachable
      const healthCheck = await fetch(`${API}/`, { method: 'GET' });
      if (!healthCheck.ok) {
        throw new Error('Backend health check failed');
      }

      // Now upload the file
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API}/upload-csv`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onUploadSuccess(data);
      } else {
        setError(`Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(
        '❌ Cannot connect to backend!\n\n' +
        '1. Make sure backend is running:\n' +
        '   cd backend\n' +
        '   python -m uvicorn main:app --reload\n\n' +
        '2. Check it shows: "Uvicorn running on http://127.0.0.1:8000"\n\n' +
        '3. Test in browser: http://localhost:8000\n' +
        '   (Should show: {"message":"TrustAI Marketing Agent API"})'
      );
      setBackendStatus('offline');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const template = 'name,age,income,marital_status,dependents,location\nRaj Sharma,34,85000,Married,2,Mumbai\nAnanya Iyer,28,62000,Single,0,Bangalore\nVikram Singh,45,120000,Married,3,Delhi\nMeena Das,62,45000,Widowed,0,Pune';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer_template.csv';
    a.click();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '48px', maxWidth: '600px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '64px', marginBottom: '12px' }}>🤖</div>
          <h1 style={{ margin: '0 0 8px', fontSize: '32px', fontWeight: '900', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            TrustAI Marketing Agent
          </h1>
          <p style={{ color: '#64748B', fontSize: '16px', margin: 0 }}>
            Upload your customer CSV to start AI-powered campaigns
          </p>

          {/* Backend Status */}
          <div style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: backendStatus === 'online' ? '#F0FDF4' : backendStatus === 'offline' ? '#FEE2E2' : '#F1F5F9', border: backendStatus === 'online' ? '2px solid #10B981' : backendStatus === 'offline' ? '2px solid #EF4444' : '2px solid #CBD5E1' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: backendStatus === 'online' ? '#10B981' : backendStatus === 'offline' ? '#EF4444' : '#CBD5E1' }} />
            <span style={{ fontSize: '13px', fontWeight: '700', color: backendStatus === 'online' ? '#065F46' : backendStatus === 'offline' ? '#991B1B' : '#64748B' }}>
              Backend: {backendStatus === 'online' ? 'Connected' : backendStatus === 'offline' ? 'OFFLINE' : 'Checking...'}
            </span>
          </div>
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            border: dragActive ? '3px dashed #667eea' : '3px dashed #CBD5E1',
            borderRadius: '16px',
            padding: '48px 32px',
            textAlign: 'center',
            background: dragActive ? '#F0F4FF' : '#F8FAFC',
            cursor: 'pointer',
            transition: 'all 0.3s',
            marginBottom: '24px'
          }}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <input
            type="file"
            id="fileInput"
            accept=".csv"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📁</div>
          
          {file ? (
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
                ✅ {file.name}
              </div>
              <div style={{ fontSize: '14px', color: '#64748B' }}>
                {(file.size / 1024).toFixed(1)} KB • Ready to upload
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B', marginBottom: '8px' }}>
                Drag & Drop CSV File Here
              </div>
              <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '12px' }}>
                or click to browse
              </div>
              <div style={{ display: 'inline-block', background: 'white', color: '#667eea', padding: '8px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', border: '2px solid #667eea' }}>
                Choose File
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ background: '#FEE2E2', border: '2px solid #EF4444', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ fontSize: '24px', flexShrink: 0 }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#991B1B', fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Upload Failed</div>
                <pre style={{ color: '#DC2626', fontSize: '12px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: 0, lineHeight: '1.6' }}>
                  {error}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <button
            onClick={downloadTemplate}
            style={{
              background: '#F1F5F9',
              color: '#475569',
              border: 'none',
              padding: '14px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '15px',
              transition: 'all 0.2s'
            }}
          >
            📥 Download Template
          </button>
          
          <button
            onClick={uploadFile}
            disabled={!file || uploading}
            style={{
              background: file && !uploading ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#CBD5E1',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '12px',
              cursor: file && !uploading ? 'pointer' : 'not-allowed',
              fontWeight: '700',
              fontSize: '15px',
              transition: 'all 0.2s'
            }}
          >
            {uploading ? '⏳ Uploading...' : '🚀 Upload & Process'}
          </button>
        </div>

        {/* Info */}
        <div style={{ background: '#F0F9FF', borderRadius: '12px', padding: '16px', borderLeft: '4px solid #3B82F6' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#1E40AF', marginBottom: '8px' }}>
            📋 Required CSV Format:
          </div>
          <div style={{ fontSize: '13px', color: '#1E40AF', fontFamily: 'monospace', background: 'rgba(255,255,255,0.7)', padding: '8px', borderRadius: '6px' }}>
            name, age, income, marital_status, dependents, location
          </div>
          <div style={{ fontSize: '12px', color: '#60A5FA', marginTop: '8px' }}>
            AI will automatically segment customers and recommend insurance products
          </div>
        </div>

        {/* Backend Troubleshooting */}
        {backendStatus === 'offline' && (
          <div style={{ marginTop: '20px', background: '#FFF7ED', border: '2px solid #F59E0B', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#92400E', marginBottom: '8px' }}>
              🔧 Quick Fix:
            </div>
            <div style={{ fontSize: '13px', color: '#B45309', fontFamily: 'monospace', background: 'rgba(255,255,255,0.7)', padding: '8px', borderRadius: '6px', marginBottom: '8px' }}>
              cd backend<br/>
              python -m uvicorn main:app --reload
            </div>
            <div style={{ fontSize: '12px', color: '#92400E' }}>
              Then refresh this page and try uploading again
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
