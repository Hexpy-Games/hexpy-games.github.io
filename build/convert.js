#!/usr/bin/env node

/**
 * Markdown to HTML Converter for Legal Documents
 * Converts NanaChan AI legal documents from Markdown to simple HTML
 *
 * Usage:
 *   node convert.js                    # Build to default output (../dist)
 *   node convert.js /path/to/output    # Build to custom output directory
 */

const fs = require('fs');
const path = require('path');

// Base domain
const BASE_DOMAIN = 'https://pages.hexpy.games';

// Get output directory from command line or use default
const outputDir = process.argv[2] || path.join(__dirname, '../dist');
const sourceDir = path.join(__dirname, '../nanachanai/terms');

// Configuration for each document
const DOCUMENTS = [
  {
    source: path.join(sourceDir, 'privacy-policy-en.md'),
    output: 'privacy-policy-en.html',
    title: 'Privacy Policy - NanaChan AI',
    lang: 'en',
    description: 'Privacy Policy for NanaChan AI',
  },
  {
    source: path.join(sourceDir, 'privacy-policy-ko.md'),
    output: 'privacy-policy-ko.html',
    title: '개인정보 처리방침 - NanaChan AI',
    lang: 'ko',
    description: 'NanaChan AI 개인정보 처리방침',
  },
  {
    source: path.join(sourceDir, 'terms-of-use-en.md'),
    output: 'terms-of-use-en.html',
    title: 'Terms of Use - NanaChan AI',
    lang: 'en',
    description: 'Terms of Use for NanaChan AI',
  },
  {
    source: path.join(sourceDir, 'terms-of-use-ko.md'),
    output: 'terms-of-use-ko.html',
    title: '이용약관 - NanaChan AI',
    lang: 'ko',
    description: 'NanaChan AI 이용약관',
  },
];

/**
 * Generate heading ID from text
 * Converts "1. Purpose of Processing" to "1-purpose-of-processing"
 */
function generateHeadingId(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Convert markdown to HTML
 */
function markdownToHtml(markdown) {
  // First pass: process block-level elements line by line
  const lines = markdown.split('\n');
  let processedLines = [];
  let inList = false;
  let inOrderedList = false;
  let inTable = false;
  let tableRows = [];
  let tableHeaders = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : '';

    // Detect table start (line with | characters)
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && !inTable) {
      // Check if next line is separator (e.g., | --- | --- |)
      if (nextLine.match(/^\|[\s\-:|]+\|$/)) {
        // This is a table header
        inTable = true;
        tableHeaders = trimmed.split('|').map(cell => cell.trim()).filter(cell => cell);
        i++; // Skip the separator line
        tableRows = [];
        continue;
      }
    }

    // Collect table rows
    if (inTable && trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.split('|').map(cell => cell.trim()).filter(cell => cell);
      tableRows.push(cells);
      continue;
    }

    // End of table
    if (inTable && (!trimmed.startsWith('|') || !trimmed.endsWith('|'))) {
      // Generate table HTML
      let tableHtml = '<table>\n<thead>\n<tr>\n';
      tableHeaders.forEach(header => {
        tableHtml += `<th>${header}</th>\n`;
      });
      tableHtml += '</tr>\n</thead>\n<tbody>\n';
      tableRows.forEach(row => {
        tableHtml += '<tr>\n';
        row.forEach(cell => {
          tableHtml += `<td>${cell}</td>\n`;
        });
        tableHtml += '</tr>\n';
      });
      tableHtml += '</tbody>\n</table>';
      processedLines.push(tableHtml);
      inTable = false;
      tableHeaders = [];
      tableRows = [];
    }

    // Skip if we're in a table
    if (inTable) continue;

    // Headers
    if (trimmed.startsWith('### ')) {
      if (inList) { processedLines.push('</ul>'); inList = false; }
      if (inOrderedList) { processedLines.push('</ol>'); inOrderedList = false; }
      const headingText = trimmed.substring(4);
      const headingId = generateHeadingId(headingText);
      processedLines.push(`<h3 id="${headingId}">${headingText}</h3>`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      if (inList) { processedLines.push('</ul>'); inList = false; }
      if (inOrderedList) { processedLines.push('</ol>'); inOrderedList = false; }
      const headingText = trimmed.substring(3);
      const headingId = generateHeadingId(headingText);
      processedLines.push(`<h2 id="${headingId}">${headingText}</h2>`);
      continue;
    }
    if (trimmed.startsWith('# ')) {
      if (inList) { processedLines.push('</ul>'); inList = false; }
      if (inOrderedList) { processedLines.push('</ol>'); inOrderedList = false; }
      const headingText = trimmed.substring(2);
      const headingId = generateHeadingId(headingText);
      processedLines.push(`<h1 id="${headingId}">${headingText}</h1>`);
      continue;
    }

    // Horizontal rules
    if (trimmed === '---') {
      if (inList) { processedLines.push('</ul>'); inList = false; }
      if (inOrderedList) { processedLines.push('</ol>'); inOrderedList = false; }
      processedLines.push('<hr>');
      continue;
    }

    // Unordered list
    if (trimmed.match(/^[-*]\s+/)) {
      if (inOrderedList) { processedLines.push('</ol>'); inOrderedList = false; }
      if (!inList) {
        processedLines.push('<ul>');
        inList = true;
      }
      const content = trimmed.replace(/^[-*]\s+/, '');
      processedLines.push(`<li>${content}</li>`);
      continue;
    }

    // Ordered list
    if (trimmed.match(/^\d+\.\s+/)) {
      if (inList) { processedLines.push('</ul>'); inList = false; }
      if (!inOrderedList) {
        processedLines.push('<ol>');
        inOrderedList = true;
      }
      const content = trimmed.replace(/^\d+\.\s+/, '');
      processedLines.push(`<li>${content}</li>`);
      continue;
    }

    // End of list
    if (inList && !trimmed.match(/^[-*]\s+/)) {
      processedLines.push('</ul>');
      inList = false;
    }
    if (inOrderedList && !trimmed.match(/^\d+\.\s+/)) {
      processedLines.push('</ol>');
      inOrderedList = false;
    }

    // Empty lines
    if (!trimmed) {
      processedLines.push('');
      continue;
    }

    // Regular paragraphs
    processedLines.push(`<p>${line}</p>`);
  }

  // Close any open lists or tables
  if (inList) processedLines.push('</ul>');
  if (inOrderedList) processedLines.push('</ol>');
  if (inTable) {
    // Generate remaining table
    let tableHtml = '<table>\n<thead>\n<tr>\n';
    tableHeaders.forEach(header => {
      tableHtml += `<th>${header}</th>\n`;
    });
    tableHtml += '</tr>\n</thead>\n<tbody>\n';
    tableRows.forEach(row => {
      tableHtml += '<tr>\n';
      row.forEach(cell => {
        tableHtml += `<td>${cell}</td>\n`;
      });
      tableHtml += '</tr>\n';
    });
    tableHtml += '</tbody>\n</table>';
    processedLines.push(tableHtml);
  }

  let html = processedLines.join('\n');

  // Second pass: inline elements
  // Convert bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert links - handle anchor links differently
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, (match, text, url) => {
    // Anchor links (starting with #) should not open in new tab
    if (url.startsWith('#')) {
      return `<a href="${url}">${text}</a>`;
    }
    // External links open in new tab
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');

  return html;
}

/**
 * Create simple HTML document
 */
function createHtmlDocument(config, content) {
  return `<!DOCTYPE html>
<html lang="${config.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${config.description}">
    <title>${config.title}</title>
    <link rel="stylesheet" href="../../../assets/css/style.css">
</head>
<body>
${content}
</body>
</html>`;
}

/**
 * Process a single document
 */
function processDocument(config, outputPath) {
  console.log(`Processing ${config.source}...`);

  try {
    // Read markdown file
    const markdown = fs.readFileSync(config.source, 'utf8');

    // Convert to HTML
    const htmlContent = markdownToHtml(markdown);

    // Create full HTML document
    const fullHtml = createHtmlDocument(config, htmlContent);

    // Write output file
    fs.writeFileSync(outputPath, fullHtml, 'utf8');

    console.log(`✓ Created ${outputPath}`);
  } catch (error) {
    console.error(`✗ Error processing ${config.source}:`, error.message);
    process.exit(1);
  }
}

/**
 * Main execution
 */
function main() {
  console.log('NanaChan AI Legal Documents Converter');
  console.log('=====================================\n');
  console.log(`Source: ${sourceDir}`);
  console.log(`Output: ${outputDir}\n`);

  // Create output directory structure
  const termsOutputDir = path.join(outputDir, 'nanachanai/terms');
  if (!fs.existsSync(termsOutputDir)) {
    fs.mkdirSync(termsOutputDir, { recursive: true });
    console.log(`Created output directory: ${termsOutputDir}\n`);
  }

  // Process each document
  DOCUMENTS.forEach(config => {
    const outputPath = path.join(termsOutputDir, config.output);
    processDocument(config, outputPath);
  });

  console.log(`\n✓ All documents converted successfully!`);
  console.log(`\nBase domain: ${BASE_DOMAIN}`);
  console.log(`URLs will be: ${BASE_DOMAIN}/nanachanai/terms/<filename>`);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { markdownToHtml, createHtmlDocument, processDocument };
