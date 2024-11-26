import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useParams } from 'react-router-dom';
import 'github-markdown-css';
// import 'highlight.js/styles/github.css';
import PopularSide from '@/component/layout/ftp/PAside';
import Navbar from '@/component/layout/nav/Nav';
import './PostDetail.css';
import { Typography, Button, Space } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { checkLike, getPostById, getPostContent, getPostThumbnail, likePost } from '@/pages/Posts/api';

const PostDetail = ({ markdownUrl }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [postData, setPostData] = useState({
    title: '',
    created_at: '',
    content: '',
    thumbnail: ''
  });

  const { postId } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        if (postId) {
          // Fetch post details and content in parallel
          const [details, content] = await Promise.all([
            getPostById(postId),
            getPostContent(postId)
          ]);

          setPostData({
            title: details.title,
            created_at: details.created_at,
            content: content,
            thumbnail: `http://localhost:3000/api/post/post/${postId}/image?width=800`
          });
        }
      } catch (err) {
        console.error('Error fetching post:', err);
      }
    };

    fetchPostData();
  }, [postId]);

  useEffect(() => {
    const checkInitialLikeStatus = async () => {
      try {
        if (postId) {
          const { isLiked } = await checkLike(postId);
          setIsLiked(isLiked);
        }
      } catch (err) {
        console.error('Error checking like status:', err);
      }
    };

    checkInitialLikeStatus();
  }, [postId]);

  return (
    <div className="mainL">
      <div className="navmL">
        <Navbar />
      </div>
      <div className="blogCtn">
        <div className="secBIn">
          <div className="blogM">
            <div className="contentctn">
              <img
                style={{ width: '90%', display: 'block', margin: '0 auto' }}
                src={postData.thumbnail}
                alt="Post thumbnail"
              />

              <div className='pdi4' style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Typography.Title className='pdi4' level={2} style={{ margin: 0 }}>
                    {postData.title}
                  </Typography.Title>
                  <Typography.Text type="secondary">
                    Posted on {new Date(postData.created_at).toLocaleDateString()}
                  </Typography.Text>
                </div>
                <Button
                  type="text"
                  icon={isLiked ? <HeartFilled style={{ color: '#ff4d4f' }} /> : <HeartOutlined />}
                  size="large"
                  onClick={async () => {
                    try {
                      await likePost(postId);
                      setIsLiked(prev => !prev);
                    } catch (err) {
                      console.error('Error toggling like:', err);
                    }
                  }}
                />
              </div>
              <div className="markdown-body">
                <ReactMarkdown
                  children={postData.content}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h1: ({ children }) => <h1 style={{ fontSize: '2em' }}>{children}</h1>,
                    h2: ({ children }) => <h2 style={{ fontSize: '1.5em' }}>{children}</h2>,
                    code({ node, inline, className, children, ...props }) {
                      return !inline ? (
                        <pre className={className} {...props}>
                          <code>{children}</code>
                        </pre>
                      ) : (
                        <code {...props} style={{ backgroundColor: '#00000', padding: '0.2em 0.4em', borderRadius: '4px' }}>
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
