#!/usr/bin/env node

/**
 * Markdown to HTML Converter for Legal Documents
 * Converts NanaChan AI legal documents from Markdown to simple HTML
 */

const fs = require('fs');
const path = require('path');

// Base domain
const BASE_DOMAIN = 'https://pages.hexpy.games';

// Configuration for each document
const DOCUMENTS = [
  {
    source: '/Users/yeonwoo/dev/NanaChanAI/docs/PRIVACY_POLICY_EN.md',
    output: 'privacy-policy.html',
    title: 'Privacy Policy - NanaChan AI',
    lang: 'en',
    description: 'Privacy Policy for NanaChan AI',
  },
  {
    source: '/Users/yeonwoo/dev/NanaChanAI/docs/PRIVACY_POLICY_KO.md',
    output: 'privacy-policy-ko.html',
    title: '개인정보 처리방침 - NanaChan AI',
    lang: 'ko',
    description: 'NanaChan AI 개인정보 처리방침',
  },
  {
    source: '/Users/yeonwoo/dev/NanaChanAI/docs/TERMS_OF_USE_EN.md',
    output: 'terms-of-use.html',
    title: 'Terms of Use - NanaChan AI',
    lang: 'en',
    description: 'Terms of Use for NanaChan AI',
  },
  {
    source: '/Users/yeonwoo/dev/NanaChanAI/docs/TERMS_OF_USE_KO.md',
    output: 'terms-of-use-ko.html',
    title: '이용약관 - NanaChan AI',
    lang: 'ko',
    description: 'NanaChan AI 이용약관',
  },
];

/**
 * Convert markdown to HTML
 */
function markdownToHtml(markdown) {
  let html = markdown;

  // Convert headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Convert bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Convert links
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Convert lists
  const lines = html.split('\n');
  let inList = false;
  let inOrderedList = false;
  let processedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Unordered list
    if (trimmed.match(/^[-*]\s+/)) {
      if (!inList) {
        processedLines.push('<ul>');
        inList = true;
      }
      const content = trimmed.replace(/^[-*]\s+/, '');
      processedLines.push(`<li>${content}</li>`);
    }
    // Ordered list
    else if (trimmed.match(/^\d+\.\s+/)) {
      if (!inOrderedList) {
        processedLines.push('<ol>');
        inOrderedList = true;
      }
      const content = trimmed.replace(/^\d+\.\s+/, '');
      processedLines.push(`<li>${content}</li>`);
    }
    // End of list
    else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      if (inOrderedList) {
        processedLines.push('</ol>');
        inOrderedList = false;
      }

      // Paragraphs
      if (trimmed && !trimmed.startsWith('<')) {
        processedLines.push(`<p>${line}</p>`);
      } else if (trimmed) {
        processedLines.push(line);
      } else {
        processedLines.push('');
      }
    }
  }

  // Close any open lists
  if (inList) processedLines.push('</ul>');
  if (inOrderedList) processedLines.push('</ol>');

  html = processedLines.join('\n');

  // Convert horizontal rules
  html = html.replace(/^---$/gm, '<hr>');

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>\s*<h/g, '<h');
  html = html.replace(/<\/h[1-6]>\s*<\/p>/g, (match) => match.replace(/<\/?p>/g, ''));

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
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
${content}
</body>
</html>`;
}

/**
 * Process a single document
 */
function processDocument(config) {
  console.log(`Processing ${config.source}...`);

  try {
    // Read markdown file
    const markdown = fs.readFileSync(config.source, 'utf8');

    // Convert to HTML
    const htmlContent = markdownToHtml(markdown);

    // Create full HTML document
    const fullHtml = createHtmlDocument(config, htmlContent);

    // Write output file
    fs.writeFileSync(config.output, fullHtml, 'utf8');

    console.log(`✓ Created ${config.output}`);
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

  DOCUMENTS.forEach(processDocument);

  console.log(`\n✓ All documents converted successfully!`);
  console.log(`\nBase domain: ${BASE_DOMAIN}`);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { markdownToHtml, createHtmlDocument, processDocument };
