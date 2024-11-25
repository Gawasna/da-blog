import React, { useState } from 'react';
import { Form, Input, Button, Radio, Upload, message, Divider, Card } from 'antd';
import { UploadOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [contentType, setContentType] = useState('file');
  const [thumbnailType, setThumbnailType] = useState('file');
  const [previewImage, setPreviewImage] = useState(null);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author_id', values.author_id);
    formData.append('category_id', values.category_id);
    formData.append('description', values.description);

    // Handle content
    if (contentType === 'file' && values.content?.file) {
      formData.append('content', values.content.file);
    } else if (contentType === 'url') {
      formData.append('content_path', values.content_url);
    }

    // Handle thumbnail
    if (thumbnailType === 'file' && values.thumbnail?.file) {
      formData.append('thumbnail', values.thumbnail.file);
    } else if (thumbnailType === 'url') {
      formData.append('image_path', values.thumbnail_url);
    }

    try {
      await axios.post('http://localhost:3000/admin/create-post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success('Post created successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      message.error('Failed to create post');
    }
  };

  const handleThumbnailChange = (info) => {
    if (info.file && info.file.originFileObj) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  return (
    <Card
      style={{
        maxWidth: 700,
        margin: '24px auto',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '24px',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '16px', color: '#333' }}>
        Create a New Post
      </h2>
      <Divider />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ marginTop: '16px' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title' }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item
          name="author_id"
          label="Author ID"
          rules={[{ required: true, message: 'Please input the author ID' }]}
        >
          <Input placeholder="Enter author ID" />
        </Form.Item>

        <Form.Item
          name="category_id"
          label="Category ID"
          rules={[{ required: true, message: 'Please input the category ID' }]}
        >
          <Input placeholder="Enter category ID" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description' }]}
        >
          <Input.TextArea placeholder="Enter description" rows={4} />
        </Form.Item>

        {/* Content Section */}
        <Form.Item label="Content Upload Method">
          <Radio.Group
            onChange={(e) => setContentType(e.target.value)}
            value={contentType}
            buttonStyle="solid"
          >
            <Radio.Button value="file">Upload File</Radio.Button>
            <Radio.Button value="url">URL</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {contentType === 'file' ? (
          <Form.Item
            name="content"
            rules={[{ required: true, message: 'Please upload a markdown file' }]}
          >
            <Upload
              accept=".md"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Markdown File</Button>
            </Upload>
          </Form.Item>
        ) : (
          <Form.Item
            name="content_url"
            rules={[{ required: true, message: 'Please input content URL' }]}
          >
            <Input placeholder="Content URL" />
          </Form.Item>
        )}

        {/* Thumbnail Section */}
        <Form.Item label="Thumbnail Upload Method">
          <Radio.Group
            onChange={(e) => setThumbnailType(e.target.value)}
            value={thumbnailType}
            buttonStyle="solid"
          >
            <Radio.Button value="file">Upload File</Radio.Button>
            <Radio.Button value="url">URL</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {thumbnailType === 'file' ? (
          <Form.Item
            name="thumbnail"
            rules={[{ required: true, message: 'Please upload an image' }]}
          >
            <Upload
              accept="image/*"
              beforeUpload={() => false}
              maxCount={1}
              onChange={handleThumbnailChange}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        ) : (
          <Form.Item
            name="thumbnail_url"
            rules={[{ required: true, message: 'Please input thumbnail URL' }]}
          >
            <Input
              placeholder="Thumbnail URL"
              onChange={(e) => setPreviewImage(e.target.value)}
            />
          </Form.Item>
        )}

        {/* Thumbnail Preview */}
        {previewImage && (
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        )}

        <Divider />
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreatePost;
