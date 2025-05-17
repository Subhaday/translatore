import { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [toLang, setToLang] = useState('es'); // default to Spanish

  const handleTranslate = async () => {
    try {
      const response = await axios.post('https://libretranslate.com/translate', {
        q: text,
        source: 'en',
        target: toLang,
        format: 'text'
      });

      console.log(response)
      setTranslated(response.data.translatedText);
    } catch (error) {
      console.error(error);
      alert('Translation failed!');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Language Translator</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text in English"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br /><br />
      <select value={toLang} onChange={(e) => setToLang(e.target.value)}>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="hi">Hindi</option>
        <option value="ar">Arabic</option>
        {/* Add more language codes as needed */}
      </select>
      <br /><br />
      <button onClick={handleTranslate}>Translate</button>
      <h3>Translated Text:</h3>
      <p>{translated}</p>
    </div>
  );
}

export default App;
