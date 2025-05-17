import { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [toLang, setToLang] = useState('es'); // default to Spanish
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Google Cloud Translation API Key
  const API_KEY = 'AIzaSyA7VijB0aGNgwiy6cTazh8X5jaCDeFyN9A';

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError("Please enter text to translate.");
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        {
          q: text,
          target: toLang,
          format: 'text'
        }
      );
      
      if (response.data && response.data.data && response.data.data.translations) {
        setTranslated(response.data.data.translations[0].translatedText);
        
        // If you want to show the detected source language
        const detectedLang = response.data.data.translations[0].detectedSourceLanguage;
        console.log("Detected language:", detectedLang);
      }
    } catch (error) {
      console.error("Translation error:", error);
      setError(error.response?.data?.error?.message || 'Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Language Translator
      </h1>
      
      <div>
        <label htmlFor="sourceText" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Enter text to translate:
        </label>
        <textarea
          id="sourceText"
          rows="5"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginBottom: '16px',
            resize: 'vertical'
          }}
          placeholder="Type or paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="languageSelect" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Translate to:
        </label>
        <select
          id="languageSelect"
          value={toLang}
          onChange={(e) => setToLang(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            minWidth: '200px'
          }}
        >
          <option value="es">Spanish (Español)</option>
          <option value="fr">French (Français)</option>
          <option value="de">German (Deutsch)</option>
          <option value="it">Italian (Italiano)</option>
          <option value="pt">Portuguese (Português)</option>
          <option value="ru">Russian (Русский)</option>
          <option value="zh">Chinese (中文)</option>
          <option value="ja">Japanese (日本語)</option>
          <option value="ko">Korean (한국어)</option>
          <option value="ar">Arabic (العربية)</option>
          <option value="hi">Hindi (हिन्दी)</option>
        </select>
      </div>
      
      <button 
        onClick={handleTranslate} 
        disabled={loading}
        style={{
          backgroundColor: '#4285f4',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>
      
      {error && (
        <div style={{ color: 'red', margin: '16px 0' }}>
          {error}
        </div>
      )}
      
      {translated && (
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ color: '#333', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
            Translated Text:
          </h3>
          <div style={{
            padding: '16px',
            backgroundColor: '#f9f9f9',
            borderRadius: '4px',
            border: '1px solid #eee',
            minHeight: '100px'
          }}>
            {translated}
          </div>
        </div>
      )}
      
      <div style={{ fontSize: '12px', color: '#666', marginTop: '40px', textAlign: 'center' }}>
        Powered by Google Cloud Translation API
      </div>
    </div>
  );
}

export default App;