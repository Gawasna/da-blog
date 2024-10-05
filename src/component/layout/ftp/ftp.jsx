// src/components/FeaturedPosts.jsx

import React from 'react';
import posts from './posts';

const FeaturedPosts = () => {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Featured Posts</h2>
            <div style={styles.postsList}>
                {posts.map(post => (
                    <div key={post.id} style={styles.postItem}>
                        <img src={post.image} alt={post.title} style={styles.image} />
                        <div style={styles.postContent}>
                            <h3 style={styles.postTitle}>{post.title}</h3>
                            <p style={styles.postDate}>{post.date}</p>
                            <p style={styles.postExcerpt}>{post.excerpt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        border: '1px solid #eaeaea',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
        marginBottom: '16px',
        fontSize: '24px',
        color: '#333',
    },
    postsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    postItem: {
        display: 'flex',
        border: '1px solid #f0f0f0',
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: '150px',
        height: '100px',
        objectFit: 'cover',
    },
    postContent: {
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    postTitle: {
        fontSize: '18px',
        color: '#0070f3',
        margin: '0',
    },
    postDate: {
        fontSize: '14px',
        color: '#666',
    },
    postExcerpt: {
        fontSize: '14px',
        color: '#444',
        marginTop: '4px',
    },
};

export default FeaturedPosts;
