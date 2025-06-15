const fetch = require('node-fetch');

async function testGoogleProfilesAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/google-profiles?query=Pizza%20Hut%20Warszawa');
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testGoogleProfilesAPI();
