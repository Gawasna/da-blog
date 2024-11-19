import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css'; // GitHub Markdown CSS for styling
import 'highlight.js/styles/github.css'; // Optional: Code block styling
import PopularSide from '@/component/layout/ftp/PAside';
import Navbar from '@/component/layout/nav/Nav';
import './PostDetail.css';

const PostDetail = ({ markdownUrl }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(markdownUrl)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error('Error loading markdown:', error));
  }, [markdownUrl]);

  return (
    <div className="mainL">
      <div className="navmL">
        <Navbar />
      </div>
      <div className="blogCtn">
        <div className="secBIn">
          <div className="blogM">
            <div className="contentctn">
            <div className="markdown-body">
              <ReactMarkdown
                children={content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => <h1 style={{ fontSize: '2em', color: '#333' }}>{children}</h1>,
                  h2: ({ children }) => <h2 style={{ fontSize: '1.5em', color: '#555' }}>{children}</h2>,
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
            </div>
            <PopularSide />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
