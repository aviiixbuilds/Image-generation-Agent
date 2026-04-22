import { useState, useEffect } from 'react'

function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  async function query(data) {
    const token = import.meta.env.VITE_HF_TOKEN;
    
    if (!token || token === 'your_hugging_face_token_here') {
      throw new Error('Hugging Face token is missing. Please add it to your .env file.');
    }

    const response = await fetch(
      "https://router.huggingface.co/nscale/v1/images/generations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.statusText}`);
    }

    const result = await response.blob();
    return result;
  }

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setIsLoading(true);
    setError(null);
    setImage(null);

    try {
      const blob = await query({
        response_format: "b64_json",
        prompt: prompt,
        model: "stabilityai/stable-diffusion-xl-base-1.0",
      });

      const contentType = blob.type;
      
      if (contentType.includes('application/json')) {
        const text = await blob.text();
        const json = JSON.parse(text);
        const b64Data = json.data?.[0]?.b64_json || json.images?.[0];
        if (b64Data) {
          setImage(`data:image/png;base64,${b64Data}`);
        } else {
          throw new Error('Could not find image data in response');
        }
      } else {
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="container">
      <header>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <button 
            onClick={toggleTheme} 
            className="card" 
            style={{ 
              padding: '0.5rem 1rem', 
              cursor: 'pointer', 
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase'
            }}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
        <h1>Visionary Art</h1>
        <p>Expert-level AI image generation powered by Stable Diffusion XL.</p>
      </header>

      <main className="main-grid">
        <section className="card input-section">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label>The Prompt</label>
            <textarea 
              placeholder="A futuristic city in the clouds, cyberpunk aesthetic, high detail, volumetric lighting..." 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {error && (
            <div className="alert">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button 
            className="generate-btn" 
            onClick={handleGenerate} 
            disabled={isLoading || !prompt}
          >
            {isLoading ? 'Processing...' : 'Generate Masterpiece'}
            {!isLoading && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            )}
          </button>

          <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <p>Tip: Be descriptive. Add style keywords like "cinematic", "unreal engine", or "oil painting".</p>
          </div>
        </section>

        <section className="card preview-card">
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <div className="loading-text">Manifesting your vision...</div>
            </div>
          )}
          
          <div className="preview-content">
            {image ? (
              <div className="image-wrapper">
                <img src={image} alt={prompt} />
              </div>
            ) : (
              <div className="placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
                <p>Generated image will appear here</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Visionary AI Hub. Designed with professional UI/UX standards.</p>
      </footer>
    </div>
  )
}

export default App
