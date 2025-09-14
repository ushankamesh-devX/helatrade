const { executeQuery, getOne } = require('./src/config/database');
const bcrypt = require('bcrypt');

async function debugProducerAuth() {
  try {
    console.log('=== Producer Authentication Debug ===\n');
    
    // 1. Check if password_hash column exists
    console.log('1. Checking database schema...');
    try {
      const schemaCheck = await executeQuery('DESCRIBE producers');
      const hasPasswordHash = schemaCheck.some(col => col.Field === 'password_hash');
      console.log('password_hash column exists:', hasPasswordHash);
      
      if (!hasPasswordHash) {
        console.log('❌ password_hash column is missing from producers table!');
        console.log('You need to run: ALTER TABLE producers ADD COLUMN password_hash VARCHAR(255);');
        return;
      }
    } catch (error) {
      console.error('Error checking schema:', error.message);
      return;
    }
    
    // 2. Check existing producers
    console.log('\n2. Checking existing producers...');
    const producers = await executeQuery('SELECT id, email, password_hash FROM producers LIMIT 5');
    console.log(`Found ${producers.length} producers:`);
    
    producers.forEach(producer => {
      console.log(`- Email: ${producer.email}, Has password: ${!!producer.password_hash}`);
    });
    
    // 3. Test authentication with a specific producer
    if (producers.length > 0) {
      const testProducer = producers[0];
      console.log(`\n3. Testing authentication for: ${testProducer.email}`);
      
      if (!testProducer.password_hash) {
        console.log('❌ This producer has no password_hash set');
        console.log('Solution: Either:');
        console.log('a) Register a new producer using /api/producers/register');
        console.log('b) Or manually set a password for existing producer');
        
        // Option to set a test password
        console.log('\nSetting test password "SecurePassword123" for this producer...');
        const testPassword = 'SecurePassword123';
        const hashedPassword = await bcrypt.hash(testPassword, 12);
        
        await executeQuery(
          'UPDATE producers SET password_hash = ? WHERE id = ?', 
          [hashedPassword, testProducer.id]
        );
        
        console.log('✅ Test password set successfully');
        console.log(`You can now login with email: ${testProducer.email} and password: ${testPassword}`);
      } else {
        console.log('✅ Producer has password_hash set');
      }
    }
    
    console.log('\n=== Debug Complete ===');
    
  } catch (error) {
    console.error('Debug error:', error);
  }
  
  process.exit(0);
}

debugProducerAuth();