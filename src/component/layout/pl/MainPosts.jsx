import React, { useEffect, useState } from 'react';
import "../../css/HomePage.css";
import Banner from '../banner/banner';
import '../../../pages/Posts/api.js';
import { getLatestPosts } from '../../../pages/Posts/api.js';
import "../ftp/PAside.css";
import StandardButton from '@/component/common/Button';

function MainPosts() {
  // Initialize states
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

  // Check for new posts
  const checkForNewPosts = async () => {
    try {
      const newestPosts = await getLatestPosts(1, 1);
      const cachedPosts = localStorage.getItem('cachedPosts');
      
      if (cachedPosts) {
        const parsedCachedPosts = JSON.parse(cachedPosts);
        if (newestPosts[0]?.id !== parsedCachedPosts[0]?.id) {
          clearCache();
        }
      }
    } catch (error) {
      console.error('Error checking for new posts:', error);
    }
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

  return (
    <main className="blogItm mainbar">
      <div className="section" id="main-widget">
        <div className="widget Blog" id="Blog1">
          <div className="blogtitle hm">
            <h3 className="btts">Bài đăng mới nhất</h3>
          </div>
          <div className="blogList">
            {posts.map((post) => (
              <article className="ntry" key={post.id}>
                <div className="Pthmb">
                  <a className="thmb">
                    <img className="imgThm" src={post.image_path} alt={post.title} />
                  </a>
                </div>
                <div className="plcCtn">
                  <div className="plCtg">
                    <div className="plictg">
                      <a href="/">{post.category.name}</a>
                    </div>
                  </div>
                  <h2 className="pltl">
                    <a href="/">{post.title}</a>
                  </h2>
                  <div className="pSmp">
                    {post.description}
                  </div>
                  <div className="pptime">
                    <time dateTime={new Date(post.created_at).toISOString()}>
                      {new Date(post.created_at).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="loadMorelb">
            <a href="#" onClick={loadMorePosts}>
              <StandardButton disabled={loading}>
                {loading ? 'Đang tải...' : 'Tải thêm bài viết'}
              </StandardButton>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPosts;