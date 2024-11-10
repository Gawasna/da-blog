import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]); // Ensure posts is an array even if the fetch fails
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Array.isArray(posts) ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {currentPosts.map(post => (
          <li key={post.id}>
            <Link to={`posts/${post.id}`}>
              <img src={`thumbnails/${post.thumbnail}`} alt={post.title} />
              <h2>{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={nextPage} disabled={indexOfLastPost >= posts.length}>
        Next
      </button>
    </div>
  );
};

export default Post;