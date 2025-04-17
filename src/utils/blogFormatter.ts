// src/utils/blogFormatter.ts
/**
 * This utility enhances blog post display by applying formatting rules
 * and transformations to the raw HTML content
 */

/**
 * Apply Medium-style formatting to blog post content
 */
export function formatBlogContent(content: string): string {
  let formattedContent = content;
  
  // Add CSS classes to images
  formattedContent = addClassesToImages(formattedContent);
  
  // Format code blocks
  formattedContent = enhanceCodeBlocks(formattedContent);
  
  // Add CSS classes to blockquotes
  formattedContent = enhanceBlockquotes(formattedContent);
  
  // Format header anchors for linking
  formattedContent = addHeaderAnchors(formattedContent);
  
  // Add medium-style drop caps to first paragraph
  formattedContent = addDropCapsToFirstParagraph(formattedContent);
  
  // Enhance lists with proper spacing and styles
  formattedContent = enhanceLists(formattedContent);
  
  // Parse special Medium-style dividers
  formattedContent = parseSpecialDividers(formattedContent);
  
  return formattedContent;
}

/**
 * Add CSS classes to all images for proper styling
 */
function addClassesToImages(content: string): string {
  // Add the 'blog-image' class to all images
  return content.replace(/<img/g, '<img class="blog-image"');
}

/**
 * Add syntax highlighting and formatting to code blocks
 */
function enhanceCodeBlocks(content: string): string {
  // Look for <pre> tags and enhance them
  return content.replace(
    /<pre>([\s\S]*?)<\/pre>/g, 
    (match: string, code: string) => {
      // Clean up code content
      const cleanCode = code.replace(/^\s+|\s+$/g, '');
      
      // If the content starts with a language identifier like "javascript:"
      const languageMatch = cleanCode.match(/^(\w+):([\s\S]*)$/);
      
      if (languageMatch) {
        const language = languageMatch[1];
        const actualCode = languageMatch[2].trim();
        
        return `
          <div class="code-block">
            <div class="code-header">${language}</div>
            <pre><code class="language-${language}">${actualCode}</code></pre>
          </div>
        `;
      }
      
      // If no language specified
      return `
        <div class="code-block">
          <pre><code>${cleanCode}</code></pre>
        </div>
      `;
    }
  );
}

/**
 * Enhance blockquotes with Medium-style formatting
 */
function enhanceBlockquotes(content: string): string {
  return content.replace(
    /<blockquote>([\s\S]*?)<\/blockquote>/g,
    (match: string, quote: string) => {
      // Check if the quote has a citation at the end
      const citationMatch = quote.match(/<p>—\s*(.*?)<\/p>$/);
      
      if (citationMatch) {
        const citation = citationMatch[1];
        const quoteContent = quote.replace(/<p>—\s*(.*?)<\/p>$/, '');
        
        return `
          <blockquote class="medium-style-quote">
            ${quoteContent}
            <cite>— ${citation}</cite>
          </blockquote>
        `;
      }
      
      return `<blockquote class="medium-style-quote">${quote}</blockquote>`;
    }
  );
}

/**
 * Add anchor IDs to headers for in-page navigation
 */
function addHeaderAnchors(content: string): string {
  return content.replace(
    /<(h[2-6])>(.*?)<\/h[2-6]>/g,
    (match: string, tag: string, text: string) => {
      // Create an ID from the header text
      const id = text
        .toLowerCase()
        .replace(/<.*?>/g, '') // Remove HTML tags
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
      
      return `<${tag} id="${id}">${text}</${tag}>`;
    }
  );
}

/**
 * Apply drop cap styling to the first paragraph
 */
function addDropCapsToFirstParagraph(content: string): string {
  // Only apply to the first paragraph after headers or beginning of content
  return content.replace(
    /(<h[1-6]>.*?<\/h[1-6]>)?(<p>)([\s\S][^<]*)/,
    (match: string, header: string | undefined, pOpen: string, pContent: string) => {
      if (!pContent || pContent.length < 1) return match;
      
      const firstChar = pContent.charAt(0);
      const restOfParagraph = pContent.slice(1);
      
      return `${header || ''}${pOpen}<span class="drop-cap">${firstChar}</span>${restOfParagraph}`;
    }
  );
}

/**
 * Enhance lists with proper spacing and styling
 */
function enhanceLists(content: string): string {
  // Add classes to unordered lists
  let enhanced = content.replace(
    /<ul>/g,
    '<ul class="medium-style-list">'
  );
  
  // Add classes to ordered lists
  enhanced = enhanced.replace(
    /<ol>/g,
    '<ol class="medium-style-ordered-list">'
  );
  
  return enhanced;
}

/**
 * Parse special dividers like Medium's "***" separator
 */
function parseSpecialDividers(content: string): string {
  // Look for <p>***</p> or <p>---</p> patterns
  return content
    .replace(
      /<p>\s*\*\*\*\s*<\/p>/g, 
      '<div class="content-divider"></div>'
    )
    .replace(
      /<p>\s*---\s*<\/p>/g, 
      '<div class="content-divider"></div>'
    );
}

/**
 * Detect if a URL is an image URL
 */
export function isImageUrl(url: string): boolean {
  if (!url) return false;
  
  // Check the extension
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];
  const lowercaseUrl = url.toLowerCase();
  
  return imageExtensions.some(ext => lowercaseUrl.endsWith(ext));
}

/**
 * Get a word count from HTML content
 */
export function getWordCount(htmlContent: string): number {
  // Remove HTML tags
  const textContent = htmlContent.replace(/<[^>]*>/g, ' ');
  
  // Remove extra whitespace
  const cleanedText = textContent.replace(/\s+/g, ' ').trim();
  
  // Count words
  return cleanedText.split(' ').filter(Boolean).length;
}

/**
 * Calculate estimated reading time
 */
export function getReadingTime(htmlContent: string, wordsPerMinute: number = 200): number {
  const wordCount = getWordCount(htmlContent);
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
}

/**
 * Extract plain text from HTML content for search indexing
 */
export function extractPlainText(htmlContent: string): string {
  return htmlContent
    .replace(/<[^>]*>/g, ' ') // Remove HTML tags
    .replace(/\s+/g, ' ')     // Replace multiple spaces with single space
    .trim();                  // Trim leading/trailing spaces
}

/**
 * Generate a table of contents from HTML content
 */
export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export function generateTableOfContents(htmlContent: string): TocItem[] {
  const toc: TocItem[] = [];
  const headingRegex = /<h([2-6])\s+id="([^"]+)">(.*?)<\/h[2-6]>/g;
  
  let match;
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const title = match[3].replace(/<[^>]*>/g, ''); // Remove any HTML inside the heading
    
    toc.push({ id, title, level });
  }
  
  return toc;
}