// src/components/blog/BlogFormattingUtils.tsx
import React, { ReactNode } from 'react';

// Type definitions
interface CalloutProps {
  children: ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success' | 'note';
}

interface PullQuoteProps {
  text: string;
  author?: string;
  position?: 'left' | 'center' | 'right';
}

interface FigureWithCaptionProps {
  src: string;
  alt?: string;
  caption?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  align?: 'left' | 'center' | 'right';
}

interface SectionTitleProps {
  children: ReactNode;
  id: string;
}

interface CodeBlockProps {
  code: string;
  language?: string;
}

interface HighlightProps {
  children: ReactNode;
  color?: 'yellow' | 'blue' | 'green' | 'red' | 'purple';
}

interface DropCapProps {
  children: ReactNode;
}

interface TableOfContentsProps {
  items: Array<{id: string; title: string}>;
}

interface TwoColumnLayoutProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
}

interface AuthorBioProps {
  name: string;
  avatar?: string;
  bio: string;
}

interface ReadMoreSectionProps {
  posts: Array<{slug: string; title: string; summary: string}>;
}

interface EmbedContainerProps {
  children: ReactNode;
  caption?: string;
}

// A collection of utility components for blog post formatting

// Medium-style callout component
export const Callout: React.FC<CalloutProps> = ({ children, type = 'info' }) => {
  const styles = {
    info: 'bg-blue-900/20 border-l-4 border-blue-500',
    warning: 'bg-yellow-900/20 border-l-4 border-yellow-500',
    error: 'bg-red-900/20 border-l-4 border-red-500',
    success: 'bg-green-900/20 border-l-4 border-green-500',
    note: 'bg-purple-900/20 border-l-4 border-purple-500',
  };

  return (
    <div className={`p-4 my-6 rounded-r-lg ${styles[type]}`}>
      {children}
    </div>
  );
};

// Medium-style pull quote
export const PullQuote: React.FC<PullQuoteProps> = ({ text, author, position = 'center' }) => {
  const positionStyles = {
    left: 'ml-0 mr-auto text-left',
    center: 'mx-auto text-center',
    right: 'mr-0 ml-auto text-right',
  };

  return (
    <blockquote className={`my-8 max-w-2xl ${positionStyles[position]}`}>
      <p className="text-xl font-serif italic text-indigo-200">&ldquo;{text}&rdquo;</p>
      {author && (
        <cite className="block mt-4 text-sm text-indigo-300 not-italic">— {author}</cite>
      )}
    </blockquote>
  );
};

// Medium-style image caption wrapper
export const FigureWithCaption: React.FC<FigureWithCaptionProps> = ({ 
  src, 
  alt = '', 
  caption, 
  size = 'large', 
  align = 'center' 
}) => {
  const sizeStyles = {
    small: 'max-w-sm',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    full: 'max-w-full',
  };

  const alignStyles = {
    left: 'ml-0 mr-auto',
    center: 'mx-auto',
    right: 'mr-0 ml-auto',
  };

  return (
    <figure className={`my-8 ${sizeStyles[size]} ${alignStyles[align]}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={src}
        alt={alt}
        className="rounded-lg shadow-lg w-full h-auto"
      />
      {caption && (
        <figcaption className="text-center text-sm text-gray-400 mt-2 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

// Medium-style content divider
export const ContentDivider: React.FC = () => {
  return (
    <div className="content-divider my-12">
      <div className="text-center">
        <span className="inline-block text-indigo-400 text-2xl tracking-widest">•••</span>
      </div>
    </div>
  );
};

// Medium-style section title
export const SectionTitle: React.FC<SectionTitleProps> = ({ children, id }) => {
  return (
    <h2 
      id={id} 
      className="text-2xl font-bold text-indigo-100 mt-12 mb-6 pb-2 border-b border-indigo-800/50"
    >
      {children}
    </h2>
  );
};

// Medium-style code block with language label
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <div className="my-6 overflow-hidden rounded-lg">
      {language && (
        <div className="bg-gray-800 px-4 py-1 text-xs font-mono text-gray-400 border-b border-gray-700">
          {language}
        </div>
      )}
      <pre className="bg-gray-900 p-4 overflow-x-auto text-gray-300 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Medium-style highlighted text
export const Highlight: React.FC<HighlightProps> = ({ children, color = 'yellow' }) => {
  const colorStyles = {
    yellow: 'bg-yellow-200/20 text-yellow-100',
    blue: 'bg-blue-200/20 text-blue-100',
    green: 'bg-green-200/20 text-green-100',
    red: 'bg-red-200/20 text-red-100',
    purple: 'bg-purple-200/20 text-purple-100',
  };

  return (
    <span className={`px-1 rounded ${colorStyles[color]}`}>
      {children}
    </span>
  );
};

// Medium-style dropcap (first letter styled prominently)
export const DropCap: React.FC<DropCapProps> = ({ children }) => {
  if (typeof children !== 'string' || !children.length) {
    return <p>{children}</p>;
  }

  const firstChar = children.charAt(0);
  const restOfText = children.slice(1);

  return (
    <p>
      <span className="float-left text-5xl font-serif font-bold text-indigo-400 mr-2 mt-1">
        {firstChar}
      </span>
      {restOfText}
    </p>
  );
};

// Medium-style table of contents
export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  return (
    <div className="my-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <h3 className="text-lg font-medium text-indigo-200 mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-indigo-300 hover:text-indigo-100">
            <a href={`#${item.id}`} className="hover:underline">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Medium-style two-column layout
export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ leftContent, rightContent }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 my-8">
      <div className="flex-1">{leftContent}</div>
      <div className="flex-1">{rightContent}</div>
    </div>
  );
};

// Medium-style author bio component
export const AuthorBio: React.FC<AuthorBioProps> = ({ name, avatar, bio }) => {
  return (
    <div className="flex items-start space-x-4 my-8 p-4 bg-gray-800/60 rounded-lg border border-gray-700">
      {avatar && (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={avatar} 
          alt={`${name}'s avatar`} 
          className="w-16 h-16 rounded-full object-cover"
        />
      )}
      <div>
        <h4 className="text-lg font-medium text-indigo-200">{name}</h4>
        <p className="text-indigo-300 text-sm mt-1">{bio}</p>
      </div>
    </div>
  );
};

// Medium-style read more section
export const ReadMoreSection: React.FC<ReadMoreSectionProps> = ({ posts }) => {
  return (
    <div className="my-12 pt-8 border-t border-gray-700">
      <h3 className="text-xl font-bold text-indigo-100 mb-6">More Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <a 
            key={index} 
            href={post.slug} 
            className="block group hover:bg-gray-800 rounded-lg p-4 transition"
          >
            <h4 className="text-lg font-medium text-indigo-200 group-hover:text-indigo-100">
              {post.title}
            </h4>
            <p className="text-sm text-indigo-300 mt-2 line-clamp-2">
              {post.summary}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

// Medium-style embed container
export const EmbedContainer: React.FC<EmbedContainerProps> = ({ children, caption }) => {
  return (
    <div className="my-8">
      <div className="overflow-hidden rounded-lg bg-gray-900/50 p-4">
        {children}
      </div>
      {caption && (
        <p className="text-center text-sm text-gray-400 mt-2 italic">
          {caption}
        </p>
      )}
    </div>
  );
};

// Export all components in a named object
const BlogFormattingUtils = {
  Callout,
  PullQuote,
  FigureWithCaption,
  ContentDivider,
  SectionTitle,
  CodeBlock,
  Highlight,
  DropCap,
  TableOfContents,
  TwoColumnLayout,
  AuthorBio,
  ReadMoreSection,
  EmbedContainer
};

export default BlogFormattingUtils;