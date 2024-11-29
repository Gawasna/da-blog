import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Modal, message, Select } from 'antd';
import { getAllPosts, deletePost, modifyPost } from './api';

const { Option } = Select;

const PostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    const fetchPosts = async (page = pagination.current, limit = pagination.pageSize) => {
        try {
            setLoading(true);
            const data = await getAllPosts(page, limit);
            setPosts(data.posts); // Cập nhật danh sách posts
            setPagination(prev => ({
                ...prev,
                total: data.pagination.total,  // Đảm bảo total được cập nhật
            }));
        } catch (error) {
            message.error('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    // Add handle table change
    const handleTableChange = (pagination) => {
        setPagination(pagination);  // Cập nhật pagination state
        fetchPosts(pagination.current, pagination.pageSize);  // Gọi lại API
    };

    useEffect(() => {
        fetchPosts(pagination.current, pagination.pageSize); // Fetch posts khi pagination thay đổi
    }, [pagination.current, pagination.pageSize]);  // Cập nhật khi pagination thay đổi    

    const handleRowClick = (record) => {
        setSelectedPost(record);  // Chắc chắn cập nhật selectedPost
        form.setFieldsValue(record);  // Cập nhật giá trị form
        setIsModalVisible(true);  // Mở modal
        console.log('Selected post id:', record.id);
    };

    useEffect(() => {
        if (selectedPost) {
            console.log('Selected post updated:', selectedPost.id);  // Kiểm tra sự thay đổi của selectedPost
        }
    }, [selectedPost]); // Khi selectedPost thay đổi, useEffect sẽ được gọi

    const handleUpdate = async () => {
        if (!selectedPost?.id) {
            message.error('Invalid post selected for update');
            return;
        }

        try {
            const values = await form.validateFields();
            console.log('Updating post with values:', values);
            console.log('Selected post id:', selectedPost.id);

            await modifyPost(selectedPost.id, values);
            message.success('Post updated successfully');
            setIsModalVisible(false);
            form.resetFields();
            fetchPosts();
        } catch (error) {
            console.error('Update failed:', error);
            message.error('Failed to update post: ' + error.message);
        }
    };

    const handleDelete = async () => {
        if (!selectedPost || !selectedPost.id) {
            message.error('Invalid post selected for deletion');
            return;
        }

        try {
            await deletePost(selectedPost.id);
            message.success('Post deleted successfully');
            fetchPosts();
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to delete post');
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Thumbnail', dataIndex: 'image_path', key: 'image_path', render: (text, record) => <img src={`http://localhost:3000/api/post/post/${record.id}/image?width=150`} alt="thumbnail" style={{ width: '150px' }} /> },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Category', dataIndex: ['category', 'name'], key: 'category' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={posts}
                rowKey="id"
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
            />
            <Modal
                title="Edit Post"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="delete" type="danger" onClick={handleDelete}>
                        Delete
                    </Button>,
                    <Button key="update" type="primary" onClick={handleUpdate}>
                        Update
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label="Title">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="category_id" label="Category ID">
                        <Input />
                    </Form.Item>
                    <Form.Item name="status" label="Status">
                        <Select>
                            <Option value="public">Public</Option>
                            <Option value="hidden">Hidden</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default PostManagement;
