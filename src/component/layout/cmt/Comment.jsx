import React, { useEffect, useState } from 'react';

function Comment() {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        // Fetch comments from an API or database
        fetch('/api/comments')
            .then(response => response.json())
            .then(data => {
                setComments(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError('Failed to load comments');
                setIsLoading(false);
            });
    }, []);

    const handlePostComment = (e) => {
        e.preventDefault();
        setIsPosting(true);
        // Post the new comment to an API or database
        fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: newComment }),
        })
            .then(response => response.json())
            .then(data => {
                setComments([...comments, data]);
                setNewComment('');
                setIsPosting(false);
            })
            .catch(err => {
                setError('Failed to post comment');
                setIsPosting(false);
            });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Comments</h2>
            <div style={{ marginBottom: '20px' }}>
                {isLoading ? (
                    <p>Loading comments...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    comments.map((cmt, index) => (
                        <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                            <p>{cmt}</p>
                        </div>
                    ))
                )}
            </div>
            <div>
                {isLogin ? (
                    <form onSubmit={handlePostComment}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Input your comment"
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                        />
                        <button type="submit" disabled={isPosting} style={{ padding: '10px 20px' }}>
                            {isPosting ? 'Posting...' : 'Post Comment'}
                        </button>
                    </form>
                ) : (
                    <p>Please log in to post a comment.</p>
                )}
            </div>
        </div>
    );
}

export default Comment;