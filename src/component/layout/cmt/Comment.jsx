import React, { useState, useEffect, useContext } from 'react';
import { 
  List, 
  Avatar, 
  Form, 
  Button, 
  Input,
  Typography,
  Pagination,
  message
} from 'antd';
import { Comment } from '@ant-design/compatible';
import styled from 'styled-components';
import { AuthContext } from '../header/AuthContext';
import { getPostComments, getPostCommentCount, addPostComment } from '@/pages/Posts/api';
import { useParams } from 'react-router-dom';
import "./cmt.css";

const { TextArea } = Input;
const { Text } = Typography;

const StyledCommentSection = styled.div`
  background-color: #ffffff;
  color: #24292f;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #d0d7de;

  [data-theme="dark"] & {
    background-color: #343a40;
    color: #f0f6fc;
    border-color: #30363d;
  }
`;

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

const StyledForm = styled(Form)`
  margin-top: 24px;
`;

const CommentSection = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const [commentsData, commentCountData] = await Promise.all([
          getPostComments(postId, currentPage, pageSize),
          getPostCommentCount(postId)
        ]);
        setComments(commentsData);
        setTotal(commentCountData.total_comments);
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, currentPage, pageSize]);

  const handleSubmit = async () => {
    if (!commentContent) {
      message.warning('Please enter a comment');
      return;
    }

    setSubmitting(true);
    try {
      const { comment, total_comments } = await addPostComment(postId, { content: commentContent });
      setComments([...comments, comment]);
      setTotal(total_comments);
      setCommentContent('');
      message.success('Comment added successfully');
    } catch (err) {
      console.error('Error adding comment:', err);
      message.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <StyledWrapper>
      <StyledCommentSection>
        <List
          loading={loading}
          dataSource={comments}
          header={`${total} bình luận`}
          itemLayout="horizontal"
          renderItem={(comment) => (
            <Comment
              author={<Text strong>{comment.user.username}</Text>}
              avatar={<Avatar>{comment.user.username[0]}</Avatar>}
              content={comment.content}
              datetime={
                <Text type="secondary">
                  {new Date(comment.created_at).toLocaleString()}
                </Text>
              }
            />
          )}
        />
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          style={{ marginTop: '16px', textAlign: 'center' }}
        />
        {isLoggedIn && (
          <StyledForm>
            <Form.Item>
              <TextArea
                rows={2}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Write a comment..."
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={submitting}
                onClick={handleSubmit}
                type="primary"
              >
                Gửi bình luận
              </Button>
            </Form.Item>
          </StyledForm>
        )}
      </StyledCommentSection>
    </StyledWrapper>
  );
};

export default CommentSection;