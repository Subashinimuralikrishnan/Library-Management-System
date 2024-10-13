// test-bcrypt.js
const bcrypt = require('bcryptjs');

async function testBcrypt() {
    const password = 'myPassword123';
    
    try {
        const salt = await bcrypt.genSalt(10); // This should work
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed Password:', hashedPassword);
    } catch (error) {
        console.error('Error:', error);
    }
}

testBcrypt();
