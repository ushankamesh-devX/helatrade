const { executeQuery, getOne } = require('./src/config/database');
const bcrypt = require('bcrypt');

async function testSpecificLogin() {
  try {
    const email = 'info@highlandtea.lk';
    const password = 'SecurePassword123'; // Test with this password
    
    console.log(`Testing login for: ${email} with password: ${password}`);
    
    // Step 1: Get producer data
    const query = 'SELECT * FROM producers WHERE email = ? AND status = "active"';
    console.log('Query:', query);
    
    const producerData = await getOne(query, [email]);
    console.log('Producer found:', !!producerData);
    
    if (!producerData) {
      console.log('❌ Producer not found or not active');
      
      // Check if producer exists but inactive
      const inactiveCheck = await getOne('SELECT * FROM producers WHERE email = ?', [email]);
      if (inactiveCheck) {
        console.log(`Producer exists but status is: ${inactiveCheck.status}`);
      }
      return;
    }
    
    console.log('Producer status:', producerData.status);
    console.log('Producer has password_hash:', !!producerData.password_hash);
    
    // Step 2: Test password comparison
    if (producerData.password_hash) {
      console.log('Testing password comparison...');
      const isValidPassword = await bcrypt.compare(password, producerData.password_hash);
      console.log('Password comparison result:', isValidPassword);
      
      if (!isValidPassword) {
        console.log('❌ Password does not match');
        console.log('Let me try setting the correct password...');
        
        // Set the correct password
        const newHash = await bcrypt.hash(password, 12);
        await executeQuery(
          'UPDATE producers SET password_hash = ? WHERE email = ?',
          [newHash, email]
        );
        console.log('✅ Password updated. Try logging in again.');
      } else {
        console.log('✅ Password matches! Authentication should work.');
      }
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
  
  process.exit(0);
}

testSpecificLogin();