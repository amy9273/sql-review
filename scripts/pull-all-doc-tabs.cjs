const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const docId = '1dWtxuydtnxnhQSOCnzZPv02dp64ZvVdCGx6ea9Os-Sk';

console.log('Listing tabs...');
const listOutput = execSync(`gdocs readonly list-tabs ${docId}`, { encoding: 'utf8' });
const lines = listOutput.split('\n');

const tabs = [];
for (const line of lines) {
  const match = line.match(/^(t\.[a-z0-9_]+)\s+(.+?)\s+(\d+)\s+(\d+)\s*$/);
  if (match) {
    tabs.push({
      tabId: match[1],
      title: match[2].trim(),
      index: parseInt(match[3]),
      nesting: parseInt(match[4])
    });
  }
}

console.log(`Found ${tabs.length} tabs. Pulling content...`);

const tabContents = {};
let currentParent = 'General';

for (let i = 0; i < tabs.length; i++) {
  const t = tabs[i];
  if (t.nesting === 0) {
    currentParent = t.title;
  }
  console.log(`[${i + 1}/${tabs.length}] Reading: ${t.title} (${t.tabId})`);
  try {
    const content = execSync(`gdocs readonly read-tab ${docId} ${t.tabId}`, {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024
    });
    tabContents[t.tabId] = {
      tabId: t.tabId,
      title: t.title,
      parentModule: currentParent,
      nesting: t.nesting,
      content: content.trim()
    };
  } catch (err) {
    console.error(`Failed to read tab ${t.tabId}:`, err.message);
  }
}

const outPath = path.resolve('scripts/extracted_doc_tabs.json');
fs.writeFileSync(outPath, JSON.stringify(tabContents, null, 2), 'utf8');
console.log(`Saved all ${Object.keys(tabContents).length} tabs to ${outPath}`);
