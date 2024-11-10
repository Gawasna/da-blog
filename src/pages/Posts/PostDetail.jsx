import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css'; // GitHub Markdown CSS for styling
import 'highlight.js/styles/github.css'; // Optional: Code block styling

const PostDetail = ({ markdownUrl }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(markdownUrl)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error('Error loading markdown:', error));
  }, [markdownUrl]);

  return (
    <div className="markdown-body">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Customize heading styles
          h1: ({ children }) => <h1 style={{ fontSize: '2em', color: '#333' }}>{children}</h1>,
          h2: ({ children }) => <h2 style={{ fontSize: '1.5em', color: '#555' }}>{children}</h2>,
          // Customize code blocks
          code({ node, inline, className, children, ...props }) {
            return !inline ? (
              <pre className={className} {...props}>
                <code>{children}</code>
              </pre>
            ) : (
              <code {...props} style={{ backgroundColor: '#f5f5f5', padding: '0.2em 0.4em', borderRadius: '4px' }}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default PostDetail;
