const fs = require('fs');
const swc = require('./node_modules/next/dist/build/swc');

const code = fs.readFileSync('AIScanMySite.tsx', 'utf8');
const lines = code.split('\n');

async function narrowRange() {
  for (let start = 1092; start < 1492; start += 20) {
    for (let end = start + 20; end <= 1492; end += 20) {
      const testLines = [
        ...lines.slice(0, start),
        ...lines.slice(end)
      ];
      try {
        await swc.transform(testLines.join('\n'), {
          filename: 'AIScanMySite.tsx',
          jsc: { parser: { syntax: 'typescript', tsx: true } }
        });
        console.log(`SWC PASSED when cutting lines ${start} to ${end}!`);
      } catch (e) {
      }
    }
  }
}

narrowRange();
