const fs = require('fs');
const swc = require('./node_modules/next/dist/build/swc');

let code = fs.readFileSync('AIScanMySite.tsx', 'utf8');

// Let's test swc.transform on current AIScanMySite.tsx
swc.transform(code, {
  filename: 'AIScanMySite.tsx',
  jsc: { parser: { syntax: 'typescript', tsx: true } }
}).then(res => console.log('AIScanMySite.tsx SWC transform PASSED!'))
  .catch(err => console.error('SWC transform FAILED:', err.message));
