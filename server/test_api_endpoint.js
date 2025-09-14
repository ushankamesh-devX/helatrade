const { default: fetch } = require('node-fetch');

async function testProducerLogin() {
  try {
    console.log('Testing producer login endpoint...');
    
    const response = await fetch('http://localhost:3000/api/producers/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'info@highlandtea.lk',
        password: 'SecurePassword123'
      })
    });

    console.log('Response status:', response.status);

    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('Test error:', error);
  }
}

testProducerLogin();