const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve('d:/gitFolders/ScratchTheHardway/example_games/box_inspector.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const regex = /<script(?![^>]*src=)[\s\S]*?>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
  const code = match[1];
  count++;
  try {
    new Function(code);
    console.log(`Script block ${count} syntax verified successfully (${code.length} chars)`);
  } catch (err) {
    console.error(`Syntax error in script block ${count}:`, err.message);
    process.exit(1);
  }
}
console.log(`All ${count} inline script blocks verified without syntax errors!`);
