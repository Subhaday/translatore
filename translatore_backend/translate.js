// translate.js

const axios = require('axios');

// Translation input
const text = 'Hello, how are you?';
const targetLang = 'fr'; // French
const API_KEY = 'AIzaSyA7VijB0aGNgwiy6cTazh8X5jaCDeFyN9A'; // Google Cloud API key

async function translateText() {
  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        q: text,
        target: targetLang,
        format: 'text'
      }
    );

    // Check if translation was successful
    if (response.data && response.data.data && response.data.data.translations) {
      const translation = response.data.data.translations[0];
      console.log('Translated Text:', translation.translatedText);
      
      // If source language detection was performed
      if (translation.detectedSourceLanguage) {
        console.log('Detected Source Language:', translation.detectedSourceLanguage);
      }
    } else {
      console.error('Translation response format unexpected:', response.data);
    }
  } catch (error) {
    console.error('Translation Failed:', error.message);
    // Add more detailed error information
    if (error.response) {
      console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
      console.error('Error Status:', error.response.status);
    }
  }
}

translateText();