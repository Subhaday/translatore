import { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [toLang, setToLang] = useState('es');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
          format: 'text',
        }
      );

      if (response.data?.data?.translations?.length) {
        const translatedText = response.data.data.translations[0].translatedText;
        setTranslated(translatedText);
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
      backgroundColor: '#f0f4f8',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'start'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        maxWidth: '800px',
        width: '100%',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        boxSizing: 'border-box'
      }}>
        <h1 style={{
          color: '#2c3e50',
          borderBottom: '2px solid #e1e1e1',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          🌍 Language Translator
        </h1>

        <div>
          <label htmlFor="sourceText" style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#34495e'
          }}>
            Enter text to translate:
          </label>
          <textarea
            id="sourceText"
            rows="5"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid #bdc3c7',
              marginBottom: '16px',
              resize: 'vertical',
              fontSize: '15px'
            }}
            placeholder="Type or paste text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="languageSelect" style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#34495e'
          }}>
            Translate to:
          </label>
          <select
            id="languageSelect"
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #bdc3c7',
              fontSize: '15px',
              backgroundColor: '#ecf0f1'
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
            backgroundColor: loading ? '#7fb3ff' : '#3498db',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease'
          }}
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>

        {error && (
          <div style={{
            color: '#e74c3c',
            margin: '16px 0',
            fontWeight: 'bold'
          }}>
            {error}
          </div>
        )}

        {translated && (
          <div style={{ marginTop: '24px' }}>
            <h3 style={{
              color: '#2c3e50',
              borderBottom: '1px solid #e1e1e1',
              paddingBottom: '8px'
            }}>
              ✅ Translated Text:
            </h3>
            <div style={{
              padding: '16px',
              backgroundColor: '#ecf0f1',
              borderRadius: '6px',
              border: '1px solid #bdc3c7',
              minHeight: '100px',
              whiteSpace: 'pre-wrap',
              color: '#2c3e50',
              fontSize: '16px'
            }}>
              {translated}
            </div>
          </div>
        )}

        <div style={{
          fontSize: '12px',
          color: '#7f8c8d',
          marginTop: '40px',
          textAlign: 'center'
        }}>
          🔗 Powered by Google Cloud Translation API
        </div>
      </div>
    </div>
  );
}

export default App;
