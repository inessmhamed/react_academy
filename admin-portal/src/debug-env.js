// Temporary debug file to check environment variables
console.log('=== Environment Variables Debug ===');
console.log('process.env.REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('All REACT_APP_ variables:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')));
console.log('===================================');
