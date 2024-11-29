import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Typography, Tag, Image } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import '../../css/HomePage.css'
import Banner from '../banner/banner';
import { getLatestPosts } from '../../../pages/Posts/api.js';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

function MainPosts({ showBanner = true }) {
  // Keep existing state management code
  const navigate = useNavigate();
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return Number(savedPage) || 1;
  });

  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('cachedPosts');
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      return [...new Map(parsedPosts.map(post => [post.id, post])).values()];
    }
    return [];
  });

  const limit = 6;
  const [loading, setLoading] = useState(false);

  // Keep existing useEffect and function implementations
  const checkForNewPosts = async () => {
    try {
      const newestPosts = await getLatestPosts(1, 1);
      const cachedPosts = localStorage.getItem('cachedPosts');
  
      if (cachedPosts) {
        const parsedCachedPosts = JSON.parse(cachedPosts);
        if (newestPosts[0]?.id !== parsedCachedPosts[0]?.id) {
          clearCache();
          setPage(1); // Đặt lại trang về 1
          fetchPosts(); // Tải lại danh sách bài viết từ đầu
        }
      }
    } catch (error) {
      console.error('Error checking for new posts:', error);
    }
  };

  useEffect(() => {
    loadPosts(1);
  }, []);

  const loadPosts = async (page) => {
    const response = await fetch(`/api/posts?page=${page}`);
    const data = await response.json();
    if (hasPostsChanged(data.posts)) {
      setCachedPosts([]);
      setCachedPage(1);
      setPosts(data.posts);
    } else {
      setPosts(data.posts);
    }
  };

  const hasPostsChanged = (newPosts) => {
    if (cachedPosts.length !== newPosts.length) {
      return true;
    }
    for (let i = 0; i < cachedPosts.length; i++) {
      if (cachedPosts[i].id !== newPosts[i].id || cachedPosts[i].updatedAt !== newPosts[i].updatedAt) {
        return true;
      }
    }
    return false;
  };

  // Fetch posts
  const fetchPosts = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const data = await getLatestPosts(page, limit);
      const updatedData = data.map(post => ({
        ...post,
        category: post.category || { name: '' },
        image_path: `http://localhost:3000/api/post/post/${post.id}/image?width=300`
      }));

      setPosts(prevPosts => {
        const combinedPosts = [...prevPosts, ...updatedData];
        return [...new Map(combinedPosts.map(post => [post.id, post])).values()];
      });
    } catch (error) {
      console.error('Error fetching latest posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and check
  useEffect(() => {
    const controller = new AbortController();

    const initializePosts = async () => {
      await checkForNewPosts();
      if (posts.length === 0) {
        fetchPosts();
      }
    };

    initializePosts();
    return () => controller.abort();
  }, []);

  // Handle page changes
  useEffect(() => {
    if (page > 1) {
      const currentPosition = window.scrollY;
      fetchPosts().then(() => {
        window.scrollTo({
          top: currentPosition,
          behavior: 'instant'
        });
      });
    }
  }, [page]);

  // Cache management
  useEffect(() => {
    localStorage.setItem('cachedPosts', JSON.stringify(posts));
    localStorage.setItem('currentPage', page.toString());
  }, [posts, page]);

  // Clear cache utility
  const clearCache = () => {
    localStorage.removeItem('cachedPosts');
    localStorage.removeItem('currentPage');
    setPosts([]);
    setPage(1);
  };

  // Load more handler
  const loadMorePosts = (e) => {
    e.preventDefault();
    setPage(prevPage => prevPage + 1);
  };

  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="blogItm mainbar">
      {showBanner && (
        <div className="sldO section">
          <Banner />
        </div>
      )}
      <div className="section" id="main-widget">
        <Title level={3} className="btts">Bài đăng mới nhất</Title>

        <Row gutter={[24, 24]}>
          {posts.map((post) => (
            <Col xs={24} sm={12} lg={8} key={post.id}>
              <Card
                hoverable
                cover={
                  <Image
                    alt={post.title}
                    src={post.image_path}
                    preview={false}
                    className="imgThm"
                    onClick={() => handlePostClick(post.id)}
                    style={{ cursor: 'pointer' }}
                  />
                }
                className="ntry"
                styles={{
                  body: {
                    padding: '0 5px 5px 5px',
                    borderRadius: '0 0 8px 8px'
                  }
                }}
              >
                <Tag color="blue">{post.category.name}</Tag>
                <Title level={4} ellipsis={{ rows: 2 }}>
                  <a onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
                    {post.title}
                  </a>
                </Title>
                <Paragraph ellipsis={{ rows: 3 }} className="pSmp">
                  {post.description}
                </Paragraph>
                <Text type="secondary">
                  {new Date(post.created_at).toLocaleDateString()}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={loadMorePosts}
          >
            {loading ? 'Đang tải...' : 'Tải thêm bài viết'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MainPosts;