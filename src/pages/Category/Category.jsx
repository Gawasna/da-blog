import React, { useEffect, useState } from 'react';
import { List, Card, Space, Typography, Button } from 'antd';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostsByCategoryId } from '../../pages/Posts/api';

const { Title, Text, Paragraph } = Typography;

const StyledWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  color: #24292f;

  [data-theme="dark"] & {
    background-color: #343a40;
    color: #f0f6fc;
  }
`;

const StyledListItem = styled(List.Item)`
  cursor: pointer;
  .ant-list-item-meta-avatar {
    width: 150px;
    margin-right: 16px;
  }
  img {
    width: 150px;
    height: 120px;
    object-fit: cover;
  }
  .ant-list-item-meta-content {
    flex: 1;
  }
`;

function CategoryPostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 6;
  const navigate = useNavigate();
  const { id: categoryId } = useParams();

  const fetchPosts = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const data = await getPostsByCategoryId(categoryId, page, limit);
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
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]); // Reset posts when category changes
    setPage(1); // Reset page when category changes
  }, [categoryId]);

  useEffect(() => {
    fetchPosts();
  }, [page, categoryId]);

  const loadMore = (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <Button 
        onClick={() => setPage(prev => prev + 1)} 
        loading={loading}
      >
        Tải thêm bài viết
      </Button>
    </div>
  );

  const handlePostClick = (id) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/post/${id}`);
  };

  return (
    <StyledWrapper>
      <List
        grid={{ 
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={posts}
        renderItem={(post) => (
          <StyledListItem onClick={() => handlePostClick(post.id)}>
            <List.Item.Meta
              avatar={<img src={post.image_path} alt={post.title} />}
              title={
                <Space direction="vertical" size={2}>
                  <Text type="secondary">{post.category.name}</Text>
                  <Title level={5}>{post.title}</Title>
                </Space>
              }
              description={
                <Space direction="vertical" size={4}>
                  <Paragraph ellipsis={{ rows: 2 }}>
                    {post.description}
                  </Paragraph>
                  <Text type="secondary">
                    {new Date(post.created_at).toLocaleDateString()}
                  </Text>
                </Space>
              }
            />
          </StyledListItem>
        )}
      />
    </StyledWrapper>
  );
}

export default CategoryPostList;