import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Row, 
  Col, 
  Badge, 
  Statistic, 
  Avatar, 
  Space,
  Typography,
  Input,
  Button,
  Layout,
  message
} from 'antd';
import {
  FileTextOutlined,
  LikeOutlined,
  CommentOutlined,
  UserOutlined,
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons';

import { getDashboard } from './api';
import './dashboard.css';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [searchText, setSearchText] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getDashboard(pagination.current, pagination.pageSize);
      setPosts(data.posts);
      setPagination((prev) => ({
        ...prev,
        total: data.pagination.total
      }));
    } catch (error) {
      message.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Optional: Setup real-time updates
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <Typography.Link>{text}</Typography.Link>
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
      render: (text) => <Badge color="blue" text={text} />
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'public' ? 'success' : 'default'} 
          text={status}
        />
      )
    },
    {
      title: 'Engagement',
      key: 'engagement',
      render: (_, record) => (
        <Space>
          <span><LikeOutlined /> {record.statistics.total_likes}</span>
          <span><CommentOutlined /> {record.statistics.total_comments}</span>
        </Space>
      )
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleDateString()
    }
  ];

  return (
    <Layout className="dashboard">
      <Header className="dashboard-header">
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          Dashboard
        </Title>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span style={{ color: 'white' }}>Admin</span>
        </Space>
      </Header>

      <Content className="dashboard-content">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic 
                title="Total Posts"
                value={posts.length}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Likes"
                value={posts.reduce((acc, post) => acc + post.statistics.total_likes, 0)}
                prefix={<LikeOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Comments"
                value={posts.reduce((acc, post) => acc + post.statistics.total_comments, 0)}
                prefix={<CommentOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Cache Items"
                value={0}
                prefix={<ReloadOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Card 
          className="posts-table"
          title="Posts Management"
          extra={
            <Space>
              <Search
                placeholder="Search posts..."
                allowClear
                onSearch={setSearchText}
                style={{ width: 200 }}
              />
              <Button 
                type="primary" 
                icon={<ReloadOutlined />}
                onClick={fetchDashboardData}
                loading={loading}
              >
                Refresh
              </Button>
            </Space>
          }
        >
          <Table
            columns={columns}
            dataSource={posts}
            rowKey="id"
            loading={loading}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default Dashboard;
