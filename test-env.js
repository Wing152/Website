require('dotenv').config({ path: '.env.local' });
console.log('Key exists:', !!process.env.GROQ_API_KEY);
console.log('Key length:', process.env.GROQ_API_KEY?.length);
