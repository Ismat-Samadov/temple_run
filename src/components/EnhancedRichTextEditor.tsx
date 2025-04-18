import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, Link, Image, Type, Quote, Code, Undo, Redo
} from 'lucide-react';

interface EnhancedRichTextEditorProps {
  initialValue?: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const EnhancedRichTextEditor: React.FC<EnhancedRichTextEditorProps> = ({ 
  initialValue = '', 
  onChange, 
  placeholder = 'Write your content here...' 
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [_, setContent] = useState(initialValue);
  const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
  const [selectionPosition, setSelectionPosition] = useState({ top: 0, left: 0 });
  const [editHistory, setEditHistory] = useState<string[]>([initialValue]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Initialize editor with initial value
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  // Track edit history for undo/redo functionality
  const addToHistory = (content: string) => {
    // If we're not at the end of the history, truncate it
    const newHistory = editHistory.slice(0, historyIndex + 1);
    // Add the new content to history
    newHistory.push(content);
    // Limit history size to prevent memory issues
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    setEditHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Handle editor input changes
  const handleInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      
      // Only add to history if content actually changed
      if (newContent !== editHistory[historyIndex]) {
        addToHistory(newContent);
      }
      
      if (onChange) {
        onChange(newContent);
      }
    }
  };

  // Format document with execCommand
  const formatDoc = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    handleInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Handle undo operation
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      
      if (editorRef.current && editHistory[newIndex]) {
        editorRef.current.innerHTML = editHistory[newIndex];
        if (onChange) {
          onChange(editHistory[newIndex]);
        }
      }
    }
  };

  // Handle redo operation
  const handleRedo = () => {
    if (historyIndex < editHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      
      if (editorRef.current && editHistory[newIndex]) {
        editorRef.current.innerHTML = editHistory[newIndex];
        if (onChange) {
          onChange(editHistory[newIndex]);
        }
      }
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl/Cmd + Z for Undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      handleUndo();
    }
    
    // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y for Redo
    if (((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) || 
        ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
      e.preventDefault();
      handleRedo();
    }
  };

  // Handle image insertion
  const insertImage = () => {
    const url = prompt('Enter the image URL:');
    if (url) {
      // Create a figure element with caption
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Article image';
      img.className = 'blog-image';
      figure.appendChild(img);
      
      // Add optional caption
      const captionText = prompt('Enter image caption (optional):');
      if (captionText) {
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = captionText;
        figure.appendChild(figcaption);
      }
      
      // Insert the figure at cursor position
      const selection = window.getSelection();
      if (selection && selection.getRangeAt && selection.rangeCount) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(figure);
        
        // Move cursor after the inserted figure
        range.setStartAfter(figure);
        range.setEndAfter(figure);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      
      handleInput();
    }
  };

  // Handle link creation
  const createLink = () => {
    const selection = window.getSelection();
    
    if (!selection) return;
    
    // Check if text is selected
    if (selection.toString().length > 0) {
      const url = prompt('Enter the URL:', 'https://');
      if (url) {
        formatDoc('createLink', url);
      }
    } else {
      // If no text is selected, prompt for both URL and link text
      const url = prompt('Enter the URL:', 'https://');
      if (url) {
        const linkText = prompt('Enter the link text:', url);
        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.textContent = linkText || url;
        
        // Insert at cursor position
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(link);
        
        // Move cursor after the inserted link
        range.setStartAfter(link);
        range.setEndAfter(link);
        selection.removeAllRanges();
        selection.addRange(range);
        
        handleInput();
      }
    }
  };

  // Format block elements
  const formatBlock = (block: string) => {
    formatDoc('formatBlock', block);
  };

  // Insert content divider
  const insertDivider = () => {
    const divider = document.createElement('div');
    divider.className = 'content-divider';
    
    // Insert at cursor position
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(divider);
      
      // Move cursor after the divider
      range.setStartAfter(divider);
      range.setEndAfter(divider);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    handleInput();
  };

  // Check if selection is inside the editor
  const isSelectionInEditor = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return false;
    
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    
    return editorRef.current?.contains(container as Node);
  };

  // Get formatting state for buttons
  const getFormatState = () => {
    return {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      alignLeft: document.queryCommandState('justifyLeft'),
      alignCenter: document.queryCommandState('justifyCenter'),
      alignRight: document.queryCommandState('justifyRight'),
      orderedList: document.queryCommandState('insertOrderedList'),
      unorderedList: document.queryCommandState('insertUnorderedList')
    };
  };

  // Handle selection changes
  const handleSelectionChange = () => {
    const selection = window.getSelection();
    
    if (selection && selection.rangeCount > 0 && isSelectionInEditor()) {
      // Get selection position
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Show floating toolbar when text is selected
      if (!selection.isCollapsed) {
        // Position the toolbar above the selection
        setSelectionPosition({
          top: rect.top - 40, // Position above selection
          left: rect.left + (rect.width / 2) - 100, // Center horizontally
        });
        
        setShowFloatingToolbar(true);
      } else {
        // Show floating toolbar for cursor position for paragraph formatting options
        setSelectionPosition({
          top: rect.top - 40,
          left: rect.left - 50,
        });
        
        // Only show if we're not just clicking randomly
        const parentNode = range.startContainer.parentNode as Element;
        if (parentNode && ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BLOCKQUOTE', 'PRE', 'LI'].includes(parentNode.nodeName)) {
          setShowFloatingToolbar(true);
        } else {
          setShowFloatingToolbar(false);
        }
      }
    } else {
      setShowFloatingToolbar(false);
    }
  };

  // Setup selection change listener
  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  // Get current format state
  const formatState = getFormatState();

  return (
    <div className="rich-text-editor border border-gray-600 rounded-lg overflow-hidden bg-gray-800/70">
      {/* Main toolbar */}
      <div className="toolbar border-b border-gray-600 p-2 bg-gray-700/50 flex flex-wrap gap-1">
        {/* History operations */}
        <div className="history-buttons flex space-x-1">
          <button
            type="button"
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className={`p-2 text-indigo-300 hover:bg-gray-600 rounded ${historyIndex <= 0 ? 'opacity-50' : ''}`}
            title="Undo"
          >
            <Undo size={18} />
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={historyIndex >= editHistory.length - 1}
            className={`p-2 text-indigo-300 hover:bg-gray-600 rounded ${historyIndex >= editHistory.length - 1 ? 'opacity-50' : ''}`}
            title="Redo"
          >
            <Redo size={18} />
          </button>
        </div>

        <div className="border-l border-gray-600 mx-1"></div>

        <div className="format-buttons flex space-x-1">
          <button
            type="button"
            onClick={() => formatDoc('bold')}
            className={`p-2 text-indigo-300 hover:bg-gray-600 rounded ${formatState.bold ? 'bg-gray-600' : ''}`}
            title="Bold"
          >
            <Bold size={18} />
          </button>
          <button
            type="button"
            onClick={() => formatDoc('italic')}
            className={`p-2 text-indigo-300 hover:bg-gray-600 rounded ${formatState.italic ? 'bg-gray-600' : ''}`}
            title="Italic"
          >
            <Italic size={18} />
          </button>
          <button
            type="button"
            onClick={() => formatDoc('underline')}
            className={`p-2 text-indigo-300 hover:bg-gray-600 rounded ${formatState.underline ? 'bg-gray-600' : ''}`}
            title="Underline"
          >
            <Underline size={18} />
          </button>
        </div>

        <div className="border-l border-gray-600 mx-1"></div>

        <div className="alignment-buttons flex space-x-1">
          <button
            type="button"
            onClick={() => formatDoc('justifyLeft')}
            className={`p-2 text-indigo-300 hover:bg-gray-600 rounded ${formatState.alignLeft ? 'bg-gray-600' : ''}`}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => formatDoc('justifyCenter')}
            className={`p-2 text-indigo-300 hover:bg-gray-600 rounded ${formatState.alignCenter ? 'bg-gray-600' : ''}`}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </button>
          <button
            type="button"
            onClick={() => formatDoc('justifyRight')}
            className={`p-2 text-indigo-300 hover:bg-gray-600 rounded ${formatState.alignRight ? 'bg-gray-600' : ''}`}
            title="Align Right"
          >
            <AlignRight size={18} />
          </button>
        </div>

        <div className="border-l border-gray-600 mx-1"></div>

        <div className="list-buttons flex space-x-1">
          <button
            type="button"
            onClick={() => formatDoc('insertUnorderedList')}
            className={`p-2 text-indigo-300 hover:bg-gray-600 rounded ${formatState.unorderedList ? 'bg-gray-600' : ''}`}
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button
            type="button"
            onClick={() => formatDoc('insertOrderedList')}
            className={`p-2 text-indigo-300 hover:bg-gray-600 rounded ${formatState.orderedList ? 'bg-gray-600' : ''}`}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </button>
        </div>

        <div className="border-l border-gray-600 mx-1"></div>

        <div className="insert-buttons flex space-x-1">
          <button
            type="button"
            onClick={createLink}
            className="p-2 text-indigo-300 hover:bg-gray-600 rounded"
            title="Insert Link"
          >
            <Link size={18} />
          </button>
          <button
            type="button"
            onClick={insertImage}
            className="p-2 text-indigo-300 hover:bg-gray-600 rounded"
            title="Insert Image"
          >
            <Image size={18} />
          </button>
        </div>

        <div className="border-l border-gray-600 mx-1"></div>

        <div className="format-buttons flex space-x-1">
          <button
            type="button"
            onClick={() => formatBlock('<h2>')}
            className="p-2 text-indigo-300 hover:bg-gray-600 rounded"
            title="Heading"
          >
            <Type size={18} />
          </button>
          <button
            type="button"
            onClick={() => formatBlock('<blockquote>')}
            className="p-2 text-indigo-300 hover:bg-gray-600 rounded"
            title="Quote"
          >
            <Quote size={18} />
          </button>
          <button
            type="button"
            onClick={() => formatBlock('<pre>')}
            className="p-2 text-indigo-300 hover:bg-gray-600 rounded"
            title="Code Block"
          >
            <Code size={18} />
          </button>
          <button
            type="button"
            onClick={insertDivider}
            className="p-2 text-indigo-300 hover:bg-gray-600 rounded"
            title="Insert Divider"
          >
            <div className="w-4 h-4 flex items-center justify-center">—</div>
          </button>
        </div>
      </div>

      {/* Editable content area */}
      <div
        ref={editorRef}
        className="content p-4 min-h-[400px] text-indigo-100 focus:outline-none"
        contentEditable="true"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        spellCheck="true"
      ></div>

      {/* Medium-style floating toolbar on text selection */}
      {showFloatingToolbar && (
        <div 
          className="floating-toolbar fixed bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-1.5 flex items-center space-x-1 z-50 transition-opacity duration-200"
          style={{
            top: `${Math.max(10, selectionPosition.top)}px`,
            left: `${Math.max(10, selectionPosition.left)}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {/* Formatting options */}
          <button
            onClick={() => formatDoc('bold')}
            className={`p-1.5 text-indigo-300 hover:bg-gray-700 rounded ${formatState.bold ? 'bg-gray-700' : ''}`}
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => formatDoc('italic')}
            className={`p-1.5 text-indigo-300 hover:bg-gray-700 rounded ${formatState.italic ? 'bg-gray-700' : ''}`}
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => formatDoc('underline')}
            className={`p-1.5 text-indigo-300 hover:bg-gray-700 rounded ${formatState.underline ? 'bg-gray-700' : ''}`}
          >
            <Underline size={16} />
          </button>
          
          <div className="border-l border-gray-600 h-6 mx-0.5"></div>
          
          <button
            onClick={createLink}
            className="p-1.5 text-indigo-300 hover:bg-gray-700 rounded"
          >
            <Link size={16} />
          </button>
          
          <button
            onClick={() => formatDoc('hiliteColor', '#FAF089')}
            className="p-1.5 text-indigo-300 hover:bg-gray-700 rounded"
            title="Highlight"
          >
            <span className="inline-block w-4 h-4 bg-yellow-200 rounded" aria-hidden="true"></span>
          </button>
          
          <div className="border-l border-gray-600 h-6 mx-0.5"></div>
          
          {/* Block formatting options */}
          <button
            onClick={() => formatBlock('<h2>')}
            className="p-1.5 text-indigo-300 hover:bg-gray-700 rounded"
            title="Heading 2"
          >
            <Type size={16} />
          </button>
          <button
            onClick={() => formatDoc('insertUnorderedList')}
            className={`p-1.5 text-indigo-300 hover:bg-gray-700 rounded ${formatState.unorderedList ? 'bg-gray-700' : ''}`}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => formatDoc('insertOrderedList')}
            className={`p-1.5 text-indigo-300 hover:bg-gray-700 rounded ${formatState.orderedList ? 'bg-gray-700' : ''}`}
          >
            <ListOrdered size={16} />
          </button>
          <button
            onClick={() => formatBlock('<blockquote>')}
            className="p-1.5 text-indigo-300 hover:bg-gray-700 rounded"
          >
            <Quote size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EnhancedRichTextEditor;