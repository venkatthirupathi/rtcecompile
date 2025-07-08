const axios = require('axios');

async function testJudge0API() {
  try {
    console.log('Testing Judge0 API with new key...');
    
    const response = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      {
        source_code: 'console.log("Hello World");',
        language_id: 63, // JavaScript
        stdin: '',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': '329e5ce5f2msh58c8f81ef9ae33ap15d775jsnc5dda11b0742',
        },
      }
    );
    
    console.log('API Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
  }
}

testJudge0API(); 