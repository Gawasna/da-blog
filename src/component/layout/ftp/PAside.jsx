import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Typography, Tag, Image } from 'antd';
import StandardButton from "@/component/common/Button";
import '../../css/HomePage.css';
import "../ftp/PAside.css";
import { getPopularPosts, getCategories } from '@/pages/Posts/api';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';

const PopularSide = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skip, setSkip] = useState(0);
  const take = 3;
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  // Fetch popular posts
  const fetchPopularPosts = async () => {
    try {
      setLoadingPosts(true);
      const data = await getPopularPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching popular posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };
  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const data = await getCategories(skip, take);
      setCategories(prev => [...prev, ...data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleLoadMoreCategories = (e) => {
    e.preventDefault();
    setSkip(prev => prev + take);
    setVisible(false);
  };

  useEffect(() => {
    fetchPopularPosts();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [skip]);

  const handleNavigateToPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleNavigateToCategory = (categoryId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang
    navigate(`/category/${categoryId}`);
  };

  return (
    <aside className="blogItm sidebar">
      <div className="sideIn">
        <div className="section" id="side-widget">
          {/* Phần bài viết phổ biến */}
          <div className="widget popularPost" id="ppost">
            <h3 className="ptts">Bài viết phổ biến</h3>
            <div className="itemPp" role="feed">
              {posts.length > 0 && (
                <>
                  {/* Bài viết đầu tiên có thumbnail */}
                  <article
                    className="itm mostP"
                    onClick={() => handleNavigateToPost(posts[0].id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="Pthmb">
                      <img
                        src={`http://localhost:3000/api/post/post/${posts[0].id}/image?width=300`}
                        alt={posts[0].title}
                        id="thumbnailtest"
                      />
                    </div>
                    <div className="infopp widget">
                      <div className="pptime">{new Date(posts[0].created_at).toLocaleDateString()}</div>
                      <div className="pCtg">{posts[0].category.name}</div>
                    </div>
                    <div className="pcCtn">
                      <div className="pTitle">{posts[0].title}</div>
                    </div>
                    <div className="pSmp">{posts[0].description}</div>
                  </article>

                  {/* Các bài viết tiếp theo không cần thumbnail */}
                  {posts.slice(1).map(post => (
                    <article
                      key={post.id}
                      className="itm"
                      onClick={() => handleNavigateToPost(post.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="infopp">
                        <div className="pptime">{new Date(post.created_at).toLocaleDateString()}</div>
                        <div className="pCtg">{post.category.name}</div>
                      </div>
                      <div className="pcCtn">
                        <div className="pTitle">{post.title}</div>
                      </div>
                      <div className="pSmp">{post.description}</div>
                    </article>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Phần danh mục (categories) */}
          <div className="widget label" id="labelPP">
            <h3 className="btts">Label</h3>
            <div style={{ padding: '10px' }}>
              <div className="clistlabels">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="lbsz"
                    onClick={() => handleNavigateToCategory(category.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="Cat">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="loadMorelb">
              {visible && <Button onClick={handleLoadMoreCategories} disabled={loadingCategories}>
                {loadingCategories ? 'Loading...' : 'Tải thêm'}
              </Button>}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default PopularSide;
